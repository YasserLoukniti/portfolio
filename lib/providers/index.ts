import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatGroq } from '@langchain/groq';
import { ChatOpenAI } from '@langchain/openai';
import { ProviderName, PROVIDER_CONFIGS, isProviderAvailable } from './config';

export function getProvider(name: ProviderName): BaseChatModel {
  const config = PROVIDER_CONFIGS[name];

  if (!isProviderAvailable(name)) {
    throw new Error(`Provider ${name} is not configured (missing ${config?.envKey})`);
  }

  switch (name) {
    case 'gemini':
      return new ChatGoogleGenerativeAI({
        model: config.model,
        apiKey: process.env.GOOGLE_API_KEY,
        temperature: 0.7,
        // Thinking tokens count against the output budget
        maxOutputTokens: 2048,
        maxRetries: 1,
      });

    case 'groq-70b':
    case 'groq-8b':
      return new ChatGroq({
        model: config.model,
        apiKey: process.env.GROQ_API_KEY,
        temperature: 0.7,
        // GPT-OSS models reason before answering: leave room for reasoning tokens
        maxTokens: 2048,
        maxRetries: 1,
      });

    case 'openrouter':
      return new ChatOpenAI({
        model: config.model,
        apiKey: process.env.OPENROUTER_API_KEY,
        configuration: {
          baseURL: 'https://openrouter.ai/api/v1',
        },
        temperature: 0.7,
        // openrouter/free may route to a reasoning model
        maxTokens: 2048,
        maxRetries: 1,
      });

    case 'nvidia':
      return new ChatOpenAI({
        model: config.model,
        apiKey: process.env.NVIDIA_API_KEY,
        configuration: {
          baseURL: 'https://integrate.api.nvidia.com/v1',
        },
        temperature: 0.7,
        // Nemotron reasons before answering: leave room for reasoning tokens
        maxTokens: 2048,
        maxRetries: 1,
      });

    case 'kilo':
      // Kilo gateway serves its free models without an API key
      return new ChatOpenAI({
        model: config.model,
        apiKey: 'anonymous',
        configuration: {
          baseURL: 'https://api.kilo.ai/api/gateway',
        },
        temperature: 0.7,
        maxTokens: 2048,
        maxRetries: 1,
      });

    case 'ovh':
      // OVHcloud anonymous tier rejects any Authorization header, so drop it
      return new ChatOpenAI({
        model: config.model,
        apiKey: 'anonymous',
        configuration: {
          baseURL: 'https://oai.endpoints.kepler.ai.cloud.ovh.net/v1',
          fetch: (url: RequestInfo | URL, init?: RequestInit) => {
            const headers = new Headers(init?.headers);
            headers.delete('authorization');
            return fetch(url, { ...init, headers });
          },
        },
        temperature: 0.7,
        maxTokens: 1024,
        maxRetries: 0, // 2 RPM: a retry would only hit the limit again
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
