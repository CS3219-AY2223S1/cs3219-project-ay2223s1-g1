import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.use(chaiHttp);
chai.should();


describe('user-controller tes', () => {
    describe("signIn", () => {
        it('createUser', (done) => {
            chai.request(app)
            .post('/api/user/signin')
            .send({username:'user1', password:'password1'})
            .end((err, res) => {
                done();
            })
        })
    })
})


