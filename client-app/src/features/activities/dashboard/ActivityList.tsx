import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/models/activity";

interface Props {
  activities: Activity[];
  selectActivity : (id: string) => void;
  deleteActivity: (id: string) => void;
}

export default function ActivityList({ activities, selectActivity, deleteActivity }: Props) {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
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
                <Button onClick={() => selectActivity(activity.id)}
                  floated="right"
                  content="View"
                  color="blue"
                  compact
                />
                <Button onClick={() => deleteActivity(activity.id)}
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
}
