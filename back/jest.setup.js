require('dotenv').config({
    path: '.env'
});

process.env.DATABASE_URI = process.env.DATABASE_URI_TEST || process.env.DATABASE_URI;
