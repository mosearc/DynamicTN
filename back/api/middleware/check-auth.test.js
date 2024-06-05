const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const checkAuth = require('./check-auth')
require('dotenv').config()

describe('middleware',()=>{
	

	test('middleware should return 401 error if token is invalid',async()=>{

		let token = jwt.sign({email:'invalidEmail',userId:'test'},process.env.JWT_KEY,{expiresIn:'1h'})

		let req = {
			headers:{
				'authorization': 'Bearer '+token
			}
		}

		let mockJsonRes = {
			json: jest.fn(),
			statusCode:0
		}

		let res = {
			status:jest.fn((code)=>{
				mockJsonRes.statusCode = code
				return mockJsonRes
			})
		}

		let next = jest.fn()

		await checkAuth(req,res,next)

		expect(res.status).toBeCalledWith(401)
		expect(req.userData).toBeUndefined()
		expect(mockJsonRes.json).toBeCalledWith({
			'message':'Authentication failed'
		})
	}) 

	test('middleware should call next function if token is valid',async()=>{

		let token = jwt.sign({email:'test@gmail.com',userId:'665c38a18e632d2f57eaa0ab'},process.env.JWT_KEY,{expiresIn:'1h'})

		let req = {
			headers:{
				'authorization': 'Bearer '+token
			}
		}

		let res = {
			json:jest.fn(),
			status:jest.fn()
		}

		let next = jest.fn()

		await checkAuth(req,res,next)

		expect(req.userData).toBeDefined()
		expect(next).toBeCalled()
	}) 

	test('middleware return 401 error if request header is not defined',async()=>{

		let token = jwt.sign({email:'test@gmail.com',userId:'665c38a18e632d2f57eaa0ab'},process.env.JWT_KEY,{expiresIn:'1h'})

		let req = {}

		
		let mockJsonRes = {
			json: jest.fn(),
			statusCode:0
		}

		let res = {
			status:jest.fn((code)=>{
				mockJsonRes.statusCode = code
				return mockJsonRes
			})
		}

		let next = jest.fn()

		await checkAuth(req,res,next)
		
		expect(res.status).toBeCalledWith(401)
		expect(req.userData).toBeUndefined()
		expect(mockJsonRes.json).toBeCalledWith({
            'message': 'Authentication failed',
		})
	}) 
})
