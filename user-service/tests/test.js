import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import UserModel from '../model/user-model.js';
import BlacklistModelSchema from '../model/blacklist-model.js';

chai.use(chaiHttp);
chai.should();


describe('user-controller tes', () => {
    before((done) => {
        UserModel.deleteMany({}, (err) => {
            done();
        });
    });
    before((done) => {
        BlacklistModelSchema.deleteMany({}, (err) => {
            done();
        });
    });

    describe("sign up success", () => {
        it('create user', (done) => {
            chai.request(app)
            .post('/api/user/signup')
            .send({username:'user1', password:'password1'})
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
        });
    });
    describe("sign up fail missing", () => {
        it('user info missing', (done) => {
            chai.request(app)
            .post('/api/user/signup')
            .send()
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
        });
    });
    describe("sign up fail duplicate", () => {
        UserModel.create({ username: 'user1', password: 'test' })
        it('duplicate user', (done) => {
            chai.request(app)
            .post('/api/user/signup')
            .send({username:'user1', password:'password1'})
            .end((err, res) => {
                res.should.have.status(409);
                done();
            })
        });
    });

    describe("sign in fail incorrect", () => {
        it('sign in wrong password', (done) => {
            chai.request(app)
            .post('/api/user/signin')
            .send({username:'user1', password:'password2'})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
        });
    });
    describe("sign in fail missing", () => {
        it('user info missing', (done) => {
            chai.request(app)
            .post('/api/user/signin')
            .send()
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
        });
    });
    describe("sign in success", () => {
        UserModel.create({ username: 'user1', password: 'test' })
        it('sign in existing user', (done) => {
            chai.request(app)
            .post('/api/user/signin')
            .send({username:'user1', password:'password1'})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
        });
    });
});
