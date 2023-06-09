import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";

import { useStore } from "../../../App/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../App/layout/LoadingComponent";



export default observer( function ActivityDashboard() {
  
  const {activityStore} = useStore();
  const {loadActivities, activityRegistry} = activityStore;


  useEffect(() => {
    if (activityRegistry.size <= 1 )loadActivities();
  }, [loadActivities, activityRegistry.size])


  if (activityStore.loadingInitial) return <LoadingComponent content = 'Loading app'/>

  return (
    <Grid >
        <Grid.Column>
            <ActivityList/>
        </Grid.Column>

        
        
    </Grid>
  )
})
