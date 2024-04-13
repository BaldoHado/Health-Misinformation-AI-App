import AWS from 'aws-sdk';
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const bedrockClient = new BedrockRuntimeClient({ region: process.env.AWS_REGION || 'us-east-1' });

function generatePrompt(misinformationText: string, responseMessageType: string) {
    // TODO: Make better
    return `Human: The following text has been identified as misinformation: 
        
        ${misinformationText}

        Please generate a {responseMessageType} response to this misinformation. This response should state why the information is incorrect, citing sources where possible. It should then provide correct information on the topic, again citing sources where possible.
        Assistant:`
}


export default async function generateResponse(misinformationText: string, responseMessageType: string) {
    const prompt = generatePrompt(misinformationText, responseMessageType);
    const params = {
        body: JSON.stringify({ 
            prompt,
            max_tokens_to_sample: 100,
        }),
        contentType: 'application/json',
        accept: 'application/json',
        modelId: 'anthropic.claude-v2'
    }
    const command = new InvokeModelCommand(params);
    return bedrockClient.send(command);
}