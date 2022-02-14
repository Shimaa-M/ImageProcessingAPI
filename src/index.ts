import express from 'express';
import resize from './utilities/resize-image';
import { promises as fsPromises } from 'fs';
import url from 'url';

const app = express();
const port = 5000;

app.use(express.static('assets'));
app.use('/images', express.static('images'));

app.get('/images', async (req, res) => {
  const params = await JSON.parse(
    '{"' +
      decodeURI(url.parse(req.url).query as unknown as string)
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
  const filename: string = params.filename;
  const width: number = parseInt(params.width);
  const height: number = parseInt(params.height);
  await resize(filename, width, height);
  res.writeHead(301, { 'Content-Type': 'image/jpg' });
  res.end(await fsPromises.readFile(`./assets/thumb/${filename}.jpg`));
});

app.listen(port, () => {
  console.log('server is running on port 5000');
});
export default app;
