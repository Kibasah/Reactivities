import React, { useState, useEffect, Fragment } from 'react';
import './styles.css';

import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {

  const {activityStore} = useStore();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [submitting, setSubmitting] =useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])


  if (activityStore.loadingInitial) return <LoadingComponent content = 'Loading app'/>


  return (
    <Fragment>

      <NavBar/>
      <Container style ={{marginTop: '7em'}}>
        
        <ActivityDashboard/>
        

      </Container>

    </Fragment>
      
      
    
  );
}

export default observer(App);

