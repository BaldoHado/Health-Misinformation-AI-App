import mongoose from "mongoose"

// Mongoose schema for Issue
const issueSchema = new mongoose.Schema({
    summary: { type: String, required: true },
    date: { type: Date, default: Date.now },
    region: [{ type: String }],
    demographic: [{ type: String }],
    popularity: { type: Number },
    severity: { type: Number },
    generatedText: { type: String, required: true },
    status: {
        type: String,
        default: "Open",
        enum: ["Open", "Closed", "In Progress"],
    },
    votes: { type: Number, default: 0 },
}, { collection: "issues", timestamps: true });

export default mongoose.model("Issue", issueSchema);