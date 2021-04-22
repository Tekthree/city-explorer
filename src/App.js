import { Form, Container, Button, Card, CardColumns } from "react-bootstrap";
import axios from "axios";
import "./App.css";
import React, { Component } from "react";
import Weather from "./components/weather.js";
import Movies from "./components/movies.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      location: {},
      image: "",
      error: {},
      weather: [],
      movies: [],
    };
  }

  getSearch = async (event) => {
    event.preventDefault();
    try {
      const apiUrlLocation = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;
      const response = await axios.get(apiUrlLocation);
      const apiUrlImage = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${response.data[0].lat},${response.data[0].lon}&size=${window.innerWidth}x300&format=png&zoom=12`;

      this.setState({ location: response.data[0] });
      this.setState({ image: apiUrlImage });

      this.getWeather();
      this.getMovies();
    } catch (err) {
      console.log(err);
    }
  };

  getWeather = async () => {
    try {
      const backendWeather = `http://localhost:3001/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}&city=${this.state.searchQuery}`;
      const response = await axios.get(backendWeather);
      const weather = response.data[0];
      this.setState({ weather: weather });
    } catch (err) {
      console.log(err);
    }
  };

  getMovies = async () => {
    try {
      const backendMovies = `http://localhost:3001/movies?city=${this.state.searchQuery}`;
      const response = await axios.get(backendMovies);
      const movies = response.data;
      this.setState({ movies: movies });
      console.log("the is the movies response", this.state.movies);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <Container>
          <h1>City Explorer</h1>
          <form onSubmit={this.getSearch} onChange={this.getImage}>
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
          {Object.keys(this.state.error).length === 0 ? (
            <div></div>
          ) : (
            <h3>{this.state.error}</h3>
          )}
        </Container>
        <Container>
          {
            //Check if searched then display card
            Object.keys(this.state.location).length === 0 ? (
              <div></div>
            ) : (
              <Card className="results-card">
                <Card.Header>{this.state.location.display_name}</Card.Header>
                <Card.Body>
                  <Card.Title>Image</Card.Title>
                  <img
                    className="image"
                    src={this.state.image}
                    alt="location map"
                  ></img>
                  <Card.Title>Latitude</Card.Title>
                  <Card.Text>{this.state.location.lat}</Card.Text>
                  <Card.Title>Longitude</Card.Title>
                  <Card.Text>{this.state.location.lon}</Card.Text>
                  <Weather forecast={this.state.weather} />
                </Card.Body>
              </Card>
            )
          }
        </Container>
        <Container>
          <Card.Title>Movies!!</Card.Title>
          <CardColumns>
            {this.state.movies.map((item, index) => {
              return (
                <>
                  <Movies
                    title={item.title}
                    overview={item.overview}
                    imgUrl={item.imageUrl}
                    aveVotes={item.averageVotes}
                    popularity={item.popularity}
                    releasedDate={item.releasedDate}
                  />
                </>
              );
            })}
          </CardColumns>
        </Container>
      </div>
    );
  }
}
