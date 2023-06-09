import { Controller } from "@hotwired/stimulus"
import Typed from "typed.js"; // You need to import this to use new Typed()

export default class extends Controller {
  static values = {
  }

  connect() {
    new Typed(this.element, {

      strings: [' Monster Slicer™ ^1000 </br>Welcome travelers!'],
      typeSpeed: 30,
      showCursor:false,
      smartBackspace: true
    });
  }
}
