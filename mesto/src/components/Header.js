import logoPath from '../images/mesto-logo.svg'

function Header(){
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип Mesti" />
    </header>
  )
}

export default Header