class Modal extends HTMLElement {
  constructor() {
    super();
    this._isVisible = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
    .overlay {
        width: 100vw;
        height: 100vh; 
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        width:65vw;
        background:white;
        border-radius: 5px;
        position: relative;
        padding: 15px;
    }

    .close-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
    }

    .hide {
        display: none;
    }
    </style>
        <div class="overlay hide"> 
            <div class="modal">
                <span class="close-icon">&times;</span>
                <div class="modal-header">
                    <slot name="header"></slot>
                </div>
                <div class="modal-content">
                    <slot name="main"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    `;

    this.shadowRoot
      .querySelector(".close-icon")
      .addEventListener("click", this.trigger.bind(this));
  }

  connectedCallback() {
    this._render();
  }

  trigger() {
    this._isVisible = !this._isVisible;
    this._render();
  }

  _render() {
    const overlay = this.shadowRoot.querySelector(".overlay");
    if (this._isVisible) {
      overlay.classList.remove("hide");
    } else {
      overlay.classList.add("hide");
    }
  }
}

customElements.define("dh-modal", Modal);
