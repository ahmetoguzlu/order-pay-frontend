import React, { Component, useState, useEffect } from "react";
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
        ListGroup,
        Modal,
       } from 'react-bootstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: sects,
      items: its,
      viewSection: null,
      viewItem: null,
      orderContents: {},
      requiredOptions: {},
      showOrderReview: false,
      showConfirmation: false,
      showCheckout: false,


      // IMPORTANT: Backend should keep track of the itemized bill
      billContents: {},
    };

    this.viewItemCount = null;
  }

  componentDidMount() {
    this.setState({
      sections: ls.get('sections') || sects,
      items: ls.get('items') || its,
      viewSection: ls.get('viewSection') || null,
      viewItem: ls.get('viewItem') || null,
      billContents: ls.get('billContents') || {},
      showCheckout: ls.get('showCheckout') || false,
    });
  }

  displaySection = (section) => {
    this.setState({viewSection: section,
                    viewItem: null,
                    showCheckout: false});

    ls.set('viewSection', section);
    ls.set('viewItem', null);
    ls.set('showCheckout', false);
  };

  displayItem = (item) => {
    this.setState({viewItem: item,
                    viewSection: null,
                    showCheckout: false});

    ls.set('viewItem', item);
    ls.set('viewSection', null);
    ls.set('showCheckout', false);
  };

  displayCheckout = () => {
    this.setState({showCheckout: true,
                    viewSection: null,
                    viewItem: null});

    ls.set('showCheckout', true);
    ls.set('viewItem', null);
    ls.set('viewSection', null);
  };

  toggleOrderReview = () => {
    let curr = this.state.showOrderReview;
    this.setState({showOrderReview: !curr});
  }

  // closeOrderConfirmation = () => {
  //   let curr = this.state.showOrderConfirmation;
  //   this.setState({showOrderConfirmation: !curr});
  //   this.displaySection(this.getSectionFromItem(this.state.viewItem));
  // }

  toggleConfirmation = () => {
    let curr = this.state.showConfirmation;
    this.setState({showConfirmation: !curr});
  }

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
          <div className="sub-header" onClick={onclickFunc}>
            <span className="sub-header-back"
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

  renderOptionLabel = (opt) => {
    let label = null;

    if (opt['count'] == 1) {
      label = opt['name'];
    }
    return (
      <span>{opt['name']}{opt['count'] > 1 ? ' x' + opt['count'] : null}</span>
      );
  }

  renderOrderReview = () => {
    return (
      <Modal show={this.state.showOrderReview} onHide={this.cancelOrder} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Siparis Ozeti</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.showOrderReview ? 
            <div>
              <h5>{this.state.orderContents.itemName}</h5>
              {Object.keys(this.state.orderContents['options']).map((optKey) => (
                  <div>
                    {this.renderOptionLabel(this.state.orderContents['options'][optKey])}
                    {this.state.orderContents['options'][optKey]['price'] > 0 ?
                      <span className="order-review-option-price">
                        +${(this.state.orderContents['options'][optKey]['price']
                            * this.state.orderContents['options'][optKey]['count']).toFixed(2)}
                      </span> : null}
                  </div>
                ))}
              {Object.keys(this.state.orderContents).includes('specialInstructions') ?
                <div>
                  <br/>
                  <p>Ozel Istekler: {this.state.orderContents['specialInstructions']}</p>
                </div>
                : null
              }
              <br/>
              <div>
                <span>Adet: {this.state.orderContents['count']}</span>
                <span className="order-review-total-price">
                  Toplam: ${this.state.orderContents['totalPrice'].toFixed(2)}
                </span>
              </div>
            </div> : null}
        </Modal.Body>
        <Modal.Footer>
          <Button className="order-review-submit-button" onClick={this.submitOrder}>
            Siparisi Onayla
          </Button>
        </Modal.Footer>
      </Modal>
    )
  };

  renderConfirmation = (msg, onClose) => {
    return (
      <Modal show={this.state.showConfirmation} onHide={onClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>{msg}</Modal.Title>
        </Modal.Header>
      </Modal>
      )
  };

  renderGoToCheckout = () => {
    if (Object.keys(this.state.billContents).length > 0) {
      return (
        <Row className="fixed-bottom go-to-checkout">
            <Button className="go-to-checkout-button order-add-button-color" 
                    type="button"
                    onClick={this.displayCheckout}>
              Hesabi Kapat
            </Button>  
        </Row>
      )
    }
  };

  renderPaymentOptions = () => {
    return (
      <Row className="fixed-bottom payment-options">
        <Col xs={6} sm={6}>
          <Button className="payment-options-button order-add-button-color"
                  onClick={this.toggleConfirmation}>
            Nakit Ode
          </Button>  
        </Col>
        <Col xs={6} sm={6}>
          <Button className="payment-options-button order-add-button-color">
            Kartla Ode
          </Button>  
        </Col>
      </Row>
    )
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
          <Row className="buffer-row"/>
          {this.renderGoToCheckout()}
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
          <Row className="buffer-row"/>
          {this.renderGoToCheckout()}
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

        {this.renderOrderReview()}
        {this.renderConfirmation("Siparis basariyla alindi!", 
                                  () => {
                                    this.toggleConfirmation(); 
                                    this.displaySection(this.getSectionFromItem(this.state.viewItem));
                                  })}


        <Container>
          <Row>
            <Image className="item-form-image" src={picture}/>
          </Row>
          <Row>
            <p>{this.state.viewItem.description}</p>
          </Row>
          <Row>
            <Form className="item-form" id="item-form" onSubmit={this.reviewOrder}>
              <Accordion defaultActiveKey="0">
                {Object.values(this.state.viewItem.options)
                      .map((opt, index) => {
                        return (
                          <Accordion.Item eventKey={index.toString()}>
                            <Accordion.Header
                              className={this.state.requiredOptions[opt["header_text"]] == false ? "invalid-item-option" : ""}
                            >
                              {opt['header_text']}
                            </Accordion.Header>
                            <Accordion.Body>
                              {Object.keys(opt['items']).map((key) => {
                                return (
                                  <Form.Check>
                                    <Form.Check.Input type={opt['type']} name={opt['header_text']}/>
                                    <Form.Check.Label className="item-option">
                                      <span className="item-option-label">{key}</span>
                                      {this.renderItemOptionPrice(opt['items'][key])}
                                    </Form.Check.Label>
                                    <Form.Control.Feedback type="invalid" tooltip="true">TEST FEEDBACK</Form.Control.Feedback>
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
          <Row className="fixed-bottom order-add">
            <Col className="order-add-count-col" xs={4} sm={4}>
              <ItemCountGroup onChange={(count) => this.viewItemCount = count}/> 
            </Col>
            <Col xs={8} sm={8}>
              <Button className="order-add-button order-add-button-color" 
                      type="submit" 
                      form="item-form">
                Siparis Ver
              </Button>  
            </Col>
          </Row>
        </Container>
      </Stack>
      )
  }

  renderCheckout = () => {
    return (
      <Stack>
        {this.renderMainHeader()}
        {this.renderSubHeader(() => this.displaySection(null), "Ana Menu")}

        {this.renderConfirmation("Nakit odeme icin garson yonlendirildi!", 
                                  () => {
                                    this.toggleConfirmation();
                                    this.displaySection(null);
                                  })}



        <Container className="content-container">
          <Row>
            <ListGroup variant="flush">
              {Object.keys(this.state.billContents).map((key) => (
                <ListGroup.Item>
                  <div>
                    <h5>{this.state.billContents[key].itemName}</h5>
                    {Object.keys(this.state.billContents[key]['options']).map((optKey) => (
                        <div>
                          {this.renderOptionLabel(this.state.billContents[key]['options'][optKey])}
                          {this.state.billContents[key]['options'][optKey]['price'] > 0 ?
                            <span className="order-review-option-price">
                              +${this.state.billContents[key]['options'][optKey]['price'].toFixed(2)}
                            </span> : null}
                        </div>
                      ))}
                    <br/>
                    <div>
                      <span>Adet: {this.state.billContents[key]['count']}</span>
                      <span className="order-review-total-price">
                        Toplam: ${this.state.billContents[key]['totalPrice'].toFixed(2)}
                      </span>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Row>
          <Row className="buffer-row"/>
          {this.renderPaymentOptions()}
        </Container>
      </Stack>
      )
  }

  render() {
    window.scrollTo(0,0);
    if (this.state.viewSection == null && this.state.viewItem == null && this.state.showCheckout == false) {
      return this.renderSectionList();
    } else if (this.state.viewSection != null) {
      return this.renderSection();
    } else if (this.state.viewItem != null) {
      return this.renderItem();
    } else if (this.state.showCheckout) {
      return this.renderCheckout();
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

  reviewOrder = (e) => {
    e.preventDefault();

    let invalidInput = false;
    let newReqOpts = {}

    // Validate inputs
    for (let i = 0; i < Object.keys(e.target.elements).length; i++) {
      let name = Object.keys(e.target.elements)[i];
      if (Object.keys(this.state.viewItem.options).includes(name)) {
        let opt = this.state.viewItem.options[name];

        // Currently only radio types are required
        if (opt.type == "radio") {
          newReqOpts[name] = false;
          for (let j=0; j < e.target.elements[name].length; j++) {
            if (e.target.elements[name][j].checked) {
              newReqOpts[name] = true;
            }
          }

          if (!newReqOpts[name]) {
            invalidInput = true;
          }
        }
      }
    }

    if (invalidInput) {
      this.setState({requiredOptions: newReqOpts});
      return;
    }

    let orderDetails = {}
    orderDetails['itemName'] = this.state.viewItem.name;
    orderDetails['initialPrice'] = this.state.viewItem.price;
    orderDetails['optionsPrice'] = 0;
    orderDetails['options'] = {};
    orderDetails['count'] = this.viewItemCount;

    // Checked options
    for (let i = 0; i < e.target.elements.length; i++) {
      let elem = e.target.elements.item(i);

      if (elem.tagName == "INPUT" && elem.checked){
        let optionName = elem.nextSibling.children.item(0).textContent;
        let optionPrice = 0;
        if (elem.nextSibling.children.item(1)) {
          optionPrice = parseFloat(elem.nextSibling.children.item(1).textContent.substring(1));
        }

        if (Object.keys(orderDetails['options']).includes(optionName)) {
          orderDetails['options'][optionName]['count'] += 1;
        } else {
          orderDetails['options'][optionName] = {};
          orderDetails['options'][optionName]['name'] = optionName;
          orderDetails['options'][optionName]['price'] = optionPrice;
          orderDetails['options'][optionName]['count'] = 1;
        }
          orderDetails['optionsPrice'] += optionPrice;
      }

      // Special Instructions
      if (elem.tagName == "TEXTAREA"){
        if (elem.value != '') {
          orderDetails['specialInstructions'] = elem.value;
        }
      }
      
    }

    orderDetails['unitPrice'] = orderDetails['initialPrice'] + orderDetails['optionsPrice'];
    orderDetails['totalPrice'] = orderDetails['unitPrice'] * orderDetails['count'];

    this.setState({orderContents: orderDetails});
    this.toggleOrderReview();
  };

  cancelOrder = () => {
    this.setState({orderContents: {}});
    this.toggleOrderReview();
  }

  submitOrder = () => {
    let newBill = this.state.billContents;
    newBill[Object.keys(newBill).length] = this.state.orderContents;
    this.setState({orderContents: {},
                    billContents: newBill});
    ls.set('billContents', newBill);

    this.toggleOrderReview();
    this.toggleConfirmation();
  };
}

// We use a separate component to avoid re-rendering of whole page when count chages
// Re-rendering causes the page to scroll to top!
function ItemCountGroup(props) {
  const [count, setCount] = useState(1);

  useEffect(() => props.onChange(count));

  return (
    <div>
    <Button className="order-add-decrease order-add-button-color"
                      onClick={() => setCount(count > 1 ? count - 1 : 1)}
                      type="button"
              >-</Button>
              <span className="order-add-count"
              >{count}</span>
              <Button className="order-add-increase order-add-button-color"
                      onClick={() => setCount(count + 1)}
                      type="button"
              >+</Button></div>
  );
  }

export default App;
