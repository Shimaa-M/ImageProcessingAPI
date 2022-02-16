import express from 'express';
import imageRoute from './routes/imageRoute';

const app = express();
const port = 3000;

app.use(express.static('assets'));
app.use('/image', express.static('images'));

app.use('/image' , imageRoute);


app.listen(port, () => {
  console.log('server is running on port 3000');
});
export default app;
