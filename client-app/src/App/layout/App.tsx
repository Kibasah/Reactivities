import React, { useState, useEffect, Fragment } from 'react';
import './styles.css';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined >(undefined);

  useEffect(() => {
    fetchActivities();
  }, []);

  function handleSelectedActivity(id: string)
  {
    setSelectedActivity(activities.find(X => X.id === id))
  }

  function handleCancelSelectedActivity(){
    setSelectedActivity(undefined);
  }

  const fetchActivities = () => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        
        setActivities(response.data);
      })
      .catch(error => {
        console.error('Error retrieving activities:', error);
      });
  };


  return (
    <Fragment>

      <NavBar/>
      <Container style ={{marginTop: '7em'}}>

        <ActivityDashboard 
        activities = {activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectedActivity}
        cancelSelectActivity = {handleCancelSelectedActivity} />
      </Container>

    </Fragment>
      
      
    
  );
}

export default App;
