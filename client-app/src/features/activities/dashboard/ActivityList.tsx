import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../App/stores/store";
import { observer } from "mobx-react-lite";



export default observer( function ActivityList() {
  const {activityStore} = useStore();
  const {deleteActivity, activitiesByDate, loading} = activityStore;

  const [target, setTarget] = useState('');
 

  function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id:string){
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
          <Item key={activity.id}>

            <Item.Content>
              <Item.Header>{activity.title}</Item.Header>
              <Item.Meta>
                <span className="date">{activity.date}</span>
              </Item.Meta>
              <Item.Description>{activity.description}</Item.Description>
              <Item.Extra>
                <div>
                  {activity.city}, {activity.venue}
                </div>
                <Button onClick={() => activityStore.selectActivity(activity.id)}
                  floated="right"
                  content="View"
                  color="blue"
                  compact
                />
                <Button 
                  name={activity.id}
                  loading = {loading && target === activity.id} 
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                  compact
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
})
