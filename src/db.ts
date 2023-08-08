import mongoose from 'mongoose';

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_HOST);
    console.log('MONGODB CONNECTED');
  } catch (err) {
    console.log(`MONGODB ERROR : ${err}`);
  }
};
export default connection;
