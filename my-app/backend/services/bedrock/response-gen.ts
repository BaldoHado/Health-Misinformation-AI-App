import {RetrieveAndGenerateCommand, RetrieveAndGenerateCommandInput} from "@aws-sdk/client-bedrock-agent-runtime"
import { bedrockAgentClient } from './bedrock-funs';


function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }
  

function generatePrompt(misinformationText: string, responseMessageType: string) {
    // TODO: Make better
    if (responseMessageType == "tweet") {
        return `Human: 
        
    I'm a public official who finds evidence to dispute claims of misinformation. I receive a claim: ${misinformationText}. What evidence can I use to dispute this claim to the public?
    Present this evidence in form of a 240-259 characters ${responseMessageType}.
        
        Assistant:`
    } else if (responseMessageType == "pr") {
        return `Human: 
        
        I'm a public official who finds evidence to dispute claims of misinformation. I receive a claim: ${misinformationText}. What evidence can I use to dispute this claim to the public?
        Present this evidence in form of a professional-sounding 300-400 word ${responseMessageType}.
            
            Assistant:`
    }
    return ""
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

export default async function generateResponse(misinformationText: string, responseMessageType: string) {
    const prompt = generatePrompt(misinformationText, responseMessageType);
    return getRAGResponse(prompt);
}