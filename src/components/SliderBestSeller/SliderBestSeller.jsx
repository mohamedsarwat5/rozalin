import React from "react";
import SliderImport from "react-slick";

// حل مشكلة استيراد react-slick في بيئة Vite
const Slider = SliderImport.default || SliderImport;

export default function SliderBestSeller() {
  var settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div>
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
}
