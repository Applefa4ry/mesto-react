
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../context/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [currentUser, setCurrentUser] = React.useState({})
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})

  React.useEffect(() => {
    api.getUserInfoFromServer()
    .then(res => {
      setCurrentUser(res)
    })
    .catch(err => console.log(`Ошибка ${err}`))
  }, [])


  function handleCardClick(data){
    setSelectedCard(data)
    setImagePopupOpen(true)
  }
  
  function closeAllPopups(){
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setImagePopupOpen(false)
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

  const [cards, setCards] = React.useState([])
  React.useEffect(() => {
    api.getInitialCards()
      .then(res => setCards(res))
      .catch(err => console.log(`Ошибка ${err}`))
  }, [])

  function handleCardLike(card, setCards){
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    !isLiked?
    api.addLike(card._id)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c))
      })
    :
    api.deleteLike(card._id)
    .then(newCard => {
      setCards(state => state.map(c => c._id === card._id ? newCard : c))
    })
  }

  function handleCardDelete(card, setCards){
    api.deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== card._id));
      })
      .catch(err => console.log(`Ошибка ${err}`))
  }

  function handleUpdateUser(data){
    api.setUserInfoOnServer(data)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка ${err}`))
  }

  function handleUpdateAvatar(data){
    api.setUserAvatarOnServer(data)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка ${err}`))
  }

  function handleAddNewCard(newCard){
    api.addNewCard(newCard)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка ${err}`))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      
      <PopupWithForm id="delete-picture" specialDelete={true} question={true} title="Вы уверены?" name="deletePictureForm" buttonText="Да" />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
      <AddPlacePopup onAddNewCard={handleAddNewCard} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
      
      <Header />
      <Main cards={cards} setCards={setCards} handleCardDelete={handleCardDelete} handleCardLike={handleCardLike} handleCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
      <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
