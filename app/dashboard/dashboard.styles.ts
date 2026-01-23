import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  color: #e2e8f0;
  padding: 32px;
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(90deg, #34d399, #22d3ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`;

export const Button = styled.button<{ $variant?: 'primary' | 'danger' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

export const StatCard = styled.div<{ $color: string }>`
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(10px);
  padding: 28px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;

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
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
`;

export const StatValue = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: white;
`;

export const StatSubtext = styled.div`
  color: #64748b;
  font-size: 13px;
  margin-top: 8px;
`;

export const Section = styled.div`
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(10px);
  padding: 28px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
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
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
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
  padding: 20px;
`;

export const LoginCard = styled.div`
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(20px);
  padding: 48px;
  border-radius: 24px;
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const LoginTitle = styled.h1`
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(90deg, #34d399, #22d3ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const LoginSubtitle = styled.p`
  text-align: center;
  color: #64748b;
  margin-bottom: 32px;
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
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 20px;
`;

export const ModalContent = styled.div`
  background: linear-gradient(180deg, #1e293b, #0f172a);
  border-radius: 24px;
  width: 100%;
  max-width: 640px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #334155;
`;

export const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
`;

export const ProviderCard = styled.div<{ $active: boolean; $available: boolean; $hasQuota?: boolean }>`
  background: ${({ $active, $hasQuota }) =>
    $active ? 'rgba(16, 185, 129, 0.15)' :
    $hasQuota === false ? 'rgba(239, 68, 68, 0.1)' : 'rgba(15, 23, 42, 0.5)'};
  border: 2px solid ${({ $active, $available, $hasQuota }) =>
    $active ? '#10b981' :
    $hasQuota === false ? 'rgba(239, 68, 68, 0.3)' :
    $available ? 'rgba(255, 255, 255, 0.1)' : 'rgba(100, 116, 139, 0.3)'};
  padding: 20px;
  border-radius: 12px;
  cursor: ${({ $available, $hasQuota }) => ($available && $hasQuota !== false) ? 'pointer' : 'not-allowed'};
  opacity: ${({ $available }) => $available ? 1 : 0.5};
  transition: all 0.2s;

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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
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
