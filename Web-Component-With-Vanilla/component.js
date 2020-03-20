class TopMenu extends HTMLElement {
  constructor() {
    super();
    this.menuTitle = "Default Title";
    this.menuItems = [];
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
    #main-wrapper {
      display:flex;
      flex-direction:column;
      align-items:center;
    }
    </style>
    <div id="main-wrapper">
      <div id="title-wrapper"></div>
      <div id="nav-wrapper"></div>
    </div>
    `;
  }

  connectedCallback() {
    const menuTitleAttribute = this.getAttribute("menu-title");
    const menuItemsAttribute = this.getAttribute("menu-items");
    if (menuTitleAttribute) this.menuTitle = menuTitleAttribute;
    if (menuItemsAttribute) this.menuItems = menuItemsAttribute;

    this.listContainer = document.createElement("ul");
    this.listTitle = document.createElement("p");
    this.listTitle.textContent = this.menuTitle;

    this.menuItems
      .split(",")
      .map(item => item.trim())
      .forEach(text => {
        const listItem = document.createElement("li");
        listItem.textContent = text;
        this.listContainer.append(listItem);
      });

    this.shadowRoot.querySelector("#title-wrapper").append(this.listTitle);
    this.shadowRoot.querySelector("#nav-wrapper").append(this.listContainer);
  }
}

window.customElements.define("my-component", TopMenu);
