import React from 'react'

/**
 *
 *The sorting component for the products
 * @param {*} {setValue}
 * @return {*} 
 */
function SortItems({setValue}) {
    const character = (e) => {
        setValue(e.target.value)
    }
    return (
      <div className="filter">
        <div className="filter__component">
          <label htmlFor="sort" className="filter__label">Sort</label>
          <select name="filter" id="sort" className="filter__select"  onChange={character}>
                <option disabled selected value >Sort by</option>
                <option value="high">Price, high to low</option>
                <option value="low">Price, low to high</option>
          </select>
        </div>
      </div>
    );
}


export default SortItems;