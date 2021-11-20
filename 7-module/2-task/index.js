import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = createElement(`
 <div class="modal">
   <div class="modal__overlay"></div>

   <div class="modal__inner">
     <div class="modal__header">
       
       <button type="button" class="modal__close">
         <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
       </button>

       <h3 class="modal__title">
         Вот сюда нужно добавлять заголовок
       </h3>
     </div>

     <div class="modal__body"> 
     A сюда нужно добавлять содержимое тела модального окна
     </div>
   </div>

 </div>`);

  }

  setTitle(modalTitle) {
    this.modal.querySelector('.modal__title').innerHTML = modalTitle;
  }

  setBody(modalBody) {
    let body = this.modal.querySelector('.modal__body');
    body.innerHTML = '';
    body.appendChild(modalBody);
  }

  open() {
    document.body.appendChild(this.modal);
    document.body.classList.add('is-modal-open');
    this.addEscButtonListener();
    this.closeButton();
  }

  close = () => {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
    this.removeEscButtonListener();
  }

  closeButton() {
    let closeButton = this.modal.querySelector('.modal__close');
    closeButton.addEventListener('click', this.close)
  }

  onEscapeClick = (event) => {
    if (event.code === 'Escape') {
      this.close();
    };
  }


  addEscButtonListener = () => {
    document.addEventListener('keydown', this.onEscapeClick);
  }

  removeEscButtonListener = () => {
    document.removeEventListener('keydown', this.onEscapeClick);
  }

}

