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
  const resp = await generateResponse("Vaccines are ineffective", "twitter");
  res.send(resp);
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});