import React, { useState } from 'react';
import { Grid, Header, Form, Button, TextArea, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Kesedaran } from '../../../App/models/kesedaran';

interface AddKesedaranPageProps {
  // Props, if any
}

const AddKesedaranPage: React.FC<AddKesedaranPageProps> = () => {
  const navigate = useNavigate();
  const [kesedaran, setKesedaran] = useState<Kesedaran>({
    id: '',
    title: '',
    date: '',
    agensi: '',
    isu: '',
    penyelesaian: '',
    catatan: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, data: any) => {
    const { name, value } = data;
    setKesedaran({
      ...kesedaran,
      [name]: value,
    });
  };

  const handleAdd = async () => {
    try {
      const newKesedaran: Kesedaran = {
        ...kesedaran,
        id: uuid(), // Generate a unique ID for the new Kesedaran
      };
      await axios.post('/kesedaran', newKesedaran);
      setSuccessMessage('Kesedaran added successfully.');
      setTimeout(() => {
        // Redirect to the KesedaranDashboard after 2 seconds
        navigate('/kesedaran');
      }, 2000);
    } catch (error) {
      console.log(error);
      setErrorMessage('Failed to add Kesedaran. Please try again.');
    }
  };

  const titleOptions = [
    { key: 'mindef', text: 'MinDef', value: 'MinDef' },
    { key: 'mpic', text: 'MPIC', value: 'MPIC' },
    { key: 'ksm', text: 'KSM', value: 'KSM' },
    { key: 'jpm', text: 'JPM (Pra JPICT & JPICT)', value: 'JPM (Pra JPICT & JPICT)' },
    { key: 'infoblast1', text: 'Infoblast EA Bil. 1/2023', value: 'Infoblast EA Bil. 1/2023' },
    { key: 'infoblast2', text: 'Infoblast EA Bil. 2/2023', value: 'Infoblast EA Bil. 2/2023' },
  ];

  return (
    <Grid centered>
      <Grid.Column width={10}>
        <Header as="h1">Add Kesedaran</Header>
        {successMessage && <div>{successMessage}</div>}
        {errorMessage && <div>{errorMessage}</div>}
        <Form>
          <Form.Field
            control={Dropdown}
            label="Title"
            name="title"
            selection
            options={titleOptions}
            value={kesedaran.title}
            onChange={handleInputChange}
          />
          <Form.Input
            label="Date"
            name="date"
            type="datetime-local"
            value={kesedaran.date}
            onChange={handleInputChange}
          />
          <Form.Input
            label="Agensi"
            name="agensi"
            value={kesedaran.agensi}
            onChange={handleInputChange}
          />
          <Form.Input
            label="Isu"
            name="isu"
            value={kesedaran.isu}
            onChange={handleInputChange}
          />
          <Form.Input
            label="Penyelesaian"
            name="penyelesaian"
            value={kesedaran.penyelesaian}
            onChange={handleInputChange}
          />
          <Form.Field
            control={TextArea}
            label="Catatan"
            name="catatan"
            value={kesedaran.catatan}
            onChange={handleInputChange}
          />
          <Button primary onClick={handleAdd}>
            Add
          </Button>
          <Button as={Link} to="/kesedaran" secondary>
            Cancel
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default AddKesedaranPage;
