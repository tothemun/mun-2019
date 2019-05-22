import cn from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Col, Row } from 'react-grid-system';
import { fetchAllPages } from '_actions/pageActions';
import { fetchAllPosts } from '_actions/postActions';
import {
  BlogPostCard,
  ContactForm,
  HomepageHeader,
  HomepageSection,
  ProgressiveImage,
  WorkCard
} from '_components';
import baseStyles from '_styles/index.css';
import variables from '_styles/variables';
import styles from './Homepage.css';
import MUNLogo from './logo.svg';

class Homepage extends Component {
  componentWillMount() {
    const { fetchAllPages, fetchAllPosts } = this.props;

    fetchAllPages();
    fetchAllPosts();
  }

  componentDidMount() {
    this.setState({loaded: true});
  }

  render() {
    const { fetchedPosts, fetchedPages, pages, posts } = this.props;
    const clientClass = window.innerWidth > parseInt(variables.sm, 10) ? baseStyles.centerVert : null;

    return (
      <div>
        <Container className={styles.container}>
          <Row>
            <Col xs={12} md={6}>
              <ProgressiveImage src={MUNLogo} alt='Client' fit='contain' className={baseStyles.mb4}/>
            </Col>
            <Col xs={12} md={6}>
              <h1>Creative</h1>
              <h1>Technology</h1>
              <h1>Studio</h1>
            </Col>
          </Row>
        </Container>
        <div className={styles.address}>
          <h4>NYC</h4>
        </div>
      </div>
    );
  }

  state = {
    loaded: false
  };
}

const mapStateToProps = (state) => ({
  fetchedPosts: state.postReducer.fetched,
  fetchedPages: state.pageReducer.fetched,
  pages: state.pageReducer.pages,
  posts: state.postReducer.posts,
  workPosts: state.postReducer.posts
});

export default connect(mapStateToProps, {
  fetchAllPages,
  fetchAllPosts
})(Homepage);
