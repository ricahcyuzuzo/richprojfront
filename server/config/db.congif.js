import mongoose from 'mongoose';

const mongoConnect = () => {
    mongoose.connect(`mongodb://localhost:27017/alms`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    mongoose.connection
        .once('open', () => console.log('Database connected successful'))
        .on('error', (err) => console.log(err));
}

export default mongoConnect;
