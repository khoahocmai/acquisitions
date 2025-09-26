import app from './app.js';

const PORT = process.env.PORT || 3214;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
