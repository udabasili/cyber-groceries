const request = require("supertest");
//since we expoted multple from the file
const {
    Carts
} = require("../../models/cart");
const {
    User
} = require("../../models/user");

let server;

describe('/api/carts', () => {
    beforeEach(() => {
        server = require("../../index")
    })
    afterEach(async () => {
        server.close();
        await Carts.remove({})
    })

    describe("GET / ", () => {
        it('should load all carts', async () => {
            await Carts.collection.insertMany([{
                    name: "cart1"
                },
                {
                    name: "cart2"
                }
            ])

            const res = await request(server).get("/api/carts");
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === "cart1")).toBeTruthy();


        })
    })

    describe('GET /:id', () => {
        it('should return a cart if valid id is passed', async () => {
            const cart = new Carts({
                name: "cart3"
            })
            await cart.save()

            const res = await request(server).get("/api/carts/" + cart._id)
            expect(res.status).toBe(200)

            expect(res.body).toHaveProperty("name", cart.name)
        })

        it('should return 404 since id is invalid', async () => {

            const res = await request(server).get("/api/carts/1")
            expect(res.status).toBe(404)
        })

    })

    describe("POST /", () => {
        it('return 401 if user isnt logged in', async () => {
            let res = await request(server).post("/api/carts").send({
                name: "cart5"
            })
            expect(res.status).toBe(401)

        })
        it('return 400 if cart is less than 5 characters', async () => {
            let token = new User().generateAuthToken()
            let res = await request(server)
                .post("/api/carts")
                .set("x-auth-token", token)
                .send({
                    name: "1234"
                })
            expect(res.status).toBe(400)

        })
    })
})
