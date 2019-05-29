import cn from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Col, Row } from 'react-grid-system';
import { fetchClients } from '_actions/contentActions';
import {
  BlogPostCard,
  ClientList,
  ContactForm,
  HomepageSection,
  ProgressiveImage,
  WorkCard
} from '_components';
import baseStyles from '_styles/index.css';
import variables from '_styles/variables';
import styles from './Homepage.css';

import HotelVT from './hotel_vt.png';
import Mamava from './mamava.png';
import MTV from './mtv.png';
import Seventh from './seventh.png';
import Sutter from './sutter.png';
import Tempur from './tempur.png';
import Visa from './visa.png';
import WSJ from './wsj.png';
import Atlantic from './atlantic.png';
import Cartier from './cartier.png';
import Estee from './estee.png';
import Fifa from './fifa.png';

class Homepage extends Component {
  componentDidMount() {
    this.props.fetchClients();
    this.setState({loaded: true});
  }

  render() {
    const { content, fetchedContent } = this.props;

    const clients = [
      HotelVT,
      Mamava,
      MTV,
      Seventh,
      Sutter,
      Tempur,
      Visa,
      WSJ,
      Atlantic,
      Cartier,
      Estee,
      Fifa
    ];


    return (
      <div>
        {/*<HomepageHeader display={this.state.loaded}/>*/}
        <Container>
          <HomepageSection title="Our Clients">
            <ClientList clients={clients}/>
          </HomepageSection>
          <ContactForm />
        </Container>
      </div>
    );
  }

  state = {
    loaded: false
  };
}

const mapStateToProps = (state) => ({
  fetchedContent: state.contentReducer.fetched,
  content: state.contentReducer.content
});

export default connect(mapStateToProps, {
  fetchClients
})(Homepage);
