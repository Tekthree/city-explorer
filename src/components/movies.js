import {Card} from "react-bootstrap";
import React, { Component } from "react";

export default class Movies extends Component {
  render() {
    return (
      <div>
        <Card bg="dark" text="light">
          <Card.Img src={this.props.imageUrl}></Card.Img>
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Text>😍 = {this.props.averageVotes}</Card.Text>
            <Card.Text>{this.props.overview}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
