import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/models/activity";

interface Props {
  activities: Activity[];
}

export default function ActivityList({ activities }: Props) {
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
                <Button
                  floated="right"
                  content="View"
                  color="blue"
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
