import styled from "masquerades";

// Create the button
export const StyledButton = styled.button`
  background: ${({ disabled }) => (disabled ? "grey" : "#f1c40f")};
  color: #fff;
  border: 3px solid #fff;
  border-radius: 50px;
  padding: 0.8rem 2rem;
  font: 24px "Margarine", sans-serif;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: 0.2s ease-in-out;
  letter-spacing: 2px;
  ${({ disabled }) => {
    if (disabled) {
      return styled.css`
        border-radius: 15px;
      `;
    }
    return "";
  }}
`
  // set up observedAttributes
  .observeAttributes(["disabled"]);

// Define the styled button as extension of the native button
customElements.define("styled-button", StyledButton, {
  extends: "button"
});
