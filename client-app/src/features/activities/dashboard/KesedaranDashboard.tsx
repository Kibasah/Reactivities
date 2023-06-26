import React, { useEffect, useState } from 'react';
import { Table, Header, Button, Card, Accordion, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface Kesedaran {
  id: string;
  title: string;
  date: string;
  agensi: string;
  isu: string;
  penyelesaian: string;
  catatan: string;
}

const KesedaranDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [kesedaranList, setKesedaranList] = useState<Kesedaran[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    // Fetch Kesedaran data from the API
    const fetchKesedaran = async () => {
      try {
        const response = await axios.get<Kesedaran[]>('/kesedaran');
        setKesedaranList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchKesedaran();
  }, []);

  const handleEdit = (id: string) => {
    // Handle edit functionality
    console.log(`Editing Kesedaran with ID: ${id}`);
  };

  const handleDelete = async (id: string) => {
    // Perform the delete operation
    try {
      await axios.delete(`/kesedaran/${id}`);
      // Remove the deleted Kesedaran from the kesedaranList state
      setKesedaranList((prevList) => prevList.filter((kesedaran) => kesedaran.id !== id));
      console.log(`Successfully deleted Kesedaran with ID: ${id}`);
    } catch (error) {
      console.log(`Error deleting Kesedaran with ID: ${id}`, error);
    }
  };

  const handleCreate = () => {
    navigate('/tambahkesedaran'); // Redirect to the create form
  };

  const cardTitles = ['MinDef', 'MPIC', 'KSM', 'JPM ( Pra JPICT & JPICT)', 'Infoblast EA Bil. 1/2023', 'Infoblast EA Bil. 2/2023'];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <Header as="h1">Dashboard Program Kesedaran</Header>
      <Card.Group itemsPerRow={3} stackable style={{ marginTop: '20px', marginBottom: '20px', width: '100%' }}>
        {cardTitles.map((title, index) => {
          // Find the corresponding Kesedaran data for the current title
          const kesedaran = kesedaranList.filter((kesedaran) => kesedaran.title === title);

          return (
            <Accordion key={index} styled style={{ marginBottom: '10px' }}>
              <Card fluid>
                <Accordion.Title
                  active={activeIndex === index} // Check if the current card is active
                  index={index}
                  onClick={() => setActiveIndex(index)} // Toggle the active state on click
                >
                  <Icon name="dropdown" />
                  {`${index + 1}. ${title}`}
                </Accordion.Title>
                <Accordion.Content active={activeIndex === index}>
                  {kesedaran.length > 0 ? (
                    kesedaran.map((kesedaranData) => (
                      <Card.Content key={kesedaranData.id}>
                        <Table definition>
                          <Table.Body>
                            <Table.Row>
                              <Table.Cell>Title</Table.Cell>
                              <Table.Cell>{kesedaranData.title}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>Date</Table.Cell>
                              <Table.Cell>
                  {new Date(kesedaranData.date).toLocaleDateString('en-GB')}
                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>Agensi</Table.Cell>
                              <Table.Cell>{kesedaranData.agensi}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>Isu</Table.Cell>
                              <Table.Cell>{kesedaranData.isu}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>Penyelesaian</Table.Cell>
                              <Table.Cell>{kesedaranData.penyelesaian}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>Catatan</Table.Cell>
                              <Table.Cell>{kesedaranData.catatan}</Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        </Table>
                        <Card.Content extra>
                          <Link to={`/edit/kesedaran/${kesedaranData.id}`}>
                            <Button color="blue" onClick={() => handleEdit(kesedaranData.id)}>
                              Edit
                            </Button>
                          </Link>
                          <Button color="red" onClick={() => handleDelete(kesedaranData.id)}>
                            Delete
                          </Button>
                        </Card.Content>
                      </Card.Content>
                    ))
                  ) : (
                    <Card.Content>
                      <p>No Kesedaran data found for this title.</p>
                    </Card.Content>
                  )}
                </Accordion.Content>
              </Card>
            </Accordion>
          );
        })}
      </Card.Group>
      <div style={{ marginTop: '20px' }}>
        <Button primary onClick={handleCreate}>
          Tambah
        </Button>
      </div>
    </div>
  );
};

export default KesedaranDashboard;
