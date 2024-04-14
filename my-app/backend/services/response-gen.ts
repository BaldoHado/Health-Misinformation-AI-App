import {BedrockAgentRuntimeClient, RetrieveAndGenerateCommand, RetrieveAndGenerateCommandInput, RetrieveCommand, RetrieveCommandInput} from "@aws-sdk/client-bedrock-agent-runtime"
import { InvokeModelCommand, BedrockRuntimeClient, InvokeModelCommandOutput } from '@aws-sdk/client-bedrock-runtime';

const bedrockAgentClient = new BedrockAgentRuntimeClient({ region: process.env.AWS_REGION || 'us-east-1' });
const bedrockClient = new BedrockRuntimeClient({ region: process.env.AWS_REGION || 'us-east-1' });



function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  } 
  

 function generatePrompt(misinformationText: string, responseMessageType: string) {
     // TODO: Make better
    return `Human: The following text has been identified as misinformation: 
        
        ${misinformationText}

        Please generate a ${responseMessageType} response to this misinformation. This response should state why the information is incorrect, citing sources where possible. It should then provide correct information on the topic, again citing sources where possible.
        Assistant:`
}

function getRAGResponse(prompt: string, model: string='anthropic.claude-v2'){
    const params = {
        input: {
            text: prompt
        },
        retrieveAndGenerateConfiguration: {
            type: "KNOWLEDGE_BASE", 
            knowledgeBaseConfiguration: {
                knowledgeBaseId: "4ILEEBPEKT",
                modelArn: model
            }
        }
    }
    const command = new RetrieveAndGenerateCommand(params as RetrieveAndGenerateCommandInput);
    return bedrockAgentClient.send(command);
}

function getKBResponse(prompt: string){
    const params = {
        knowledgeBaseId: "4ILEEBPEKT",
        retrievalQuery: {
            text: prompt
        }
    }
    const command = new RetrieveCommand(params as RetrieveCommandInput);
    return bedrockAgentClient.send(command);

}

function getLLMResponse(prompt: string, maxTokens: number=100, model: string='anthropic.claude-v2'){
    const params = {
        body: JSON.stringify({ 
            prompt,
            max_tokens_to_sample: maxTokens,
        }),
        contentType: 'application/json',
        accept: 'application/json',
        modelId: model
    }
    const command = new InvokeModelCommand(params);
    return bedrockClient.send(command);
}

function parseLLMResponse(resp: InvokeModelCommandOutput){
    return JSON.parse(new TextDecoder('utf-8').decode(resp.body))['completion']
}

export default async function generateResponse(misinformationText: string, responseMessageType: string) {
    const prompt = generatePrompt(misinformationText, responseMessageType);
    return getRAGResponse(prompt);
}