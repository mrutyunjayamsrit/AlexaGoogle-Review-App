const { MongoClient } = require('mongodb');
const config = require('config');
const {MongoURL, DbName} = config;

let db = '';

(async function () {
    db = await dataBaseConnect();
  })();

/**
 * To Connect to Mongo DB using MongoURL
 */
async function dataBaseConnect(){
    return new Promise(async (resolve, reject)=>{
        MongoClient.connect(MongoURL, (error, client) => {
            if (error) {
              console.log('connection to database failed');
              reject(error)
            }
          
            console.log('DB connected successfully');
          
            db = client.db(DbName);
            // console.log("DB: ", db);
            resolve(db)
          });
    })
    
}

/**
 * To insert document to collection
 */
insertDocuments = (content, collection1) => {
  const collection = db.collection(collection1);
    console.log('Entered insert')
  collection.insertMany(content, (error, result) => {
    if (error) {
      console.log('DB insert failed');
    }
    if (result) {
      console.log('DB insert successfull!!!');
    }
  });
  return "success"
};

/**
 *
 * @param {Query data from Mongo DB} query
 */

const findDocuments = function (query, query2 = null, collection1) {
  // Get the documents collection
  const collection = db.collection(collection1);
  return new Promise((resolve, reject) => {
    // To Find some documents
    collection.find(query,query2).project({_id:0}).toArray((err, docs) => {
      if (err) {
        console.log('Error to read the records');
        reject('Not able to fetch details');
      }
      console.log('Found the following records');
      // console.log(docs);
      resolve(docs);
    });
  });
};

/**
 * To update document details
 */
const updateDocument = function(query, newValue, collection1) {
  // Get the documents collection
  const collection = db.collection(collection1);
  return new Promise((resolve, reject)=>{
    collection.updateOne(query,newValue, function(err, result) {
      if(err){
        console.log('Error to update the records');
        log.error('Error to update the records');
        reject('Error to update the records');
      }
      console.log("Updated the document with the field a equal");
      resolve(result);
    });
  })
}

/**
 * To remove particular document
 */
const removeDocument = function(query, collection1) {
  // Get the documents collection
  const collection = db.collection(collection1);
  return new Promise((resolve, reject)=>{
    collection.deleteMany(query, function(err, result) {
      if(err){
        console.log('Error while removing data');
        log.error('Error while removing data');
        reject('Error while removing data');
      }
      resolve(result);
    });
  }) 
}


module.exports = {
  insertDocuments,
  findDocuments,
  updateDocument,
  removeDocument,
  dataBaseConnect
};
