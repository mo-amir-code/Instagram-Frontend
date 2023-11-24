import React from "react";
import Story from "./Story";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const index = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 660, min: 650 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 6,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 5,
    },
  };

  return (
    <div className="mt-8 py-4 px-2 w-[660px] space-x-2">
      <Carousel responsive={responsive}>
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ].map((el) => {
          return <Story key={el} />;
        })}
      </Carousel>
      ;
    </div>
  );
};

export default index;

//
