import {
  Form,
  Container,
  InputGroup,
  FormControl,
  Button,
  Card,
} from "react-bootstrap";
import axios from "axios";
import "./App.css";
import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      location: {},
    };
  }

  getSearch = async (event) => {
    event.preventDefault();
    const apiUrlLocation = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;

    const response = await axios.get(apiUrlLocation);

    console.log(response.data[0]);
    this.setState({ location: response.data[0] });
  };

  render() {
    return (
      <div>
        <Container>
          <h1>City Explorer</h1>
          <form onSubmit={this.getSearch}>
            <Form.Group role="form" controlId="getCityLocation">
              <Form.Label>City Search</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                placeholder="Search for City"
                onChange={(e) => this.setState({ searchQuery: e.target.value })}
              />
              <Form.Text className="text-muted">
                Using an API request to find information on the city you search
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </form>
        </Container>
        <Container>
          {
            //Check if message failed
            Object.keys(this.state.location).length === 0 ? (
              <div></div>
            ) : (
              <Card className="results-card">
                <Card.Header>{this.state.location.display_name}</Card.Header>
                <Card.Body>
                  <Card.Title>Latitude</Card.Title>
                  <Card.Text>
                  {this.state.location.lat}
                  </Card.Text>
                  <Card.Title>Longitude</Card.Title>
                  <Card.Text>
                  {this.state.location.lon}
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          }
        </Container>
      </div>
    );
  }
}
