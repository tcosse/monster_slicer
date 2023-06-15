import { Controller } from "@hotwired/stimulus"
import Typed from "typed.js"; // You need to import this to use new Typed()

// Connects to data-controller="typed-win"
export default class extends Controller {
  connect() {
    new Typed(this.element, {
      strings: ['Congratulations! <br> You WON!'],
      typeSpeed: 80,
      showCursor: false,
      smartBackspace: true
    });
  }
}
