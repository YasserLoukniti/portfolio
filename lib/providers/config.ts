export type ProviderName = 'gemini' | 'groq-70b' | 'groq-8b' | 'cerebras' | 'mistral' | 'openrouter';

export interface ProviderLimits {
  rpm: number;      // Requests per minute
  tpm: number;      // Tokens per minute
  rpd: number;      // Requests per day
  tpd: number;      // Tokens per day (0 = unlimited)
}

export interface ProviderConfig {
  name: ProviderName;
  displayName: string;
  model: string;
  envKey: string;
  limits: ProviderLimits;
  description: string;
}

export const PROVIDER_CONFIGS: Record<ProviderName, ProviderConfig> = {
  'gemini': {
    name: 'gemini',
    displayName: 'Google Gemini',
    model: 'gemini-2.0-flash',
    envKey: 'GOOGLE_API_KEY',
    limits: {
      rpm: 10,
      tpm: 250000,
      rpd: 20,  // Free tier limit
      tpd: 0,
    },
    description: 'Gemini 2.0 Flash - 20 req/jour (free tier)',
  },
  'groq-70b': {
    name: 'groq-70b',
    displayName: 'Groq Llama 70B',
    model: 'llama-3.3-70b-versatile',
    envKey: 'GROQ_API_KEY',
    limits: {
      rpm: 30,
      tpm: 12000,
      rpd: 1000,
      tpd: 100000,
    },
    description: 'Llama 3.3 70B - 1K req/jour, 100K tokens/jour',
  },
  'groq-8b': {
    name: 'groq-8b',
    displayName: 'Groq Llama 8B',
    model: 'llama-3.1-8b-instant',
    envKey: 'GROQ_API_KEY',
    limits: {
      rpm: 30,
      tpm: 6000,
      rpd: 14400,
      tpd: 500000,
    },
    description: 'Llama 3.1 8B - 14K req/jour, 500K tokens/jour',
  },
  'cerebras': {
    name: 'cerebras',
    displayName: 'Cerebras',
    model: 'llama-3.3-70b',
    envKey: 'CEREBRAS_API_KEY',
    limits: {
      rpm: 30,
      tpm: 60000,
      rpd: 14400,
      tpd: 1000000,
    },
    description: 'Llama 3.3 70B - 14K req/jour, 1M tokens/jour',
  },
  'mistral': {
    name: 'mistral',
    displayName: 'Mistral AI',
    model: 'mistral-small-latest',
    envKey: 'MISTRAL_API_KEY',
    limits: {
      rpm: 60,
      tpm: 500000,
      rpd: 100000,
      tpd: 0, // ~1B/month = effectively unlimited daily
    },
    description: 'Mistral Small - ~1B tokens/mois',
  },
  'openrouter': {
    name: 'openrouter',
    displayName: 'OpenRouter',
    model: 'meta-llama/llama-3.1-8b-instruct:free',
    envKey: 'OPENROUTER_API_KEY',
    limits: {
      rpm: 20,
      tpm: 0, // not specified
      rpd: 50,
      tpd: 0,
    },
    description: 'Llama 3.1 8B Free - 50 req/jour',
  },
};

export const DEFAULT_FALLBACK_ORDER: ProviderName[] = [
  'gemini',
  'mistral',
  'groq-70b',
  'cerebras',
  'groq-8b',
  'openrouter',
];

export function getAvailableProviders(): ProviderName[] {
  return (Object.keys(PROVIDER_CONFIGS) as ProviderName[]).filter(
    (name) => !!process.env[PROVIDER_CONFIGS[name].envKey]
  );
}

export function isProviderAvailable(name: ProviderName): boolean {
  return !!process.env[PROVIDER_CONFIGS[name].envKey];
}
