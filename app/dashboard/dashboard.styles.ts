import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  color: #e2e8f0;
  padding: 16px;
  padding-bottom: 80px;

  @media (min-width: 768px) {
    padding: 32px;
    padding-bottom: 32px;
  }
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;

  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(90deg, #34d399, #22d3ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;

  @media (min-width: 768px) {
    gap: 16px;
  }
`;

// Tab Navigation
export const TabNav = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    background: rgba(15, 23, 42, 0.5);
    padding: 6px;
    border-radius: 12px;
    overflow-x: auto;
  }
`;

export const TabButton = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;

  ${({ $active }) => $active
    ? `
      background: linear-gradient(90deg, #10b981, #059669);
      color: white;
    `
    : `
      background: transparent;
      color: #94a3b8;
      &:hover { background: rgba(255, 255, 255, 0.05); }
    `
  }
`;

// Mobile Bottom Navigation
export const MobileNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  z-index: 100;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileNavButton = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 8px;
  min-width: 64px;
  position: relative;

  ${({ $active }) => $active
    ? `
      color: #10b981;
      background: rgba(16, 185, 129, 0.1);
    `
    : `
      color: #64748b;
    `
  }
`;

export const MobileNavIcon = styled.span`
  font-size: 20px;
`;

export const MobileNavLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
`;

export const MobileNavBadge = styled.span`
  position: absolute;
  top: 2px;
  right: 8px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
`;

export const Button = styled.button<{ $variant?: 'primary' | 'danger' | 'secondary' }>`
  padding: 8px 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 13px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  @media (min-width: 768px) {
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 14px;
  }

  ${({ $variant }) => {
    switch ($variant) {
      case 'danger':
        return `
          background: linear-gradient(90deg, #dc2626, #b91c1c);
          color: white;
          &:hover { box-shadow: 0 8px 24px rgba(220, 38, 38, 0.3); }
        `;
      case 'primary':
        return `
          background: linear-gradient(90deg, #10b981, #059669);
          color: white;
          &:hover { box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3); }
        `;
      default:
        return `
          background: #1e293b;
          color: #94a3b8;
          border: 1px solid #334155;
          &:hover { background: #334155; }
        `;
    }
  }}
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-bottom: 32px;
  }
`;

export const StatCard = styled.div<{ $color: string }>`
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(10px);
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 28px;
    border-radius: 16px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${({ $color }) => $color}, transparent);
  }
`;

export const StatLabel = styled.h3`
  color: #64748b;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;

  @media (min-width: 768px) {
    font-size: 11px;
    letter-spacing: 0.1em;
    margin-bottom: 12px;
  }
`;

export const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: white;

  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

export const StatSubtext = styled.div`
  color: #64748b;
  font-size: 11px;
  margin-top: 4px;

  @media (min-width: 768px) {
    font-size: 13px;
    margin-top: 8px;
  }
`;

export const Section = styled.div`
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(10px);
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 20px;

  @media (min-width: 768px) {
    padding: 28px;
    border-radius: 16px;
    margin-bottom: 32px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    font-size: 18px;
    margin-bottom: 24px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
`;

export const LimitItem = styled.div`
  background: rgba(15, 23, 42, 0.5);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const LimitHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const LimitLabel = styled.span`
  color: #94a3b8;
`;

export const LimitValue = styled.span`
  color: white;
  font-weight: 600;
`;

export const ProgressBar = styled.div`
  height: 10px;
  background: #334155;
  border-radius: 5px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  border-radius: 5px;
  transition: width 0.3s;
  width: ${({ $percent }) => Math.min($percent, 100)}%;
  background: ${({ $percent }) => {
    if ($percent < 50) return '#22c55e';
    if ($percent < 80) return '#eab308';
    return '#ef4444';
  }};
`;

export const SessionList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

export const SessionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s;

  &:hover {
    background: rgba(51, 65, 85, 0.5);
    border-color: rgba(16, 185, 129, 0.3);
  }
`;

export const SessionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SessionAvatar = styled.div`
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #10b981, #22d3ee);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
`;

export const SessionDetails = styled.div``;

export const SessionIP = styled.div`
  font-weight: 600;
  color: white;
`;

export const SessionDate = styled.div`
  font-size: 12px;
  color: #64748b;
`;

export const MessageBadge = styled.div<{ $active: boolean }>`
  padding: 6px 10px;
  border-radius: 16px;
  font-size: 11px;
  font-weight: 600;

  @media (min-width: 768px) {
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 13px;
  }

  ${({ $active }) => $active
    ? `background: linear-gradient(90deg, #10b981, #059669); color: white;`
    : `background: #334155; color: #64748b;`
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 48px;
  color: #64748b;
`;

// Login styles
export const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const LoginCard = styled.div`
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(20px);
  padding: 32px 24px;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: 768px) {
    padding: 48px;
    border-radius: 24px;
  }
`;

export const LoginTitle = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(90deg, #34d399, #22d3ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

export const LoginSubtitle = styled.p`
  text-align: center;
  color: #64748b;
  font-size: 14px;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    font-size: 16px;
    margin-bottom: 32px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  color: #94a3b8;
  font-size: 13px;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px;
  background: rgba(15, 23, 42, 0.6);
  border: 2px solid #334155;
  border-radius: 12px;
  color: white;
  font-size: 15px;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #10b981;
  }

  &::placeholder {
    color: #475569;
  }
