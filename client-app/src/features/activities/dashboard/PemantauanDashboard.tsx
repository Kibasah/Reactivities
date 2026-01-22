import React, { useEffect, useState } from 'react';
import { Grid, Header, Card, Button, Accordion, Icon, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../../App/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../App/layout/LoadingComponent';

export default observer(function PemantauanDashboard() {
  const { pemantauanStore } = useStore();
  const { pemantauanByDate, loadPemantauans, loadingInitial } = pemantauanStore;
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (pemantauanStore.pemantauanRegistry.size <= 1) loadPemantauans();
  }, [pemantauanStore.pemantauanRegistry.size, loadPemantauans]);

  const groupedPemantauan = pemantauanByDate.reduce((groups, p) => {
    const title = p.title || 'Lain-lain';
    if (!groups[title]) groups[title] = [];
    groups[title].push(p);
    return groups;
  }, {} as { [key: string]: typeof pemantauanByDate });

  if (loadingInitial) return <LoadingComponent content='Sila tunggu...' />;

  return (
    <Container>
      <Header as="h1" textAlign="center" style={{ marginBottom: '2rem' }}>
        Pemantauan Repositori dan Port
      </Header>

      <Grid>
        <Grid.Column width={16}>
          {Object.entries(groupedPemantauan).map(([title, items], index) => (
            <Accordion styled key={title} fluid style={{ marginBottom: '1rem', borderRadius: '12px' }}>
              <Accordion.Title
                active={activeIndex === index}
                onClick={() => setActiveIndex(activeIndex === index ? undefined : index)}
                style={{ fontSize: '1.2rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span>{title}</span>
                <Icon name={activeIndex === index ? 'chevron up' : 'chevron down'} />
              </Accordion.Title>
              <Accordion.Content active={activeIndex === index}>
                <Card.Group itemsPerRow={3} stackable>
                  {items.map((p) => (
                    <Card key={p.id} style={{ boxShadow: 'none', border: '1px solid #e2e8f0' }}>
                      <Card.Content>
                        <Card.Header style={{ color: '#0d9488' }}>
                          {new Date(p.date).toLocaleDateString('en-GB')}
                        </Card.Header>
                        <Card.Description style={{ marginTop: '10px' }}>
                          {p.description}
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <Button
                          as={Link}
                          to={`/edit/pemantauan/${p.id}`}
                          basic
                          color="teal"
                          fluid
                          content="Kemaskini"
                        />
                      </Card.Content>
                    </Card>
                  ))}
                </Card.Group>
              </Accordion.Content>
            </Accordion>
          ))}

          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <Button
              as={Link}
              to="/createPemantauan"
              primary
              size="huge"
              icon="add"
              content="Tambah Pemantauan"
              style={{ borderRadius: '30px', paddingLeft: '30px', paddingRight: '30px' }}
            />
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  );
});

