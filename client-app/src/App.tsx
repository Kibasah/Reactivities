import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import virus from './virus.png';
import './App.css';
import axios from 'axios';
import { Button, Header, List } from 'semantic-ui-react';


function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = () => {
    axios.get('http://localhost:5000/api/activities')
      .then(response => {
        
        setActivities(response.data);
      })
      .catch(error => {
        console.error('Error retrieving activities:', error);
      });
  };


  return (
    <div >
      <Header as='h2' icon='users' content='Reactivities'/>
      <List>

        <ul>
          {activities.map((activity: any) => (
            <li key = {activity.id}>
                {activity.title}
            </li>
          ))}
        </ul>
        </List>
       
    </div>
    
  );
}

export default App;
