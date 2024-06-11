const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Vote = require('../models/vote');
const Poll = require('../models/poll');
const Post = require('../models/post');

const mockUserId = new mongoose.Types.ObjectId();
const mockPollId = new mongoose.Types.ObjectId();
const mockPostId = new mongoose.Types.ObjectId();
const mockToken = jwt.sign({ userId: mockUserId }, process.env.JWT_KEY, { expiresIn: '1h' });


beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
});

afterAll(async () => {
	await Poll.deleteOne({_id:mockPollId});
    await Post.deleteOne({_id:mockPostId});

    await mongoose.connection.close();
});

/*afterEach(async () => {
	await Poll.deleteMany({});
    await Vote.deleteMany({});
    await Post.deleteMany({});
});*/

describe('Votes Controller', () => {

    describe('POST /polls/sendVote/:pollId', () => {
        it('should save a vote for a poll option', async () => {
            const poll = new Poll({
                _id: mockPollId,
                question: 'Sample poll',
                answers: [
                    { _id: new mongoose.Types.ObjectId(), answer: 'Option 1', votes: 0 },
                    { _id: new mongoose.Types.ObjectId(), answer: 'Option 2', votes: 0 }
                ]
            });
            await poll.save();
		

            const response = await request(app)
                .post(`/votes/polls/sendVote/${mockPollId}`)
                .set('Authorization', `Bearer ${mockToken}`)
                .send({ answer: 'Option 1' });

            expect(response.status).toBe(200);
            expect(response.body.poll.answers[0].votes).toBe(1);
        });

        it('should not allow duplicate votes from the same user', async () => {
            const vote = new Vote({ _id: new mongoose.Types.ObjectId(), user: mockUserId, poll: mockPollId });
            await vote.save();

            const response = await request(app)
                .post(`/votes/polls/sendVote/${mockPollId}`)
                .set('Authorization', `Bearer ${mockToken}`)
                .send({ answer: 'Option 1' });

            expect(response.status).toBe(409);
			await Vote.deleteOne({_id:vote._id})
        });
    });

    describe('GET /votes/posts/:postId', () => {
        it('should return the number of votes for a post', async () => {
            const vote = new Vote({ _id: new mongoose.Types.ObjectId(), post: mockPostId, user: mockUserId });
            await vote.save();

            const response = await request(app)
                .get(`/votes/posts/${mockPostId}`)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.status).toBe(200);
            expect(response.body.nrLikes).toBe(1);
			await Vote.deleteOne({_id:vote._id})
        });

        it('should return 404 if no votes found for a post', async () => {
            const response = await request(app)
                .get(`/votes/posts/${mockPostId}`)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.status).toBe(404);
        });
    });

    describe('POST /posts/sendVote/:postId', () => {
        it('should save an upvote for a post', async () => {
            const post = new Post({ _id: mockPostId, text: 'Sample post text', name: 'Sample name' });
            await post.save();

            const response = await request(app)
                .post(`/votes/posts/sendVote/${mockPostId}`)
                .set('Authorization', `Bearer ${mockToken}`)
                .send();

            expect(response.status).toBe(200);
        });

        it('should not allow duplicate upvotes from the same user', async () => {
            const vote = new Vote({ _id: new mongoose.Types.ObjectId(), post: mockPostId, user: mockUserId });
            await vote.save();

            const response = await request(app)
                .post(`/votes/posts/sendVote/${mockPostId}`)
                .set('Authorization', `Bearer ${mockToken}`)
                .send();

            expect(response.status).toBe(409);
			Vote.deleteOne({_id:vote._id})
        });
    });

});
