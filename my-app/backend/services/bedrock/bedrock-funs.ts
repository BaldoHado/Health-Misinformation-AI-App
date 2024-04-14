import { BedrockAgentRuntimeClient, RetrieveCommand, RetrieveCommandInput } from "@aws-sdk/client-bedrock-agent-runtime";
import { BedrockRuntimeClient, InvokeModelCommand, InvokeModelCommandOutput } from "@aws-sdk/client-bedrock-runtime";

const bedrockAgentClient = new BedrockAgentRuntimeClient({ region: process.env.AWS_REGION || 'us-east-1' });
const bedrockClient = new BedrockRuntimeClient({ region: process.env.AWS_REGION || 'us-east-1' });

function getLLMResponse(prompt: string, maxTokens: number = 100, model: string = 'anthropic.claude-v2') {
    const params = {
        body: JSON.stringify({
            prompt,
            max_tokens_to_sample: maxTokens,
        }),
        contentType: 'application/json',
        accept: 'application/json',
        modelId: model
    };
    const command = new InvokeModelCommand(params);
    return bedrockClient.send(command);
}

function parseLLMResponse(resp: InvokeModelCommandOutput) {
    return JSON.parse(new TextDecoder('utf-8').decode(resp.body))['completion'];
}

function getKBResponse(prompt: string) {
    const params = {
        knowledgeBaseId: "4ILEEBPEKT",
        retrievalQuery: {
            text: prompt
        }
    };
    const command = new RetrieveCommand(params as RetrieveCommandInput);
    return bedrockAgentClient.send(command);

}


export { bedrockAgentClient, bedrockClient, getLLMResponse, parseLLMResponse, getKBResponse };


