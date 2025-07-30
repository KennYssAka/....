
class Button {
    constructor(id, label, user) {
      this.id = id;
      this.label = label;
      this.user = user;
    }
  
    onClick = () => {
      console.log(this.user.name);
    };
  
    render() {
      const button = document.createElement("button");
      button.id = this.id;
      button.innerText = this.label;
      button.addEventListener("click", this.onClick);
      return button;
    }
  }
  
// это данные!!!
  const data = [
    { id: 1, label: "Button 1", user: { name: "Pit" } },
    { id: 2, label: "Button 2", user: { name: "Jane" } },
    { id: 3, label: "Button 3", user: { name: "Kyle" } }
  ];

  const container = document.getElementById("app");
  
  data.forEach(item => {
    const button = new Button(item.id, item.label, item.user);
    container.appendChild(button.render());
  });
  