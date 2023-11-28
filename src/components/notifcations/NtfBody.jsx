import React from "react";
import LikeNtf from "./LikeNtf";
import CmtNtf from "./CmtNtf";

const NtfBody = ({ ntfs, forTime }) => {
  return (
    <section className="flex flex-col text-text-primary px-6 pb-4 space-y-2 border-b border-hover-primary">
      <h4 className="text-base font-bold">{forTime}</h4>
      {/* notifications */}
      <div className="flex flex-col">
        {ntfs.map((ntf, idx) => {
          if (ntf.contentType === "like") {
            return <LikeNtf key={idx} {...ntf} />;
          } else {
            return <CmtNtf key={idx} {...ntf} />;
          }
        })}
      </div>
    </section>
  );
};

export default NtfBody;
