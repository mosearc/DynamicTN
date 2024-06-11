const request = require('supertest')
const app = require('../../app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
require('dotenv').config()

describe('/comments', ()=>{

	var testPostId 
	var token;
	var tokenAdmin;
	var user = { email:'name@test.com',password:'password'} 
	var userAdmin = { email:'admin@admin.com',password:'admin'} 
	var commentId;
	var exec_tests = false 

	beforeAll(async ()=>{

		await request(app).get("/posts/").then((res)=>{
			if(res.statusCode !== 404){
				exec_tests = true 
				testPostId = res.body.posts[0]._id
			}
			
		})
		await request(app).post("/auth/").send(user).then((res)=>{
			if(res.body.token !== undefined)
				token = res.body.token
		})

		await request(app).post("/auth/").send(userAdmin).then((res)=>{
			if(res.body.token !== undefined)
				tokenAdmin = res.body.token
		})
	})

	afterAll(()=>{mongoose.connection.close(true)})
	
	test('POST /comments/ should create a new comment under a post',async ()=>{
		if(exec_tests){
			const createCommentRes = await request(app).post('/comments/').send({
				text:'commento per il test',
				postId:testPostId
			}).set('authorization',token)

			expect(createCommentRes.statusCode).toBe(201)
			expect(createCommentRes.body.createdComment).toBeDefined()
			commentId = createCommentRes.body.createdComment._id 
		}
	})

	test('POST /comments/ should return an error if post does not exists',async ()=>{
		const createCommentRes = await request(app).post('/comments/').send({
			text:'commento per il test',
			postId:'663cd89ffd76d9ab71c41f1d'
		}).set('authorization',token)

		expect(createCommentRes.statusCode).toBe(404)
		expect(createCommentRes.body.createdComment).toBeUndefined()
		expect(createCommentRes.body.message).toBeDefined()
	})

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
		if(exec_tests){
			const getComment = await request(app).get('/comments/'+commentId)
			expect(getComment.statusCode).toBe(200)
			expect(getComment.body.comment._id).toEqual(commentId)
		}
	})

	test('GET /comments/fromPost/:postId should return all comments below a post if post ID is valid',async ()=>{
		if(exec_tests){
			const postComments = await request(app).get('/comments/fromPost/'+testPostId)
			expect(postComments.statusCode).toBe(200)
			expect(postComments.body.comments).toBeDefined()
		}
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

	test('DELETE /comments/:commentId should return 403 error if user is not an admin',async ()=>{
		if(exec_tests){
			const serverErrResponse = await request(app)
				.delete('/comments/'+commentId)
				.set('Authorization','Bearer '+token)
			expect(serverErrResponse.statusCode).toBe(403)
			expect(serverErrResponse.body.message).toBeDefined()	
		}
	})

	test('DELETE /comments/:commentId should delete the comment if the user is admin',async ()=>{
		if(exec_tests){
			const serverErrResponse = await request(app)
				.delete('/comments/'+commentId)
				.set('Authorization','Bearer '+tokenAdmin)
			expect(serverErrResponse.statusCode).toBe(204)
			expect(serverErrResponse.body.error).toBeUndefined()
		}
	})


})
