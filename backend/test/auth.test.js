import request from 'supertest'
import chai from 'chai'

import app from '../server.js'
import { dropDB } from '../config/db.js'

// Assertion style
chai.should()

before(dropDB)

describe('Testing auth controller', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should create a user to the DB', (done) => {
      const user = {
        name: 'Test User',
        email: 'testuser@gmail.com',
        password: '123456'
      }

      request(app)
        .post('/api/v1/auth/register')
        .send(user)
        .end((err, res) => {
          if (err) return done(err)

          res.status.should.be.equal(201)
          res.should.be.an('object')
          res.body.should.have.property('success').eq(true)
          res.body.should.have.nested.nested.property('data.user.id')
          res.body.should.have.nested.property('data.user.name').eq(user.name)
          res.body.should.have.nested.property('data.user.email').eq(user.email)
          res.body.should.have.nested.property('data.user.isAdmin').eq(false)
          res.body.should.have.nested.property('data.token')
          res.body.data.token.should.be.a('string')
          done()
        })
    })

    it('should not create a user with an email already exists in the database', (done) => {
      const user = {
        name: 'Test User',
        email: 'testuser@gmail.com',
        password: '123456'
      }

      request(app)
        .post('/api/v1/auth/register')
        .send(user)
        .end((err, res) => {
          if (err) return done(err)

          res.status.should.be.equal(409)
          res.should.be.an('object')
          res.body.should.have.property('success').eq(false)
          res.body.should.have.property('error').eq('E-Mail already exists!')
          done()
        })
    })

    it('should not create a user without name', (done) => {
      const user = {
        name: '',
        email: 'testuser2@gmail.com',
        password: '123456'
      }

      request(app)
        .post('/api/v1/auth/register')
        .send(user)
        .end((err, res) => {
          if (err) return done(err)

          res.status.should.be.equal(400)
          res.should.be.an('object')
          res.body.should.have.property('success').eq(false)
          res.body.should.have.property('error').eq('Please add a name')
          done()
        })
    })

    it('should not create a user without an email', (done) => {
      const user = {
        name: 'Test User',
        email: '',
        password: '123456'
      }

      request(app)
        .post('/api/v1/auth/register')
        .send(user)
        .end((err, res) => {
          if (err) return done(err)

          res.status.should.be.equal(400)
          res.should.be.an('object')
          res.body.should.have.property('success').eq(false)
          res.body.should.have.property('error').eq('Please add an email')
          done()
        })
    })

    it('should not create a user with an invalid email', (done) => {
      const user = {
        name: 'Test User',
        email: 'test.co',
        password: '123456'
      }

      request(app)
        .post('/api/v1/auth/register')
        .send(user)
        .end((err, res) => {
          if (err) return done(err)

          res.status.should.be.equal(400)
          res.should.be.an('object')
          res.body.should.have.property('success').eq(false)
          res.body.should.have.property('error').eq('Please add a valid email')
          done()
        })
    })

    it('should not create a user without a password', (done) => {
      const user = {
        name: 'Test User',
        email: 'testuser2@gmail.com',
        password: ''
      }

      request(app)
        .post('/api/v1/auth/register')
        .send(user)
        .end((err, res) => {
          if (err) return done(err)

          res.status.should.be.equal(400)
          res.should.be.an('object')
          res.body.should.have.property('success').eq(false)
          res.body.should.have.property('error').eq('Please add a password')
          done()
        })
    })

    it('should not create a user with a password less than 6 chars', (done) => {
      const user = {
        name: 'Test User',
        email: 'testuser2@gmail.com',
        password: '12345'
      }

      request(app)
        .post('/api/v1/auth/register')
        .send(user)
        .end((err, res) => {
          if (err) return done(err)

          res.status.should.be.equal(400)
          res.should.be.an('object')
          res.body.should.have.property('success').eq(false)
          res.body.should.have
            .property('error')
            .eq('The password must be at least 6 characters')
          done()
        })
    })
  })

  describe('GET /api/v1/auth/login', () => {
    it('should login with the correct email and password', (done) => {
      const user = {
        email: 'testuser@gmail.com',
        password: '123456'
      }

      request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          if (err) return done(err)

          res.status.should.be.equal(200)
          res.should.be.an('object')
          res.body.should.have.property('success').eq(true)
          res.body.should.have.nested.nested.property('data.user.id')
          res.body.should.have.nested.property('data.user.email').eq(user.email)
          res.body.should.have.nested.property('data.token')
          res.body.data.token.should.be.a('string')
          done()
        })
    })

    it('should not login without an email', () => {
      const user = {
        email: '',
        password: '123456'
      }

      request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          if (err) return done(err)

          res.status.should.be.equal(400)
          res.should.be.an('object')
          res.body.should.have.property('success').eq(false)
          res.body.should.have
            .property('error')
            .eq('please provide an email and password.')
        })
    })

    it('should not login without the a password', () => {
      const user = {
        email: 'testuser2@gmail.com',
        password: ''
      }

      request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          if (err) return done(err)

          res.status.should.be.equal(400)
          res.should.be.an('object')
          res.body.should.have.property('success').eq(false)
          res.body.should.have
            .property('error')
            .eq('please provide an email and password.')
        })
    })

    it('should not login without the correct email', (done) => {
      const user = {
        email: 'testuser2@gmail.com',
        password: '123456'
      }

      request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          if (err) return done(err)

          res.status.should.be.equal(401)
          res.should.be.an('object')
          res.body.should.have.property('success').eq(false)
          res.body.should.have.property('error').eq('Invalid credentials.')
          done()
        })
    })

    it('should not login without the correct password', (done) => {
      const user = {
        email: 'testuser@gmail.com',
        password: '12345'
      }

      request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          if (err) return done(err)

          res.status.should.be.equal(401)
          res.should.be.an('object')
          res.body.should.have.property('success').eq(false)
          res.body.should.have.property('error').eq('Invalid credentials.')
          done()
        })
    })
  })
})
