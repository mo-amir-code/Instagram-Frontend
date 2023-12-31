import React, { useEffect, useState } from "react";
import SearchBar from "../../components/search/SearchBar";
import { X } from "@phosphor-icons/react";
import SearchedResult from "../../components/search/SearchedResult";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResultsAsync } from "../../redux/features/app/appAsyncThunk";

const Search = () => {
  const [searching, setSearching] = useState(null);
  const { searchResults, searchStatus } = useSelector((state) => state.app);
  const { loggedInUserId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searching && searching.length > 0) {
      dispatch(fetchSearchResultsAsync({ searching }));
    }
  }, [searching]);

  return (
    <section
      className={`flex flex-col bg-bg-primary w-[400px] max-[500px]:w-[350px] max-[450px]:w-[300px] max-[390px]:w-[260px] min-h-screen rounded-lg border-r border-hover-primary slideModal`}
    >
      {/* Heading */}
      <div className="p-6">
        <h4 className="text-2xl font-semibold text-text-primary">Search</h4>
      </div>

      {/* Input search */}
      <div className="py-4 mb-2 px-6 relative">
        <SearchBar setSearching={setSearching} />
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
      {searchResults.length > 0 ? (
        <div className="flex flex-col overflow-y-auto ">
          {searchResults
            .filter((r) => r.id !== loggedInUserId)
            .map((el, idx) => (
              <SearchedResult key={idx} {...el} />
            ))}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-text-secondary">
          <p className="text-sm font-medium">No recent searches</p>
        </div>
      )}
    </section>
  );
};

export default Search;
