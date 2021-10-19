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
        Accordion,
        Button,
       } from 'react-bootstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: sects,
      items: its,
      viewSection: null,
      viewItem: null,
      viewItemCount: 1,
      cartContents: {},
    };
  }

  componentDidMount() {
    this.setState({
      sections: ls.get('sections') || sects,
      items: ls.get('items') || its,
      viewSection: ls.get('viewSection') || null,
      viewItem: ls.get('viewItem') || null,
      cartContents: ls.get('cartContents') || {},
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

// Helpers for rendering pages
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

  renderItemOptionPrice = (price) => {
    if (price == 0) {
      return;
    } else {
      return (
        <span className="item-option-price">${price.toFixed(2)}</span>
      )
    }
  };



// Rendering pages
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
      <Stack className="main-stack">
        {this.renderMainHeader()}

        {this.renderSubHeader(
          () => this.displaySection(this.getSectionFromItem(this.state.viewItem)),
          this.state.viewItem.name
          )}

        <Container>
          <Row>
            <Image className="item-form-image" src={picture}/>
          </Row>
          <Row>
            <p>{this.state.viewItem.description}</p>
          </Row>
          <Row>
            <Form className="item-form" id="item-form" onSubmit={this.addToCart}>
              <Accordion defaultActiveKey="0">
                {this.state.viewItem.options
                      .map((opt, index) => {
                        return (
                          <Accordion.Item eventKey={index.toString()}>
                            <Accordion.Header>{opt['header_text']}</Accordion.Header>
                            <Accordion.Body>
                              {Object.keys(opt['items']).map((key) => {
                                return (
                                  <Form.Check>
                                    <Form.Check.Input type={opt['type']} name={opt['header_text']}/>
                                    <Form.Check.Label className="item-option">
                                      <span className="item-option-label">{key}</span>
                                      {this.renderItemOptionPrice(opt['items'][key])}
                                    </Form.Check.Label>
                                  </Form.Check>
                                  )
                              })}
                            </Accordion.Body>
                          </Accordion.Item>
                          )
                      })
                }

                <br/>
                <Form.Control className="item-form-special-instructions" 
                              as="textarea"
                              type="text"
                              placeholder="Ozel istekleriniz..." />

              </Accordion>
            </Form>
          </Row>
          <Row className="buffer-row"/>
          <Row className="fixed-bottom cart-add">
            <Col className="cart-add-count-col" xs={4} sm={4}>
              <Button className="cart-add-decrease cart-add-button-color"
                      onClick={this.decreaseViewItemCount}
              >-</Button>
              <span className="cart-add-count">{this.state.viewItemCount}</span>
              <Button className="cart-add-increase cart-add-button-color"
                      onClick={this.increaseViewItemCount}
              >+</Button>
            </Col>
            <Col xs={8} sm={8}>
              <Button className="cart-add-button cart-add-button-color" 
                      type="submit" 
                      form="item-form">
                Hesaba Ekle
              </Button>  
            </Col>
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

  increaseViewItemCount = () => {
    let newCount = this.state.viewItemCount + 1;
    this.setState({viewItemCount: newCount});
  };

  decreaseViewItemCount = () => {
    let newCount = this.state.viewItemCount <= 1 ? 1 : this.state.viewItemCount - 1;
    this.setState({viewItemCount: newCount});
  };

  addToCart = (e) => {
    e.preventDefault();
    // console.log(e.target.elements);
    let cartItem = {}
    cartItem['initialPrice'] = this.state.viewItem.price;
    cartItem['optionsPrice'] = 0;
    cartItem['options'] = {};

    // Checked options
    for (let i = 0; i < e.target.elements.length; i++) {
      let elem = e.target.elements.item(i);

      if (elem.tagName == "INPUT" && elem.checked){
        let optionName = elem.nextSibling.children.item(0).textContent;
        let optionPrice = 0;
        if (elem.nextSibling.children.item(1)) {
          optionPrice = parseFloat(elem.nextSibling.children.item(1).textContent.substring(1));
        }

        cartItem['options'][optionName] = optionPrice;
        cartItem['optionsPrice'] += optionPrice;
      }

      // Special Instructions
      if (elem.tagName == "TEXTAREA"){
        if (elem.value != '') {
          cartItem['specialInstructions'] = elem.value;
        }
      }
      
    }

    cartItem['totalPrice'] = cartItem['initialPrice'] + cartItem['optionsPrice'];

    let newCartContents = this.state.cartContents;
    newCartContents[this.state.viewItem.name] = cartItem;

    this.setState({cartContents: newCartContents});

    // IMPORTANT!!! UNCOMMENT BELOW AFTER IMPLEMENTING DELETING THINGS FROM CART!!!
    // ls.set('cartContents', newCartContents);
  };
}

export default App;
