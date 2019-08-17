const request = require("supertest")
const chai = require("chai")

const app = require('../app')
chai.should()

describe("Pokemon API", () => {
    describe("GET /", () => {
        it('should return 200 OK with "Hello world"', (done) => {
            request(app).get('/')
                .expect(200)
                .end((err, res) => {
                    res.body.should.deep.equal({ message: 'Hello world' })
                    done()
                })
        })
    })

    describe("GET /pokemon/:id", () => {
        it('should return 200 OK whit pokemon', (done) => {
            request(app).get('/pokemon/1')
                .expect(200)
                .end((err, res) => {
                    res.body.should.to.be.a('object')
                    res.body.should.have.property('id')
                    res.body.should.have.property('name')
                    res.body.should.have.property('type')
                    done()
                })
        })

        it('should return 400 Bad Request', (done) => {
            request(app).get('/pokemon/100')
                .expect(400)
                .end((err, res) => {
                    res.body.should.deep.equal({ error: "Cannot find pokemon: Pokemon is not found" })
                    done()
                })
        })
    })

    describe('POST /pokemon', () => {
        it('should return 201 Created and have new pokemon', (done) => {
            request(app).post('/pokemon')
                .send({ name: "Unknown", type: "Unknown" })
                .set('Accept', 'application/json')
                .expect(201, done)
        })

        it('should return 400 Bad requested when missed required field', (done) => {
            request(app).post('/pokemon')
                .expect(400)
                .end((err, res) => {
                    res.body.should.deep.equal({ error: "Insufficient parameters: name and type are required parameter" })
                    done()
                })
        })
    })

    describe('PUT /pokemon/:id', () => {
        it('should return 200 OK and the pokemon has tpye2', (done) => {
            request(app).put('/pokemon/1')
                .send({ type2: "Unknown" })
                .set('Accept', 'application/json')
                .expect(200, done)
        })

        it('should return 400 Bad requested when missed required field', (done) => {
            request(app).put('/pokemon/1')
                .expect(400)
                .end((err, res) => {
                    res.body.should.deep.equal({ error: "Insufficient parameters: type2 are required parameter" })
                    done()
                })
        })
    })
})

describe('Integration Test', () => {
    it('GET /pokemon should return list of pokemon', (done) => {
        request('http://localhost:3000').get('/pokemon')
            .expect(200)
            .end((err, res) => {
                res.body.should.be.a('array')
                done()
            })
    })
})

