﻿import React from 'react';
import { withRouter } from 'react-router';
import Row from '../row';
import { PersonDetails, PersonList } from '../sw-components';

const PeoplePage = ({history, match}) => {
  const { id } = match.params;
  return (
    <Row 
      left={<PersonList onItemSelected={(id) => history.push(id)}/>}
      right={<PersonDetails itemId={id} />}>  
    </Row>
  );
};

export default withRouter(PeoplePage);