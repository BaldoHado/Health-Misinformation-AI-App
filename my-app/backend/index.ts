import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import generateResponse from './services/response-gen';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.get("/v1/generate", async (req: Request, res: Response) => {
  const resp = await generateResponse("The moon is made of cheese", "twitter");
  res.send(JSON.parse(new TextDecoder('utf-8').decode(resp.body))['completion']);
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});