import { Order } from "./Order.js"

class Chat extends HTMLElement {
  constructor() {
    super();
    this.oOrder = new Order("123-456-7891");
  }

  sendMessage(evt) {
    evt.preventDefault();
    const msg = this.input.value.trim();
    if (!msg) return;
    this.input.value = '';
    this.writeLine(msg);
  }

  addMessage(e) {
    const msg = e.data ? JSON.parse(e.data) : e;
    this.writeLine(`${msg.FROM}: ${msg.MESSAGE}`);
  }

  writeLine(text) {
    // Show user message
    this.messages.insertAdjacentHTML("beforeend", `
      <li class="message-item item-secondary">You say: ${text}</li>`);

    // Handle response from bot
    const aMessages = this.oOrder.handleInput(text);
    for (let message of aMessages) {
      this.messages.insertAdjacentHTML("beforeend", `
        <li class="message-item item-primary">Bot says: ${message}</li>`);
    }

    // If order is complete, reset the session
    if (this.oOrder.isDone) {
      this.oOrder = new Order("456-789-1023"); // Simulate a new session
      this.messages.insertAdjacentHTML("beforeend", `
        <li class="message-item item-primary">Bot says: If you'd like to order again, just say hello!</li>`);
    }

    this.messages.scrollTop = this.messages.scrollHeight;
  }

  connectedCallback() {
    const suffix = (Math.random() * 100).toFixed().toString();
    this.innerHTML = `
      <style>
.chat${suffix} ul { list-style: none; padding: 0; margin: 0; }

/* chatbox */
.chat${suffix} {
  max-width: 400px;
  min-height: 400px;
  background-color: #fff;
  padding: 15px;
  border-radius: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  font-family: sans-serif;
}

/* messages */
.chat${suffix} .messages {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 500px;
}

.chat${suffix} .message-list {
  overflow-y: auto;
  max-height: 500px;
}

.chat${suffix} .message-item {
  padding: 20px;
  border-radius: 0.75rem;
  margin: 20px 0;
}

.chat${suffix} .message-item:last-child {
  margin-bottom: 0;
}

.chat${suffix} .item-primary {
  background-color: #f6f7f8;
  color: #3c3c3e;
  margin-right: 2em;
}

.chat${suffix} .item-secondary {
  background-color: #5ccad7;
  color: #fff;
  margin-left: 2em;
}

/* messages input */
.chat${suffix} .message-input {
  display: flex;
  padding: 20px 0;
}

.chat${suffix} .message-input input {
  width: 100%;
  padding: 10px;
  border-radius: 2rem;
  border: 1px solid #a5a5a5;
}

.chat${suffix} .message-input button {
  padding: 10px;
  margin-left: 10px;
  border-radius: 5px;
  border: none;
  background-color: #5ccad7;
  color: white;
  cursor: pointer;
}
      </style>

      <div class="chat${suffix}">
        <div class="messages">
          <ul class="message-list"></ul>
          <form class="message-input">
            <input type="text" placeholder="Type your message..." />
            <button type="submit" class="btn">Send</button>
          </form>
        </div>
      </div>
    `;

    this.input = this.querySelector("input");
    this.messages = this.querySelector(".message-list");
    this.querySelector("form").addEventListener('submit', this.sendMessage.bind(this));
  }
}

customElements.define("x-chat", Chat);
