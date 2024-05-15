const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'DynamicTN',
            version: '1.0.0',
            description: 'DynamicTN is a project that aim to create a platform to expose and share your improvement suggestions over the city of Trento',

        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'development server',
            }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['email', 'password'],
                    description: 'the user model of the system',
                    properties: {
                        email: {
                            type: 'string',
                            description: 'Email address of the user',
                        },
                        password: {
                            type: 'string',
                            description: 'Password of the user',
                        }
                    },
                    example: {
                        email: 'example@example.com',
                        password: 'examplePassword',
                    }
                },
                Post: {
                    type: 'object',
                    required: ['name', 'text'],
                    description: '',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'the name of the post'
                        },
                        text: {
                            type: 'string',
                            description: 'the text of the post'
                        },
                        postImage: {
                            type: 'string',
                            description: 'the image of the post'
                        }

                    },
                    example: {
                        name: 'examplePostTitle',
                        text: 'examplePostText',
                        postImage: 'exampleImageUrl',
                    }
                },
                Comment: {
                    type: 'object',
                    required: ['post', 'text'],
                    description: 'creating a comment linked to one post, use postId',
                    properties: {
                        post: {
                            type: 'mongoose.Schema.Types.ObjectId',
                            description: 'the link at its post'
                        },
                        text: {
                            type: 'string',
                            description: 'the text of the comment'
                        }
                    },
                    example: {
                        postId: 'examplePostId',
                        text: 'exampleCommentText'
                    }
                },
                Auth: {
                    type: 'object',
                    required: ['email', 'password'],
                    description: 'a "fake" model used to perform login remaining in a RESTful logic',
                    properties: {
                        email: {
                            type: 'string',
                            description: 'Email address of the user',
                        },
                        password: {
                            type: 'string',
                            description: 'Password of the user',
                        }
                    },
                    example: {
                        email: 'example@example.com',
                        password: 'examplePassword'
                    }
                }
            }
        },
        responses: {
            404: {
                description: 'not founded',
                contents: 'application/json',
            },
            500: {
                description: 'fatal error',
                contents: 'application/json',
            }
        }
    },
    apis: ['./api/routes/*.js'],
}

module.exports = options