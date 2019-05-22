import cn from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Col, Row } from 'react-grid-system';
import { fetchClients } from '_actions/contentActions';
import {
  BlogPostCard,
  ClientList,
  ContactForm,
  HomepageHeader,
  HomepageSection,
  ProgressiveImage,
  WorkCard
} from '_components';
import baseStyles from '_styles/index.css';
import variables from '_styles/variables';
import styles from './Homepage.css';

class Homepage extends Component {
  componentDidMount() {
    this.props.fetchClients();
    this.setState({loaded: true});
  }

  render() {
    const { content, fetchedContent } = this.props;

    if (!fetchedContent) return null;

    return (
      <div className={baseStyles.pt5}>
        <HomepageHeader display={this.state.loaded}/>
        <Container>
          <HomepageSection title="Our Clients">
            <ClientList clients={content.clients}/>
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
