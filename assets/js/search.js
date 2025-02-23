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

    fetch(url, options)
       .then(response =>{
          if(!response.ok){
            throw new Error('Network response was not ok ' + response.statusText);
          }
          idsToToggle.forEach(id => toggleSpinner(id, `${id}-spinner`, false));
          return response.json();
       })
       .then(data =>{

// filter results without image

          let coins = (data.coins || []).filter(coin => coin.thumb !== "missing_thumb.png");
          let exchanges = (data.exchanges || []).filter(ex => ex.thumb !== "missing_thumb.png");
          let nfts = (data.nfts || []).filter(nf => nf.thumb !== "missing_thumb.png");

// Show equal results for each category

          const coinsCount = coins.length;
          const exchangeCount = exchanges.length;
          const nftCount = nfts.list

          let minCount = Math.min(coinsCount, exchangeCount, nftCount);

          if(coinsCount > 0 && exchangeCount > 0 & nftCount > 0){
            coins = coins.slice(0,minCount);
            exchanges = exchanges.slice(0, minCount);
            nfts = nfts.slice(0, minCount);
          }
          coinsResults(coins);
          exchangesResult(exchanges);
          nftsResult(nfts);

          if(coins.length === 0){
            coinsList.innerHTML = `<p style="color: red; text-align:center;">No results found for coins </p>`;
          }
          if(exchanges.length === 0){
            exchangeslistList.innerHTML = `<p style="color: red; text-align:center;">No results found for exchanges </p>`;
          }
          if(nfts.length === 0){
            nftsListt.innerHTML = `<p style="color: red; text-align:center;">No results found for nfts </p>`;
          }

       })
       .catch(error =>{
          idsToToggle.forEach(id => {
            toggleSpinner(id, `${id}-spinner`, false);
            document.getElementById(`${id}-error`).style.display = 'block';
          });
          console.error('Error fetching data;', error);
       });
}

function coinsResult(coins){
    coinsList.innerHTML = '';

    const table = createTable([
        'Rank', 'Coin'
    ]);

    coins.forEach(coin =>{
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${coin.market_cap_rank}</td>
            <td class="name-column"><img src="${coin.thumb}" alt="${coin.name}">Bitcoin <span>(${coin.symbol.toUpperCase()})</span></td>
        `;
        table.appendChild(row);
        row.onclick = () =>{
            window.location.href = `../../pages/coins.html?coin=${coin.id}`;
        };
    });
    coinsList.appendChild(table);
}

function exchangesResult(exchanges){
    exchangeslist.innerHTML = '';

    const table = createTable([
        'Exchange', 'Market'
    ]);

    exchanges.forEach(ex =>{
        const row = document.createElement('tr');
        row.innerHTML = `
           <td class="name-column"><img src="${ex.thumb}" alt="${ex.name}">${ex.name}</td>
           <td>${ex.market_type}</td>
        `;
        table.appendChild(row);
    });
    exchangeslist.appendChild(table);
}

function nftsResult(nfts){
    nftsList.innerHTML = '';

    const table = createTable([
        'NFT', 'Symbol'
    ]);

    exchanges.forEach(nf =>{
        const row = document.createElement('tr');
        row.innerHTML = `
           <td class="name-column"><img src="${nf.thumb}" alt="${nf.name}">${nf.name}</td>
           <td class="name-column">${nf.symbol}</td>
        `;
        table.appendChild(row);
    });
    nftsList.appendChild(table);
}