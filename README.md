# Alexa Google Reviews by store(Node.js and Express)

When receiving API request for a reviewing systems, this service will perform following task:-
- Accepts reviews and stores them
- Allows to fetches reviews
- Reviews can be filtered by date, store type or rating.
- All filters are optional; fetch all reviews if no filters are applied.
- Allows to get average monthly ratings per store.
- Allows to get total ratings for each category. Meaning, how many 5*, 4*, 3* and so 

Intially reviews data is added into the mongo DB using alexa,json file and also POST request to add individual review data.

# Conventions

- all services must use [semantic versioning](https://semver.org/)

# Build, test, config

- npm install 
- runs [unit tests](tests/)

# Expose API with express

- straight forward express framework used here
  - [init in app.js](app.js)
- express framework used to simple api exposure
  - [expose API in controller/\*](/controller)


# For running unit tests

```
npm run test
or
yarn test
```


# API details with response for Local environment

- Add reviews using POST request (Implemented without any authentication method)
  API - POST http://localhost:3030/addReviews
  Request Body: [
                    {
                    "review": "Since your new update I can't add anything to a shopping list or to do list from my apple 16",
                    "author": "Mjay1",
                    "review_source": "Mjay1",
                    "rating": 1,
                    "title": "Mjay1",
                    "product_name": "Amazon Alexa",
                    "reviewed_date": "2017-05-23T00:00:00.000Z"
                    }
                ]

- To make use of the existing alexa.json created a '/insert' POST request which will read a data from alexa.json and then insert the data to mongoDB
  API - POST http://localhost:3030/insert

 - Default response if no params are added:-
   API- GET http://localhost:3030/reviewBy
   Response:- [{
              review: "No point in stating the obvious, app is garbage right now. I like Alexa but find it hard to believe Bezos uses this glitchy app.",
              author: "_Reef_",
              review_source: "iTunes",
              rating: 1,
              title: "Does Jeff Bezos use this?",
              product_name: "Amazon Alexa",
              reviewed_date: "2017-12-18T22:04:04.000Z"
              }]

- Response GET review by date
  API - GET http://localhost:3030/reviewBy?date=2017-12-18
  Response:- [{
              review: "No point in stating the obvious, app is garbage right now. I like Alexa but find it hard to believe Bezos uses this glitchy app.",
              author: "_Reef_",
              review_source: "iTunes",
              rating: 1,
              title: "Does Jeff Bezos use this?",
              product_name: "Amazon Alexa",
              reviewed_date: "2017-12-18T22:04:04.000Z"
              }]

- Response GET review by rating, it provides total review count for individual ratings like 5*, 4*, 3*, 2*...
  API - GET http://localhost:3030/reviewBy?rating=5
  Response:- [{
              Total_Review_Count: 1437
              },
            {
              review: "No point in stating the obvious, app is garbage right now. I like Alexa but find it hard to believe Bezos uses this glitchy app.",
              author: "_Reef_",
              review_source: "iTunes",
              rating: 5,
              title: "Does Jeff Bezos use this?",
              product_name: "Amazon Alexa",
              reviewed_date: "2017-12-18T22:04:04.000Z"
              }]

- Response GET review by store
  API - GET http://localhost:3030/reviewBy?store=GooglePlayStore
  Response:- [{
              review: "No point in stating the obvious, app is garbage right now. I like Alexa but find it hard to believe Bezos uses this glitchy app.",
              author: "_Reef_",
              review_source: "GooglePlayStore",
              rating: 5,
              title: "Does Jeff Bezos use this?",
              product_name: "Amazon Alexa",
              reviewed_date: "2017-12-18T22:04:04.000Z"
              }]

- Response GET Average monthly rating
  API - GET http://localhost:3030/averageStoreReview?store=GooglePlayStore&date=2017-11-21
  Response:- {
                store: "GooglePlayStore",
                Avarage_Monthly_rating: 3,
                period: {
                start: "2017-10-22T00:00:00.000Z",
                end: "2017-11-22T00:00:00.000Z"
                }
              }

# Unit Testing
- npm test

Result:-
Test Suites: 3 passed, 3 total                        
Tests:       10 passed, 10 total                      
Snapshots:   2 obsolete, 1 written, 3 passed, 4 total 
Time:        4.587 s                                  