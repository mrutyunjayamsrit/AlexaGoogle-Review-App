const { MongoClient } = require('mongodb');
const config = require('config');
const {MongoURL, DbName} = config;
const database = require('../database/database')
jest.mock('../database/database')
const content = './data/review.json'
describe('#database', () => {

  beforeAll(async () => await database.dataBaseConnect())

    it('should connect to mongo db', async () => {
      const connectSpy = jest.spyOn(database, 'dataBaseConnect').mockReturnValueOnce({});
      const actual = await database.dataBaseConnect(MongoURL);
      expect(actual).toEqual({});
      expect(connectSpy).toBeCalledWith(MongoURL);
    });

    it('should insert to mongo db', async () => {

      const connectSpy = jest.spyOn(database, 'insertDocuments').mockReturnValueOnce({});
      const actual = await database.insertDocuments([content], 'allReviews');
      expect(actual).toEqual({});
      expect(connectSpy).toBeCalledWith([content], 'allReviews');
    });
});