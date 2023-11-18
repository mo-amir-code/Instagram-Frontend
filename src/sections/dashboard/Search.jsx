import React from "react";
import SearchBar from "../../components/search/SearchBar";
import { X } from "@phosphor-icons/react";
import SearchedResult from "../../components/search/SearchedResult";

const Search = () => {
  return (
    <section
      className={`flex flex-col bg-bg-primary w-[400px] h-screen rounded-lg border-r border-hover-primary slideModal`}
    >
      {/* Heading */}
      <div className="p-6">
        <h4 className="text-2xl font-semibold text-text-primary">Search</h4>
      </div>

      {/* Input search */}
      <div className="py-4 mb-2 px-6 relative">
        <SearchBar />
        <button className="absolute rounded-full top-[40%] right-9 bg-text-primary p-[2px]">
          <X size={10} />
        </button>
      </div>

      {/* Divider  */}
      <hr />

      {/* List heading */}
      <div className="py-4 px-6">
        <div className="flex justify-between items-center text-text-primary">
          <h6 className="text-base font-semibold">Results</h6>
          <button className="text-sm font-medium text-text-link">
            Clear all
          </button>
        </div>
      </div>

      {/* Searched results */}
      <div className="flex flex-col overflow-y-auto ">
        {[1, 2, 3, 4, 5, 6, 7].map((el, idx) => (
          <SearchedResult key={idx} />
        ))}
      </div>
    </section>
  );
};

export default Search;
