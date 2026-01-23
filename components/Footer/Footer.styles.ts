import styled from 'styled-components';

export const FooterSection = styled.footer`
  background: ${({ theme }) => theme.colors.backgroundLight};
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 102, 255, 0.3);
  }
`;

export const Copyright = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};

  span {
    color: ${({ theme }) => theme.colors.primary};
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;
