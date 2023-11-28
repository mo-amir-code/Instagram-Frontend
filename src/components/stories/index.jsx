import React from "react";
import Story from "./Story";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import YourStory from "./YourStory";
import { useDispatch } from "react-redux";
import { selectStoryFile } from "../../redux/features/app/appSlice";
import { useNavigate } from "react-router-dom";

const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const selectStory = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        // console.log(imageUrl);
        dispatch(selectStoryFile({ file:imageUrl }));
        navigate(`/create/story`);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-8 py-4 px-2 w-[660px] space-x-2">
      <Carousel responsive={responsive}>
        <YourStory selectStory={selectStory} />
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