`;

export const ErrorMessage = styled.div`
  background: rgba(185, 28, 28, 0.5);
  color: white;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 24px;
  text-align: center;
`;

// Modal
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 150;
  padding: 0;

  @media (min-width: 768px) {
    align-items: center;
    padding: 20px;
  }
`;

export const ModalContent = styled.div`
  background: linear-gradient(180deg, #1e293b, #0f172a);
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: 768px) {
    border-radius: 24px;
    max-width: 640px;
    max-height: 85vh;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #334155;

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

export const ModalTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

export const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: none;
  border-radius: 12px;
  font-size: 24px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
  }
`;

export const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

export const MessageContainer = styled.div<{ $isUser: boolean }>`
  max-width: 85%;
  margin-left: ${({ $isUser }) => $isUser ? 'auto' : '0'};
  margin-bottom: 20px;
`;

export const MessageRole = styled.div<{ $isUser: boolean }>`
  font-size: 11px;
  color: #64748b;
  margin-bottom: 4px;
  text-align: ${({ $isUser }) => $isUser ? 'right' : 'left'};
`;

export const MessageBubble = styled.div<{ $isUser: boolean }>`
  padding: 16px;
  border-radius: 16px;
  line-height: 1.5;
  ${({ $isUser }) => $isUser
    ? `
      background: linear-gradient(90deg, #2563eb, #1d4ed8);
      border-bottom-right-radius: 4px;
    `
    : `
      background: #1e293b;
      border: 1px solid #334155;
      border-bottom-left-radius: 4px;
    `
  }
`;

export const LoadingContainer = styled.div`
  min-height: 100vh;
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

// Provider styles
export const ProviderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
`;

export const ProviderCard = styled.div<{ $active: boolean; $available: boolean; $hasQuota?: boolean }>`
  background: ${({ $active, $hasQuota }) =>
    $active ? 'rgba(16, 185, 129, 0.15)' :
    $hasQuota === false ? 'rgba(239, 68, 68, 0.1)' : 'rgba(15, 23, 42, 0.5)'};
  border: 2px solid ${({ $active, $available, $hasQuota }) =>
    $active ? '#10b981' :
    $hasQuota === false ? 'rgba(239, 68, 68, 0.3)' :
    $available ? 'rgba(255, 255, 255, 0.1)' : 'rgba(100, 116, 139, 0.3)'};
  padding: 14px;
  border-radius: 10px;
  cursor: ${({ $available, $hasQuota }) => ($available && $hasQuota !== false) ? 'pointer' : 'not-allowed'};
  opacity: ${({ $available }) => $available ? 1 : 0.5};
  transition: all 0.2s;

  @media (min-width: 768px) {
    padding: 20px;
    border-radius: 12px;
  }

  &:hover {
    ${({ $available, $active, $hasQuota }) => $available && !$active && $hasQuota !== false && `
      border-color: rgba(16, 185, 129, 0.5);
      background: rgba(16, 185, 129, 0.05);
    `}
  }
`;

export const ProviderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const ProviderName = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: white;
`;

export const ActiveBadge = styled.span`
  background: linear-gradient(90deg, #10b981, #059669);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const UnavailableBadge = styled.span`
  background: #334155;
  color: #64748b;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
`;

export const QuotaExhaustedBadge = styled.span`
  background: linear-gradient(90deg, #dc2626, #b91c1c);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const QuotaSection = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const QuotaRow = styled.div`
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const QuotaLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #64748b;
  margin-bottom: 4px;
`;

export const QuotaValue = styled.span`
  color: #94a3b8;
  font-family: monospace;
  font-size: 11px;
`;

export const QuotaBar = styled.div`
  height: 6px;
  background: #334155;
  border-radius: 3px;
  overflow: hidden;
`;

export const QuotaFill = styled.div<{ $percent: number }>`
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s;
  width: ${({ $percent }) => Math.min($percent, 100)}%;
  background: ${({ $percent }) => {
    if ($percent < 50) return '#22c55e';
    if ($percent < 80) return '#eab308';
    return '#ef4444';
  }};
`;

export const ProviderModel = styled.div`
  color: #94a3b8;
  font-size: 13px;
  margin-bottom: 4px;
  font-family: monospace;
`;

export const ProviderLimit = styled.div`
  color: #64748b;
  font-size: 12px;
`;

export const ProviderStatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
`;

export const ProviderStatCard = styled.div`
  background: rgba(15, 23, 42, 0.5);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const ProviderStatName = styled.div`
  font-weight: 600;
  color: white;
  margin-bottom: 12px;
  font-size: 15px;
`;

export const ProviderStatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 13px;

  &:last-child {
    border-bottom: none;
  }

  span:first-child {
    color: #64748b;
  }

  span:last-child {
    color: #94a3b8;
    font-family: monospace;
  }
`;

// Error Section Styles
export const ErrorSection = styled.div`
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
`;

export const ErrorSectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #fca5a5;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '⚠️';
  }
`;

export const ErrorStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 20px;
  }
`;

export const ErrorStatCard = styled.div<{ $type: 'timeout' | 'quota' | 'rate_limit' | 'other' }>`
  background: rgba(15, 23, 42, 0.6);
  padding: 16px;
  border-radius: 12px;
  border-left: 4px solid ${({ $type }) => {
    switch ($type) {
      case 'timeout': return '#f59e0b';
      case 'quota': return '#ef4444';
      case 'rate_limit': return '#8b5cf6';
      default: return '#6b7280';
    }
  }};
`;

export const ErrorStatValue = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: white;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

export const ErrorStatLabel = styled.div`
  font-size: 10px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (min-width: 768px) {
    font-size: 12px;
  }
`;

export const ErrorList = styled.div`
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
`;

export const ErrorItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 8px;
  margin-bottom: 6px;

  @media (min-width: 768px) {
    gap: 12px;
    padding: 12px 16px;
    border-radius: 10px;
    margin-bottom: 8px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ErrorIcon = styled.div<{ $type: 'timeout' | 'quota' | 'rate_limit' | 'other' }>`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
  background: ${({ $type }) => {
    switch ($type) {
      case 'timeout': return 'linear-gradient(135deg, #f59e0b, #d97706)';
      case 'quota': return 'linear-gradient(135deg, #ef4444, #dc2626)';
      case 'rate_limit': return 'linear-gradient(135deg, #8b5cf6, #7c3aed)';
      default: return 'linear-gradient(135deg, #6b7280, #4b5563)';
    }
  }};
  color: white;
`;

export const ErrorDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ErrorProvider = styled.div`
  font-weight: 600;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ErrorArrow = styled.span`
  color: #10b981;
  font-size: 12px;
`;

export const ErrorTime = styled.div`
  font-size: 11px;
  color: #64748b;
  margin-top: 2px;
`;

export const ErrorTypeBadge = styled.span<{ $type: 'timeout' | 'quota' | 'rate_limit' | 'other' }>`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${({ $type }) => {
    switch ($type) {
      case 'timeout': return 'rgba(245, 158, 11, 0.2)';
      case 'quota': return 'rgba(239, 68, 68, 0.2)';
      case 'rate_limit': return 'rgba(139, 92, 246, 0.2)';
      default: return 'rgba(107, 114, 128, 0.2)';
    }
  }};
  color: ${({ $type }) => {
    switch ($type) {
      case 'timeout': return '#fbbf24';
      case 'quota': return '#f87171';
      case 'rate_limit': return '#a78bfa';
      default: return '#9ca3af';
    }
  }};
`;

// Visitor/Session Styles
export const VisitorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  overflow: hidden;

  @media (min-width: 768px) {
    gap: 4px;
  }
`;

export const VisitorLocation = styled.div`
  font-weight: 600;
  color: white;
  font-size: 13px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;

  @media (min-width: 768px) {
    font-size: 15px;
    gap: 8px;
  }
`;

export const VisitorIP = styled.span`
  font-family: monospace;
  font-size: 10px;
  color: #64748b;
  background: rgba(0, 0, 0, 0.2);
  padding: 2px 4px;
  border-radius: 4px;
  display: none;

  @media (min-width: 640px) {
    display: inline;
    font-size: 12px;
    padding: 2px 6px;
  }
`;

export const VisitorMeta = styled.div`
  display: none;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #64748b;

  @media (min-width: 640px) {
    display: flex;
    gap: 12px;
    font-size: 12px;
  }
`;

export const VisitorMetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const VisitorTime = styled.div`
  text-align: right;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const VisitorTimeAgo = styled.div`
  font-size: 13px;
  color: #94a3b8;
`;

export const VisitorDate = styled.div`
  font-size: 11px;
  color: #64748b;
`;

export const DeviceBadge = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
`;

export const BrowserBadge = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  background: rgba(139, 92, 246, 0.15);
  color: #a78bfa;
`;

export const VisitorStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

export const MobileTimeLabel = styled.div`
  font-size: 10px;
  color: #64748b;
  margin-top: 2px;

  @media (min-width: 768px) {
    display: none;
  }
`;

// New Badge styles
export const NewBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background: linear-gradient(90deg, #ef4444, #dc2626);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-left: 8px;
`;

export const NewDot = styled.span`
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  flex-shrink: 0;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

// Country Badge (replaces flag emoji)
export const CountryBadge = styled.div<{ $code: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
  color: white;
  background: ${({ $code }) => {
    const colors: Record<string, string> = {
      'FR': 'linear-gradient(135deg, #0055a4, #ef4135)',
      'US': 'linear-gradient(135deg, #3c3b6e, #b22234)',
      'GB': 'linear-gradient(135deg, #012169, #c8102e)',
      'DE': 'linear-gradient(135deg, #000000, #dd0000)',
      'ES': 'linear-gradient(135deg, #c60b1e, #ffc400)',
      'IT': 'linear-gradient(135deg, #009246, #ce2b37)',
      'MA': 'linear-gradient(135deg, #c1272d, #006233)',
      'CA': 'linear-gradient(135deg, #ff0000, #ffffff)',
      'BE': 'linear-gradient(135deg, #000000, #fdda24)',
      'CH': 'linear-gradient(135deg, #ff0000, #ffffff)',
      'NL': 'linear-gradient(135deg, #21468b, #ae1c28)',
    };
    return colors[$code] || 'linear-gradient(135deg, #64748b, #475569)';
  }};

  @media (min-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 14px;
    border-radius: 12px;
  }
`;

// Archive styles
export const ArchivedBadge = styled.span`
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 600;
  background: rgba(100, 116, 139, 0.3);
  color: #94a3b8;
  text-transform: uppercase;
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ToggleButton = styled.button<{ $active: boolean }>`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid ${({ $active }) => $active ? '#10b981' : '#334155'};
  background: ${({ $active }) => $active ? 'rgba(16, 185, 129, 0.1)' : 'transparent'};
  color: ${({ $active }) => $active ? '#10b981' : '#94a3b8'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #10b981;
    color: #10b981;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ArchiveButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid #f59e0b;
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(245, 158, 11, 0.2);
  }
`;

// Updated VisitorCard with new/archived states
export const VisitorCard = styled.div<{ $isNew?: boolean; $isArchived?: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: ${({ $isNew, $isArchived }) =>
    $isArchived ? 'rgba(15, 23, 42, 0.3)' :
    $isNew ? 'rgba(16, 185, 129, 0.08)' : 'rgba(15, 23, 42, 0.5)'};
  border-radius: 10px;
  margin-bottom: 8px;
  cursor: pointer;
  border: 1px solid ${({ $isNew }) => $isNew ? 'rgba(16, 185, 129, 0.3)' : 'transparent'};
  opacity: ${({ $isArchived }) => $isArchived ? 0.6 : 1};
  transition: all 0.2s;

  @media (min-width: 768px) {
    grid-template-columns: auto 1fr auto auto;
    gap: 16px;
    padding: 16px 20px;
    border-radius: 12px;
    margin-bottom: 12px;
  }

  &:hover {
    background: rgba(51, 65, 85, 0.5);
    border-color: rgba(16, 185, 129, 0.3);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
