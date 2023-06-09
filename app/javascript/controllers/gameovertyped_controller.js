import { Controller } from "@hotwired/stimulus"
import Typed from "typed.js"; // You need to import this to use new Typed()

// Connects to data-controller="gameovertyped"
export default class extends Controller {
  static values = {
  }

  connect() {
    new Typed(this.element, {

      strings: ['GAME OVER'],
      typeSpeed: 100,
      showCursor:false,
      smartBackspace: true
    });
  }
}
