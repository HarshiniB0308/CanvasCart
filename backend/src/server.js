import app from './app.js';
import connectDB from './config/db.js';

const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
