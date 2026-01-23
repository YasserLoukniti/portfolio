import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatGroq } from '@langchain/groq';
import { ChatMistralAI } from '@langchain/mistralai';
import { ChatOpenAI } from '@langchain/openai';
import { ProviderName, PROVIDER_CONFIGS, isProviderAvailable } from './config';

export function getProvider(name: ProviderName): BaseChatModel {
  const config = PROVIDER_CONFIGS[name];

  if (!isProviderAvailable(name)) {
    throw new Error(`Provider ${name} is not configured (missing ${config.envKey})`);
  }

  switch (name) {
    case 'gemini':
      return new ChatGoogleGenerativeAI({
        model: config.model,
        apiKey: process.env.GOOGLE_API_KEY,
        temperature: 0.7,
        maxOutputTokens: 1024,
      });

    case 'groq-70b':
    case 'groq-8b':
      return new ChatGroq({
        model: config.model,
        apiKey: process.env.GROQ_API_KEY,
        temperature: 0.7,
        maxTokens: 1024,
      });

    case 'cerebras':
      // Cerebras uses OpenAI-compatible API
      return new ChatOpenAI({
        model: config.model,
        apiKey: process.env.CEREBRAS_API_KEY,
        configuration: {
          baseURL: 'https://api.cerebras.ai/v1',
        },
        temperature: 0.7,
        maxTokens: 1024,
      });

    case 'mistral':
      return new ChatMistralAI({
        model: config.model,
        apiKey: process.env.MISTRAL_API_KEY,
        temperature: 0.7,
        maxTokens: 1024,
      });

    case 'openrouter':
      return new ChatOpenAI({
        model: config.model,
        apiKey: process.env.OPENROUTER_API_KEY,
        configuration: {
          baseURL: 'https://openrouter.ai/api/v1',
        },
        temperature: 0.7,
        maxTokens: 1024,
      });

    default:
      throw new Error(`Unknown provider: ${name}`);
  }
}

export {
  type ProviderName,
  type ProviderConfig,
  type ProviderLimits,
  PROVIDER_CONFIGS,
  DEFAULT_FALLBACK_ORDER,
  getAvailableProviders,
  isProviderAvailable
} from './config';

export {
  checkDailyQuota,
  checkMinuteLimit,
  recordMinuteUsage,
  getProviderWithQuota,
  getAllProvidersQuota
} from './quota';
