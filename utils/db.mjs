import {MongoClient} from 'mongodb'


const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '27017';
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;


class DBClient {
    constructor() {
        this.client = new MongoClient(url, { useUnifiedTopology: true });
        this.db = null;
        this.client.connect()
        .then(() => {
            this.db = this.client.db(DB_DATABASE);
        })
        .catch((err) => {
            console.error('MongoDB connection error:', err);
        });
}

isAlive() {
    return !!this.db;
}

async nbUsers() {
    if (!this.db) return 0;
    return this.db.collection('users').countDocuments();
}

async nbFiles() {
    if (!this.db) return 0;
    return this.db.collection('files').countDocuments();
}
}

const dbClient = new DBClient();
export default dbClient;