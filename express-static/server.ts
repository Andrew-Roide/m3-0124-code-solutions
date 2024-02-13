import express from 'express';

const app = express();

app.use(express.static('public'));
// app.use('/public/images', express.static('images'));

app.listen(8080, () => {
  console.log(`express server listening on port 8080`);
});
