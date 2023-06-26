import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Card, Segment, Item, Icon } from 'semantic-ui-react';
import { useStore } from '../../../App/stores/store';
import { Activity } from '../../../App/models/activity';

interface Props {
  activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
  const { activityStore } = useStore();
  const { deleteActivity, loading } = activityStore;

  const [target, setTarget] = useState('');

  

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.category}
              </Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
}
