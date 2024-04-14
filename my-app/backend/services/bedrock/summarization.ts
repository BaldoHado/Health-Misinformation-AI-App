import { getLLMResponse, parseLLMResponse } from "./bedrock-funs";

function generateSummarizationPrompt(misinformationText: string) {
    return `Human: I'm a public health official trying to create a dashboard that displays current health misinformation threats. In 5 words or less, create a headline for the following content, summarizing it as faithfully as possible. Do not state that the content is misinformation, instead just summarize the content.

            Content: ${misinformationText}
            Assistant:`
}

export default async function generateSummarization(misinformationText: string) {
    const prompt = generateSummarizationPrompt(misinformationText);
    const response = await getLLMResponse(prompt, 50);
    return parseLLMResponse(response);
}
