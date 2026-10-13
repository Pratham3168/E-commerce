import { Link } from 'react-router-dom'

export default function Footer() {
  return <footer className="site-footer"><div className="footer-main"><div><div className="wordmark">FORM / OBJECT</div><p className="footer-note">Objects with a point of view.<br />Made for the everyday.</p></div><div className="footer-links"><div><span className="eyebrow">Explore</span><Link to="/products">Shop all</Link><a href="#journal">Journal</a><a href="#about">About us</a></div><div><span className="eyebrow">Support</span><a href="#shipping">Shipping & returns</a><a href="#contact">Contact</a><a href="#faq">FAQ</a></div><div><span className="eyebrow">Follow</span><a href="#instagram">Instagram</a><a href="#pinterest">Pinterest</a></div></div></div><div className="footer-bottom"><span>© 2026 Form / Object</span><span>Designed with intention</span></div></footer>
}
