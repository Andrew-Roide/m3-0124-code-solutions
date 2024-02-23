import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { faCircle as regular } from '../node_modules/@fortawesome/free-regular-svg-icons/index';
import { faCircle as solid } from '../node_modules/@fortawesome/free-solid-svg-icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const images = [
  {
    src: '/images/fushiguro.webp',
    alt: 'Megumi Fushiguro',
  },
  {
    src: '/images/inumaki.webp',
    alt: 'Toge Inumaki',
  },
  {
    src: '/images/itadori.webp',
    alt: 'Yuji Itadori',
  },
  {
    src: '/images/kugisaki.webp',
    alt: 'Nobara Kugisaki',
  },
  {
    src: '/images/panda.webp',
    alt: 'Panda',
  },
  {
    src: '/images/zen-in.webp',
    alt: "Maki Zen'in",
  },
];

export default function CarouselComponent() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextClick();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  function handlePrevClick() {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }

  function handleNextClick() {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  function handleDotClick(index) {
    setCurrentImageIndex(index);
  }

  function FontAwesomeCircles() {
    const indicators = [];

    for (let i = 0; i < images.length; i++) {
      indicators.push(
        <FontAwesomeIcon
          key={i}
          icon={currentImageIndex === i ? solid : regular}
          onClick={() => handleDotClick(i)}
        />
      );
    }
    return <div className="circle">{indicators}</div>;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div
            className="column-one-third left-arrow"
            onClick={handlePrevClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className="column-two-third">
            <img
              className="carousel-img"
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
            />
          </div>
          <div
            className="column-three-third right-arrow"
            onClick={handleNextClick}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
        <div className="circle-container">
          <div className="row">
            <FontAwesomeCircles index={currentImageIndex} />
          </div>
        </div>
      </div>
    </>
  );
}
