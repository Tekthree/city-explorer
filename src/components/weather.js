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
        <Card.Title>Date/Forcast</Card.Title>
        <Card.Text>{this.props.forecast.date} - {this.props.forecast.description}</Card.Text>
      </div>
    );
  }
}
