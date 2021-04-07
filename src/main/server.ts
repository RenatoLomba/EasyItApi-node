import environments from './environment';
import app from './app';

const port = Number(environments.PORT) || 80;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
