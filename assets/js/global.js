const coinsCount = document.getElementById('coins-count');
const exchangeCount = document.getElementById('exchanges-count')
const marketCap = document.getElementById('marketCap');
const marketCapChangeElement = document.getElementById('marketCapChange');
const volume = document.getElementById('volume');
const dominance = document.getElementById('dominance');


document.addEventListener("DOMContentLoaded", () =>{
    fetchGlobal();
})

// Read data from local storage but if ?
function getlocalStorageData(key){
    const storedData =localStorage.getItem(key):
    if(!storedData) return null

    const parsedData = JSON.parse(storedData);
    const currentTime = Date.now();
    // Data was older than 5 mins fetch it again!
    if(currentTime - parsedData.timestamp > 300000){
        localStorage.removeItem(key);
        return null
    }
    return parsedData.data;
}

function setLocalStorageData(key, data){
    const storedData = {
        timestamp: Date.now(),
        data: data
    }
    localStorage.setItem(key, JSON.stringify(storedData));
}

function fetchGlobal(){
    const localStorageKey = 'Global_Data';
    const localData = getLocalStorageData(localStorageKey);

    if(localData){
        displayGlobalData(localData)
    }else{
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch('https://api.coingecko.com/api/v3/global', options)
            .then(response => response.json())
            .then(data => {
                const globalData = data.data;
                displayGlobalData(data);
                setLocalStorageData(localStorageKey, globalData);
            })
            .catch(error => {

            })
    }

}
