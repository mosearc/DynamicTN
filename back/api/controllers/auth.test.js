const request = require('supertest')
const app = require('../../app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
require('dotenv').config()

describe('/auth', ()=>{
	
	afterAll(()=>{mongoose.connection.close(true)})

	test('POST /auth/ should return a token if credentials are correct',async ()=>{
		var user = { email:'test@gmail.com',password:'test'} 

		const loginResponse = await request(app).post('/auth/').send(user)
		expect(loginResponse.statusCode).toBe(200)
		expect(loginResponse.body.token).toBeDefined()
	})

	test('POST /auth/ should return an error if password is incorrect',async ()=>{
		let wrongUser = { email:'test@gmail.com',password:'wrong'} 

		const loginResponse = await request(app).post('/auth/').send(wrongUser)
		expect(loginResponse.statusCode).toBe(401)
		expect(loginResponse.body.token).toBeUndefined()
	})

	test('POST /auth/ should return an error if user is not defined',async ()=>{
		let undefinedUser = { email:'testnotdefined@gmail.com',password:'wrong'} 

		const loginResponse = await request(app).post('/auth/').send(undefinedUser)
		expect(loginResponse.statusCode).toBe(401)
		expect(loginResponse.body.token).toBeUndefined()
	})

	test('POST /auth/ should return an error if email field is empty',async ()=>{
		let userWithNoEmail = { email:'',password:'whatever'} 

		const loginResponse = await request(app).post('/auth/').send(userWithNoEmail)
		expect(loginResponse.statusCode).toBe(401)
		expect(loginResponse.body.token).toBeUndefined()
	})


	test('POST /auth/ should return an error if password field is empty',async ()=>{
		let userWithNoPasswd= { email:'test@gmail.com',password:''} 

		const loginResponse = await request(app).post('/auth/').send(userWithNoPasswd)
		expect(loginResponse.statusCode).toBe(401)
		expect(loginResponse.body.token).toBeUndefined()
	})
})

