import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if (!envFound) {
  throw new Error("Couldn't find .env file");
}

export default {
  port: parseInt(process.env.PORT, 10),
  // databaseURL: process.env.MONGO_ATLAS_URL_TEST,
  // mongodatabase: process.env.MONGO_ATLAS_DATABASE_TEST,
  // mongocollection: process.env.MONGO_ATLAS_COLLECTION_TEST,
  databaseURL: process.env.EPICMOBILE_DEV_ATLAS_URL,
  mongodatabase: process.env.EPICMOBILE_DEV_ATLAS_DATABASE,
  mongocollection: process.env.EPICMOBILE_DEV_ATLAS_COLLECTION,
  env: process.env.NODE_ENV,
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  epicDev: {
    url: process.env.EPICMOBILE_DEV_ATLAS_URL,
    db: process.env.EPICMOBILE_DEV_ATLAS_DATABASE,
    collectionProduct: process.env.EPICMOBILE_DEV_ATLAS_COLLECTION,
    collectionPriceLog: process.env.EPICMOBILE_DEV_ATLAS_COLLECTION_PRODUCTLOG
  },
  agenda: {
    dbCollection: process.env.MONGO_ATLAS_COLLECTION_TEST,
  },
  api: {
    prefix: "/api",
  },
};
