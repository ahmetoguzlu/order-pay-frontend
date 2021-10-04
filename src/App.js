import React, { Component } from "react";
import {sects, its} from "./TestData.js" // Test data, remove when not needed
import "./App.css";
import picture from "./default.jpg";
import ls from 'local-storage';
import { 
        Container,
        Row,
        Col,
        Stack,
        Card,
       } from 'react-bootstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: sects,
      items: its,
      viewSection: null,
      viewItem: null,
    };
  }

  componentDidMount() {
    this.setState({
      sections: ls.get('sections') || sects,
      items: ls.get('items') || its,
      viewSection: ls.get('viewSection') || null,
      viewItem: ls.get('viewItem') || null,
    });
  }

  displaySection = (section) => {
    this.setState({viewSection: section,
                    viewItem: null});

    ls.set('viewSection', section);
    ls.set('viewItem', null);
  };

  displayItem = (item) => {
    this.setState({viewItem: item,
                    viewSection: null});

    ls.set('viewItem', item);
    ls.set('viewSection', null);
  };

  // Calls appropriate render function based on state
  renderContents = () => {
    if (this.state.viewSection == null && this.state.viewItem == null) {
      return this.renderSectionList();
    } else if (this.state.viewSection != null) {
      return this.renderSection();
    } else if (this.state.viewItem != null) {
      return this.renderItem();
    }
  };

  renderMainHeader = () => {
    return (
      <div className="main-header-place-holder">
        <div className="main-header h1">Bizim Lokanta</div>
      </div>
      )
  };

  renderSectionList = () => {
    return (
      <Stack>
        {this.renderMainHeader()}
        <Container className="content-container">
          <Row xs={1} sm={2} lg={3} className="g-4">
            {this.state.sections.map((section) => (
              <Col>
                <Card onClick={() => this.displaySection(section)}>
                  <Card.Img variant="top" src={picture} />
                  <Card.Body className="section-body">
                    <Card.Title className="section-title text-center">{section.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Stack>
    )
  };

  renderSection = () => {
    return (
      <Stack>
        {this.renderMainHeader()}

        <div className="section-header-place-holder">
          <div className="section-header">
            <span className="section-header-back"
                  onClick={() => this.displaySection(null)}
            >{"<"}</span>
            <span className="section-header-title">{this.state.viewSection.name}</span>
          </div>
        </div>

        <Container className="content-container">
          <Row xs={2} sm={3} className="g-2">
            {this.state.items
              .filter((item) => item.section == this.state.viewSection.pk)
              .map((item) => (
                <Col>
                  <Card onClick={() => this.displayItem(item)}>
                    <Card.Img className="item-image" variant="top" src={picture}/>
                    <Card.Body className="item-body">
                      <Card.Title className="item-title text-left" as="h5">{item.name}</Card.Title>
                      <Card.Text className="item-price">${item.price.toFixed(2)}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </Stack>
    );
  }

  renderItem = () => {
    return (
      <div
        onClick={() => this.displaySection(null)}
      >{this.state.viewItem.name}</div>
      )
  }

  render() {
    window.scrollTo(0,0);
    return (
      <div>
      {this.renderContents()}
      </div>
    );
  }
}

export default App;
