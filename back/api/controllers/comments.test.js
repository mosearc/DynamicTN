const request = require('supertest')
const app = require('../../app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
require('dotenv').config()

describe('/comments', ()=>{
	const postId = ''  
	var token = jwt.sign({email:'test@gmail.com',userId: '665c38a18e632d2f57eaa0ab'},process.env.JWT_KEY,{expiresIn:3600});

	var testPostId = '665c38ca8e632d2f57eaa0b0' 
	
	afterAll(()=>{mongoose.connection.close(true)})

	test('GET /comments/ should return all comments',async ()=>{
		const serverResponse = 	await request(app).get('/comments/')
		expect(serverResponse.statusCode).toBe(200)
		expect(serverResponse.body.orders).toBeDefined()
	})

	test('GET /comments/:commentId should return a 404 error if comment ID is not valid',async ()=>{

		const notFoundResponse = await request(app).get('/comments/663cd99ffd76d9ab71c41f1d')
		expect(notFoundResponse.statusCode).toBe(404)
		expect(notFoundResponse.body.orders).toBeUndefined()
		expect(notFoundResponse.body.message).toBeDefined()
	})

	test('GET /comments/:commentId should return a 200 response status if comment is present',async ()=>{
		var commentId = '665c3e781825b3d37a2e8f22'
		const getComment = await request(app).get('/comments/'+commentId)
		expect(getComment.statusCode).toBe(200)
		expect(getComment.body.comment._id).toEqual(commentId)
	})

	test('GET /comments/fromPost/:postId should return all comments below a post if post ID is valid',async ()=>{
		const postComments = await request(app).get('/comments/fromPost/'+testPostId)
		expect(postComments.statusCode).toBe(200)
		expect(postComments.body.comments).toBeDefined()
	})


	test('GET /comments/fromPost/:postId should return 404 error if post is not present in the database',async ()=>{
		const notFoundResponse = await request(app).get('/comments/fromPost/abbabbabbbabbbabbbabbbab')
		expect(notFoundResponse.statusCode).toBe(404)
		expect(notFoundResponse.body.orders).toBeUndefined()
		expect(notFoundResponse.body.message).toBeDefined()	
	})

	test('GET /comments/fromPost/:postId should return 500 error if post ID is not valid',async ()=>{
		const serverErrResponse = await request(app).get('/comments/fromPost/dhdhdhdhdhdhdhdhdhdhdhdh')
		expect(serverErrResponse.statusCode).toBe(500)
		expect(serverErrResponse.body.orders).toBeUndefined()
		expect(serverErrResponse.body.error).toBeDefined()	
	})

	/*test('POST /comments/ should create a new comment under a post',async ()=>{
		const createCommentRes = await request(app).post('/comments/').send({
			text:'commento per il test',
			postId:testPostId
		}).set('authorization',token)

		expect(createCommentRes.statusCode).toBe(201)
		expect(createCommentRes.body.createdComment).toBeDefined()
	})*/

	test('POST /comments/ should return an error if post does not exists',async ()=>{
		const createCommentRes = await request(app).post('/comments/').send({
			text:'commento per il test',
			postId:'663cd89ffd76d9ab71c41f1d'
		}).set('authorization',token)

		expect(createCommentRes.statusCode).toBe(404)
		expect(createCommentRes.body.createdComment).toBeUndefined()
		expect(createCommentRes.body.message).toBeDefined()
	})
})
