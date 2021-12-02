import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const PORT = process.env.PORT || 3010;

const server = express();
server.use(cors());
server.use(bodyParser.json());

server.get('/', (req, resp) => {
  resp.send('Server works');
});

console.log(`Server listening on port ${PORT}`);
server.listen(PORT);
