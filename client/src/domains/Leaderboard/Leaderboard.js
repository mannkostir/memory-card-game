import React from 'react';
import CenteredContainer from 'components/CenteredContainer/CenteredContainer';
import LeadersTable from './components/LeadersTable';
import FlexContainer from 'components/FlexContainer';

const Leaderboard = () => {
  return (
    <div>
      <section>
        <FlexContainer>
          <LeadersTable />
        </FlexContainer>
      </section>
    </div>
  );
};

export default Leaderboard;
