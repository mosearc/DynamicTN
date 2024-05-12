const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'DynamicTN',
            version: '1.0.0',
            description: 'DynamicTN is a project to expose and share your improvement over the city of Trento',

        },
        servers: [
            {
                url: 'http://localhost:3500',
                description: 'development server',
            }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            description: 'Email address of the user',
                        },
                        password: {
                            type: 'string',
                            description: 'Password of the user',
                        }
                    }
                },
                Post: {
                    type: 'object',
                    required: ['name', 'text'],
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

                    }

                },
                Comment: {
                    type: 'object',
                    required: ['post', 'text'],
                    properties: {
                        post: {
                            type: 'mongoose.Schema.Types.ObjectId',
                            text: 'string'
                        }
                    }
                },
                Auth: {
                    type: 'object',
                }
            }
        },
        responses: {
            404: {
                description: 'api not founded',
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