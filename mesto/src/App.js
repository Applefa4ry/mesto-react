
import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import PopupWithForm from './components/PopupWithForm';
import ImagePopup from './components/ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isImagePopupOpen, setImagePopupOpne] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})

  function handleCardClick(data){
    setSelectedCard(data)
    setImagePopupOpne(true)
  }
  
  function closeAllPopups(){
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setImagePopupOpne(false)
    setSelectedCard({})
  }

  function handleEditAvatarClick(){
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick(){
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick(){
    setAddPlacePopupOpen(true)
  }

  return (
    <>
      <div className="page">
      
      <PopupWithForm id="delete-picture" specialDelete={true} question={true} title="Вы уверены?" name="deletePictureForm" buttonText="Да" />
      <PopupWithForm onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} id="edit-profile" specialDelete={false} question={false} title="Редактировать профиль" name="editProfile" buttonText="Сохранить"
        children={
          <>
            <input id="edit-name" minLength="2" maxLength="40" required placeholder="Имя" name="name" className="form__field" defaultValue="Жак-Ив Кусто" type="text" />
            <span className="popup__error edit-name-error"></span>
            <input id="edit-job" minLength="2" maxLength="200" required placeholder="Работа" name="about" className="form__field" defaultValue="Исследователь океана" type="text" />
            <span className="popup__error edit-job-error"></span>
          </>
        }
      />
      <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} id="edit-place" specialDelete={false} question={false} title="Новое место" name="addCard" buttonText="Создать"
        children={
          <>
            <input id="edit-title" minLength="2" maxLength="30" required name="name" className="form__field" placeholder="Название" type="text" />
            <span className="popup__error edit-title-error"></span>
            <input id="edit-url" required name="link" className="form__field" placeholder="Ссылка на картинку" type="url" />
            <span className="popup__error edit-url-error"></span>
          </>
        }
      />
      <PopupWithForm onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} id="edit-avatar" specialDelete={false} question={false} title="Обновить аватар" name="editAvatar" buttonText="Сохранить"
        children={
          <>
            <input id="edit-url-avatar" required name="link" className="form__field" placeholder="Ссылка на картинку" type="url" />
            <span className="popup__error edit-url-avatar-error"></span>
          </>
        }
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
      <Header />
      <Main handleCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
      <Footer />
      </div>
    </>
  );
}

export default App;
