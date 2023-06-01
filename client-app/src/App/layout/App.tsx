import React, { useState, useEffect, Fragment } from 'react';
import './styles.css';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetchActivities();
  }, []);

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

        <ActivityDashboard activities={activities}/>

      </Container>

    </Fragment>
      
      
    
  );
}

export default App;
