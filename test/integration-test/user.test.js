const { UserService } = require('../services');

describe('Auth middleware', () => {

    beforeEach(() =>{
        server = require('../loaders/app')
    })

    test("should return no user record corresponding message if user doesn't exist", async () => {
        try {
            let user = {
                 email: 'test@yahoo.ca',
                 password: '12345678'
            }
            const User = new UserService(user)
            await User.signIn();
        } catch (error) {
            expect(error.message).toMatch(/no user record corresponding/)

        }
            
    })

    test('should return password is invalid message if user is password is invalid', async () => {
        try {
            let user = {
                email: 'user@administrator.ca',
                password: '1234567'
            }
            const User = new UserService(user)
            await User.signIn();
        } catch (error) {
            expect(error.message).toMatch(/The password is invalid/)

        }

    })

    test('should return user object and token if user is authenticated', async () => {
            let user = {
                email: 'user@administrator.ca',
                password: '123456789'
            }
            const User = new UserService(user)
            const response = await User.signIn();
            const expectedArray= [
                'generateUserToken',
                'newUser'
            ]
            expect(Object.keys(response).length).toBe(2)
            expect(Object.keys(response)).toEqual(expect.arrayContaining(expectedArray))

    })
    
});
