import {Card} from "react-bootstrap";
import React, { Component } from "react";

export default class Movies extends Component {
  render() {
    return (
      <div>
        <Card bg="dark" text="light">
          <Card.Img src={`https://image.tmdb.org/t/p/w500${this.props.imgUrl}`}></Card.Img>
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Text>😍 = {this.props.aveVotes}</Card.Text>
            <Card.Text>{this.props.overview}</Card.Text>
            <Card.Text>Popularity: {this.props.popularity}</Card.Text>
            <Card.Text>Released: {this.props.releasedDate}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
