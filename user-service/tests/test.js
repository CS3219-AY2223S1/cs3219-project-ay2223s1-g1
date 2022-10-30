import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.use(chaiHttp);
chai.should();


describe('user-controller tes', () => {
    describe("sign up", () => {
        it('create user', (done) => {
            chai.request(app)
            .post('/api/user/signup')
            .send({username:'user1', password:'password1'})
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
        })
        it('duplicate user', (done) => {
            chai.request(app)
            .post('/api/user/signup')
            .send({username:'user1', password:'password1'})
            .end((err, res) => {
                res.should.have.status(409);
                done();
            })
        })
        it('user info missing', (done) => {
            chai.request(app)
            .post('/api/user/signup')
            .send()
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
        })
    })

    describe("sign in", () => {
        it('sign in existing user', (done) => {
            chai.request(app)
            .post('/api/user/signin')
            .send({username:'user1', password:'password1'})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
        })
        it('sign in wrong password', (done) => {
            chai.request(app)
            .post('/api/user/signin')
            .send({username:'user1', password:'password2'})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
        })
        it('user info missing', (done) => {
            chai.request(app)
            .post('/api/user/signin')
            .send()
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
        })
    })
})


