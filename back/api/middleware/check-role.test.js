const checkRole = require('./check-role');
const User = require('../models/user');
const httpMocks = require('node-mocks-http');

describe('checkRole middleware', () => {
    let mockRequest, mockResponse, mockNext;
    let findOneMock;

    beforeEach(() => {
        mockRequest = httpMocks.createRequest();
        mockResponse = httpMocks.createResponse();
        mockNext = jest.fn();
    });

    afterEach(() => {
        if (findOneMock) {
            findOneMock.mockRestore();
        }
    });

    it('should pass with admin role', async () => {
        const mockUser = new User({ email: 'admin@example.com', role: process.env.ADMIN_KEY });
        mockRequest.userData = { email: 'admin@example.com' };

        findOneMock = jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

        await checkRole(mockRequest, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockResponse.statusCode).toBe(200);
    });

    it('should fail with non-admin role', async () => {
        const mockUser = new User({ email: 'user@example.com', role: 'USER' });
        mockRequest.userData = { email: 'user@example.com' };

        findOneMock = jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

        await checkRole(mockRequest, mockResponse, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(mockResponse.statusCode).toBe(403);
        expect(mockResponse._getJSONData()).toEqual({
            message: 'You are not an administrator',
            role: 'USER'
        });
    });

    it('should fail with user not found', async () => {
        mockRequest.userData = { email: 'nonexistent@example.com' };

        findOneMock = jest.spyOn(User, 'findOne').mockResolvedValue(null);

        await checkRole(mockRequest, mockResponse, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(mockResponse.statusCode).toBe(404);
        expect(mockResponse._getJSONData()).toEqual({ message: 'User not found' });
    });

    it('should fail with internal server error', async () => {
        mockRequest.userData = { email: 'error@example.com' };

        const mockError = new Error('Database error');
        findOneMock = jest.spyOn(User, 'findOne').mockImplementation(() => {
            throw mockError;
        });

        await checkRole(mockRequest, mockResponse, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(mockResponse.statusCode).toBe(500);
        expect(mockResponse._getJSONData()).toEqual({ error: 'Internal server error' });
    });
});
