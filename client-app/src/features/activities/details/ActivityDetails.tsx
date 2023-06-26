import React, { SyntheticEvent, useEffect, useState } from "react";
import { Button, Card, Icon, Image, Table } from "semantic-ui-react";
import { useStore } from "../../../App/stores/store";
import LoadingComponent from "../../../App/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default observer(function ActivityDetails() {
  const navigate = useNavigate();
  const { activityStore } = useStore();
  const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams();
  const { deleteActivity, loading } = activityStore;
  const [target, setTarget] = useState("");

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  function handleActivityDelete(id: string) {
    setTarget(id);
    deleteActivity(id);
    navigate('/activities'); // Replace '/activities' with the desired URL of the page to navigate to
  }
  

  if (loadingInitial || !activity) return <LoadingComponent />;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{activity.category}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description><a></a></Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={2}>
                <Icon name="map marker alternate" />
                Isu
              </Table.Cell>
              <Table.Cell>{activity.city}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon name="tag" />
                Agensi
              </Table.Cell>
              <Table.Cell>{activity.category}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon name="archive" />
                Penyelesaian
              </Table.Cell>
              <Table.Cell>{activity.venue}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon name="edit outline" />
                Catatan
              </Table.Cell>
              <Table.Cell style={{ maxWidth: "400px", wordWrap: "break-word" }}>{activity.description}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="3">
          <Button as={Link} to={`/manage/${activity.id}`} basic color="blue" content="Edit" />
          <Button
            name={activity.id}
            loading={loading && target === activity.id}
            onClick={() => handleActivityDelete(activity.id)}

            floated="right"
            content="Buang"
            color="red"
            basic
            compact
          />
          <Button as={Link} to="/activities" basic color="green" content="Batal" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
