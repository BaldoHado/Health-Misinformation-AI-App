import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import generateResponse from './services/response-gen';
import cors from 'cors';

//For env File 
dotenv.config();

const app: Application = express();
app.use(cors())
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server'); 
});

app.get("/v1/generate", async (req: Request, res: Response) => {
  try {
    const { text, docType } = req.query;

    if (!text || !docType) {
      return res.status(400).json({ error: 'Text and doctype are required.' });
    }
    if (docType != "tweet" && docType != "pr") {
      return res.status(400).json({ error: 'DocType must be of type tweet or press release' });
    }

    const response = await generateResponse(text as string, docType as string);

    res.json(response);
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});