import { useEffect, useId, useState } from 'react'
import { RouterLink, usePathname } from '../router'
import '../styles/header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const navId = useId()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const mediaQuery = window.matchMedia('(min-width: 641px)')
    const handleMediaChange = (event) => {
      if (event.matches) {
        setIsMenuOpen(false)
      }
    }

    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className={`siteHeader${isMenuOpen ? ' is-menu-open' : ''}`}>
      <RouterLink to="/" className="siteLogoLink" aria-label="Nearby Shop home" onClick={closeMenu}>
        <div className="logo siteLogo">
          <img src="/images/logo-removebg-preview.png" alt="" width="70" />
        </div>
      </RouterLink>
      <button
        type="button"
        className="siteMenuButton"
        aria-expanded={isMenuOpen}
        aria-controls={navId}
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setIsMenuOpen((value) => !value)}
      >
        <span className="siteMenuButtonLabel">Menu</span>
        <span className="siteMenuIcon" aria-hidden="true">
          <span className="siteMenuLine"></span>
          <span className="siteMenuLine"></span>
          <span className="siteMenuLine"></span>
        </span>
      </button>
      <nav id={navId} className={`siteNav${isMenuOpen ? ' is-open' : ''}`} aria-label="Primary">
        <ul className="siteNavList">
          <li><RouterLink className="siteNavLink" to="/" onClick={closeMenu}>Home</RouterLink></li>
          <li><RouterLink className="siteNavLink" to="/about-us" onClick={closeMenu}>About Us</RouterLink></li>
          <li><a className="siteNavLink" href="#footer" onClick={closeMenu}>Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
