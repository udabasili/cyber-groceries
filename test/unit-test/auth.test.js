const { UserService } = require('../services');
const auth = require("../../../middleware/auth");

describe('auth middleware', () => {
  it('should populate req.user with the right values after decoding jwt', async () => {
      const user = { _id: 
            mongoose.Types.ObjectId().toHexString(), 
            isAdmin: true
        }
        const token = new UserService(user).generateAuthToken()
        const req = {
            header: jest.fn().mockReturnValue(token)
        }
      const res = {}
      const next = jest.fn( )
      auth(req, res, next)
      expect(req.user).toMatchObject(user)
  })
})