const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;


const server = 'http://localhost:3000'

chai.use(chaiHttp)

let randomID = 'chaitest' + Math.round(Math.random() * 1000000)
let ideaID

describe('Test users', () => {
  describe('/POST create a user and get user info', () => {
    it('it should successfully create a user', (done) => {
      chai.request(server)
        .post('/user/')
        .send({ userName: randomID })
        .end((err, res) => {
          chai.request(server)
            .get(`/user/${ randomID }`)
            .end((err, res) => {
              expect(res.body.userName).to.equal(randomID)
              done()
            })
        })
    })
    describe('/POST a new idea',  () => {
      it('it should successfully create an idea', (done) => {
        chai.request(server)
          .post(`/create/${ randomID }`)
          .send({ description: 'test description', title: 'test title'})
          .end((err, res) => {
            done()
          })
      })
    })
  })

  describe('/GET a specific user\'s data', () => {
    it('it should GET one user\'s ideas', (done) => {
      chai.request(server)
        .get(`/user/${ randomID }/ideas/`)
        .end((err, res) => {
          expect(res.body[0].value.description).to.equal('test description')
          expect(res.body[0].value.title).to.equal('test title')
          done()
        })
    })
  })
})

describe('List', () => {
  describe('/GET ideas', () => {
    it('it should GET all the ideas', (done) => {
      chai.request(server)
        .get('/list')
        .end((err, res) => {
          expect(res).has.status(200)
          expect(res.body).is.a('object')
          expect(JSON.stringify(res.body)).has.lengthOf.above(2)
          done()
        })
    })
  })

  describe('/GET nonexistent user data', () => {
    it('it should return a 404 on a nonexistent user', (done) => {
      let undefinedID = 'chaitest' + Math.round(Math.random() * 1000000)

      chai.request(server)
        .get(`/user/${ undefinedID }`)
        .end((err, res) => {
          expect(res).has.status(404)
          done()
      })
    })
  })

  describe('/GET an array of user data', () => {
    it('it should GET an array of all users', (done) => {
      chai.request(server)
        .get('/user/all')
        .end((err, res) => {
          expect(res.body).is.an('array').that.includes(randomID)
          done()
        })
    })
  })
})

describe('Update', () => {
  describe('/PUT an update', () => {
    it('it should UPDATE a field', (done) => {
      chai.request(server)
        .put(`/update/${ randomID }/ideas/${ ideaID }`)
        .send({ description: `new_description_${ randomID}`, title: `new_title_${ randomID }`, id: ideaID })
        .end((err, res) => {
          chai.request(server)
            .get(`/user/${ randomID }/ideas/${ ideaID }`)
            .end((err, res) => {
              expect(res.body.description).to.equal('new_description_' + randomID)
              done()
          })
        })
    })
  })
})

describe('Delete', () => {
  describe('/POST an idea deletion', () => {
    it('it should DELETE an idea', (done) => {
      chai.request(server)
        .post('/delete')
        .send({ name: randomID, id: ideaID })
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          chai.request(server)
            .get(`/user/${ randomID }/ideas/${ ideaID }`)
            .end((err, res) => {
              expect(res).to.have.status(404)
              done()
          })
        })
    })
  })

  describe('/POST a user deletion', () => {
    it('it should DELETE the test user and all data', (done) => {
      chai.request(server)
        .post(`/delete/${ randomID }`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          chai.request(server)
            .get(`/user/${ randomID }/ideas`)
            .end((err, res) => {
              expect(res).to.have.status(404)
              done()
          })
        })
    })
  })
})
