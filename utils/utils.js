const fs = require('fs');
const path = require('path');
const database = require('../database/database')
const config = require('config');
const {collectionName} = config;

/**
 * Reading data from alexa.json file and storing it in mongo db
 * @returns success message after inserting data to DB
 */
function insertAllReviews(){
    return new Promise((resolve, reject)=>{
        fs.readFile(path.resolve('model/', 'alexa.json'), (err, data)=>{
            if(err){
                console.log('Error reading a file', err)
                reject(err)
            }
    
            const reviewData = JSON.parse(data);
            console.log('Data: ', reviewData);
            reviewData.forEach(element => {
                db.insertDocuments([element], collectionName)
            });
            resolve('success')
        })
    })
    
}

/**
 * GET data by date filter
 * @param {*} date 
 * @returns reviews
 */
function getReviewsonGivenDate(date){
    
    return new Promise(async (resolve, reject)=>{
        try {
            console.log('Date: ', date);
            let newDate = new Date(date);
            newDate = newDate.toISOString();
            let newDateGt = new Date(new Date(date).setDate(new Date(date).getDate()-1));
            let newDateLt = new Date(new Date(date).setDate(new Date(date).getDate()+1));
            console.log("DateGt: ", newDateGt, "DateLt: ", newDateLt)
            const query = {reviewed_date: {$lt: newDateLt.toISOString(), $gt: newDateGt.toISOString()}}
            //let db = await database.dataBaseConnect();
            const reviews = await database.findDocuments(query, {limit: 6000 }, collectionName);

            resolve(reviews)
        } catch (error) {
            reject(error);
        }
        
    })
    
}

/**
 * GET filter by rating
 * @param {*} rating 
 * @returns 
 */
function getReviewsByGivenRating(rating){
    return new Promise(async (resolve, reject)=>{
        try {
            let sendResponse = [];
            console.log('Rating: ', rating, typeof rating)
            const query = {rating: parseInt(rating)}
            const reviews = await db.findDocuments(query, {limit: 6000 }, collectionName);
            let reviewCount = reviews.length;
            //console.log('Review Count: ', reviewCount);
            sendResponse.push({"Total_Review_Count": reviewCount})
            sendResponse.push(reviews)
            //console.log('reviews: ', reviews[0])
            resolve(sendResponse);
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * GET filter bu store name
 * @param {*} store 
 * @returns 
 */
function getReviewsByGivenStore(store){
    return new Promise(async (resolve, reject)=>{
        try {
            let sendResponse = [];
            const query = {review_source: store}
            const reviews = await db.findDocuments(query, {limit: 6000 }, collectionName);
            //console.log('reviews: ', reviews)
            const monthlyAverageRating = await getMonthlyAverageRating(store, reviews[0].reviewed_date.split('T')[0]);
            sendResponse.push(monthlyAverageRating)
            sendResponse.push(reviews)
            resolve(sendResponse)
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * GET default all reviews
 * @returns 
 */
function getAllReviewsByDefault(){
    return new Promise( async (resolve, reject)=>{
        try {
            const query = {}
            const reviews = await db.findDocuments(query, {limit: 6100 }, collectionName);
            //console.log('reviews: ', reviews)
            resolve(reviews)
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * GET average monthly rating for store based on store name and date
 * @param {*} store 
 * @param {*} date 
 * @returns 
 */
function getMonthlyAverageRating(store, date){
    return new Promise(async (resolve, reject)=>{
        try {
            //let date = '2017-12-21'
        let newDateGt = new Date(new Date(date).setDate(new Date(date).getDate()-30));
        let newDateLt = new Date(new Date(date).setDate(new Date(date).getDate()+1));
        //console.log('newDateGt: ', newDateGt);
        //console.log('newDateLt: ',newDateLt)
        const query = {review_source: store, reviewed_date: {$lt: newDateLt.toISOString(), $gt: newDateGt.toISOString()}}
        const reviews = await db.findDocuments(query, {limit: 6000 }, collectionName);
        const totalNumberOfReview = reviews.length;
        console.log('Total number of monthly reviews by store: ', totalNumberOfReview)
        let sumOfRating = 0;
        for(let review of reviews){
            sumOfRating +=review.rating
        }
        console.log("Sum of the ratings: ", sumOfRating);
        resolve({"store": store, "Avarage_Monthly_rating": Math.ceil(sumOfRating/totalNumberOfReview), "period":{"start": newDateGt,"end": newDateLt}});
        } catch (error) {
            reject(error)
        }
        
    })
}

module.exports = {
    insertAllReviews,
    getReviewsonGivenDate,
    getReviewsByGivenRating,
    getReviewsByGivenStore,
    getAllReviewsByDefault,
    getMonthlyAverageRating   
}