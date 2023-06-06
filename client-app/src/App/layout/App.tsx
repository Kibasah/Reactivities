import React, { useState, useEffect, Fragment } from 'react';
import './styles.css';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined >(undefined);
  const [editMode, seteditMode] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      setActivities(response);
    })
  }, [])



  function handleSelectedActivity(id: string)
  {
    setSelectedActivity(activities.find(X => X.id === id))
  }

  function handleCancelSelectedActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectedActivity(id) : handleCancelSelectedActivity();
    seteditMode(true);
  }

  function handleFormClose(){
    seteditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id, activity)])
    : setActivities([...activities, {...activity, id: uuid()}]);
    seteditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string){
    setActivities([...activities.filter(x => x.id !== id)])
  }


  return (
    <Fragment>

      <NavBar openForm={handleFormOpen}/>
      <Container style ={{marginTop: '7em'}}>

        <ActivityDashboard 
        activities = {activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectedActivity}
        cancelSelectActivity = {handleCancelSelectedActivity} 
        editMode ={editMode}
        openForm = {handleFormOpen}
        closeForm= {handleFormClose}
        createOrEdit ={handleCreateOrEditActivity}
        deleteActivity = {handleDeleteActivity}
        />
        

      </Container>

    </Fragment>
      
      
    
  );
}

export default App;
