function Card(props){
  function handleClick() {
    props.onCardClick(props.card);
  } 

  return(
    <figure className="card">
    <img onClick={handleClick} className="card__image" src={props.card.link} alt={props.card.name}/>
    <figcaption className="card__about">
      <h2 className="card__title">{props.card.name}</h2>
      <button type="button" className="card__like"></button>
      <span className="card__like-counter">{props.card.likes.length}</span>
    </figcaption>
    <button type="button" className="card__trash"></button>
  </figure>
  )
}

export default Card