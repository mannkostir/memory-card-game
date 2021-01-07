import styled from 'styled-components';

export const StyledTable = styled.table`
  text-align: center;
  width: 100%;
  font-size: 1em;
  border-radius: 20px;
  padding: 3em 0;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.onSurface};
  max-width: 40em;
  background: radial-gradient(
    ellipse,
    ${({ theme }) => theme.colors.highlightText},
    ${({ theme }) => theme.colors.primary}
  );
  border-collapse: collapse;
  th {
    padding: 1em 0;
  }
  td {
    padding: 0.5em;
  }
  @media (min-width: 768px) {
    width: 80%;
  }
`;

const TrophyIcon = styled.i`
  font-size: 1.2em;
  margin-left: 0.5em;
`;

export const GoldTrophyIcon = styled(TrophyIcon)`
  color: ${({ theme }) => theme.colors.gold};
`;

export const SilverTrophyIcon = styled(TrophyIcon)`
  color: ${({ theme }) => theme.colors.silver};
`;

export const BronzeTrophyIcon = styled(TrophyIcon)`
  color: ${({ theme }) => theme.colors.bronze};
`;
