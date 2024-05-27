const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = require('./swagger');

const authRoutes = require('./api/routes/auth');
const commentsRoutes = require('./api/routes/comments');
const pollRoutes = require('./api/routes/polls');
const postsRoutes = require('./api/routes/posts');
const usersRoutes = require('./api/routes/users');

mongoose.connect(process.env.DATABASE_URI, {
    // useMongoClient: true
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    // res.header( 'Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});

app.use('/auth', authRoutes);
app.use('/comments', commentsRoutes);
app.use('/polls', pollRoutes);
app.use('/posts', postsRoutes);
app.use('/users', usersRoutes);

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// error handler se non esiste
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
