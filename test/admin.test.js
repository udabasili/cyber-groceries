const request = require('supertest');
const { UserService } = require('../services');
let server;

describe('Admin middleware', () => {
    beforeEach(async () => {
        server = require('../loaders/app')
    })
 

    test('should return 200  if user is admin ', async() => {
        let user = {
            email: 'user@administrator.ca',
            password: '123456789'
        }
        const User = new UserService(user)
        const {
            generateUserToken,
            newUser
        } = await User.signIn();
        const exec = await request(server)
            .get(`/api/admin/${newUser._id}/all-users`)
            .set('Cookie', [`token=${generateUserToken}`])

        expect(exec.status).toBe(200)
    })

    test('should return 403  since user is not admin ', async () => {
        let user = {
            email: 'user001@yahoo.com',
            password: '123456789'
        }
        const User = new UserService(user)
        const {
            generateUserToken,
            newUser
        } = await User.signIn();
        const exec = await request(server)
            .get(`/api/admin/${newUser._id}/all-users`)
            .set('Cookie', [`token=${generateUserToken}`])
        expect(exec.status).toBe(403)
    })
    
});
