# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Yasser Loukniti built with Next.js 14 (App Router). Features an AI-powered chatbot that responds as Yasser using multi-provider LLM fallback, and an admin dashboard for analytics.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Styling**: styled-components + Tailwind CSS
- **Database**: MongoDB (Mongoose)
- **LLM Integration**: LangChain with multi-provider support (Gemini, Groq, Mistral, Cerebras, OpenRouter)
- **Language**: TypeScript

### Key Directories
- `app/` - Next.js App Router pages and API routes
- `components/` - React components organized by feature (Hero, About, Skills, etc.)
- `lib/` - Core utilities (MongoDB, auth, rate limiting, LLM providers)
- `lib/providers/` - LLM provider configuration and quota management
- `data/` - Static portfolio data (`database.json`, `portfolio.data.ts`)
- `types/` - TypeScript type definitions

### LLM Provider System
The chat feature uses a fallback chain of LLM providers with quota tracking:
- Active provider configurable via admin dashboard
- Automatic fallback on timeout (15s), quota exhaustion, or rate limits
- Daily/minute quota tracking per provider in `lib/providers/quota.ts`
- Provider configs in `lib/providers/config.ts`

### API Routes
- `app/api/chat/route.ts` - Main chatbot endpoint
- `app/api/admin/` - Protected admin endpoints (stats, sessions, provider config, errors)

### Admin Dashboard
Located at `/dashboard` - requires authentication. Manages:
- LLM provider selection and quota monitoring
- Chat session analytics with geo data
- Provider error tracking

### Data Flow
Portfolio content comes from `data/database.json` → transformed in `data/portfolio.data.ts` → consumed by components. The chatbot uses a system prompt in `lib/chat-service.ts` containing Yasser's profile data.

## Conventions

- Components use styled-components with `.styles.ts` companion files
- Path alias `@/*` maps to project root
- French language for UI text and comments
- API responses use helpers from `lib/cors.ts` (`jsonResponse`, `errorResponse`)
