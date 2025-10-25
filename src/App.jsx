import {useEffect, useState} from "react";
import CoinCards from "./components/CoinCards.jsx";
import LimitSelector from "./components/LimitSelector.jsx";
import FilterInput from "./components/FilterInput.jsx";
import SortSelector from "./components/SortSelector.jsx";
import Spinner from "./components/Spinner.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('market_cap_desc');

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const res = await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await res.json();
                console.log(data);
                setCoins(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCoins();
    }, [limit]);

    // useEffect(() => {
    //     fetch(API_URL)
    //         .then((res) => {
    //             if(!res.ok) throw new Error("Failed to fetch data");
    //             return res.json();
    //         })
    //         .then((data) => {
    //             console.log(data);
    //             setCoins(data);
    //             setLoading(false);
    //         })
    //         .catch((err) => {
    //             setError(err.message);
    //             setLoading(false);
    //         })
    // }, [])


    const filterCoins = coins.filter((coin) => {
        return coin.name.toLowerCase().includes(filter.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(filter.toLowerCase());
    })
        .slice()
        .sort((a,b) => {
            switch (sortBy) {
                case 'market_cap_desc':
                    return b.market_cap - a.market_cap;
                case 'market_cap_asc':
                    return a.market_cap - b.market_cap;
            }
        });

    return (
        <div>
            <h1>Crypto Dash</h1>
            {loading && <Spinner color='white' />}
            {error && <div className='error'>{error}</div>}

            <div className="top-controls">
                <FilterInput filter={filter} onFilterChange={setFilter}></FilterInput>
                <LimitSelector limit={limit} onLimitChange={setLimit}></LimitSelector>
                <SortSelector sortBy={sortBy} onSortChange={setSortBy}></SortSelector>
            </div>

            {!loading && !error && (
                <main className="grid">
                    {filterCoins.length > 0 ? (filterCoins.map((coin) => (
                        <CoinCards key={coin.id} coin={coin}></CoinCards>
                    ))) : <p>No matching coins</p>}
                </main>
            )}
        </div>
    )
}

export default App;