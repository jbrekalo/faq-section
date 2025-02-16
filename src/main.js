class App {
  constructor() {
    this.faqList = new FaqList(); // Kreiraj listu FAQ-ova
    this.modal = new Modal(this.faqList); // Kreiraj modal prozor
  }

  init() {
    this.faqList.renderFaqs(); // Prikaz početnih FAQ-ova
    this.modal.init(); // Postavljanje event listenera za modal
  }
}

class Faq {
  constructor(title, text) {
    this.title = title;
    this.text = text;
  }
}

class FaqList {
  constructor() {
    this.faqs = [
      new Faq(
        "FAQ Heading",
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      ),
    ];
    this.dropdowns = document.querySelector(".faq-section__dropdowns");
  }

  updateFaqs(title, text) {
    this.faqs.push(new Faq(title, text)); // Dodavanje novog FAQ-a u niz
    this.renderFaqs(); // Ponovno iscrtavanje FAQ liste
  }

  renderFaqs() {
    this.dropdowns.innerHTML = this.faqs
      .map(
        (faq) => `
      <div class="faq-section__dropdown flex flex-col h-fit">
        <div class="faq-section__header flex justify-between items-center p-4 rounded-t-2xl rounded-b-2xl bg-faq-purple cursor-pointer">
          <h3 class="font-body text-xl text-gray-50">${faq.title}</h3>
          <svg xmlns="http://www.w3.org/2000/svg" height="12" width="7.5" viewBox="0 0 320 512">
            <path fill="#ffffff" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
          </svg>
        </div>
        <div class="faq-section__text p-0 rounded-b-2xl bg-white overflow-hidden max-h-0 transition-all duration-300 ease-in-out">
          <p class="font-body text-md text-faq-gray">${faq.text}</p>
        </div>
      </div>
    `
      )
      .join("");

    this.addEventListeners(); // Ponovno dodaj event listenere nakon renderiranja
  }

  addEventListeners() {
    const headers = document.querySelectorAll(".faq-section__header");
    const faqTexts = document.querySelectorAll(".faq-section__text");

    headers.forEach((header, index) => {
      header.addEventListener("click", () => {
        faqTexts[index].classList.toggle("max-h-0");
        faqTexts[index].classList.toggle("p-0");
        faqTexts[index].classList.toggle("max-h-full");
        faqTexts[index].classList.toggle("p-4");
        header.classList.toggle("rounded-b-2xl");
      });
    });
  }
}

class Modal {
  constructor(faqList) {
    this.newDropdownBtn = document.querySelector(".dropdown-new");
    this.modalContainer = document.getElementById("modal__container");
    this.modalCloseBtn = document.querySelector(".modal__window-close");
    this.modalForm = document.getElementById("modal__form");
    this.faqList = faqList;
  }

  init() {
    this.newDropdownBtn.addEventListener("click", () => this.open());
    this.modalCloseBtn.addEventListener("click", () => this.close());
    this.modalForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Sprječava reload stranice
      this.submitForm();
      this.close();
    });
  }

  open() {
    this.modalContainer.classList.remove("hidden");
  }

  close() {
    this.modalContainer.classList.add("hidden");
  }

  submitForm() {
    const questionInput = document.getElementById("modal-input__question");
    const answerInput = document.getElementById("modal-input__answer");

    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    console.log(question, answer);

    if (!question || !answer) return; // Provjera da polja nisu prazna

    this.faqList.updateFaqs(question, answer);

    // 🔹 Resetiraj input polja nakon submita
    questionInput.value = "";
    answerInput.value = "";
  }
}

// Pokretanje aplikacije
window.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init();
});
