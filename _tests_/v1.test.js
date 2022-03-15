'use strict';

const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);
const {db} = require('../src/models/index')
let id;
beforeAll( async () =>{
    await db.sync();
})
afterAll( async () =>{
    await db.drop();
})

describe('testing img model for v1 route',()=>{
 
    it ('post new img', async () => {
        const response = await request.post('/api/v1/img').send({
            imgurl: "test",
            imginfo : "test"
        });
        expect(response.status).toEqual(201);
        id = response.body.id
    });

    it('testing get all img',async()=>{
        const response = await request.get('/api/v1/img')
        expect(response.status).toEqual(200)
    })
        
    it ('testing img get by id method',async()=>{
       const response = await request.get(`/api/v1/img/${id}`)
       expect(response.status).toEqual(200);
   })
  

   it ('update new img', async () => {
    const response = await request.put(`/api/v1/img/${id}`).send({
        sportName: "test",
        sportPopularity : "test"
    })
    expect(response.status).toEqual(201);
});

it ('deleting img by id',async()=>{
    const response = await request.delete(`/api/v1/img/${id}`)
    expect(response.status).toEqual(200);
})

})