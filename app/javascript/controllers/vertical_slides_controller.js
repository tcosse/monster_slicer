import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="vertical-slides"
export default class extends Controller {
  static targets = ['syllabus']
  connect() {
    console.log('Hello from vertical slides controller')
    document.querySelector('body').style.cssText += 'background-color:black';
  }

  scrollToSyllabus() {
    // this.scrolled = true
    console.log('scroll from #syllabus target')
    // this.syllabusTarget.scrollIntoView()
    window.scrollTo(0, document.body.scrollHeight);
  }

  scrollToBottom(evt) {
    if (window.scrollY < 150) {
      this.scrolled = false
      return;
    }

    if (!this.scrolled) {
      console.log('Scroll !')
      this.scrollToSyllabus();
      this.scrolled = true
    }
  }

}
