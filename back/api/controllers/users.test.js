const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const UserController = require('./users');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

jest.mock('bcrypt');
jest.mock('nodemailer');
jest.mock('../models/user');

const app = express();
app.use(bodyParser.json());
app.post('/users/signin', UserController.users_signin);
app.delete('/users/:userId', UserController.users_delete);
app.get('/users', UserController.users_get_all);
app.get('/users/email/:email', UserController.users_get_by_email);

describe('User Controller', () => {
    let transporterMock;

    beforeAll(() => {
        transporterMock = {
            sendMail: jest.fn().mockResolvedValue('Email sent'),
        };
        nodemailer.createTransport.mockReturnValue(transporterMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('users_signin', () => {
        it('should save a new user and send an email', async () => {
            bcrypt.hash.mockResolvedValue('hashedpassword');
            User.findOne.mockResolvedValue(null);
            User.prototype.save.mockResolvedValueOnce({
                _id: 'mockUserId',
                email: 'test@example.com',
                password: 'hashedpassword',
            });

            const response = await request(app)
                .post('/users/signin')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User saved successfully. A mail was sent to you');
            expect(transporterMock.sendMail).toHaveBeenCalledTimes(1);
        });

        it('should return 409 if user already exists', async () => {
            const existingUser = {
                _id: 'mockUserId',
                email: 'test@example.com',
                password: 'hashedpassword',
            };
            User.findOne.mockResolvedValue(existingUser);

            const response = await request(app)
                .post('/users/signin')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(response.status).toBe(409);
            expect(response.body.message).toBe('User already exists');
            expect(transporterMock.sendMail).not.toHaveBeenCalled();
        });
    });

    describe('users_delete', () => {
        it('should delete a user', async () => {
            User.findByIdAndDelete.mockResolvedValue({});
            const response = await request(app).delete('/users/123');
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('DELETED user');
        });

        it('should return 500 if an error occurs', async () => {
            User.findByIdAndDelete.mockRejectedValue(new Error('Delete error'));
            const response = await request(app).delete('/users/123');
            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Delete error');
        });
    });

    describe('users_get_all', () => {
        it('should return all users', async () => {
            const users = [
                { _id: '1', name: 'User1', email: 'user1@example.com' },
                { _id: '2', name: 'User2', email: 'user2@example.com' }
            ];
            User.find.mockReturnValue({ select: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(users) }) });
            const response = await request(app).get('/users');
            expect(response.status).toBe(200);
            expect(response.body.count).toBe(2);
            expect(response.body.users).toHaveLength(2);
        });

        it('should return 404 if no users found', async () => {
            User.find.mockReturnValue({ select: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([]) }) });
            const response = await request(app).get('/users');
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('No Users Found');
        });
    });

    describe('users_get_by_email', () => {
        it('should return a user by email', async () => {
            const user = { _id: '1', name: 'User1', email: 'user1@example.com' };
            User.findOne.mockReturnValue({
                select: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue(user)
                })
            });

            const response = await request(app).get('/users/email/user1@example.com');

            expect(response.status).toBe(200);
            expect(response.body._id).toBe('1');
            expect(response.body.email).toBe('user1@example.com');
        });

        it('should return 404 if user not found', async () => {
            User.findOne.mockReturnValue({
                select: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue(null)
                })
            });

            const response = await request(app).get('/users/email/nonexistent@example.com');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('User Not Found');
        });
    });
});
