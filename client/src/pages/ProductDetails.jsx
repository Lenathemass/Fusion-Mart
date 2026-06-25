import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="pd-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={
            i <= full
              ? 'pd-star pd-star--full'
              : i === full + 1 && half
              ? 'pd-star pd-star--half'
              : 'pd-star pd-star--empty'
          }
        >
          ★
        </span>
      ))}
      <span className="pd-rating-num">{rating} / 5</span>
    </span>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [imageSelected, setImageSelected] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleImageClick = () => {
    if (product.stockCount === 0) {
      toast.error('This product is out of stock!');
      return;
    }
    addToCart(product);
    setImageSelected(true);
    toast.success(`🛒 "${product.title}" added to cart!`, { autoClose: 2000 });
    setTimeout(() => setImageSelected(false), 700);
  };

  const handleAddToCart = () => {
    if (product.stockCount === 0) return;
    addToCart(product);
    toast.success('Added to cart!');
  };

  const handleBuyNow = () => {
    if (product.stockCount === 0) return;
    addToCart(product);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="pd-loading">
        <div className="pd-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="pd-page">
      <div className="pd-container">
        {/* Back button */}
        <Link to="/" className="pd-back-btn" id="pd-back-link">
          ← Back to Products
        </Link>

        {product.title ? (
          <div className="pd-grid">
            {/* ── LEFT: Image Column ── */}
            <div className="pd-image-col">
              <div
                className={`pd-img-wrap${imageSelected ? ' pd-img-wrap--flash' : ''}`}
                onClick={handleImageClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleImageClick()}
                title={product.stockCount === 0 ? 'Out of stock' : 'Click image to add to cart'}
                aria-label={`Add ${product.title} to cart`}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="pd-img"
                />
                {product.stockCount === 0 && (
                  <div className="pd-out-badge">Out of Stock</div>
                )}
                <div className="pd-img-overlay">
                  <span>🛒 Click to Add to Cart</span>
                </div>
              </div>

              {/* Price and Actions shown BELOW image */}
              <div className="pd-below-image" style={{ marginTop: '1rem', textAlign: 'center' }}>
                <div className="pd-price-display" style={{ marginBottom: '1rem' }}>
                  Rs. {product.price?.toLocaleString('en-IN')}
                </div>

                <div className="pd-action-row">
                  <button
                    id="pd-add-to-cart"
                    className="pd-btn pd-btn--cart"
                    onClick={handleAddToCart}
                    disabled={product.stockCount === 0}
                  >
                    🛒 Add to Cart
                  </button>
                  <button
                    id="pd-buy-now"
                    className="pd-btn pd-btn--buy"
                    onClick={handleBuyNow}
                    disabled={product.stockCount === 0}
                  >
                    ⚡ Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Details Column ── */}
            <div className="pd-details-col">
              <div className="pd-details-card">
                {product.brand && (
                  <div className="pd-detail-brand">{product.brand}</div>
                )}
                <h1 className="pd-detail-title">{product.title}</h1>

                <div className="pd-detail-rating">
                  <StarRating rating={product.rating} />
                  <span className="pd-detail-reviews">
                    {product.numReviews} customer reviews
                  </span>
                </div>

                <div className="pd-detail-divider"></div>

                <div className="pd-detail-price">
                  <span className="pd-detail-price-label">Price</span>
                  <span className="pd-detail-price-value">
                    Rs. {product.price?.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="pd-detail-divider"></div>

                <div className="pd-detail-desc">
                  <h4>About this product</h4>
                  <p>{product.description}</p>
                </div>

                <div className="pd-detail-stock">
                  <span className={product.stockCount > 0 ? 'pd-in-stock' : 'pd-out-of-stock'}>
                    {product.stockCount > 0
                      ? `✅ In Stock (${product.stockCount} available)`
                      : '❌ Out of Stock'}
                  </span>
                </div>

                <div className="pd-detail-actions">
                  <button
                    id="pd-detail-add-cart"
                    className="pd-btn pd-btn--cart pd-btn--full"
                    onClick={handleAddToCart}
                    disabled={product.stockCount === 0}
                  >
                    🛒 Add to Cart
                  </button>
                  <button
                    id="pd-detail-buy-now"
                    className="pd-btn pd-btn--buy pd-btn--full"
                    onClick={handleBuyNow}
                    disabled={product.stockCount === 0}
                  >
                    ⚡ Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="pd-not-found">Product not found.</div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
