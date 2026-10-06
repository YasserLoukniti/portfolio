export type ProviderName = 'gemini' | 'groq-70b' | 'groq-8b' | 'nvidia' | 'kilo' | 'openrouter' | 'ovh';

export const PROVIDER_NAMES: ProviderName[] = ['gemini', 'groq-70b', 'groq-8b', 'nvidia', 'kilo', 'openrouter', 'ovh'];

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
  envKey: string | null; // null = free anonymous endpoint, no API key needed
  limits: ProviderLimits;
  description: string;
}

export const PROVIDER_CONFIGS: Record<ProviderName, ProviderConfig> = {
  'gemini': {
    name: 'gemini',
    displayName: 'Google Gemini',
    model: 'gemini-3.6-flash',
    envKey: 'GOOGLE_API_KEY',
    limits: {
      rpm: 15,
      tpm: 250000,
      rpd: 1500,  // Free tier limit
      tpd: 0,
    },
    description: 'Gemini 3.6 Flash - 15 req/min, 1.5K req/jour (free tier)',
  },
  'groq-70b': {
    name: 'groq-70b',
    displayName: 'Groq GPT-OSS 120B',
    model: 'openai/gpt-oss-120b',
    envKey: 'GROQ_API_KEY',
    limits: {
      rpm: 30,
      tpm: 8000,
      rpd: 1000,
      tpd: 200000,
    },
    description: 'GPT-OSS 120B - 1K req/jour, 200K tokens/jour',
  },
  'groq-8b': {
    name: 'groq-8b',
    displayName: 'Groq GPT-OSS 20B',
    model: 'openai/gpt-oss-20b',
    envKey: 'GROQ_API_KEY',
    limits: {
      rpm: 30,
      tpm: 8000,
      rpd: 1000,
      tpd: 200000,
    },
    description: 'GPT-OSS 20B - 1K req/jour, 200K tokens/jour',
  },
  'openrouter': {
    name: 'openrouter',
    displayName: 'OpenRouter',
    model: 'openrouter/free',
    envKey: 'OPENROUTER_API_KEY',
    limits: {
      rpm: 20,
      tpm: 0, // not specified
      rpd: 50,
      tpd: 0,
    },
    description: 'Routeur gratuit OpenRouter - 50 req/jour',
  },
  'nvidia': {
    name: 'nvidia',
    displayName: 'NVIDIA NIM',
    model: 'nvidia/nemotron-3-super-120b-a12b',
    envKey: 'NVIDIA_API_KEY',
    limits: {
      rpm: 40,
      tpm: 0,
      rpd: 10000,
      tpd: 0,
    },
    description: 'Nemotron 3 Super 120B - 40 req/min, 10K req/jour',
  },
  'kilo': {
    name: 'kilo',
    displayName: 'Kilo Gateway',
    model: 'stepfun/step-3.7-flash:free',
    envKey: null,
    limits: {
      rpm: 20,
      tpm: 0,
      rpd: 2000, // 200 req/hour per IP, no API key
      tpd: 0,
    },
    description: 'Step 3.7 Flash Free - 200 req/heure, sans clé',
  },
  'ovh': {
    name: 'ovh',
    displayName: 'OVHcloud AI Endpoints',
    model: 'Meta-Llama-3_3-70B-Instruct',
    envKey: null,
    limits: {
      rpm: 2, // anonymous tier: 2 RPM per IP per model
      tpm: 0,
      rpd: 2880,
      tpd: 0,
    },
    description: 'Llama 3.3 70B (UE) - 2 req/min, sans clé',
  },
};

export const DEFAULT_FALLBACK_ORDER: ProviderName[] = [
  'groq-70b',
  'nvidia',
  'groq-8b',
  'gemini',
  'openrouter',
  'kilo',
  'ovh',
];

export function isKnownProvider(name: string): name is ProviderName {
  return Object.prototype.hasOwnProperty.call(PROVIDER_CONFIGS, name);
}

export function isProviderAvailable(name: ProviderName): boolean {
  const config = PROVIDER_CONFIGS[name];
  if (!config) return false;
  return config.envKey === null || !!process.env[config.envKey];
}

export function getAvailableProviders(): ProviderName[] {
  return PROVIDER_NAMES.filter(isProviderAvailable);
}
