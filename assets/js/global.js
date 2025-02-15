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

function fetchGlobal(){

}

