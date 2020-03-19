import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ReactWebComponent from "react-web-component";

interface IStyledButtonProps {
  buttonText: string;
  buttonColor: string;
}

export class AnotherButton extends React.Component {
  webComponentAttributeChanged(name: any, oldVal: any, newVal: any) {
    console.log(name, oldVal, newVal);
  }

  render() {
    return (
      <div>
        <button>Hi</button>
      </div>
    );
  }
}

export const StyledButton: React.FC<IStyledButtonProps> = ({
  buttonText,
  buttonColor
}) => {
  return (
    <div>
      <button>{buttonText}</button>
    </div>
  );
};

ReactWebComponent.create(<AnotherButton />, "my-button");

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
