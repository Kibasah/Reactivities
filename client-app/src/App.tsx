import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import virus from './virus.png';
import './App.css';
import axios from 'axios';


function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = () => {
    axios.get('http://localhost:5000/api/activities')
      .then(response => {
        console.log(response);
        setActivities(response.data);
      })
      .catch(error => {
        console.error('Error retrieving activities:', error);
      });
  };


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload!!!.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <ul>
          {activities.map((activity: any) => (
            <li key = {activity.id}>
                {activity.title}
            </li>
          ))}
        </ul>
      </header>
      
    </div>
  );
}

export default App;
