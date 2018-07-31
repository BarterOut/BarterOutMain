import mongoose from 'mongoose';

export function connectDB(done) {
  mongoose.createConnection('mongodb://localhost:27017/mernstacktest', (error) => {
    if (error) {
      console.error(error);
      fail();
    }
    done();
  });
}
