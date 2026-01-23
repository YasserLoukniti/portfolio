'use client';

import { useEffect, useState } from 'react';
import * as S from './dashboard.styles';

interface Session {
  _id: string;
  ip: string;
  userAgent?: string;
  lastActivity: string;
  messageCount: number;
}

interface Message {
  _id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface Stats {
  totalSessions: number;
  totalMessages: number;
  todayUsage: {
    requests: number;
    tokensIn: number;
    tokensOut: number;
  };
}

interface ProviderLimits {
  rpm: number;
  tpm: number;
  rpd: number;
  tpd: number;
}

interface ProviderQuota {
  requestsUsed: number;
  tokensUsed: number;
  requestsLimit: number;
  tokensLimit: number;
  percentRequests: number;
  percentTokens: number;
  hasQuota: boolean;
}

interface Provider {
  name: string;
  displayName: string;
  model: string;
  description: string;
  limits: ProviderLimits;
  available: boolean;
  quota: ProviderQuota | null;
}

interface ProviderConfig {
  activeProvider: string;
  fallbackOrder: string[];
  providers: Provider[];
}

interface ProviderStats {
  provider: string;
  displayName: string;
  todayRequests: number;
  todayTokensIn: number;
  todayTokensOut: number;
  weekRequests: number;
  weekTokensIn: number;
  weekTokensOut: number;
}

export default function DashboardPage() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<{ id: string; ip: string } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [providerConfig, setProviderConfig] = useState<ProviderConfig | null>(null);
  const [providerStats, setProviderStats] = useState<ProviderStats[]>([]);
  const [changingProvider, setChangingProvider] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      setToken(savedToken);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      loadStats();
      loadSessions();
      loadProviderConfig();
      loadProviderStats();
      const interval = setInterval(() => {
        loadStats();
        loadSessions();
        loadProviderConfig();
        loadProviderStats();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [token]);

  const fetchWithAuth = async (url: string, options?: RequestInit) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 401) {
      localStorage.removeItem('admin_token');
      setToken(null);
      throw new Error('Unauthorized');
    }
    return res.json();
  };

  const loadStats = async () => {
    try {
      const data = await fetchWithAuth('/api/admin/stats');
      setStats(data);
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const loadSessions = async () => {
    try {
      const data = await fetchWithAuth('/api/admin/sessions');
      setSessions(data);
    } catch (err) {
      console.error('Error loading sessions:', err);
    }
  };

  const loadProviderConfig = async () => {
    try {
      const data = await fetchWithAuth('/api/admin/provider');
      setProviderConfig(data);
    } catch (err) {
      console.error('Error loading provider config:', err);
    }
  };

  const loadProviderStats = async () => {
    try {
      const data = await fetchWithAuth('/api/admin/stats/providers');
      setProviderStats(data.providers || []);
    } catch (err) {
      console.error('Error loading provider stats:', err);
    }
  };

  const changeProvider = async (providerName: string) => {
    if (changingProvider) return;
    setChangingProvider(true);
    try {
      await fetchWithAuth('/api/admin/provider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activeProvider: providerName }),
      });
      await loadProviderConfig();
    } catch (err) {
      console.error('Error changing provider:', err);
    } finally {
      setChangingProvider(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError('');
    const form = e.currentTarget;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error('Identifiants invalides');
      }

      const data = await res.json();
      localStorage.setItem('admin_token', data.access_token);
      setToken(data.access_token);
    } catch (err: any) {
      setLoginError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
  };

  const viewMessages = async (sessionId: string, ip: string) => {
    setSelectedSession({ id: sessionId, ip });
    setMessagesLoading(true);
    try {
      const data = await fetchWithAuth(`/api/admin/sessions/${sessionId}/messages`);
      setMessages(data);
    } catch (err) {
      console.error('Error loading messages:', err);
    } finally {
      setMessagesLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (isLoading) {
    return <S.LoadingContainer>Chargement...</S.LoadingContainer>;
  }

  if (!token) {
    return (
      <S.LoginContainer>
        <S.LoginCard>
          <S.LoginTitle>Dashboard Admin</S.LoginTitle>
          <S.LoginSubtitle>Connectez-vous pour acceder aux statistiques</S.LoginSubtitle>

          {loginError && <S.ErrorMessage>{loginError}</S.ErrorMessage>}

          <form onSubmit={handleLogin}>
            <S.FormGroup>
              <S.Label>Nom d&apos;utilisateur</S.Label>
              <S.Input type="text" name="username" placeholder="admin" required />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>Mot de passe</S.Label>
              <S.Input type="password" name="password" placeholder="********" required />
            </S.FormGroup>
            <S.Button type="submit" $variant="primary" style={{ width: '100%' }}>
              Se connecter
            </S.Button>
          </form>
        </S.LoginCard>
      </S.LoginContainer>
    );
  }

  const requests = stats?.todayUsage?.requests || 0;
  const tokensIn = stats?.todayUsage?.tokensIn || 0;
  const tokensOut = stats?.todayUsage?.tokensOut || 0;
  const activeProvider = providerConfig?.activeProvider || 'gemini';

  return (
    <S.PageContainer>
      <S.Container>
        <S.Header>
          <S.Title>Portfolio Analytics</S.Title>
          <S.ButtonGroup>
            <S.Button onClick={() => { loadStats(); loadSessions(); loadProviderConfig(); loadProviderStats(); }}>
              Actualiser
            </S.Button>
            <S.Button $variant="danger" onClick={handleLogout}>
              Deconnexion
            </S.Button>
          </S.ButtonGroup>
        </S.Header>

        <S.StatsGrid>
          <S.StatCard $color="#10b981">
            <S.StatLabel>Sessions totales</S.StatLabel>
            <S.StatValue>{stats?.totalSessions?.toLocaleString() || '-'}</S.StatValue>
            <S.StatSubtext>Visiteurs uniques</S.StatSubtext>
          </S.StatCard>
          <S.StatCard $color="#3b82f6">
            <S.StatLabel>Messages totaux</S.StatLabel>
            <S.StatValue>{stats?.totalMessages?.toLocaleString() || '-'}</S.StatValue>
            <S.StatSubtext>Conversations</S.StatSubtext>
          </S.StatCard>
          <S.StatCard $color="#a855f7">
            <S.StatLabel>Requetes aujourd&apos;hui</S.StatLabel>
            <S.StatValue>{requests.toLocaleString()}</S.StatValue>
            <S.StatSubtext>Appels API LLM</S.StatSubtext>
          </S.StatCard>
          <S.StatCard $color="#f97316">
            <S.StatLabel>Tokens aujourd&apos;hui</S.StatLabel>
            <S.StatValue>{formatNumber(tokensIn + tokensOut)}</S.StatValue>
            <S.StatSubtext>In + Out</S.StatSubtext>
          </S.StatCard>
        </S.StatsGrid>

        {/* Provider Selector Section */}
        <S.Section>
          <S.SectionTitle>Provider LLM Actif</S.SectionTitle>
          <S.ProviderGrid>
            {providerConfig?.providers.map((provider) => (
              <S.ProviderCard
                key={provider.name}
                $active={activeProvider === provider.name}
                $available={provider.available}
                $hasQuota={provider.quota?.hasQuota ?? true}
                onClick={() => provider.available && provider.quota?.hasQuota && changeProvider(provider.name)}
              >
                <S.ProviderHeader>
                  <S.ProviderName>{provider.displayName}</S.ProviderName>
                  {activeProvider === provider.name && (
                    <S.ActiveBadge>Actif</S.ActiveBadge>
                  )}
                  {!provider.available && (
                    <S.UnavailableBadge>Non configure</S.UnavailableBadge>
                  )}
                  {provider.available && provider.quota && !provider.quota.hasQuota && (
                    <S.QuotaExhaustedBadge>Quota epuise</S.QuotaExhaustedBadge>
                  )}
                </S.ProviderHeader>
                <S.ProviderModel>{provider.model}</S.ProviderModel>

                {provider.available && provider.quota && (
                  <S.QuotaSection>
                    {provider.limits.rpd > 0 && (
                      <S.QuotaRow>
                        <S.QuotaLabel>Requetes</S.QuotaLabel>
                        <S.QuotaValue>{provider.quota.requestsUsed} / {formatNumber(provider.limits.rpd)}</S.QuotaValue>
                        <S.QuotaBar>
                          <S.QuotaFill $percent={provider.quota.percentRequests} />
                        </S.QuotaBar>
                      </S.QuotaRow>
                    )}
                    {provider.limits.tpd > 0 && (
                      <S.QuotaRow>
                        <S.QuotaLabel>Tokens</S.QuotaLabel>
                        <S.QuotaValue>{formatNumber(provider.quota.tokensUsed)} / {formatNumber(provider.limits.tpd)}</S.QuotaValue>
                        <S.QuotaBar>
                          <S.QuotaFill $percent={provider.quota.percentTokens} />
                        </S.QuotaBar>
                      </S.QuotaRow>
                    )}
                  </S.QuotaSection>
                )}

                {!provider.available && (
                  <S.ProviderLimit>{provider.description}</S.ProviderLimit>
                )}
              </S.ProviderCard>
            ))}
          </S.ProviderGrid>
        </S.Section>

        {/* Provider Stats Section */}
        <S.Section>
          <S.SectionTitle>Statistiques par Provider (7 jours)</S.SectionTitle>
          <S.ProviderStatsGrid>
            {providerStats.filter(p => p.todayRequests > 0 || p.weekRequests > 0).map((stat) => (
              <S.ProviderStatCard key={stat.provider}>
                <S.ProviderStatName>{stat.displayName}</S.ProviderStatName>
                <S.ProviderStatRow>
                  <span>Aujourd&apos;hui</span>
                  <span>{stat.todayRequests} req / {formatNumber(stat.todayTokensIn + stat.todayTokensOut)} tokens</span>
                </S.ProviderStatRow>
                <S.ProviderStatRow>
                  <span>7 derniers jours</span>
                  <span>{stat.weekRequests} req / {formatNumber(stat.weekTokensIn + stat.weekTokensOut)} tokens</span>
                </S.ProviderStatRow>
              </S.ProviderStatCard>
            ))}
            {providerStats.filter(p => p.todayRequests > 0 || p.weekRequests > 0).length === 0 && (
              <S.EmptyState>Aucune statistique disponible</S.EmptyState>
            )}
          </S.ProviderStatsGrid>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Sessions recentes</S.SectionTitle>
          <S.SessionList>
            {sessions.length === 0 ? (
              <S.EmptyState>Aucune session pour le moment</S.EmptyState>
            ) : (
              sessions.map((session) => (
                <S.SessionItem key={session._id} onClick={() => viewMessages(session._id, session.ip)}>
                  <S.SessionInfo>
                    <S.SessionAvatar>
                      {session.ip.split('.').slice(0, 2).join('.')}
                    </S.SessionAvatar>
                    <S.SessionDetails>
                      <S.SessionIP>{session.ip}</S.SessionIP>
                      <S.SessionDate>{new Date(session.lastActivity).toLocaleString('fr-FR')}</S.SessionDate>
                    </S.SessionDetails>
                  </S.SessionInfo>
                  <S.MessageBadge $active={session.messageCount > 0}>
                    {session.messageCount} msg
                  </S.MessageBadge>
                </S.SessionItem>
              ))
            )}
          </S.SessionList>
        </S.Section>
      </S.Container>

      {selectedSession && (
        <S.ModalOverlay onClick={() => setSelectedSession(null)}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>Conversation - {selectedSession.ip}</S.ModalTitle>
              <S.CloseButton onClick={() => setSelectedSession(null)}>&times;</S.CloseButton>
            </S.ModalHeader>
            <S.ModalBody>
              {messagesLoading ? (
                <S.EmptyState>Chargement...</S.EmptyState>
              ) : messages.length === 0 ? (
                <S.EmptyState>Aucun message</S.EmptyState>
              ) : (
                messages.map((msg) => (
                  <S.MessageContainer key={msg._id} $isUser={msg.role === 'user'}>
                    <S.MessageRole $isUser={msg.role === 'user'}>
                      {msg.role === 'user' ? 'Visiteur' : 'Assistant'}
                    </S.MessageRole>
                    <S.MessageBubble $isUser={msg.role === 'user'}>
                      {msg.content}
                    </S.MessageBubble>
                  </S.MessageContainer>
                ))
              )}
            </S.ModalBody>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.PageContainer>
  );
}
