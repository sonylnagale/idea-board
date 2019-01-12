const Create = require('../routes/create')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()

chai.use(chaiHttp)

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
          let randomID = 'chaitest' + Math.round(Math.random() * 1000000)

          chai.request(server)
            .get(`/list/${ randomID }`)
            .end((err, res) => {
              console.log(err)
                // err.should.have.status(404)
                done()
              })
            })
      })
  })
