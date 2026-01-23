import mongoose, { Schema, Document } from 'mongoose';
import { ProviderName, DEFAULT_FALLBACK_ORDER } from './providers/config';

// Chat Session
export interface IChatSession extends Document {
  ip: string;
  userAgent?: string;
  lastActivity: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSessionSchema = new Schema<IChatSession>(
  {
    ip: { type: String, required: true },
    userAgent: { type: String },
    lastActivity: { type: Date, default: Date.now },
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
      enum: ['gemini', 'groq-70b', 'groq-8b', 'cerebras', 'mistral', 'openrouter'],
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
  return settings;
}

export const ChatSession = mongoose.models.ChatSession || mongoose.model<IChatSession>('ChatSession', ChatSessionSchema);
export const ChatMessage = mongoose.models.ChatMessage || mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);
export const TokenUsage = mongoose.models.TokenUsage || mongoose.model<ITokenUsage>('TokenUsage', TokenUsageSchema);
export const Settings = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
