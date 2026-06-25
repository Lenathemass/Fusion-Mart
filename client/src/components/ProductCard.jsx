import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="pc-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={
            i <= full
              ? 'pc-star pc-star--full'
              : i === full + 1 && half
              ? 'pc-star pc-star--half'
              : 'pc-star pc-star--empty'
          }
        >
          ★
        </span>
      ))}
      <span className="pc-rating-num">{rating}</span>
    </span>
  );
};

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [imgClicked, setImgClicked] = useState(false);

  const handleImageClick = () => {
    if (product.stockCount === 0) {
      toast.error('This product is out of stock!');
      return;
    }
    addToCart(product);
    setImgClicked(true);
    toast.success(`🛒 "${product.title}" added to cart!`, { autoClose: 2000 });
    setTimeout(() => setImgClicked(false), 600);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product.stockCount === 0) return;
    addToCart(product);
    toast.success('Added to cart!');
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (product.stockCount === 0) return;
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className={`pc-card${imgClicked ? ' pc-card--flash' : ''}`}>
      {/* Image */}
      <div
        className="pc-img-wrap"
        onClick={handleImageClick}
        title={product.stockCount === 0 ? 'Out of stock' : 'Click to add to cart'}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleImageClick()}
        aria-label={`Add ${product.title} to cart`}
      >
        <img
          src={product.image}
          alt={product.title}
          className="pc-img"
        />
        {product.stockCount === 0 && (
          <div className="pc-out-badge">Out of Stock</div>
        )}
        <div className="pc-img-overlay">
          <span className="pc-img-overlay-text">🛒 Add to Cart</span>
        </div>
      </div>

      {/* Price directly below image */}
      <div className="pc-price" style={{ textAlign: 'center', margin: '0.5rem 0' }}>
        Rs. {product.price.toLocaleString('en-IN')}
      </div>

      {/* Action Buttons */}
      <div className="pc-actions" style={{ paddingTop: '0.2rem', paddingBottom: '0.5rem', borderTop: 'none' }}>
        <button
          id={`add-cart-${product._id}`}
          className="pc-btn pc-btn--cart"
          onClick={handleAddToCart}
          disabled={product.stockCount === 0}
          aria-label={`Add ${product.title} to cart`}
        >
          <span>🛒</span> Add to Cart
        </button>
        <button
          id={`buy-now-${product._id}`}
          className="pc-btn pc-btn--buy"
          onClick={handleBuyNow}
          disabled={product.stockCount === 0}
          aria-label={`Buy ${product.title} now`}
        >
          <span>⚡</span> Buy Now
        </button>
      </div>

      {/* Brand + Name + Rating */}
      <div className="pc-info" style={{ paddingTop: '0' }}>
        {product.brand && (
          <span className="pc-brand">{product.brand}</span>
        )}
        <h3 className="pc-title">{product.title}</h3>

        {/* Rating */}
        <div className="pc-rating-row">
          <StarRating rating={product.rating} />
          <span className="pc-reviews">({product.numReviews} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
