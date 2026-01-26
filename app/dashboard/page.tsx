'use client';

import { useEffect, useState } from 'react';
import * as S from './dashboard.styles';

type TabType = 'overview' | 'providers' | 'errors' | 'visitors';

interface Session {
  _id: string;
  ip: string;
  userAgent?: string;
  country?: string;
  countryCode?: string;
  city?: string;
  region?: string;
  device?: string;
  browser?: string;
  lastActivity: string;
  createdAt: string;
  messageCount: number;
  viewed: boolean;
  archived: boolean;
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

interface ProviderErrorLog {
  _id: string;
  provider: string;
  errorType: 'timeout' | 'quota' | 'rate_limit' | 'other';
  errorMessage: string;
  fallbackUsed?: string;
  createdAt: string;
}

interface ErrorStats {
  _id: string;
  errors: { type: string; count: number }[];
  total: number;
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
  const [providerErrors, setProviderErrors] = useState<ProviderErrorLog[]>([]);
  const [errorStats, setErrorStats] = useState<ErrorStats[]>([]);
  const [enriching, setEnriching] = useState(false);
  const [enrichResult, setEnrichResult] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [newCount, setNewCount] = useState(0);
  const [showArchived, setShowArchived] = useState(false);

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
      loadProviderErrors();
      const interval = setInterval(() => {
        loadStats();
        loadSessions();
        loadProviderConfig();
        loadProviderStats();
        loadProviderErrors();
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

  const loadSessions = async (includeArchived = showArchived) => {
    try {
      const url = includeArchived ? '/api/admin/sessions?archived=true' : '/api/admin/sessions';
      const data = await fetchWithAuth(url);
      setSessions(data.sessions || []);
      setNewCount(data.newCount || 0);
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

  const loadProviderErrors = async () => {
    try {
      const data = await fetchWithAuth('/api/admin/errors');
      setProviderErrors(data.errors || []);
      setErrorStats(data.stats || []);
    } catch (err) {
      console.error('Error loading provider errors:', err);
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

  const enrichSessions = async () => {
    if (enriching) return;
    setEnriching(true);
    setEnrichResult(null);
    try {
      const data = await fetchWithAuth('/api/admin/sessions/enrich', {
        method: 'POST',
      });
      setEnrichResult(data.message);
      await loadSessions();
    } catch (err) {
      console.error('Error enriching sessions:', err);
      setEnrichResult('Erreur lors de l\'enrichissement');
    } finally {
      setEnriching(false);
    }
  };

  const archiveSession = async (sessionId: string) => {
    try {
      await fetchWithAuth('/api/admin/sessions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionIds: [sessionId], action: 'archive' }),
      });
      await loadSessions();
      setSelectedSession(null);
    } catch (err) {
      console.error('Error archiving session:', err);
    }
  };

  const markAllAsViewed = async () => {
    alert('Fonction appelée!');
    try {
      const result = await fetchWithAuth('/api/admin/sessions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'markAllViewed' }),
      });
      alert('Résultat: ' + JSON.stringify(result));
      await loadSessions();
    } catch (err: any) {
      alert('Erreur: ' + err.message);
      console.error('Error marking all as viewed:', err);
    }
  };

  const toggleShowArchived = () => {
    const newValue = !showArchived;
    setShowArchived(newValue);
    loadSessions(newValue);
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
      // Update local state to mark as viewed
      setSessions(prev => prev.map(s =>
        s._id === sessionId ? { ...s, viewed: true } : s
      ));
      setNewCount(prev => Math.max(0, prev - 1));
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


  // Get relative time (e.g., "il y a 5 min")
  const getTimeAgo = (dateStr: string): string => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'A l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return date.toLocaleDateString('fr-FR');
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

  const refreshAll = () => {
    loadStats();
    loadSessions();
    loadProviderConfig();
    loadProviderStats();
    loadProviderErrors();
  };

  return (
    <S.PageContainer>
      <S.Container>
        <S.Header>
          <S.Title>Portfolio Analytics</S.Title>
          <S.ButtonGroup>
            <S.Button onClick={refreshAll}>
              Actualiser
            </S.Button>
            <S.Button $variant="danger" onClick={handleLogout}>
              Deconnexion
            </S.Button>
          </S.ButtonGroup>
        </S.Header>

        {/* Desktop Tab Navigation */}
        <S.TabNav>
          <S.TabButton $active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
            Vue d&apos;ensemble
          </S.TabButton>
          <S.TabButton $active={activeTab === 'providers'} onClick={() => setActiveTab('providers')}>
            Providers
          </S.TabButton>
          <S.TabButton $active={activeTab === 'errors'} onClick={() => setActiveTab('errors')}>
            Erreurs {providerErrors.length > 0 && `(${providerErrors.length})`}
          </S.TabButton>
          <S.TabButton $active={activeTab === 'visitors'} onClick={() => setActiveTab('visitors')}>
            Visiteurs ({sessions.length}) {newCount > 0 && <S.NewBadge>{newCount} new</S.NewBadge>}
          </S.TabButton>
        </S.TabNav>

        {/* Stats Grid - Always visible */}
        <S.StatsGrid>
            <S.StatCard $color="#10b981">
              <S.StatLabel>Sessions</S.StatLabel>
              <S.StatValue>{stats?.totalSessions?.toLocaleString() || '-'}</S.StatValue>
              <S.StatSubtext>Visiteurs</S.StatSubtext>
            </S.StatCard>
            <S.StatCard $color="#3b82f6">
              <S.StatLabel>Messages</S.StatLabel>
              <S.StatValue>{stats?.totalMessages?.toLocaleString() || '-'}</S.StatValue>
              <S.StatSubtext>Total</S.StatSubtext>
            </S.StatCard>
            <S.StatCard $color="#a855f7">
              <S.StatLabel>Requetes</S.StatLabel>
              <S.StatValue>{requests.toLocaleString()}</S.StatValue>
              <S.StatSubtext>Aujourd&apos;hui</S.StatSubtext>
            </S.StatCard>
            <S.StatCard $color="#f97316">
              <S.StatLabel>Tokens</S.StatLabel>
              <S.StatValue>{formatNumber(tokensIn + tokensOut)}</S.StatValue>
              <S.StatSubtext>Aujourd&apos;hui</S.StatSubtext>
            </S.StatCard>
          </S.StatsGrid>

        {/* Provider Selector Section */}
        {(activeTab === 'overview' || activeTab === 'providers') && (
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
        )}

        {/* Provider Stats Section */}
        {activeTab === 'providers' && (
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
        )}

        {/* Provider Errors Section */}
        {(activeTab === 'overview' || activeTab === 'errors') && (
        <S.Section>
          <S.SectionTitle>
            Erreurs Providers (24h)
            {providerErrors.length === 0 && <span style={{ color: '#10b981', marginLeft: '12px', fontSize: '14px' }}>✓ Aucune erreur</span>}
            {providerErrors.length > 0 && <span style={{ color: '#ef4444', marginLeft: '12px', fontSize: '14px' }}>{providerErrors.length} erreur(s)</span>}
          </S.SectionTitle>

          {/* Error Stats Summary */}
          {errorStats.length > 0 && (
            <S.ErrorStatsGrid style={{ marginBottom: '16px' }}>
              {errorStats.map((stat) => (
                <S.ErrorStatCard key={stat._id} $type={stat.errors[0]?.type as any || 'other'}>
                  <S.ErrorStatValue>{stat.total}</S.ErrorStatValue>
                  <S.ErrorStatLabel>{stat._id}</S.ErrorStatLabel>
                </S.ErrorStatCard>
              ))}
            </S.ErrorStatsGrid>
          )}

            {/* Error List */}
            <S.ErrorList>
              {providerErrors.slice(0, 15).map((error) => (
                <S.ErrorItem key={error._id}>
                  <S.ErrorIcon $type={error.errorType}>
                    {error.errorType === 'timeout' ? '⏱' :
                     error.errorType === 'quota' ? '🚫' :
                     error.errorType === 'rate_limit' ? '⚡' : '❌'}
                  </S.ErrorIcon>
                  <S.ErrorDetails>
                    <S.ErrorProvider>
                      {error.provider}
                      <S.ErrorArrow>→</S.ErrorArrow>
                      <span style={{ color: '#10b981' }}>{error.fallbackUsed || 'echec'}</span>
                    </S.ErrorProvider>
                    <S.ErrorTime>{new Date(error.createdAt).toLocaleString('fr-FR')}</S.ErrorTime>
                  </S.ErrorDetails>
                  <S.ErrorTypeBadge $type={error.errorType}>
                    {error.errorType === 'timeout' ? 'Timeout 15s' :
                     error.errorType === 'quota' ? 'Quota' :
                     error.errorType === 'rate_limit' ? 'Rate Limit' : 'Erreur'}
                  </S.ErrorTypeBadge>
                </S.ErrorItem>
              ))}
              {providerErrors.length === 0 && (
                <S.EmptyState style={{ padding: '24px' }}>Tous les providers fonctionnent normalement</S.EmptyState>
              )}
            </S.ErrorList>
        </S.Section>
        )}

        {/* Visitors Section */}
        {(activeTab === 'overview' || activeTab === 'visitors') && (
        <S.Section>
          <S.SectionHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <S.SectionTitle style={{ marginBottom: 0 }}>
                Visiteurs ({sessions.length})
                {newCount > 0 && <S.NewBadge style={{ marginLeft: '8px' }}>{newCount} new</S.NewBadge>}
              </S.SectionTitle>
            </div>
            <S.ActionButtons>
              {newCount > 0 && (
                <S.Button onClick={markAllAsViewed} $variant="secondary">
                  Tout marquer lu
                </S.Button>
              )}
              <S.ToggleButton $active={showArchived} onClick={toggleShowArchived}>
                {showArchived ? 'Masquer archives' : 'Voir archives'}
              </S.ToggleButton>
              {enrichResult && <span style={{ fontSize: '13px', color: '#10b981' }}>{enrichResult}</span>}
              {sessions.some(s => !s.country) && (
                <S.Button onClick={enrichSessions} disabled={enriching} $variant="secondary">
                  {enriching ? '...' : 'Geo'}
                </S.Button>
              )}
            </S.ActionButtons>
          </S.SectionHeader>
          <S.SessionList>
            {sessions.length === 0 ? (
              <S.EmptyState>Aucun visiteur pour le moment</S.EmptyState>
            ) : (
              sessions.map((session) => (
                <S.VisitorCard key={session._id} $isNew={!session.viewed} $isArchived={session.archived} onClick={() => viewMessages(session._id, session.ip)}>
                  <S.CountryBadge $code={session.countryCode || ''}>
                    {session.countryCode || '??'}
                  </S.CountryBadge>
                  <S.VisitorInfo>
                    <S.VisitorLocation>
                      {!session.viewed && <S.NewDot />}
                      {session.city || session.country || 'Inconnu'}
                      {session.country && session.city && `, ${session.country}`}
                      <S.VisitorIP>{session.ip}</S.VisitorIP>
                    </S.VisitorLocation>
                    <S.VisitorMeta>
                      {session.device && <S.DeviceBadge>{session.device}</S.DeviceBadge>}
                      {session.browser && <S.BrowserBadge>{session.browser}</S.BrowserBadge>}
                      {session.archived && <S.ArchivedBadge>Archive</S.ArchivedBadge>}
                    </S.VisitorMeta>
                  </S.VisitorInfo>
                  <S.VisitorTime>
                    <S.VisitorTimeAgo>{getTimeAgo(session.lastActivity)}</S.VisitorTimeAgo>
                    <S.VisitorDate>{new Date(session.createdAt).toLocaleDateString('fr-FR')}</S.VisitorDate>
                  </S.VisitorTime>
                  <S.VisitorStats>
                    <S.MessageBadge $active={session.messageCount > 0}>
                      {session.messageCount} msg
                    </S.MessageBadge>
                    <S.MobileTimeLabel>{getTimeAgo(session.lastActivity)}</S.MobileTimeLabel>
                  </S.VisitorStats>
                </S.VisitorCard>
              ))
            )}
          </S.SessionList>
        </S.Section>
        )}
      </S.Container>

      {/* Mobile Bottom Navigation */}
      <S.MobileNav>
        <S.MobileNavButton $active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
          <S.MobileNavIcon>📊</S.MobileNavIcon>
          <S.MobileNavLabel>Stats</S.MobileNavLabel>
        </S.MobileNavButton>
        <S.MobileNavButton $active={activeTab === 'providers'} onClick={() => setActiveTab('providers')}>
          <S.MobileNavIcon>🤖</S.MobileNavIcon>
          <S.MobileNavLabel>Providers</S.MobileNavLabel>
        </S.MobileNavButton>
        <S.MobileNavButton $active={activeTab === 'errors'} onClick={() => setActiveTab('errors')}>
          <S.MobileNavIcon>⚠️</S.MobileNavIcon>
          <S.MobileNavLabel>Erreurs</S.MobileNavLabel>
        </S.MobileNavButton>
        <S.MobileNavButton $active={activeTab === 'visitors'} onClick={() => setActiveTab('visitors')}>
          {newCount > 0 && <S.MobileNavBadge>{newCount}</S.MobileNavBadge>}
          <S.MobileNavIcon>👥</S.MobileNavIcon>
          <S.MobileNavLabel>Visiteurs</S.MobileNavLabel>
        </S.MobileNavButton>
      </S.MobileNav>

      {selectedSession && (
        <S.ModalOverlay onClick={() => setSelectedSession(null)}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>Conversation</S.ModalTitle>
              <S.ModalActions>
                <S.ArchiveButton onClick={() => archiveSession(selectedSession.id)}>
                  Archiver
                </S.ArchiveButton>
                <S.CloseButton onClick={() => setSelectedSession(null)}>&times;</S.CloseButton>
              </S.ModalActions>
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
