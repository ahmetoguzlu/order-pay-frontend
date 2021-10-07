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
        Image,
        CloseButton,
        Form,
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

  renderMainHeader = () => {
    return (
      <div className="main-header-place-holder">
        <div className="main-header h1"
              onClick={() => this.displaySection(null)}
        >Bizim Lokanta</div>
      </div>
      )
  };

  renderSubHeader = (onclickFunc, title) => {
    return (
      <div className="sub-header-place-holder">
          <div className="sub-header">
            <span className="sub-header-back"
                  onClick={onclickFunc}
            >{"<"}</span>
            <span className="sub-header-title">{title}</span>
          </div>
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

        {this.renderSubHeader(
          () => this.displaySection(null),
          this.state.viewSection.name
          )}

        <Container className="content-container">
          <Row xs={2} sm={3} className="g-2">
            {this.getItemsFromSection(this.state.viewSection)
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
      <Stack>
        {this.renderMainHeader()}

        {this.renderSubHeader(
          () => this.displaySection(this.getSectionFromItem(this.state.viewItem)),
          this.state.viewItem.name
          )}

        <Container>
          <Row>
            <Image className="item-detail-image" src={picture}/>
          </Row>
          <Row>
            <p>{this.state.viewItem.description}</p>
          </Row>
          <Row>
            <Form>
              {this.state.viewItem.options_binary
                    .map((binOpt) => (
                      <Form.Check
                        type="checkbox"
                        label={binOpt}/>
                ))}
              {Object.keys(this.state.viewItem.options_selection)
                      .map((key) => {
                        return (<div>
                          <Form.Control plaintext readOnly defaultValue={key} />
                          {this.state.viewItem.options_selection[key]
                            .map((opt) => {
                              return (
                                <Form.Check
                                  type="radio"
                                  label={opt}
                                  name={key}/>
                                )
                            })}
                          </div>
                          )
                      })}
            </Form>
          </Row>
        </Container>
      </Stack>
      )
  }

  render() {
    window.scrollTo(0,0);
    if (this.state.viewSection == null && this.state.viewItem == null) {
      return this.renderSectionList();
    } else if (this.state.viewSection != null) {
      return this.renderSection();
    } else if (this.state.viewItem != null) {
      return this.renderItem();
    }
  }


  // Other helpers
  getSectionFromItem = (item) => {
    return this.state.sections
            .filter((sec) => item.section == sec.pk)[0];
  };

  getItemsFromSection = (section) => {
    return this.state.items
            .filter((item) => item.section == section.pk);
  }
}

export default App;
