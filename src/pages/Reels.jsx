import React, { useEffect, useState } from "react";
import Reel from "../components/reels";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReelsAsync } from "../redux/features/app/appAsyncThunk";
import ReelUI from "../components/reels/ReelUI";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  vertical: true, // Enable vertical scrolling
  verticalSwiping: true, // Enable vertical swiping
};

const Reels = () => {
  const { reels, reelsStatus, totalReels } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const sliderRef = useRef(null);

  const handleWheel = (e) => {
    const delta = e.deltaY;

    if (sliderRef.current) {
      if (delta > 0) {
        // Scroll down
        sliderRef.current.slickNext();
      } else {
        // Scroll up
        sliderRef.current.slickPrev();
      }
    }
  };

  useEffect(() => {
    if (reelsStatus !== "success") {
      dispatch(
        fetchReelsAsync({ results: reels.length, totalResult: totalReels })
      );
    }
  }, []);

  return (
    <div onWheel={handleWheel} className="w-full h-full space-y-3">
      {reelsStatus ? (
        <Slider {...settings} ref={sliderRef}>
          {reels
            .slice(0)
            .reverse()
            .map((reel) => (
              <Reel key={reel} {...reel} />
            ))}
        </Slider>
      ) : (
        <ReelUI />
      )}
    </div>
  );
};

export default Reels;
