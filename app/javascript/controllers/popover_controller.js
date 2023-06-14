import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="popover"
export default class extends Controller {
  connect() {
    const popover = new bootstrap.Popover(this.element,{trigger: 'focus'})
  }
}
