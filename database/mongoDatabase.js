const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const memoryServer = new MongoMemoryServer();

//connect to database local with mongodb-memory-server
module.exports.connect = async () => {
  const uri = await memoryServer.getConnectionString();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

//close database connection with mongodb-memory-server
module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await memoryServer.stop();
};
