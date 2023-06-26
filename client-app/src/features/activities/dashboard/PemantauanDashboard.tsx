import React, { useEffect, useState } from 'react';
import { Grid, Header, Card, Button, Accordion, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Pemantauan {
  id: string;
  title: string;
  date: string;
  description: string;
}

const PemantauanDashboard: React.FC = () => {
  const [pemantauanList, setPemantauanList] = useState<Pemantauan[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    // Fetch Pemantauan data from the API
    const fetchPemantauan = async () => {
      try {
        const response = await axios.get<Pemantauan[]>('/pemantauan');
        setPemantauanList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPemantauan();
  }, []);

  // Group pemantauan items by title
  const groupedPemantauan: { [title: string]: Pemantauan[] } = pemantauanList.reduce(
    (groups, pemantauan) => {
      if (!groups[pemantauan.title]) {
        groups[pemantauan.title] = [];
      }
      groups[pemantauan.title].push(pemantauan);
      return groups;
    },
    {} as { [title: string]: Pemantauan[] } // Provide initial value as an empty object
  );

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? undefined : index);
  };

  return (
    <Grid>
      <Grid.Column width={16}>
        <Header as="h1">Dashboard Pemantauan Repositori dan Port</Header>
      </Grid.Column>
      <Grid.Column width={16}>
        {Object.entries(groupedPemantauan).map(([title, pemantauans], index) => (
          <Accordion styled key={title} style={{ marginBottom: '1rem' }}>
            <Accordion.Title active={activeIndex === index} onClick={() => handleAccordionClick(index)}>
              <Header as="h3">{title}</Header>
              <Icon name={activeIndex === index ? 'chevron up' : 'chevron down'} />
            </Accordion.Title>
            <Accordion.Content active={activeIndex === index}>
              <Card.Group>
                {pemantauans.map((pemantauan) => (
                  <Card key={pemantauan.id}>
                    <Card.Content>
                      <Card.Header>{new Date(pemantauan.date).toLocaleDateString('en-GB')}</Card.Header>
                      
                      <Card.Description>{pemantauan.description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Button as={Link} to={`/edit/pemantauan/${pemantauan.id}`} primary>
                        Kemaskini
                      </Button>
                    </Card.Content>
                  </Card>
                ))}
              </Card.Group>
            </Accordion.Content>
          </Accordion>
        ))}
        <Button as={Link} to={`/createPemantauan`} primary>
          Tambah
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default PemantauanDashboard;
