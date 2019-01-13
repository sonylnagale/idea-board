const chai = require('chai')
const chaiHttp = require('chai-http')
// const server = require('../app')
const should = chai.should()


const server = 'http://localhost:3000'

chai.use(chaiHttp)

let randomID = 'chaitest' + Math.round(Math.random() * 1000000)
let ideaID

describe('Create', () => {
  describe('/POST create an idea', () => {
    it('it should successfully create a user and idea', (done) => {
      chai.request(server)
        .post('/create/' + randomID)
        .send({ description: 'test_description_' + randomID, title: 'test_title_' + randomID })
        .end((err, res) => {
          chai.request(server)
            .get(`/list/${ randomID }`)
            .end((err, res) => {
              res.body[0].description.should.equal('test_description_' + randomID)
              ideaID = res.body[0].id
              done()
          })
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
          res.should.have.status(200)
          res.body.should.be.a('object')
          JSON.stringify(res.body).should.have.lengthOf.above(2)
          done()
        })
    })
  })

  describe('/GET nonexistent user data', () => {
    it('it should return a 404 on a nonexistent user', (done) => {
      let undefinedID = 'chaitest' + Math.round(Math.random() * 1000000)

      chai.request(server)
        .get(`/list/${ undefinedID }`)
        .end((err, res) => {
          res.should.have.status(404)
          done()
      })
    })
  })

  describe('/GET a specific user\'s data', () => {
    let usernames
    it('it should GET one user\'s ideas', (done) => {
      chai.request(server)
        .get('/test/listUsers')
        .end((err, res) => {
          usernames = res.body
          chai.request(server)
            .get(`/list/${ usernames[0] }`)
            .end((err, res) => {
              done()
          })
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
            .get(`/list/${ randomID }/ideas/${ ideaID }`)
            .end((err, res) => {
              res.body.description.should.equal('new_description_' + randomID)
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
          chai.request(server)
            .get(`/list/${ randomID }/ideas/${ ideaID }`)
            .end((err, res) => {
              res.should.have.status(404)
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
          chai.request(server)
            .get(`/list/${ randomID }/ideas`)
            .end((err, res) => {
              res.should.have.status(404)
              done()
          })
        })
    })
  })
})
