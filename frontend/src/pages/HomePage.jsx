import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { RouterLink } from '../router'
import { fetchCatalogProducts } from '../services/catalogApi'
import { initializeScrollReveal } from '../scroll'
import '../styles/style.css'

const fallbackProducts = [
  { id: 1, nom: 'Wide-Brim Straw Hat with Leather Band - Natural Beige', description: '', prix: 29.99, imageUrl: '/images/prod.avif' },
  { id: 2, nom: 'Wide-Brim Straw Hat with Leather Band - Natural Beige', description: '', prix: 29.99, imageUrl: '/images/pd2.avif' },
  { id: 3, nom: 'Wide-Brim Straw Hat with Leather Band - Natural Beige', description: '', prix: 29.99, imageUrl: '/images/pd3.avif' },
  { id: 4, nom: 'Wide-Brim Straw Hat with Leather Band - Natural Beige', description: '', prix: 29.99, imageUrl: '/images/pd4.avif' },
  { id: 5, nom: 'Wide-Brim Straw Hat with Leather Band - Natural Beige', description: '', prix: 29.99, imageUrl: '/images/pd5.avif' },
  { id: 6, nom: 'Wide-Brim Straw Hat with Leather Band - Natural Beige', description: '', prix: 29.99, imageUrl: '/images/pd6.avif' },
  { id: 7, nom: 'Wide-Brim Straw Hat with Leather Band - Natural Beige', description: '', prix: 29.99, imageUrl: '/images/pd7.avif' },
  { id: 8, nom: 'Wide-Brim Straw Hat with Leather Band - Natural Beige', description: '', prix: 29.99, imageUrl: '/images/imageTest.jpeg' },
]

function formatPrice(value) {
  const numericValue = Number(value)

  if (Number.isNaN(numericValue)) {
    return ''
  }

  return `$${numericValue.toFixed(2)}`
}

function HomePage() {
  const [products, setProducts] = useState([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [isDevelopmentPopupOpen, setIsDevelopmentPopupOpen] = useState(false)

  useEffect(() => initializeScrollReveal(), [])

  useEffect(() => {
    let isMounted = true

    async function loadProducts() {
      try {
        const data = await fetchCatalogProducts()

        if (isMounted) {
          setProducts(data.length > 0 ? data : fallbackProducts)
        }
      } catch {
        if (isMounted) {
          setProducts(fallbackProducts)
        }
      } finally {
        if (isMounted) {
          setIsLoadingProducts(false)
        }
      }
    }

    void loadProducts()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="container">
      <Header />
      <section className="mainImages">
        <div className="bigImageRight">
          <img
            className="heroImage"
            src="/images/bigImage2.avif"
            alt=""
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <h3>Special offers</h3>
          <h1>Trending products</h1>
          <button className="bigButton">Shop now</button>
        </div>
        <div className="bigImageLeft">
          <img
            className="heroImage"
            src="/images/bigImage1.avif"
            alt=""
            fetchPriority="low"
            loading="eager"
            decoding="async"
          />
          <h3>Special offers</h3>
          <h1>Trending products</h1>
          <button className="bigButton">Shop now</button>
        </div>
      </section>
      <section className="productClassicCasual">
        <div className="classics">
          <img src="/images/classicImage.avif" alt="" />
          
        </div>
        <div className="Casual">
          <img src="/images/Casualmage.avif" alt="" />
          
        </div>
      </section>
      <section className="pontSection">
        <h1>Our products</h1>
        <p>Discover our selection of products for all your needs.</p>
      </section>

      <section className="productsGrid">
        {isLoadingProducts
          ? Array.from({ length: 8 }).map((_, index) => (
              <div className="product" key={`placeholder-${index}`}>
                <div className="productImagePlaceholder" aria-hidden="true"></div>
                <div className="productInformation">
                  <h2>&nbsp;</h2>
                  <div className="prices">
                    <p className="oldPrice">&nbsp;</p>
                    <p className="newPrice">&nbsp;</p>
                  </div>
                </div>
              </div>
            ))
          : products.map((product) => (
              <div className="product" key={product.id}>
                <RouterLink to={`/product-detail/${product.id}`}>
                  <img className="productCardImage" src={product.imageUrl} alt="" width="300" />
                </RouterLink>
                <div className="productInformation">
                  <h2>{product.nom}</h2>
                  <div className="prices">
                    <p className="oldPrice"></p>
                    <p className="newPrice">{formatPrice(product.prix)}</p>
                    <button
                      type="button"
                      className="addToCartButton"
                      aria-label={`Add ${product.nom} to cart`}
                      onClick={() => setIsDevelopmentPopupOpen(true)}
                    >
                      <img src="/images/addtoCart.svg" alt="" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </section>
      {isDevelopmentPopupOpen ? (
        <div
          className="developmentPopupOverlay"
          role="dialog"
          aria-modal="true"
          aria-label="Development notice"
          onClick={() => setIsDevelopmentPopupOpen(false)}
        >
          <div
            className="developmentPopup"
            onClick={(event) => event.stopPropagation()}
          >
            <h2>Site update</h2>
            <p>This site is currently under development.</p>
            <button
              type="button"
              className="developmentPopupButton"
              onClick={() => setIsDevelopmentPopupOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  )
}

export default HomePage
