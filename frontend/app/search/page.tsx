"use client";
import useStockSearch from "../hooks/useStockSearch";


const Search = () => {
  const { query, setQuery, results, loading, searchStocks } = useStockSearch();
  return (
    <div className="text-center">
      <div className="p-10">
        <h1 className="text-lg font-semibold mb-5">会社名検索</h1>
        <input
          type="text"
          placeholder="企業名またはシンボル"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchStocks} disabled={loading}>
          {loading ? "検索中..." : "検索"}
        </button>
      </div>

      <ul>
        {results?.map((result) => (
          <li className="p-5"  key={result.exchDisp}>
            <a href={`/stocks/${result.exchDisp}`}>{result.shortname}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;