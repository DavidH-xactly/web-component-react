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
    <button id="reverse">Reverse Nav</button>
      <div id="title-wrapper"></div>
      <div id="nav-wrapper"></div>
    </div>
    `;

    this.shadowRoot.querySelector("#reverse").addEventListener("click", () => {
      this.menuItems.reverse();
      this.createMenuItems(this.listContainer);
    });
  }

  connectedCallback() {
    const menuTitleAttribute = this.getAttribute("menu-title");
    const menuItemsAttribute = this.getAttribute("menu-items");
    if (menuTitleAttribute) this.menuTitle = menuTitleAttribute;
    if (menuItemsAttribute)
      this.menuItems = menuItemsAttribute.split(",").map(item => item.trim());

    this.listContainer = document.createElement("ul");
    this.listTitle = document.createElement("p");
    this.listTitle.textContent = this.menuTitle;
    this.createMenuItems(this.listContainer);
    this.shadowRoot.querySelector("#title-wrapper").append(this.listTitle);
    this.shadowRoot.querySelector("#nav-wrapper").append(this.listContainer);
  }

  createMenuItems(parentEL) {
    parentEL.innerHTML = "";
    this.menuItems.forEach(text => {
      const listItem = document.createElement("li");
      listItem.textContent = text;
      parentEL.append(listItem);
    });
  }
}

window.customElements.define("my-component", TopMenu);
