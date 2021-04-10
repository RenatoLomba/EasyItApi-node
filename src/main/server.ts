import { ENV } from './environment';
import { app } from './app';

const port = Number(ENV.PORT) || 80;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  console.log(`${ENV.URL}:${port}`);
});
