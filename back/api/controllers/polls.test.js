const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Poll = require('../models/poll');

describe('Polls Controller', () => {
    let deletePolls = [];
	let pollId;
	var user = { email:'test@gmail.com',password:'test'} 
	var token; 

    beforeAll(async () => {
		await request(app).post("/auth/").send(user).then((res)=>{
			if(res.body.token !== undefined)
				token = res.body.token
		})


        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        const poll = new Poll({
            _id: new mongoose.Types.ObjectId(),
            question: 'Sample poll question',
            answers: [
                { answer: 'Option A', votes: 0 },
                { answer: 'Option B', votes: 0 },
                { answer: 'Option C', votes: 0 }
            ]
        });

        const savedPoll = await poll.save();
        deletePolls.push(savedPoll._id);
		pollId = deletePolls[deletePolls.length - 1].toString() 
    });

    afterAll(async () => {
        await Poll.deleteMany({_id: {$in:deletePolls}});
        await mongoose.connection.close();
    });

    it('should fetch all polls', async () => {
        const response = await request(app).get('/polls');
        expect(response.status).toBe(200);
        expect(response.body.polls).toBeDefined();
    });

    it('should fetch a single poll by id', async () => {
        const response = await request(app).get(`/polls/${pollId}`);
        expect(response.status).toBe(200);
        expect(response.body.poll).toBeDefined();
        expect(response.body.poll._id).toBe(pollId);
    });

    it('should create a new poll', async () => {
        const newPoll = {
            question: 'Red pill or blue pill?',
            answers: [
                { answer: 'Red' },
                { answer: 'Blue' },
                { answer: 'Green' }
            ]
        };

        const response = await request(app)
            .post('/polls')
            .send(newPoll).set('authorization',token);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Poll Created Successfully');
        expect(response.body.createdPoll).toBeDefined();

        deletePolls.push(response.body.createdPoll._id);
		pollId = deletePolls[deletePolls.length - 1] 
    });

    it('should update a poll', async () => {
        const updatedPoll = [
            { propName: 'question', value: 'What is your favorite color?' },
            { propName: 'answers', value: [{ answer: 'Blue' }, { answer: 'Red' }] }
        ];

        const response = await request(app)
			.patch(`/polls/${pollId}`)
			.send(updatedPoll)
			.set('authorization',token);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Poll Updated Successfully');
    });

    it('should delete a poll', async () => {
        const response = await request(app)
			.delete(`/polls/${pollId}`)
			.set('authorization',token);
        expect(response.status).toBe(204);
    });
});
