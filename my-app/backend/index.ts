import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import generateResponse from "./services/bedrock/response-gen";
import cors from "cors";
import generateSummarization from "./services/bedrock/summarization";
import IssueModel from "./schemas/Issue";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "./schemas/User";

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

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.get("/v1/generate", async (req: Request, res: Response) => {
  try {
    const { text, docType } = req.query;

    if (!text || !docType) {
      return res.status(400).json({ error: "Text and doctype are required." });
    }
    if (docType != "tweet" && docType != "pr") {
      return res
        .status(400)
        .json({ error: "DocType must be of type tweet or press release" });
    }

    const response = await generateResponse(text as string, docType as string);

    res.json(response);
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/v1/summarize", async (req: Request, res: Response) => {
  try {
    const misinfo = req.query.misinformation;
    const resp = await generateSummarization(misinfo as string);
    res.send({ summary: resp });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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
    const { add } = req.query;
    const issue = await IssueModel.findById(req.params.id);
    if (issue) {
      if (add) {
        issue.votes += 1; // Increment votes
      } else {
        issue.votes -= 1;
      }
      await issue.save();
      res.json(issue);
    } else {
      res.status(404).send("Issue not found");
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/v1/auth/login", async (req, res) => {
	const email = req.body.email;
	const pass = req.body.pass;

	try {
		const user = await findUserByEmail(email);
		if (!user) {
			res.status(401).send("Hen not found.");
		} else {
			const currentUnixTimeInSeconds = Math.floor(Date.now() / 1000);
			if (bcrypt.compareSync(pass, user.hash)) {
				const token = jwt.sign(
					{ userId: user._id, expiration: currentUnixTimeInSeconds + 3600 },
					process.env.JWT_SECRET_KEY
				);
				res.send({ token: token });
			} else {
				res.status(403).send({ error: "wrong credentials" });
			}
		}
	} catch (e) {
		console.error(e);
		res.status(401).send(e);
	}
});

app.post("/auth/register", async (req, res) => {
	try {
		console.log(req.body);
		const hen = await createUser(req.body.firstName, req.body.lastName, req.body.email, req.body.pass, req.body.tokenRegisteredWith);
		res.status(201).send(hen);
	} catch (e) {
		console.error(e);
		res.status(500).send("Failed to create hen");
	}
});

app.get("/auth/check", async (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		if (decoded.expiration < Math.floor(Date.now() / 1000)) {
			res.status(401).send({ error: "token expired" });
		} else {
			res.status(200).send({ message: "token valid" });
		}
	} catch (e) {
		res.status(401).send({ error: "invalid token" });
	}
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
