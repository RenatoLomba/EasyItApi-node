import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line import/first
import { app } from './main/app';

const port = Number(process.env.PORT) || 80;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  console.log(`${process.env.COMPLETE_URL}`);
});
