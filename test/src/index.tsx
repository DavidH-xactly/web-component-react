import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import styled from "styled-components";

interface IWrapperProps {
  menucolor: string;
}

const Wrapper = styled.div<IWrapperProps>`
  ul {
    background: ${({ menucolor }) => menucolor};
    color: "red";
  }
`;

interface ITestProps {
  menutitle: string;
  menucolor: string;
}

const Test: React.FC<ITestProps> = ({ menutitle, menucolor }) => {
  console.log(menutitle, menucolor);
  return (
    <Wrapper menucolor={menucolor}>
      <p>{menutitle}</p>
      <ul>
        {["Login", "Home", "Cart"].map((buttonName: string, i: number) => (
          <li key={i}>{buttonName}</li>
        ))}
      </ul>
    </Wrapper>
  );
};

class TopMenu extends HTMLElement {
  mountPoint: any;
  componentAttributes: ITestProps = {
    menutitle: "Default Title",
    menucolor: "orange"
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
    if (this.componentProperties.menuItems === undefined) return [];

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
