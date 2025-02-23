const coinsList = document.getElementById('coins-list');
const exchangeslist = document.getElementById('exchanges-list');
const nftsList = document.getElementById('nfts-list');

document.addEventListener('DOMContentLoaded', ()=>{
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    if(query){
        fetchSearchResult(query, [coinsList, exchangeslist, nftsList]);
    }else{
        const searchHeading = document.getElementById('searchHeadig');
        const searchContainer = document.querySelector('.search-container')
        searchContainer.innerHTML = `<p style-"color: red; text-align:center; margin-bottom: 8px">Nothing To Show...</p>`;
        searchHeading.innerText = 'Please search something...';
    }
});

function fetchSearchResult(param, idsToToggle){
    const searchHeading = document.getElementById('searchHeading');

    idsToToggle.forEach(id =>{
        const errorElement = document.getElementById(`${id}-error`);

        if(errorElement){
            errorElement.style.display = 'none';
        }
        toggleSpinner(id, `${id}-spinner`, true)
    });

    coinsList.innerHTML = '';
    exchangeslist.innerHTML = '';
    nftsList.innerHTML = '';

    searchHeading.innerText = `Search results for "${param}`;

    const url = `https://api.coingecko.com/api/v3/search?query=${param}`;
    const options = {method: 'GET', headers: {accept: 'application/json'}};
}
