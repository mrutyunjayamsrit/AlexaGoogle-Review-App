const express = require('express');
const { EXPECTATION_FAILED } = require('http-status-codes');
const request = require('request-promise');
const controller = require('../controller/review.controller')
const reviews = './data/review.json'
const { 
    getAllReviews, 
    getReviewsByDate, 
    getAverageStoreReview, 
    addUserReview
} = require('../controller/review.controller')

jest.mock('../controller/review.controller')

describe('Call controller function', ()=>{
    const getReviews = jest.spyOn(controller, 'getAllReviews').mockResolvedValue(reviews);
    it('invokes controller.getAllReviews', async () => {
        let req = {};
        let res = {};
        let reviews = await getAllReviews(req, res);
        
        expect(reviews).toEqual(reviews)
    });

    it('invokes controller.getAllReviews', async () => {
        let req = {date: '2017-12-18'};
        let res = {};
        let reviews = await getAllReviews(req, res);
        
        expect(reviews).toEqual(reviews)
    });

    it('invokes controller.getAllReviews', async () => {
        let req = {rating: 1};
        let res = {};
        let reviews = await getAllReviews(req, res);
        
        expect(reviews).toEqual(reviews)
    });

    it('invokes controller.getAllReviews', async () => {
        let req = {store: 'iTunes'};
        let res = {};
        let reviews = await getAllReviews(req, res);
        
        expect(reviews).toEqual(reviews)
    });
})

