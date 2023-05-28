import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props){
  const nameRef = React.useRef();
  const urlRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddNewCard({
      name: nameRef.current.value,
      link: urlRef.current.value,
    });
  }
  
  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} id="edit-place" specialDelete={false} question={false} title="Новое место" name="addCard" buttonText="Создать"
      children={
        <>
          <input ref={nameRef} id="edit-title" minLength="2" maxLength="30" required name="name" className="form__field" placeholder="Название" type="text" />
          <span className="popup__error edit-title-error"></span>
          <input ref={urlRef} id="edit-url" required name="link" className="form__field" placeholder="Ссылка на картинку" type="url" />
          <span className="popup__error edit-url-error"></span>
        </>
      }
    />
  )
}

export default AddPlacePopup;