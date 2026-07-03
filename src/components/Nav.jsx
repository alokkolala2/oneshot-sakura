export default function Nav({ onNavigate }) {
  const go = (e, target) => {
    e.preventDefault()
    onNavigate?.(target)
  }
  return (
    <nav className="nav">
      <a className="nav__mark" href="#top" onClick={(e) => go(e, '#top')}>
        桜<span>SAKURA</span>
      </a>
      <div className="nav__links">
        <a href="#garden" onClick={(e) => go(e, '#garden')}>Garden</a>
        <a href="#craft" onClick={(e) => go(e, '#craft')}>Craft</a>
        <a href="#spirit" onClick={(e) => go(e, '#spirit')}>Spirit</a>
        <a href="#visit" className="nav__cta" onClick={(e) => go(e, '#visit')}>Visit</a>
      </div>
    </nav>
  )
}
