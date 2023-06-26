import React, { useState } from 'react';
import { Grid, Header, Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface CreatePemantauanPageProps {
  // Props, if any
}

const CreatePemantauanPage: React.FC<CreatePemantauanPageProps> = () => {
  const navigate = useNavigate();
  const [pemantauan, setPemantauan] = useState({
    title: '',
    date: '',
    description: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPemantauan({
      ...pemantauan,
      [event.target.name]: event.target.value,
    });
  };

  const handleAdd = async () => {
    try {
      await axios.post('/pemantauan', pemantauan);
      // Redirect to the PemantauanDashboard
      navigate('/pemantauan');
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <Grid centered>
      <Grid.Column width={10}>
        <Header as="h1">Create Pemantauan</Header>
        <Form>
          <Form.Input
            label="Title"
            name="title"
            value={pemantauan.title}
            onChange={handleInputChange}
          />
          <Form.Input
            label="Date"
            name="date"
            value={pemantauan.date}
            onChange={handleInputChange}
          />
          <Form.Input
            label="Description"
            name="description"
            value={pemantauan.description}
            onChange={handleInputChange}
          />
          <Button primary onClick={handleAdd}>
            Add
          </Button>
          <Button as={Link} to="/pemantauan" secondary>
            Cancel
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default CreatePemantauanPage;
