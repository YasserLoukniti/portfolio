import mongoose, { Schema, Document } from 'mongoose';
import { ProviderName, DEFAULT_FALLBACK_ORDER, PROVIDER_NAMES, isKnownProvider } from './providers/config';

// Chat Session
export interface IChatSession extends Document {
  ip: string;
  userAgent?: string;
  country?: string;
  countryCode?: string;
  city?: string;
  region?: string;
  device?: string;
  browser?: string;
  lastActivity: Date;
  viewed: boolean;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSessionSchema = new Schema<IChatSession>(
  {
    ip: { type: String, required: true },
    userAgent: { type: String },
    country: { type: String },
    countryCode: { type: String },
    city: { type: String },
    region: { type: String },
    device: { type: String },
    browser: { type: String },
    lastActivity: { type: Date, default: Date.now },
    viewed: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Chat Message
export interface IChatMessage extends Document {
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  tokensIn: number;
  tokensOut: number;
  provider?: string;
  createdAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    sessionId: { type: String, required: true, index: true },
    role: { type: String, required: true, enum: ['user', 'assistant'] },
    content: { type: String, required: true },
    tokensIn: { type: Number, default: 0 },
    tokensOut: { type: Number, default: 0 },
    provider: { type: String },
  },
  { timestamps: true }
);

// Token Usage (with provider tracking)
export interface ITokenUsage extends Document {
  date: Date;
  provider: string;
  tokensIn: number;
  tokensOut: number;
  requests: number;
}

const TokenUsageSchema = new Schema<ITokenUsage>({
  date: { type: Date, required: true },
  provider: { type: String, required: true, default: 'gemini' },
  tokensIn: { type: Number, default: 0 },
  tokensOut: { type: Number, default: 0 },
  requests: { type: Number, default: 0 },
});

// Compound index for date + provider
TokenUsageSchema.index({ date: 1, provider: 1 }, { unique: true });

// Provider Error Log
export interface IProviderError extends Document {
  provider: string;
  errorType: 'timeout' | 'quota' | 'rate_limit' | 'other';
  errorMessage: string;
  fallbackUsed?: string;
  createdAt: Date;
}

const ProviderErrorSchema = new Schema<IProviderError>(
  {
    provider: { type: String, required: true },
    errorType: { type: String, required: true, enum: ['timeout', 'quota', 'rate_limit', 'other'] },
    errorMessage: { type: String, required: true },
    fallbackUsed: { type: String },
  },
  { timestamps: true }
);

// Auto-delete errors older than 7 days
ProviderErrorSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

// Rate limit (compteurs partagés entre instances serverless)
export interface IRateLimit extends Document {
  key: string;
  count: number;
  expiresAt: Date;
}

const RateLimitSchema = new Schema<IRateLimit>({
  key: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true },
});

// Suppression automatique des fenêtres expirées
RateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Settings (singleton for app configuration)
export interface ISettings extends Document {
  activeProvider: ProviderName;
  fallbackOrder: ProviderName[];
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    activeProvider: {
      type: String,
      required: true,
      default: 'gemini',
      enum: PROVIDER_NAMES,
    },
    fallbackOrder: {
      type: [String],
      default: DEFAULT_FALLBACK_ORDER,
    },
  },
  { timestamps: true }
);

// Helper to get or create settings
export async function getSettings(): Promise<ISettings> {
  await mongoose.connection.asPromise();
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({
      activeProvider: 'gemini',
      fallbackOrder: DEFAULT_FALLBACK_ORDER,
    });
  }

  // Drop providers that no longer exist (e.g. mistral, cerebras) so later saves pass the enum check
  const knownOrder = settings.fallbackOrder.filter((p: string) => isKnownProvider(p));
  if (!isKnownProvider(settings.activeProvider) || knownOrder.length !== settings.fallbackOrder.length) {
    if (!isKnownProvider(settings.activeProvider)) settings.activeProvider = 'gemini';
    settings.fallbackOrder = knownOrder;
    await settings.save();
  }
  return settings;
}

export const ChatSession = mongoose.models.ChatSession || mongoose.model<IChatSession>('ChatSession', ChatSessionSchema);
export const ChatMessage = mongoose.models.ChatMessage || mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);
export const TokenUsage = mongoose.models.TokenUsage || mongoose.model<ITokenUsage>('TokenUsage', TokenUsageSchema);
export const Settings = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
export const ProviderError = mongoose.models.ProviderError || mongoose.model<IProviderError>('ProviderError', ProviderErrorSchema);
export const RateLimit = mongoose.models.RateLimit || mongoose.model<IRateLimit>('RateLimit', RateLimitSchema);
