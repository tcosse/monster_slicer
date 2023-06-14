import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="vertical-slides"
export default class extends Controller {
  connect() {
    console.log('Hello from vertical slides controller')
    document.querySelector('body').style.cssText += 'background-color:black';
  }

  scrollToSyllabus() {
    location.hash = '#syllabus'
  }
}
