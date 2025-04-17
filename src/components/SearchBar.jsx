const SearchBar = () => {
  return (
    <div className="flex p-10 justify-start items-center h-[calc(100vh-4rem)] overflow-hidden">
      <form className="w-full max-w-3xl pr-1 bg-primary-500 flex items-center rounded-full overflow-hidden">
        <input
          type="search"
          name="search"
          pattern=".*\\S.*"
          required
          autoComplete="off"
          className="text-white px-4 py-2 outline-none w-full"
          placeholder="Buscar..."
        />
        <button
          type="submit"
          className="bg-secondary-50 text-primary-500 p-2 hover:bg-secondary-100 transition rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
