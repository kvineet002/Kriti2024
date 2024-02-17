import React from 'react';

const images = [
  '/11.png',
  '/22.png',
  '/33.png',
  '/44.png',
  '/55.png',
  '/66.png',
  '/11.png',
  '/22.png',
  '/33.png',
];

const InfiniteScrollingGallery = () => {
  return (
    <div style={styles.galleryWrapper}>
      {/* Gradient Overlay */}
      <div style={styles.overlay}></div>

      <div style={styles.imagesContainer}>
        {images.concat(images).map((image, index) => (
          <img key={index} src={image} alt={`Gallery ${index}`} style={styles.image} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  galleryWrapper: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    height: '150px', // Adjust based on your needs
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 40%,rgba(255,255,255,0) 50%,rgba(255,255,255,0) 60%, rgba(0,0,0,1) 100%)',
    zIndex: 2,
    pointerEvents: 'none', // Allows clicks to pass through
  },
  imagesContainer: {
    display: 'flex',
    animation: 'scroll 10s linear infinite',
    // Duplicate images for a seamless transition
  },
  image: {
    // minWidth: '160px', // Adjust based on your image sizes
    height: '150px', // Adjust based on your needs
    objectFit: 'cover',
    marginRight: '0px', // Space between images
  },
};

// Keyframes for scrolling effect
const scrollKeyframes = `@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}`;

// Adding keyframes and other global styles to the head
const styleSheet = document.createElement("style");
styleSheet.innerText = scrollKeyframes;
document.head.appendChild(styleSheet);

export default InfiniteScrollingGallery;
