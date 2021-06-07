const request = require("supertest");
//since we expoted multple from the file
const {Products} = require("../../models/product");
const {User} = require("../../models/user");

let server;

describe('/api/products', () => {
    beforeEach(()=> {server = require("../../index")})
    afterEach(async () => {server.close();
        await Products.remove({})
    })

  describe("GET / ", () =>{
      it('should load all products', async () => {
        await Products.collection.insertMany([
            { name: "product1"},
            { name: "product2"}
        ])

          const res = await request(server).get("/api/products");
          expect(res.status).toBe(200)
          expect(res.body.length).toBe(2);
          expect(res.body.some(g => g.name === "product1")).toBeTruthy();


      })
  })

  describe('GET /:id', () => {
      it('should return a product if valid id is passed', async () => {
          const product = new Products({name: "product3"})
          await product.save()
            
          const res = await request(server).get("/api/products/" + product._id)
          expect(res.status).toBe(200)

          expect(res.body).toHaveProperty("name", product.name)
      })

      it('should return 404 since id is invalid', async () => {

        const res = await request(server).get("/api/products/1")
        expect(res.status).toBe(404)
    })
    
  })
  
  describe("POST /",  () =>{
      it('return 401 if user isnt logged in', async () => {
          let res = await request(server).post("/api/products").send({name: "product5"})
          expect(res.status).toBe(401)
          
      })
      it('return 400 if product is less than 5 characters', async () => {
          let token = new User().generateAuthToken()
        let res = await request(server)
            .post("/api/products")
            .set("x-auth-token", token) 
            .send({name: "1234"})
        expect(res.status).toBe(400)
        
    })
  })
})
