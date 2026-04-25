import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import './AdminGuard.css'

const SESSION_KEY = 'hm_adm'

export default function AdminGuard() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')
  const [pwd, setPwd]       = useState('')
  const [error, setError]   = useState(false)
  const [show, setShow]     = useState(false)

  if (authed) return <Outlet />

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pwd === 'h@mm3r@2026') {
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuthed(true)
    } else {
      setError(true)
      setPwd('')
    }
  }

  return (
    <div className="adm-login">
      <div className="adm-login__card">

        <div className="adm-login__icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>

        <h1 className="adm-login__title">Acceso restringido</h1>
        <p className="adm-login__sub">Ingresa la clave para acceder al panel de administración.</p>

        <form onSubmit={handleSubmit} className="adm-login__form">
          <div className="adm-login__input-wrap">
            <input
              type={show ? 'text' : 'password'}
              value={pwd}
              onChange={e => { setPwd(e.target.value); setError(false) }}
              placeholder="Contraseña"
              className={`adm-login__input ${error ? 'error' : ''}`}
              autoFocus
              autoComplete="current-password"
            />
            <button
              type="button"
              className="adm-login__eye"
              onClick={() => setShow(s => !s)}
              aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {show
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
              }
            </button>
          </div>

          {error && (
            <p className="adm-login__error">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Clave incorrecta. Inténtalo de nuevo.
            </p>
          )}

          <button type="submit" className="adm-login__btn">Ingresar</button>
        </form>

        <Link to="/" className="adm-login__back">← Volver a la tienda</Link>
      </div>
    </div>
  )
}
