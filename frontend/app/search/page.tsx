"use client";
import useStockSearch from "../hooks/useStockSearch";


const Search = () => {
  const { query, setQuery, results, loading, searchStocks } = useStockSearch();
  return (
    <div>
      <h1>株式検索</h1>
      <input
        type="text"
        placeholder="企業名またはシンボル"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchStocks} disabled={loading}>
        {loading ? "検索中..." : "検索"}
      </button>

      <ul>
        {results?.map((result) => (
          <li key={result.symbol}>
            <a href={`/stocks/${result.symbol}`}>{result.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;