'use strict';
const {app} = require('../src/server');
const supertest = require('supertest');
const request = supertest(app);
const base64 = require('base-64');

describe('API SERVER TEST', ()=> {

    // add scenarios & test cases 
    it('handles 404 on a bad route', async () => {
       
        const response = await request.get('/wrongPath'); // async
        expect(response.status).toEqual(404);
    });


    it('ERROR 404', async () => {
    
        const response = await request.post('/'); // async
        expect(response.status).toEqual(404);
    });



    it('success  /', async () => {
        const response = await request.get('/'); // async
        expect(response.status).toEqual(200);
    });
})

// ==========================================


describe('DATA BASE TEST', ()=> {
    let obj={
        username:'sultan',
        password:'test@1234'
    }

    it('creat account  ', async () => {
       
        const response = await request.post('/signup').send(obj); // async
        expect(response.status).toEqual(201);
      
    
    });

    it('sign in   ', async () => {
     
       
        const response = await request.post('/signin').set('Authorization', `Basic YWhtYWRuOnRlc3QxMjM=`); // async
        expect(response.status).toEqual(200);
    expect(response.body.username).toBe('sultan');
      
    
    });


    
})