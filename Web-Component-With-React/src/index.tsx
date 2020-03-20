import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { useMappedState } from "react-use-mapped-state";

interface ITestProps {
  menutitle: string;
  menuItems: string[];
}

const Test: React.FC<ITestProps> = props => {
  const { menutitle, menuItems } = props;
  const [{ btnDisabled }, valueSetter] = useMappedState({ btnDisabled: true });

  const disableButton = () => {
    console.log("fired");
    valueSetter("btnDisabled", !btnDisabled);
  };

  console.log("props", props);
  return (
    <div>
      <p>{menutitle}</p>
      <button is="styled-button" disabled={btnDisabled}>
        Do Something
      </button>
      <button onClick={disableButton}>Disable Button</button>
      <ul className="menu-holder">
        {menuItems.map((buttonName: string, i: number) => (
          <li key={i}>{buttonName}</li>
        ))}
      </ul>
    </div>
  );
};

class TopMenu extends HTMLElement {
  mountPoint: any;
  componentAttributes: ITestProps = {
    menutitle: "Default Title",
    menuItems: []
  };
  componentProperties: { [key: string]: string[] } = {};

  connectedCallback() {
    this.mountReactApp();
  }

  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this.mountPoint);
  }

  static get observedAttributes() {
    return ["menutitle", "menucolor"];
  }

  attributeChangedCallback(name: any, oldVal: any, newVal: any) {
    (this.componentAttributes as any)[name] = newVal;

    this.mountReactApp();
  }

  get menuItems() {
    return this.componentProperties.menuItems;
  }

  set menuItems(newValue) {
    this.componentProperties.menuItems = newValue;

    this.mountReactApp();
  }

  reactProps() {
    return { ...this.componentAttributes, ...this.componentProperties };
  }

  mountReactApp() {
    if (!this.mountPoint) {
      this.mountPoint = document.createElement("div");
      this.attachShadow({ mode: "open" }).appendChild(this.mountPoint);
    }

    ReactDOM.render(<Test {...this.reactProps()} />, this.mountPoint);
  }
}

window.customElements.define("top-menu", TopMenu);

serviceWorker.unregister();
