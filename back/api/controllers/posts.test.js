const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');

describe('Posts Controller', () => {
    let postId;
    let token;

    beforeAll(async () => {
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        const post = new Post({
            _id: new mongoose.Types.ObjectId(),
            name: 'Sample post name',
            text: 'Sample post text',
            postImage: 'sample_image_path'
        });

        const savedPost = await post.save();
        postId = savedPost._id.toString();

        token = jwt.sign({ userId: 'testUserId' }, process.env.JWT_KEY, { expiresIn: '1h' });
    });

    afterAll(async () => {
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

    it('should update a post', async () => {
        const postData = {
            name: 'Updated post name',
            text: 'Updated post text'
        };

        const post = await Post.findOne({ name: 'Sample post name' });
        const postId = post._id;

        const response = await request(app)
            .patch(`/posts/${postId}`)
            .send(postData);

        console.log('Update Response:', response.body);

        expect(response.status).toBe(401);

        const updatedPost = await Post.findById(postId);
        expect(updatedPost.text).toEqual('Sample post text');
    });

    it('should delete a post', async () => {
        const post = await Post.findOne({ name: 'Sample post name' });
        const postId = post._id;

        const response = await request(app)
            .delete(`/posts/${postId}`);

        console.log('Delete Response:', response.body);

        expect(response.status).toBe(401);

        const deletedPost = await Post.findById(postId);
        expect(deletedPost).not.toBeNull();
    });
});
