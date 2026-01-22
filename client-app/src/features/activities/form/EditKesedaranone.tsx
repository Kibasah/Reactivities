import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button, Form, Grid, Header, TextArea, Segment, Dropdown } from 'semantic-ui-react';
import { useStore } from '../../../App/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../App/layout/LoadingComponent';
import { Kesedaran } from '../../../App/models/kesedaran';

export default observer(function EditKesedaranPage() {
  const { kesedaranStore } = useStore();
  const { loadKesedaran, updateKesedaran, loading, loadingInitial } = kesedaranStore;
  const { id } = useParams<{ id: string }>();
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

  useEffect(() => {
    if (id) loadKesedaran(id).then(k => k && setKesedaran(k));
  }, [id, loadKesedaran]);

  const handleInputChange = (event: any, data: any) => {
    const { name, value } = data || event.target;
    setKesedaran({ ...kesedaran, [name]: value });
  };

  const handleSubmit = async () => {
    await updateKesedaran(kesedaran);
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

  if (loadingInitial) return <LoadingComponent content='Memuat turun...' />;

  return (
    <Grid centered>
      <Grid.Column width={10}>
        <Segment clearing style={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)' }}>
          <Header as="h2" content="Kemaskini Program Kesedaran" color="teal" textAlign="center" style={{ marginBottom: '1.5rem' }} />
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
              value={kesedaran.catatan}
              onChange={handleInputChange}
              rows={3}
            />
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <Button
                loading={loading}
                primary
                type="submit"
                content="Simpan Perubahan"
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

