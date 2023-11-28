import React from "react";
import { BookmarkSimple, FilmReel, GridNine } from "@phosphor-icons/react";

const MediaTab = ({ selected, setSelected, type }) => {
  return (
    <section className="flex items-center justify-center space-x-12 text-xs text-text-secondary font-medium w-[40%]">
      <span
        onClick={() => setSelected(1)}
        className={`flex items-center space-x-1 justify-center ${
          selected === 1 && "border-t text-text-primary"
        } border-text-primary pt-3 cursor-pointer`}
      >
        <GridNine size={14} />
        <h4>POSTS</h4>
      </span>
      <span
        onClick={() => setSelected(2)}
        className={`flex items-center space-x-1 justify-center ${
          selected === 2 && "border-t text-text-primary"
        } border-text-primary pt-3 cursor-pointer`}
      >
        <FilmReel size={14} />
        <h4>REELS</h4>
      </span>
      {type === "myProfile" && (
        <span
          onClick={() => setSelected(3)}
          className={`flex items-center space-x-1 justify-center ${
            selected === 3 && "border-t text-text-primary"
          } border-text-primary pt-3 cursor-pointer`}
        >
          <BookmarkSimple size={14} />
          <h4>SAVED</h4>
        </span>
      )}
    </section>
  );
};

export default MediaTab;
