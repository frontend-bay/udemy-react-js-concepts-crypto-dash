const SortSelector = ({sortBy, onSortChange}) => {
    return (
        <div className="controls">
            <label htmlFor="sort" className="sort">
                Sort by:
            </label>

            <select
            id='sort'
            value = {sortBy}
            onChange={(e) => onSortChange(e.target.value)}>
                <option value='market_cap_desc'>Market Cap (High To Low)</option>
                <option value='market_cap_asc'>Market Cap (Low To High)</option>
            </select>
        </div>
    )
}

export default SortSelector;