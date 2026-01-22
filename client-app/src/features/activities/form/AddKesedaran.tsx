import React, { useState } from 'react';
import { Grid, Header, Form, Button, TextArea, Dropdown, Segment } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../../App/stores/store';
import { observer } from 'mobx-react-lite';
import { Kesedaran } from '../../../App/models/kesedaran';

export default observer(function AddKesedaranPage() {
  const { kesedaranStore } = useStore();
  const { createKesedaran, loading } = kesedaranStore;
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

  const handleInputChange = (event: any, data: any) => {
    const { name, value } = data || event.target;
    setKesedaran({ ...kesedaran, [name]: value });
  };

  const handleSubmit = async () => {
    await createKesedaran(kesedaran);
    navigate('/kesedaran');
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
        <Segment clearing style={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)' }}>
          <Header as="h2" content="Tambah Program Kesedaran" color="teal" textAlign="center" style={{ marginBottom: '1.5rem' }} />
          <Form onSubmit={handleSubmit} autoComplete='off'>
            <Form.Field
              control={Dropdown}
              label="Tajuk Program"
              name="title"
              selection
              options={titleOptions}
              value={kesedaran.title}
              onChange={handleInputChange}
              required
            />
            <Form.Input
              label="Tarikh"
              name="date"
              type="date"
              value={kesedaran.date}
              onChange={handleInputChange}
              required
            />
            <Form.Input
              label="Agensi"
              name="agensi"
              placeholder="Contoh: MAMPU"
              value={kesedaran.agensi}
              onChange={handleInputChange}
            />
            <Form.Input
              label="Isu / Perkara"
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
              placeholder="Maklumat tambahan..."
              value={kesedaran.catatan}
              onChange={handleInputChange}
              rows={3}
            />
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <Button
                loading={loading}
                primary
                type="submit"
                content="Simpan"
                icon="save"
                style={{ borderRadius: '8px' }}
              />
              <Button
                as={Link}
                to="/kesedaran"
                basic
                content="Batal"
                style={{ borderRadius: '8px' }}
              />
            </div>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
});

