const config = require('config');
const {StatusCodes} = require('http-status-codes')
const {collectionName} = config

const { 
        insertAllReviews, 
        getReviewsonGivenDate, 
        getReviewsByGivenRating, 
        getReviewsByGivenStore,
        getAllReviewsByDefault,
        getMonthlyAverageRating
    } = require('../utils/utils')
const db = require('../database/database');

/**
 * This request is to insert data from the existing file, need to run only once. POST request
 * @param {*} req 
 * @param {*} res 
 */
async function insertAllReview(req, res){
        try {
            const insertAll = await insertAllReviews();
            res.staus(StatusCodes.CREATED).send({insert: insertAll})
        } catch (error) {
            console.log('Failed to insert all data')
            res.staus(StatusCodes.NO_CONTENT).send({insert: 'Failed'})
        }

}

/**
 * Get all the reviews based on record limit
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function getAllReviews(req, res){
    const query = {}
    const reviews = await db.findDocuments(query, {limit: 7000 }, collectionName);
    console.log('reviews: ', reviews)
    
    res.status(StatusCodes.OK).send(reviews) 
}

/**
 * filetr by date, store type or rating
 * @param {date, store, rating} req 
 * @param {*} res 
 */
async function getReviewsByDate(req, res){
    
    switch(Object.keys(req.query)[0]){
        case 'date':
            const date = req.query.date
            const reviews = await getReviewsonGivenDate(date);
            res.status(StatusCodes.OK).send(reviews);
            break;
        case 'rating':
            const rating = req.query.rating
            const sendResponse = await getReviewsByGivenRating(rating);
            res.status(StatusCodes.OK).send(sendResponse);
            break;
        case 'store':
            const store = req.query.store
            const storeReviews = await getReviewsByGivenStore(store);
            res.status(StatusCodes.OK).send(storeReviews);
            break;
        default:
            const review = await getAllReviewsByDefault();
            res.status(StatusCodes.OK).send(review);
            break;
    }
}

/**
 * To get average monthly ratings per store by store name and date
 * @param {store, date} req 
 * @param {*} res 
 */
async function getAverageStoreReview(req, res){
    const store = req.query.store
    const date = req.query.date
    const response = await getMonthlyAverageRating(store, date)
    res.status(StatusCodes.OK).send(response)
}

/**
 * Accepts review request and stores them to db
 * @param {POST} req 
 * @param {*} res 
 */
function addUserReview(req, res){
    const content = req.body
    if(content.length){
        let insertdata = db.insertDocuments(content, collectionName);
        if(insertdata == 'success'){
            res.status(StatusCodes.CREATED).send('Review added successfully')
        }else{
            res.status(StatusCodes.BAD_REQUEST).send('Failed to add review')
        }
    }else{
        res.status(StatusCodes.BAD_REQUEST).send('No Review found');
    }
    
}

module.exports = {
    insertAllReview,
    getAllReviews,
    getReviewsByDate,
    getAverageStoreReview,
    addUserReview
}
