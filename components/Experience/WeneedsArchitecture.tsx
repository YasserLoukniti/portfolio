import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  Globe,
  ShieldCheck,
  Server,
  Database,
  Cpu,
  CreditCard,
  Mail,
  Bell,
  Video,
  Users,
  LayoutDashboard,
  Activity,
  Lock,
  Zap,
  MessageSquare,
  FileText,
  Network,
  Cloud,
  ExternalLink,
  Bot,
  BarChart3
} from 'lucide-react';

// Animations
const flowY = keyframes`
  0% { transform: translateY(-100%); opacity: 0; }
  20% { opacity: 0.5; }
  80% { opacity: 0.5; }
  100% { transform: translateY(100%); opacity: 0; }
`;

// Main Container
const ArchSection = styled.section`
  width: 100%;
  background: transparent;
  color: #cbd5e1;
  padding: 4rem 1.5rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  overflow: hidden;
  position: relative;
`;

const GridBackground = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.02;
  background-image:
    linear-gradient(to right, #f0f0f0 1px, transparent 1px),
    linear-gradient(to bottom, #f0f0f0 1px, transparent 1px);
  background-size: 4rem 4rem;
`;

const Container = styled.div`
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.75rem;
  letter-spacing: -0.025em;
`;

const TitleBar = styled.div`
  height: 2px;
  width: 4rem;
  background: #4f46e5;
  margin: 0 auto 1rem;
  border-radius: 9999px;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  max-width: 42rem;
  margin: 0 auto;
  line-height: 1.6;
`;

// Card Component
const CardContainer = styled.div<{ color?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid;
  backdrop-filter: blur(12px);
  width: 100%;
  transition: all 0.3s;
  z-index: 10;

  ${({ color }) => {
    switch (color) {
      case 'blue':
        return 'border-color: rgba(59, 130, 246, 0.2); background: rgba(23, 37, 84, 0.1); color: #bfdbfe;';
      case 'indigo':
        return 'border-color: rgba(99, 102, 241, 0.2); background: rgba(49, 46, 129, 0.1); color: #c7d2fe;';
      case 'orange':
        return 'border-color: rgba(249, 115, 22, 0.2); background: rgba(124, 45, 18, 0.1); color: #fed7aa;';
      case 'slate':
        return 'border-color: rgba(71, 85, 105, 0.4); background: rgba(15, 23, 42, 0.4); color: #e2e8f0;';
      case 'emerald':
        return 'border-color: rgba(16, 185, 129, 0.2); background: rgba(6, 78, 59, 0.1); color: #a7f3d0;';
      default:
        return 'border-color: rgba(71, 85, 105, 0.4); background: rgba(15, 23, 42, 0.4); color: #e2e8f0;';
    }
  }}

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  margin-bottom: 0.625rem;
`;

const CardIconWrapper = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);

  svg {
    opacity: 0.8;
  }
`;

const CardInfo = styled.div``;

const CardTitle = styled.h3`
  font-weight: 600;
  font-size: 13px;
  letter-spacing: -0.025em;
  line-height: 1.2;
`;

const CardSub = styled.p`
  font-size: 9px;
  opacity: 0.5;
  font-family: ${({ theme }) => theme.fonts.mono};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 2px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.375rem;
`;

const Tag = styled.span`
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  font-weight: 500;
  white-space: nowrap;
`;

// Label Component
const LabelContainer = styled.div<{ align?: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #64748b;
  margin-bottom: 1.5rem;
  padding: 6px 1rem;
  border-radius: 9999px;
  border: 1px solid #1e293b;
  background: rgba(15, 23, 42, 0.5);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  ${({ align }) => align === 'center' && 'margin-left: auto; margin-right: auto;'}

  svg {
    opacity: 0.7;
  }
`;

// Connection Line
const ConnectionContainer = styled.div<{ height?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  z-index: 0;
  height: ${({ height }) => height || '3rem'};
`;

const ConnectionLine = styled.div`
  width: 1px;
  height: 100%;
  background: #1e293b;
  position: relative;
  overflow: hidden;
`;

const ConnectionFlow = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.4), transparent);
  height: 50%;
  width: 100%;
  animation: ${flowY} 3s linear infinite;
  opacity: 0.5;
`;

const ConnectionLabel = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.background};
  padding: 4px 12px;
  font-size: 8px;
  color: #64748b;
  border: 1px solid #1e293b;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.mono};
  z-index: 10;
  text-transform: uppercase;
  letter-spacing: -0.025em;
`;

// Layout Grids
const Layer1Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 20;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 2fr 1fr;
  }
`;

const SidePanel = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const SidePanelRight = styled(SidePanel)`
  align-items: flex-end;
  text-align: right;
`;

const MainPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ApiList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ApiItem = styled.div`
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid #1e293b;
  font-size: 10px;
  font-family: ${({ theme }) => theme.fonts.mono};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ApiDot = styled.div<{ color?: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ color }) => color || '#6366f1'};
`;

// Gateway Section
const GatewayContainer = styled.div`
  width: 100%;
  max-width: 64rem;
  position: relative;
  z-index: 20;
`;

const GatewayCard = styled.div`
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid #1e293b;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const GatewayLabelWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -2.25rem;
  margin-bottom: 1.5rem;
`;

const GatewayContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const GatewayInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 10px;
  color: #64748b;
  font-family: ${({ theme }) => theme.fonts.mono};
  background: rgba(0, 0, 0, 0.4);
  padding: 6px 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #1e293b;
  margin: 0 auto;

  svg {
    color: #818cf8;
  }
`;

const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const ModuleItem = styled.div`
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: #020617;
  border: 1px solid rgba(30, 41, 59, 0.5);
  font-size: 10px;
  font-weight: 700;
  color: #a5b4fc;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: -0.025em;
`;

// Split Layer
const SplitGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-top: 3rem;
  position: relative;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SplitColumn = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const VerticalLine = styled.div<{ side?: string }>`
  height: 3rem;
  border-left: 1px solid #1e293b;
  position: absolute;
  top: -3rem;

  ${({ side }) => side === 'left' ? 'margin-left: 4rem;' : 'margin-left: auto; margin-right: 4rem;'}

  @media (min-width: 768px) {
    ${({ side }) => side === 'left' ? 'margin-left: 5rem;' : 'margin-right: 5rem;'}
  }
`;

const EventBusCard = styled.div`
  position: relative;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(249, 115, 22, 0.2);
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const EventBusIcon = styled.div`
  padding: 0.5rem;
  background: rgba(249, 115, 22, 0.1);
  border-radius: 4px;
  color: #fb923c;
  border: 1px solid rgba(249, 115, 22, 0.1);
`;

const EventBusInfo = styled.div``;

const EventBusTitle = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: #fed7aa;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const EventBusSub = styled.div`
  font-size: 8px;
  color: rgba(249, 115, 22, 0.6);
  font-family: ${({ theme }) => theme.fonts.mono};
  text-transform: uppercase;
`;

const FastAPICard = styled.div`
  background: rgba(6, 78, 59, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FastAPIIcon = styled.div`
  padding: 0.5rem;
  background: rgba(16, 185, 129, 0.2);
  border-radius: 0.5rem;
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.2);
`;

const FastAPIInfo = styled.div`
  flex: 1;
`;

const FastAPITitle = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: #d1fae5;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FastAPISub = styled.div`
  font-size: 8px;
  color: rgba(16, 185, 129, 0.6);
  font-family: ${({ theme }) => theme.fonts.mono};
  text-transform: uppercase;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
`;

const LLMConnections = styled.div`
  padding: 0.75rem;
  background: rgba(15, 23, 42, 0.4);
  border-radius: 0.75rem;
  border: 1px solid #1e293b;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.25rem;
`;

const LLMLabel = styled.div`
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #64748b;
`;

const LLMItem = styled.span`
  font-size: 9px;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: rgba(52, 211, 153, 0.7);
`;

// Cloud & Data Layer
const CloudDataSection = styled.div`
  width: 100%;
  margin-top: 4rem;
  padding-top: 2.5rem;
  border-top: 1px solid #0f172a;
`;

const CloudDataGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 2fr;
  }
`;

const AWSGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  width: 100%;
`;

const AWSItem = styled.div`
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: rgba(245, 158, 11, 0.05);
  border: 1px solid rgba(245, 158, 11, 0.1);
  text-align: center;
`;

const AWSName = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: #fde68a;
`;

const AWSType = styled.div`
  font-size: 8px;
  color: rgba(245, 158, 11, 0.5);
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const DatabaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const DatabaseItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 0.75rem;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid #1e293b;
  transition: background 0.2s;
`;

const DatabaseIcon = styled.div<{ color?: string }>`
  margin-bottom: 0.5rem;
  opacity: 0.8;
  color: ${({ color }) => color || '#64748b'};
`;

const DatabaseName = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: #e2e8f0;
`;

const DatabaseType = styled.div`
  font-size: 8px;
  color: #64748b;
  font-family: ${({ theme }) => theme.fonts.mono};
  margin-top: 2px;
  text-transform: uppercase;
`;

// Card Component
interface CardProps {
  title: string;
  sub?: string;
  icon: React.ElementType;
  color?: string;
  tags?: string[];
}

const Card: React.FC<CardProps> = ({ title, sub, icon: Icon, color = 'slate', tags = [] }) => (
  <CardContainer color={color}>
    <CardHeader>
      <CardIconWrapper>
        <Icon size={16} />
      </CardIconWrapper>
      <CardInfo>
        <CardTitle>{title}</CardTitle>
        {sub && <CardSub>{sub}</CardSub>}
      </CardInfo>
    </CardHeader>
    {tags.length > 0 && (
      <TagsContainer>
        {tags.map((tag, i) => (
          <Tag key={i}>{tag}</Tag>
        ))}
      </TagsContainer>
    )}
  </CardContainer>
);

// Label Component
interface LabelProps {
  text: string;
  icon?: React.ElementType;
  align?: 'center' | 'left' | 'right';
}

const Label: React.FC<LabelProps> = ({ text, icon: Icon, align = 'center' }) => (
  <LabelContainer align={align}>
    {Icon && <Icon size={10} />}
    <span>{text}</span>
  </LabelContainer>
);

// Connection Component
interface ConnectionProps {
  height?: string;
  label?: string | null;
}

const ConnectionVertical: React.FC<ConnectionProps> = ({ height, label }) => (
  <ConnectionContainer height={height}>
    <ConnectionLine>
      <ConnectionFlow />
    </ConnectionLine>
    {label && <ConnectionLabel>{label}</ConnectionLabel>}
  </ConnectionContainer>
);

// Main Component
export const WeneedsArchitecture: React.FC = () => {
  return (
    <ArchSection>
      <GridBackground />

      <Container>
        <Header>
          <Title>Full-Stack Ecosystem Architecture</Title>
          <TitleBar />
          <Subtitle>
            Infrastructure distribuée hybride (Event-driven & Direct HTTP) intégrant une couche IA multi-agents et des services cloud AWS.
          </Subtitle>
        </Header>

        {/* LAYER 1: FRONTEND & EXTERNAL CONNECTORS */}
        <Layer1Grid>
          {/* External Business APIs */}
          <SidePanel>
            <Label text="Business APIs" icon={ExternalLink} align="left" />
            <ApiList>
              {['Stripe', 'Pappers', 'RapidAPI', 'Calendly'].map(api => (
                <ApiItem key={api}>
                  <ApiDot color="#6366f1" /> {api}
                </ApiItem>
              ))}
            </ApiList>
          </SidePanel>

          {/* Main Frontend */}
          <MainPanel>
            <Label text="Frontend Tier" icon={LayoutDashboard} />
            <CardGrid>
              <Card title="Web Application" sub="Next.js :4200" icon={Globe} color="blue" tags={['Redux', 'React Query', 'Socket.IO']} />
              <Card title="Admin Dashboard" sub="React :4201" icon={ShieldCheck} color="blue" tags={['40+ Pages', 'Analytics']} />
            </CardGrid>
          </MainPanel>

          {/* Monitoring & Auth */}
          <SidePanelRight>
            <Label text="Security & Monitoring" icon={Lock} align="right" />
            <ApiList>
              {['Sentry', 'Firebase Auth', 'Langfuse'].map(svc => (
                <ApiItem key={svc} style={{ justifyContent: 'flex-end' }}>
                  {svc} <ApiDot color="#ec4899" />
                </ApiItem>
              ))}
            </ApiList>
          </SidePanelRight>
        </Layer1Grid>

        <ConnectionVertical height="4rem" label="OpenAPI Generated Client" />

        {/* LAYER 2: API GATEWAY */}
        <GatewayContainer>
          <GatewayCard>
            <GatewayLabelWrapper>
              <Label text="NestJS API Gateway" icon={Server} />
            </GatewayLabelWrapper>
            <GatewayContent>
              <GatewayInfo>
                <Zap size={12} />
                <span style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>NestJS Port: 3011 • 40+ Modules</span>
              </GatewayInfo>
              <ModulesGrid>
                {['Auth', 'Jobs', 'Admin', 'LLM Svc', 'Kafka Prod'].map((m, i) => (
                  <ModuleItem key={i}>{m}</ModuleItem>
                ))}
              </ModulesGrid>
            </GatewayContent>
          </GatewayCard>
        </GatewayContainer>

        {/* LAYER 3: SPLIT (KAFKA vs AI) */}
        <SplitGrid>
          {/* LEFT: ASYNC MICROSERVICES */}
          <SplitColumn>
            <VerticalLine side="left" />
            <EventBusCard>
              <EventBusIcon><Activity size={18} /></EventBusIcon>
              <EventBusInfo>
                <EventBusTitle>Kafka Event Bus</EventBusTitle>
                <EventBusSub>Async Message Dispatch</EventBusSub>
              </EventBusInfo>
            </EventBusCard>
            <Label text="Kafka Consumers Tier" icon={Cpu} align="left" />
            <ServicesGrid>
              <Card title="Payment Svc" sub=":3010" icon={CreditCard} color="slate" tags={['Stripe']} />
              <Card title="Mail Svc" sub=":3002" icon={Mail} color="slate" tags={['AWS SES']} />
              <Card title="Notification" sub=":3000" icon={Bell} color="slate" tags={['Firebase']} />
              <Card title="FFmpeg Svc" sub=":3001" icon={Video} color="slate" tags={['S3 Storage']} />
            </ServicesGrid>
          </SplitColumn>

          {/* RIGHT: FASTAPI AI CLUSTER */}
          <SplitColumn>
            <VerticalLine side="right" />
            <FastAPICard>
              <FastAPIIcon><Network size={20} /></FastAPIIcon>
              <FastAPIInfo>
                <FastAPITitle>
                  FastAPI Nanoservice <span>:8000</span>
                </FastAPITitle>
                <FastAPISub>Direct HTTP AI Gateway</FastAPISub>
              </FastAPIInfo>
            </FastAPICard>
            <Label text="AI Agents Cluster" icon={Bot} align="right" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <ServicesGrid>
                <Card title="Orchestrator" sub="LangGraph" icon={MessageSquare} color="emerald" tags={['Multi-Agent']} />
                <Card title="Matching" sub="Scoring" icon={Users} color="emerald" tags={['Vector Search']} />
                <Card title="CV & Score" sub="Parsing" icon={FileText} color="emerald" tags={['Extraction']} />
                <Card title="Interview" sub="Analysis" icon={BarChart3} color="emerald" tags={['GenAI']} />
              </ServicesGrid>
              <LLMConnections>
                <LLMLabel>Connected to:</LLMLabel>
                {['OpenAI', 'Anthropic', 'Mistral', 'Tavily'].map(llm => (
                  <LLMItem key={llm}>{llm}</LLMItem>
                ))}
              </LLMConnections>
            </div>
          </SplitColumn>
        </SplitGrid>

        {/* LAYER 4: CLOUD & DATA */}
        <CloudDataSection>
          <CloudDataGrid>
            {/* AWS Cloud */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Label text="AWS Cloud Infrastructure" icon={Cloud} align="left" />
              <AWSGrid>
                {[
                  { n: 'S3', d: 'Storage' },
                  { n: 'SES', d: 'Email' },
                  { n: 'CloudFront', d: 'CDN' },
                  { n: 'EKS', d: 'K8s Cluster' }
                ].map(aws => (
                  <AWSItem key={aws.n}>
                    <AWSName>{aws.n}</AWSName>
                    <AWSType>{aws.d}</AWSType>
                  </AWSItem>
                ))}
              </AWSGrid>
            </div>

            {/* Data Persistence */}
            <div>
              <Label text="Persistence Tier" icon={Database} />
              <DatabaseGrid>
                {[
                  { name: 'PostgreSQL', type: 'Core', color: '#60a5fa' },
                  { name: 'MongoDB', type: 'Logs', color: '#34d399' },
                  { name: 'Redis', type: 'Cache', color: '#f87171' },
                  { name: 'Weaviate', type: 'Vector', color: '#a78bfa' },
                  { name: 'Elastic', type: 'Search', color: '#facc15' }
                ].map((db, i) => (
                  <DatabaseItem key={i}>
                    <DatabaseIcon color={db.color}><Database size={18} /></DatabaseIcon>
                    <DatabaseName>{db.name}</DatabaseName>
                    <DatabaseType>{db.type}</DatabaseType>
                  </DatabaseItem>
                ))}
              </DatabaseGrid>
            </div>
          </CloudDataGrid>
        </CloudDataSection>
      </Container>
    </ArchSection>
  );
};
