import React, { useState } from "react";
import { Button, Item, Segment, Header, Grid, Icon } from "semantic-ui-react";
import { useStore } from "../../../App/stores/store";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import ActivityListItem from "./ActivityListItem";
import { Parallax } from "react-parallax";
import { Activity } from "../../../App/models/activity";
import { ButtonProps } from "semantic-ui-react";


const ActivityList = () => {
  const { activityStore } = useStore();
  const { deleteActivity, activitiesByDate, loading } = activityStore;

  const [filter, setFilter] = useState("Peringkat 1"); // Set "Peringkat 1" as the default filter

  const handleFilter = (title: string) => {
    setFilter(title);
  };

  // Filter the activities based on the selected filter
  const filteredActivities = activitiesByDate.filter(
    (activity) => activity.title === filter
  );

  const handleAddActivity = () => {
    // Logic to handle adding a new activity
  };

  const handlePrint = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: ButtonProps) => {
    const printWindow = window.open("", "_blank");
    printWindow?.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            .description-cell {
              max-width: 400px;
              word-wrap: break-word;
            }
          </style>
        </head>
        <body>
          <h1>Pemantauan Pembangunan EA</h1>
          <table>
            <thead>
              <tr>
                <th>Peringkat</th>
                <th>Tarikh</th>
                <th>Agensi</th>
                <th>Isu</th>
                <th>Penyelesaian</th>
                <th>Catatan</th>
              </tr>
            </thead>
            <tbody>
              ${filteredActivities
                .map(
                  (activity) => `
                <tr>
                  <td>${activity.title}</td>
                  <td>${activity.date}</td>
                  <td>${activity.category}</td>
                  <td>${activity.city}</td>
                  <td>${activity.venue}</td>
                  <td class="description-cell">${activity.description}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <script type="text/javascript">
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow?.document.close();
  };
  

  return (
    <Segment>
      <Parallax blur={0} bgImage="" strength={200}>
        <div className="filter-buttons">
          <Button
            onClick={() => handleFilter("Peringkat 1")}
            active={filter === "Peringkat 1"}
            className={filter === "Peringkat 1" ? "blue-shade-1 shade-button" : "blue-shade-1"}
          >
            Peringkat 1
          </Button>
          <Button
            onClick={() => handleFilter("Peringkat 2")}
            active={filter === "Peringkat 2"}
            className={filter === "Peringkat 2" ? "blue-shade-2 shade-button" : "blue-shade-2"}
          >
            Peringkat 2
          </Button>
          <Button
            onClick={() => handleFilter("Peringkat 3")}
            active={filter === "Peringkat 3"}
            className={filter === "Peringkat 3" ? "blue-shade-3 shade-button" : "blue-shade-3"}
          >
            Peringkat 3
          </Button>
          <Button
            as={Link}
            to="/createActivity"
            className="blue-shade-4 shade-button top-right-button"
            content="Tambah"
            onClick={handleAddActivity}
          />
          <Button
            className="blue-shade-4 shade-button top-right-button1"
            icon={<Icon name="print" />}
            onClick={handlePrint}
          />
        </div>
        <Segment>
        <div id="print-content">
          {filter === "Peringkat 1" && (
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h2" color="blue" style={{ fontSize: "2rem" }}>
                    Peringkat 1
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign="right">
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    {filteredActivities.length} items
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  {/* Content for Peringkat 1 compartment */}
                </Grid.Column>
                <Grid.Column>
                  {/* Content for Peringkat 1 compartment */}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}
          {filter === "Peringkat 2" && (
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h2" color="blue" style={{ fontSize: "2rem" }}>
                    Peringkat 2
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign="right">
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    {filteredActivities.length} items
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  {/* Content for Peringkat 2 compartment */}
                </Grid.Column>
                <Grid.Column>
                  {/* Content for Peringkat 2 compartment */}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}
          {filter === "Peringkat 3" && (
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h2" color="blue" style={{ fontSize: "2rem" }}>
                    Peringkat 3
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign="right">
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    {filteredActivities.length} items
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  {/* Content for Peringkat 3 compartment */}
                </Grid.Column>
                <Grid.Column>
                  {/* Content for Peringkat 3 compartment */}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}
          </div>
        </Segment>
      </Parallax>
      <Item.Group divided>
        {filteredActivities.map((activity) => (
          <ActivityListItem key={activity.id} activity={activity} />
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
