import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../services/products'
import './Footer.css'


export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Marca */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-name">HAMMER</span>
            <span className="footer__logo-sub">ELECTRICS</span>
          </Link>
          <p className="footer__tagline">
            Especialistas en tableros eléctricos, termomagnéticas y diferenciales. Distribución y venta en Lima.
          </p>
          <div className="footer__socials">
            <a href="https://wa.me/51922350829" className="footer__social-btn" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12.004 2C6.477 2 2 6.476 2 12c0 1.99.575 3.878 1.574 5.482L2 22l4.656-1.53A9.954 9.954 0 0 0 12.004 22C17.53 22 22 17.523 22 12c0-5.522-4.47-9.998-9.996-10zM12 20.23a8.217 8.217 0 0 1-4.217-1.162l-.302-.18-3.13 1.028 1.048-3.036-.197-.312A8.204 8.204 0 0 1 3.771 12C3.771 7.452 7.453 3.77 12 3.77c4.549 0 8.23 3.682 8.23 8.23 0 4.55-3.681 8.23-8.23 8.23z"/>
              </svg>
            </a>
            <a href="#" className="footer__social-btn" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="footer__social-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Categorías */}
        <div className="footer__col">
          <h3 className="footer__col-title">Categorías</h3>
          <ul className="footer__links">
            {CATEGORIES.map(cat => (
              <li key={cat.id}>
                <Link to={`/productos?categoria=${cat.id}`} className="footer__link">
                  {cat.icon} {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Información */}
        <div className="footer__col">
          <h3 className="footer__col-title">Información</h3>
          <ul className="footer__info-list">
            <li className="footer__info-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Av. Tomas Marsano 1501 Local 598, Surquillo
            </li>
            <li className="footer__info-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Lun – Sáb, 9:00 am – 6:00 pm
            </li>
            <li className="footer__info-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              922 350 829
            </li>
          </ul>
          <a
            href="https://wa.me/51922350829"
            className="footer__wa-btn"
            target="_blank"
            rel="noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12.004 2C6.477 2 2 6.476 2 12c0 1.99.575 3.878 1.574 5.482L2 22l4.656-1.53A9.954 9.954 0 0 0 12.004 22C17.53 22 22 17.523 22 12c0-5.522-4.47-9.998-9.996-10zM12 20.23a8.217 8.217 0 0 1-4.217-1.162l-.302-.18-3.13 1.028 1.048-3.036-.197-.312A8.204 8.204 0 0 1 3.771 12C3.771 7.452 7.453 3.77 12 3.77c4.549 0 8.23 3.682 8.23 8.23 0 4.55-3.681 8.23-8.23 8.23z"/>
            </svg>
            Escríbenos por WhatsApp
          </a>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p className="footer__copy">© {year} Hammer Electrics. Todos los derechos reservados.</p>
        <Link to="/admin" className="footer__admin-link">Administración</Link>
      </div>
    </footer>
  )
}
