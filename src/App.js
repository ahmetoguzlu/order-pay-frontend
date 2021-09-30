import React, { Component } from "react";
import {sects, its} from "./TestData.js" // Test data, remove when not needed

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

  displaySection = (section) => {
    return this.setState({viewSection: section,
                          viewItem: null});
  };

  displayItem = (item) => {
    return this.setState({viewItem: item,
                          viewSection: null});
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

  renderSectionList = () => {
    return this.state.sections.map((section) => (
      <li
        key={section.pk}
        className="list-group-section d-flex justify-content-between align-items-center"
        onClick={() => this.displaySection(section)}
      >
        <span
          className="section-title mr-2"
        >
          {section.name}
        </span>
      </li>
    ));
  };

  renderSection = () => {
    return (
      <div>
      <span>{this.state.viewSection.name}</span>
      </div>
      );
  }

  renderItem = () => {
    return null;
  }

  render() {
    return (
      <main className="container">
        <h1 className="text-black text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush border-top-0">
              {this.renderContents()}
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
