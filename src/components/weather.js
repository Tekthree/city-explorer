import { Card } from "react-bootstrap";
import React, { Component } from "react";

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Card bg="dark" text="light">
          <Card.Img
            src={``}
          ></Card.Img>
          <Card.Body>
            <Card.Title>Date/Forcast</Card.Title>
            <Card.Text>
              {this.props.dateTime} - {this.props.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
