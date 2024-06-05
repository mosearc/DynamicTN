const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'DynamicTN',
            version: '1.0.0',
            description: 'DynamicTN is a university project aimed at creating a platform to share and expose improvement suggestions for the city of Trento, Italy.',

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
                    description: 'The user model of the system',
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
                            description: 'Name of the post'
                        },
                        text: {
                            type: 'string',
                            description: 'Text of the post'
                        },
                        postImage: {
                            type: 'string',
                            description: 'Image for the post'
                        }

                    },
                    example: {
                        name: 'examplePostTitle',
                        text: 'examplePostText',
                        postImage: 'exampleImageUrl',
                    }
                },
                Poll: {
                    type: 'object',
                    required: ['question', 'answers'],
                    properties: {
                        question: {
                            type: 'string',
                            description: 'The question of the poll',
                        },
                        answers: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                            description: 'The answers for the poll',
                        },
                    },
                    example: {
                        question: 'Red or blue pill?',
                        answers: ['Red', 'Blue', '42'],
                    },
                },
                Comment: {
                    type: 'object',
                    required: ['post', 'text'],
                    description: 'Creating a comment linked to one post, use postId',
                    properties: {
                        post: {
                            type: 'mongoose.Schema.Types.ObjectId',
                            description: 'Link at its post'
                        },
                        text: {
                            type: 'string',
                            description: 'Text of the comment'
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
                    description: 'Simulated model used to perform login with a RESTful logic',
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
                description: 'not found',
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
