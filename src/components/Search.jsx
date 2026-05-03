import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');

  // Update local state when URL params change (e.g. on clear or back/forward)
  useEffect(() => {
    setSearchValue(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchValue.trim()) {
      params.set('search', searchValue.trim());
    } else {
      params.delete('search');
    }
    // Reset skip/page when searching
    params.delete('skip');
    setSearchParams(params);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="relative w-full md:w-[480px] rounded-2xl shadow-md p-1.5 transition-all duration-150 ease-in-out hover:shadow-lg border border-gray-200 bg-white">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
      <input 
        type="text" 
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full pl-10 pr-28 py-2.5 text-base text-gray-700 bg-transparent rounded-lg focus:outline-none font-adaptive" 
        placeholder="Search for tickets & more..." 
      />
      <button 
        onClick={handleSearch}
        className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-[#5044e4] text-white font-medium rounded-xl focus:outline-none transition-colors hover:bg-[#4338ca] active:scale-95"
      >
        Search
      </button>
    </div>
  );
};

export default Search;