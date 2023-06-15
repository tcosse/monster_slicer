import { Controller } from "@hotwired/stimulus"
import Typed from "typed.js"; // You need to import this to use new Typed()

// Connects to data-controller="delayed-message"
export default class extends Controller {
  static values = { score: String}
  connect() {
    setTimeout(() => {
      new Typed(this.element, {
        strings: ['Your score : ' + this.scoreValue],
        typeSpeed: 80,
        showCursor: false,
        smartBackspace: true
      });
    }, 3000);
  }
}
