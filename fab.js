class Blur {
    div;
    constructor(content) {
      const oBody = window.top?.document.querySelector("body");
      this.div = window.top?.document.createElement("div");
      this.div.id = "blurred_background";
      this.div.innerHTML = `
        <style>
          #blurred_background {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            backdrop-filter: blur(8px);
            z-index: 1001;
            display: flex;
            align-items: center;
            justify-content: center;
          }
  
          #blurred_background #modal_container {
            background: white;
            border-radius: 1rem;
            padding: 1.5em;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            position: relative;
            max-width: 500px;
            width: 90%;
          }
  
          #blurred_background #close_button {
            position: absolute;
            top: 0.5em;
            right: 0.5em;
            background: #ff5c5c;
            color: white;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            cursor: pointer;
            font-weight: bold;
          }
        </style>
        <div id="modal_container">
          <button id="close_button">&times;</button>
          ${content}
        </div>
      `;
      oBody?.insertAdjacentElement("afterbegin", this.div);
      this.div.querySelector("#close_button")?.addEventListener("click", () => this.close());
    }
  
    close() {
      this.div.remove();
    }
  }
  
  const suffix = (Math.random() * 100).toFixed().toString();
  
  document.querySelector("body").insertAdjacentHTML("beforeend", `
    <style>
      #fab${suffix} {
        position: fixed;
        bottom: 1.5em;
        right: 1.5em;
        padding: 0.75em 1.25em;
        background-color: #5ccad7;
        color: white;
        border: none;
        border-radius: 2em;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      }
    </style>
    <button id="fab${suffix}">Order Now</button>
  `);
  
  document.querySelector(`#fab${suffix}`).addEventListener("click", () => {
    new Blur(`<x-chat></x-chat>`);
  });
  