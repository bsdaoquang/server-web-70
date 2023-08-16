const { MongoClient } = require('mongodb');
require('dotenv').config()

// Connection URL
const url = `mongodb+srv://${process.env.BD_USERNAME}:${process.env.BD_PASSWORD}@cluster0.sfwnhiy.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(url);

// Database Name
const dbName = process.env.BD_NAME

let db = {}

const connectToDB = async(app) => {
  try {
     await client.connect();

    console.log(`connect to db successfully`)

    database = client.db(dbName)

    db.posts = database.collection('posts')
    db.restaurants = database.collection('restaurants')
    db.comments = database.collection('comments')

    app.listen(process.env.PORT, (err) => {
      if (err) {
        console.log(`can not start server by ${err}`)
      }

      console.log(`Server started at http://localhost:${process.env.PORT}`)
    })

  } catch (error) {
    console.log(`can not connect to be`)
  }
 
}


module.exports = {connectToDB, db}