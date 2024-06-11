const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');

describe('Posts Controller', () => {
    let postId;
    let token;
	var tokenAdmin;
	var user = { email:'name@test.com',password:'password'} 
	var userAdmin = { email:'admin@admin.com',password:'admin'} 
	var post

    beforeAll(async () => {
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        post = new Post({
            _id: new mongoose.Types.ObjectId(),
            name: 'Sample post name',
            text: 'Sample post text',
            postImage: 'sample_image_path'
        });

		await request(app).post("/auth/").send(userAdmin).then((res)=>{
			if(res.body.token !== undefined)
				tokenAdmin = res.body.token
		})

		await request(app).post("/auth/").send(user).then((res)=>{
			if(res.body.token !== undefined)
				token = res.body.token
		})

        const savedPost = await post.save();
        postId = savedPost._id.toString();

    });

    afterAll(async () => {
		await Post.deleteOne({_id:postId})
		await Post.deleteOne({_id:post._id})
        await mongoose.connection.close();
    });

    it('should fetch all posts', async () => {
        const response = await request(app).get('/posts');
        expect(response.status).toBe(200);
        expect(response.body.posts).toBeDefined();
        expect(response.body.posts.length).toBeGreaterThan(0);
    });

    it('should fetch a single post by id', async () => {
        const response = await request(app).get(`/posts/${postId}`);
        console.log('Get by ID Response:', response.body);
        expect(response.status).toBe(200);
        expect(response.body.post).toBeDefined();
        expect(response.body.post._id).toEqual(postId);
    });

    it('should create a new post', async () => {
        const response = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'New post name',
                text: 'New post text'
            });

        console.log('Create Response:', response.body);

        expect(response.status).toBe(201);
        expect(response.body.createdPost).toBeDefined();
        expect(response.body.createdPost.name).toBe('New post name');
        expect(response.body.createdPost.text).toBe('New post text');
    });

    it('should not update a post if user is not authenticated', async () => {
        const postData = {
            name: 'Updated post name',
            text: 'Updated post text'
        };

        const post = await Post.findOne({ name: 'Sample post name' });
        postId = post._id;

        const response = await request(app)
            .patch(`/posts/${postId}`)
            .send(postData);

        console.log('Update Response:', response.body);

        expect(response.status).toBe(401);

        const updatedPost = await Post.findById(postId);
        expect(updatedPost.text).toEqual('Sample post text');
    });
	
	it('should not update a post if user is authenticated but is not an admin', async () => {
        const postData = {
            name: 'Updated post name',
            text: 'Updated post text'
        };

        const post = await Post.findOne({ name: 'Sample post name' });
        postId = post._id;

        const response = await request(app)
            .patch(`/posts/${postId}`)
			.set('Authorization','Bearer '+token)
            .send(postData);

        console.log('Update Response:', response.body);

        expect(response.status).toBe(403);

        const updatedPost = await Post.findById(postId);
        expect(updatedPost.text).toEqual('Sample post text');
    });

    it('should not delete a post if user is not authenticated', async () => {
        const post = await Post.findOne({ name: 'Sample post name' });
        postId = post._id;

        const response = await request(app)
            .delete(`/posts/${postId}`);

        console.log('Delete Response:', response.body);

        expect(response.status).toBe(401);

        const deletedPost = await Post.findById(postId);
        expect(deletedPost).not.toBeNull();
    });

    it('should not delete a post if user is authenticated but it is not admin', async () => {
        const post = await Post.findOne({ name: 'Sample post name' });
        postId = post._id;

        const response = await request(app)
            .delete(`/posts/${postId}`)
			.set('Athorization','Bearer '+token)

        console.log('Delete Response:', response.body);

        expect(response.status).toBe(401);

        const deletedPost = await Post.findById(postId);
        expect(deletedPost).not.toBeNull();
    });

    it('should delete a post if user is admin', async () => {
        const post = await Post.findOne({ name: 'Sample post name' });
        postId = post._id;

        const response = await request(app)
            .delete(`/posts/${postId}`)
			.set('Authorization','Bearer '+tokenAdmin)


        console.log('Delete Response:', response.body);

        expect(response.status).toBe(204);

        const deletedPost = await Post.findById(postId);
        expect(deletedPost).toBeNull();
    });
	
	it('should return error if admin tries to delete a post that does not exists', async () => {
        
        const response = await request(app)
            .delete(`/posts/666686bdfcb79f5e06120bfe3`)
			.set('Authorization','Bearer '+tokenAdmin)

        console.log('Update Response:', response.body);

        expect(response.status).toBe(500);
    });


});
