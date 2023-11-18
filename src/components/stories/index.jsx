import React from "react";
import Story from "./Story";

const index = () => {
  return (
    <div className="mt-8 py-4 px-2 flex overflow-x-scroll no-scrollbar space-x-2">
      {[1, 2, 3, 4, 5, 6, 7].map((story, idx) => (
        <Story key={idx} />
      ))}
    </div>
  );
};

export default index;
