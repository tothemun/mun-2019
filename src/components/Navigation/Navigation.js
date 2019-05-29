import cn from 'classnames';
import React, { Component } from 'react';
import { Container, Col, Row } from 'react-grid-system';
import { Link } from 'react-router';
import styles from './Navigation.css';
import Logo from './logo.svg';

class Navigation extends Component {
  state = {
    isExpanded: true
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e) => {
    const { collapseY } = this.props;
    const { isExpanded } = this.state;

    if (window.scrollY > collapseY) {
      this.setState({ isExpanded: false })
    } else if (!isExpanded) {
      this.setState({ isExpanded: true });  
    }
  }

  render() {
    const { isExpanded } = this.state;

    return (
      <div className={cn(styles.container, {[styles.expanded]: isExpanded})}>
        <Container>
          <Row>
            <Col xs={12}>
              <Link to='/' className={styles.logoLink}>
                <img src={Logo} className={styles.logo} alt='Logo'/>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

Navigation.defaultProps = {
  collapseY: 154
};

export default Navigation;
