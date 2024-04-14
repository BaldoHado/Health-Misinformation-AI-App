import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose, { Schema, Document, Model } from "mongoose";
import generateResponse from './services/response-gen';
import cors from "cors";
import generateSummarization from "./services/bedrock/summarization";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

// Mongoose connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// TypeScript interface for Issue
interface Issue extends Document {
  summary: string;
  date: Date;
  region?: string[];
  demographic?: string[];
  popularity: number;
  severity: number;
  generatedText: string;
  status: "Open" | "Closed" | "In Progress";
  votes: number;
}

// Mongoose schema for Issue
const issueSchema: Schema = new Schema({
  summary: { type: String, required: true },
  date: { type: Date, default: Date.now },
  region: [{ type: String }],
  demographic: [{ type: String }],
  popularity: { type: Number, },
  severity: { type: Number },
  generatedText: { type: String, required: true },
  status: {
    type: String,
    default: "Open",
    enum: ["Open", "Closed", "In Progress"],
  },
  votes: { type: Number, default: 0 },
});

// Mongoose model for Issue
const IssueModel: Model<Issue> = mongoose.model<Issue>("Issue", issueSchema);

app.use(express.json());
app.use(cors());

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

// POST /v1/issues - Create a new issue
app.post("/v1/issues", async (req: Request, res: Response) => {
  try {
    const newIssue = new IssueModel(req.body);
    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// GET /v1/issues - Get all issues
app.get("/v1/issues", async (req: Request, res: Response) => {
  try {
    const issues = await IssueModel.find();
    res.json(issues);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /v1/issues/:id - Update a specific issue
app.patch("/v1/issues/:id", async (req: Request, res: Response) => {
  try {
    const updatedIssue = await IssueModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedIssue) {
      res.json(updatedIssue);
    } else {
      res.status(404).send("Issue not found");
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// GET /v1/issues/:id - Get a specific issue by ID
app.get("/v1/issues/:id", async (req: Request, res: Response) => {
  try {
    const issue = await IssueModel.findById(req.params.id);
    if (issue) {
      res.json(issue);
    } else {
      res.status(404).send("Issue not found");
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /v1/issues/:id - Delete a specific issue
app.delete("/v1/issues/:id", async (req: Request, res: Response) => {
  try {
    const deletedIssue = await IssueModel.findByIdAndDelete(req.params.id);
    if (deletedIssue) {
      res.status(204).send("Success");
    } else {
      res.status(404).send("Issue not found");
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /v1/issues/:id/vote - Vote on a specific issue
app.post("/v1/issues/:id/vote", async (req: Request, res: Response) => {
  try {
    const issue = await IssueModel.findById(req.params.id);
    if (issue) {
      issue.votes += 1; // Increment votes
      await issue.save();
      res.json(issue);
    } else {
      res.status(404).send("Issue not found");
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/v1/summarize", async (req: Request, res: Response) => {
  try {
    const misinfo = req.query.misinformation;
    const resp = await generateSummarization(misinfo as string);
    res.send({"summary": resp});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
