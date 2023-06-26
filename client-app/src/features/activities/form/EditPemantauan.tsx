import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Form, Grid, Header, Dropdown, DropdownProps } from 'semantic-ui-react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Pemantauan } from '../../../App/models/pemantauan';

interface EditPemantauanParams {
  id: string;
  [key: string]: string | undefined;
}

const EditPemantauanPage: React.FC = () => {
  const { id } = useParams<EditPemantauanParams>();
  const navigate = useNavigate();
  const [pemantauan, setPemantauan] = useState<Pemantauan | null>(null);
  const [editedPemantauan, setEditedPemantauan] = useState<Pemantauan>({
    id: '',
    title: '',
    date: '',
    description: '',
  });

  useEffect(() => {
    if (id) {
      // Fetch the specific Pemantauan data from the API based on the ID
      const fetchPemantauan = async () => {
        try {
          const response = await axios.get<Pemantauan>(`/pemantauan/${id}`);
          setPemantauan(response.data);
          setEditedPemantauan(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchPemantauan();
    }
  }, [id]);

  const options = [
    { key: '1', text: 'Penyenggaraan sistem repositori MyGovEA', value: 'Penyenggaraan sistem repositori MyGovEA' },
    { key: '2', text: 'Perolehan pembaharuan lesen iServer', value: 'Perolehan pembaharuan lesen iServer' },
    { key: '3', text: 'Kajian pemantapan sistem repositori MyGovEA', value: 'Kajian pemantapan sistem repositori MyGovEA' },
    { key: '4', text: 'Pengemaskinian profil pengguna iServer', value: 'Pengemaskinian profil pengguna iServer' },
    { key: '5', text: 'Pembentangan di Mesyuarat Penyelarasan Pelaksanaan EA', value: 'Pembentangan di Mesyuarat Penyelarasan Pelaksanaan EA' },
    { key: '6', text: 'Penambahbaikan Panduan Tools dan Repositori MyGovEA', value: 'Penambahbaikan Panduan Tools dan Repositori MyGovEA' },
    { key: '7', text: 'Penyediaan laporan pemantauan penyenggaraan repositori dan portal', value: 'Penyediaan laporan pemantauan penyenggaraan repositori dan portal' },
    { key: '8', text: 'Penyenggaraan portal MyGovEA', value: 'Penyenggaraan portal MyGovEA' },
  ];

  const handleDropdownChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    const { value } = data;
    setEditedPemantauan({
      ...editedPemantauan,
      title: value as string,
    });
  };
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPemantauan({
      ...editedPemantauan,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/pemantauan/${id}`, editedPemantauan);
      // Redirect to the PemantauanDashboard
      navigate('/pemantauan');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    try {
      const newId = uuidv4(); // Generate a UUID
      const newData: Pemantauan = {
        id: newId,
        title: editedPemantauan.title,
        date: editedPemantauan.date,
        description: editedPemantauan.description,
      };

      const response = await axios.post('/pemantauan', newData); // Replace "/pemantauan" with the actual API endpoint URL
      const createdPemantauan = response.data;
      // Redirect to the PemantauanDashboard
      navigate('/pemantauan');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/pemantauan/${id}`);
      // Redirect to the PemantauanDashboard
      navigate('/pemantauan');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid centered>
      <Grid.Column width={10}>
        <Header as="h1">{id ? 'Kemaskini Pemantauan Repositori dan Port' : 'Tambah Pemantauan Repositori dan Port'}</Header>
        <Form>
          <Form.Field>
            <label>Tajuk</label>
            <Dropdown
              placeholder="Pilih Tajuk"
              fluid
              selection
              options={options}
              value={editedPemantauan.title}
              onChange={handleDropdownChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Tarikh</label>
            <input
              type="datetime-local"
              name="date"
              value={editedPemantauan.date}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.TextArea label = 'Catatan'>
            
            <input
              name="description"
              value={editedPemantauan.description}
              onChange={handleInputChange}
            />
          </Form.TextArea>
          {id ? (
            <>
              <Button.Group>
                <Button primary onClick={handleUpdate}>
                  Update
                </Button>
                <Button secondary onClick={handleDelete}>
                  Delete
                </Button>
              </Button.Group>
            </>
          ) : (
            <Button primary onClick={handleCreate}>
              Tambah
            </Button>
          )}
          {/* Add the route for cancel */}
          <Button as={Link} to="/pemantauan" secondary>
            Batal
          </Button>
        </Form>
        
      </Grid.Column>
    </Grid>
  );
  
  
  
};

export default EditPemantauanPage;
