import React, { useState, useEffect } from "react";

import Link from "next/link";

export default function ImageSlider() {
  const imageArray = ["/sli1.jpg", "/sli2.jpg", "/sli3.jpg", "/sli4.jpg", "/sli6.jpg"];
  const [image, setImage] = useState(0);
  const [allImage, setAllImage] = useState(imageArray);
  const handlePrev = () => {
    setImage((prevIndex) =>
      prevIndex === 0 ? allImage.length - 1 : prevIndex - 1
    );
  };
  const handleNext = () => {
    setImage((prevIndex) =>
      prevIndex === 4 ? allImage.length -1 : prevIndex + 1
    );
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      handlePrev();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [image]);
  return (
    <div>
      <div className="slider mt-2 ">
        <div
          className="slider-image"
          style={{
            backgroundImage: `url(${allImage[image]})`,
            backgroundSize: "cover",

            width: "100%",
          }}
        >
          <div className="slider-text">
            <p>
              "Indulge in a culinary journey of pure delight, where each dish is
              a masterpiece of taste and texture"
            </p>
            <Link href={"../../addproduct"}>
              <button>Add Products</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="slider-btns">
        <button className="slider-btn" onClick={handlePrev}>
          previous
        </button>
        <button className="slider-btn" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}
