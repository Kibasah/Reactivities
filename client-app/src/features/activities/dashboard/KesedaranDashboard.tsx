import React, { useEffect, useState } from 'react';
import { Table, Header, Button, Card, Accordion, Icon, Container } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../../App/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../App/layout/LoadingComponent';

export default observer(function KesedaranDashboard() {
  const navigate = useNavigate();
  const { kesedaranStore } = useStore();
  const { kesedaranByDate, loadKesedarans, loadingInitial, deleteKesedaran } = kesedaranStore;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (kesedaranStore.kesedaranRegistry.size <= 1) loadKesedarans();
  }, [kesedaranStore.kesedaranRegistry.size, loadKesedarans]);

  const handleCreate = () => {
    navigate('/tambahkesedaran');
  };

  const cardTitles = ['MinDef', 'MPIC', 'KSM', 'JPM ( Pra JPICT & JPICT)', 'Infoblast EA Bil. 1/2023', 'Infoblast EA Bil. 2/2023'];

  if (loadingInitial) return <LoadingComponent content='Sila tunggu...' />;

  return (
    <Container>
      <Header as="h1" textAlign="center" style={{ marginBottom: '2rem' }}>Program Kesedaran</Header>

      <Card.Group itemsPerRow={2} stackable style={{ width: '100%' }}>
        {cardTitles.map((title, index) => {
          const matchingKesedaran = kesedaranByDate.filter((k) => k.title === title);

          return (
            <Card key={index} fluid style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <Card.Content>
                <Accordion fluid>
                  <Accordion.Title
                    active={activeIndex === index}
                    index={index}
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    style={{ fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center' }}
                  >
                    <Icon name="dropdown" />
                    {title}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === index}>
                    {matchingKesedaran.length > 0 ? (
                      matchingKesedaran.map((k) => (
                        <div key={k.id} style={{ marginBottom: '1.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                          <Table basic='very' celled>
                            <Table.Body>
                              <Table.Row>
                                <Table.Cell width={4}><b>Tarikh</b></Table.Cell>
                                <Table.Cell>{new Date(k.date).toLocaleDateString('en-GB')}</Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell><b>Agensi</b></Table.Cell>
                                <Table.Cell>{k.agensi}</Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell><b>Isu</b></Table.Cell>
                                <Table.Cell>{k.isu}</Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell><b>Penyelesaian</b></Table.Cell>
                                <Table.Cell>{k.penyelesaian}</Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell><b>Catatan</b></Table.Cell>
                                <Table.Cell>{k.catatan}</Table.Cell>
                              </Table.Row>
                            </Table.Body>
                          </Table>
                          <div style={{ marginTop: '10px' }}>
                            <Button
                              as={Link}
                              to={`/edit/kesedaran/${k.id}`}
                              basic
                              color="teal"
                              size="small"
                              content="Edit"
                              icon="edit"
                            />
                            <Button
                              onClick={() => deleteKesedaran(k.id)}
                              basic
                              color="red"
                              size="small"
                              content="Delete"
                              icon="trash"
                              loading={kesedaranStore.loading}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: '#64748b', fontStyle: 'italic', padding: '10px' }}>
                        Tiada data untuk tajuk ini.
                      </p>
                    )}
                  </Accordion.Content>
                </Accordion>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Button
          primary
          size="huge"
          onClick={handleCreate}
          icon="add"
          content="Tambah Program Baru"
          style={{ borderRadius: '30px', paddingLeft: '30px', paddingRight: '30px' }}
        />
      </div>
    </Container>
  );
});

