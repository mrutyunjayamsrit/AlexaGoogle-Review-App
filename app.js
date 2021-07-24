const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database/database');

const { 
        insertAllReview, 
        getAllReviews, 
        getReviewsByDate, 
        getAverageStoreReview, 
        addUserReview
    } = require('./controller/review.controller')

const PORT = process.env.PORT || 3030;

const corsOption = {
    origin: 'http://philipslights.com',
    optionsSuccessStatus: 200
}

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));


// This route is called to insert all the existing reviews in alexa.json file to mongoDB
app.post('/insert', insertAllReview)

app.post('/addReviews', addUserReview)

// This route is to get all reviews in a DB
app.get('/reviews', cors(), getAllReviews)

// Get reviews by date, store, rating
app.get('/reviewBy', cors(corsOption), getReviewsByDate)

// Get average monthly rating for a store based on date
app.get('/averageStoreReview', cors(corsOption), getAverageStoreReview)

const server = app.listen(PORT,()=>{
    console.log(`Server is listening on Port ${PORT}`);
});
