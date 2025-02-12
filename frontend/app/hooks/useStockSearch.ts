import { useState } from "react";
import api from "../lib/api";

const useStockSearch = () => {
    const [query, setQuery] = useState("");
    //以下をanyじゃなくなるように修正
    const [results, setResults] = useState<any>();
    const [loading, setLoading] = useState(false);

    const searchStocks = async () => {
        setLoading(true);
        const res = await api.get(`/stocks/search?q=${query}`);
        const data = res.data;
        setResults(data.quotes || []);
        setLoading(false);
    }

    return{
        query,
        setQuery,
        results,
        loading,
        searchStocks,
    }
}

export default useStockSearch;