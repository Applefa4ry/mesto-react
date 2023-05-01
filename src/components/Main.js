import React from 'react'
import avatarPath from '../images/avatar.jpg'
import api from '../utils/api'
import Card from './Card'

function Main(props){
  const [userName, setUserName] = React.useState("")
  const [userDescription, setUserDescription] = React.useState("")
  const [userAvatar, setUserAvatar] = React.useState("")
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getUserInfoFromServer()
    .then(res => {
      setUserName(res.name)
      setUserDescription(res.about)
      setUserAvatar(res.avatar)
    })
  
    api.getInitialCards()
      .then(res => setCards(res)) 
  }, [])


  return(
    <main className="content">
        <section className="profile">
          <div className="profile__overlay">
            <img className="profile__avatar" src={userAvatar} alt="Жак-Ив Кусто" />
            <button onClick={props.onEditAvatar} type="button" className="profile__edit-avatar"></button>
          </div>
          <div className="profile__info">
            <button onClick={props.onEditProfile} type="button" className="profile__edit-button"></button>
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__about">{userDescription}</p>
          </div>

          <button onClick={props.onAddPlace} type="button" className="profile__add-button"></button>
        </section>
        <section className="cards">
        {cards.map((elem, i) => {
          return(
            <Card onCardClick={props.handleCardClick} card={elem} key={i} />
          )
        })}
        </section>
      </main>
  )
}

export default Main