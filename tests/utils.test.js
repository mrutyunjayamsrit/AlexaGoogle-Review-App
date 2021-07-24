const utils = require('../utils/utils')
jest.mock('../utils/utils')
const content = './data/review.json'

describe('Tests should verify all utils functions', ()=>{

    it('Should verify getAllReviewsByDefault to get reviews', async ()=>{
        
        let reviews = {};
        const spy = jest.spyOn(utils, 'getAllReviewsByDefault');
        spy.mockImplementation(() => Promise.resolve({
            reviews: [{
                review: "No point in stating the obvious, app is garbage right now. I like Alexa but find it hard to believe Bezos uses this glitchy app.",
                author: "_Reef_",
                review_source: "iTunes",
                rating: 1,
                title: "Does Jeff Bezos use this?",
                product_name: "Amazon Alexa",
                reviewed_date: "2017-12-18T22:04:04.000Z"
                }]
          })); 
        reviews = await utils.getAllReviewsByDefault();
       
        expect(reviews).toMatchSnapshot();
        spy.mockRestore();
    })

    it('Should verify getReviewsonGivenDate to get reviews', async ()=>{
        
        let reviews = content;
        let date = '2017-12-18'
        const spy = jest.spyOn(utils, 'getReviewsonGivenDate');
        spy.mockImplementation(() => Promise.resolve({
            reviews: [{
                review: "No point in stating the obvious, app is garbage right now. I like Alexa but find it hard to believe Bezos uses this glitchy app.",
                author: "_Reef_",
                review_source: "iTunes",
                rating: 1,
                title: "Does Jeff Bezos use this?",
                product_name: "Amazon Alexa",
                reviewed_date: "2017-12-18T22:04:04.000Z"
                }]
          })); 
        reviews = await utils.getReviewsonGivenDate(date);
       
        expect(reviews).toMatchSnapshot(content);
        spy.mockRestore();
    })

    it('Should verify getReviewsByGivenRating to get reviews', async ()=>{
        
        let reviews = content;
        let rating = 1
        const spy = jest.spyOn(utils, 'getReviewsByGivenRating');
        spy.mockImplementation(() => Promise.resolve({
            reviews: [{
                review: "No point in stating the obvious, app is garbage right now. I like Alexa but find it hard to believe Bezos uses this glitchy app.",
                author: "_Reef_",
                review_source: "iTunes",
                rating: 1,
                title: "Does Jeff Bezos use this?",
                product_name: "Amazon Alexa",
                reviewed_date: "2017-12-18T22:04:04.000Z"
                }]
          })); 
        reviews = await utils.getReviewsonGivenDate(rating);
       
        expect(reviews).toMatchSnapshot(content);
        spy.mockRestore();
    })

    it('Should verify getReviewsByGivenStore to get reviews', async ()=>{
        
        let reviews = content;
        let store = "i;Tunes"
        const spy = jest.spyOn(utils, 'getReviewsByGivenStore');
        spy.mockImplementation(() => Promise.resolve({
            reviews: [{
                review: "No point in stating the obvious, app is garbage right now. I like Alexa but find it hard to believe Bezos uses this glitchy app.",
                author: "_Reef_",
                review_source: "iTunes",
                rating: 1,
                title: "Does Jeff Bezos use this?",
                product_name: "Amazon Alexa",
                reviewed_date: "2017-12-18T22:04:04.000Z"
                }]
          })); 
        reviews = await utils.getReviewsByGivenStore(store);
       
        expect(reviews).toMatchSnapshot(content);
        spy.mockRestore();
    })
})