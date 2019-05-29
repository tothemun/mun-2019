import React from 'react';
import { Col, Row } from 'react-grid-system';
import { ProgressiveImage } from '_components';

const ClientList = ({ clients }) => (
  <Row>
    { clients.map((client) => (
      <Col xs={6} md={4} lg={2}>
        <ProgressiveImage src={client} />
      </Col>
    ))}
  </Row>
);

export default ClientList;