import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Grid, Header, TextArea } from 'semantic-ui-react';
import axios from 'axios';
import { Kesedaran } from '../../../App/models/kesedaran';

interface EditKesedaranParams {
  id: string;
  [key: string]: string | undefined;
}

const EditKesedaranPage: React.FC = () => {
  const { id } = useParams<EditKesedaranParams>();
  const navigate = useNavigate();

  const [kesedaran, setKesedaran] = useState<Kesedaran | null>(null);
  const [editedKesedaran, setEditedKesedaran] = useState<Kesedaran>({
    id: '',
    title: '',
    date: '',
    agensi: '',
    isu: '',
    penyelesaian: '',
    catatan: '',
  });

  useEffect(() => {
    if (id) {
      // Fetch the specific Kesedaran data from the API based on the ID
      const fetchKesedaran = async () => {
        try {
          const response = await axios.get<Kesedaran>(`/kesedaran/${id}`);
          setKesedaran(response.data);
          setEditedKesedaran(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchKesedaran();
    }
  }, [id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedKesedaran({
      ...editedKesedaran,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/kesedaran/${id}`, editedKesedaran);
      navigate('/kesedaran'); // Redirect to the KesedaranDashboard
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('/kesedaran', editedKesedaran);
      navigate('/kesedaran'); // Redirect to the KesedaranDashboard
    } catch (error) {
      console.log(error);
    }
  };

  if (!kesedaran) {
    return <div>Loading...</div>;
  }

  return (
    <Grid centered>
      <Grid.Column width={10}>
        <Header as="h1">{id ? 'Edit Kesedaran' : 'Create Kesedaran'}</Header>
        <Form>
          <Form.Input
            label="Title"
            name="title"
            value={editedKesedaran.title}
            onChange={handleInputChange}
          />
          <Form.Input
            label="Date"
            name="date"
            type="datetime-local"
            value={editedKesedaran.date}
            onChange={handleInputChange}
          />
          <Form.Input
            label="Agensi"
            name="agensi"
            value={editedKesedaran.agensi}
            onChange={handleInputChange}
          />
          <Form.Input
            label="Isu"
            name="isu"
            value={editedKesedaran.isu}
            onChange={handleInputChange}
          />
          <Form.Input
            label="Penyelesaian"
            name="penyelesaian"
            value={editedKesedaran.penyelesaian}
            onChange={handleInputChange}
          />
          <Form.Field
            control={TextArea}
            label="Catatan"
            name="catatan"
            value={editedKesedaran.catatan}
            onChange={handleInputChange}
          />
          <Button primary onClick={id ? handleUpdate : handleCreate}>
            {id ? 'Update' : 'Create'}
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default EditKesedaranPage;
