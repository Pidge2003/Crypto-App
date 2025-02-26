const widgetConfig1 = {
    "symbol": "BINANCE:BTCUSDT",
    "width": "100%",
    "isTransparent": true,
    "colorTheme": "dark",
    "locale": "en"
};

const widgetConfig2 = {
    "symbols": [
        [
            "BINANCE:BTCUSDT|1D"
        ]
    ],
    "chartOnly": false,
    "width": "100%",
    "height": "100%",
    "locale": "en",
    "colorTheme": "dark",
    "autosize": true,
    "showVolume": false,
    "showMA": false,
    "hideDataRanges": false,
    "hideMarketStatus": false,
    "hideSymbolLogo": true,
    "scalePosition":  "right",
    "scaleMode": "Normal",
    "fontFamiy": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
    "fontSize": "10",
    "noTimeScale": false,
    "valueTracking": "1",
    "changeMode": "price-and-percent",
    "chartType": "area",
    "maLineColor": "#2962ff",
    "maLineWidth": 1,
    "maLength": 9,
    "headerFontSize": "medium",
    "backgroundColor": "rgba(14, 18, 24, 1)",
    "gridLineColor": "rgba(76, 175, 80, 0.06)",
    "lineWidth": 2,
    "lineType": 0,
    "dataRanges": [
        "1D|15",
        "1M|30",
        "3M|60",
        "12M|1D",
        "60M|1W",
        "all|1M"
    ],
    "dateFormat": "yyyy-mm-dd"

}

document.addEventListener("DOMContentLoaded", () =>{

    const params = new URLSearchParams(window.location.search);
    const query = params.get('coin');

    if(query){
        fetchCoinInfo(query);
    }else{
        window.location.href = "/../../index.html";
    }
});

async function fetchCoinInfo(query){
    const coinInfoError = document.getElementById('coin-info-error');
    coinInfoError.style.display = 'none';
    const apiURL = `https://api.coingecko.com/api/v3/coins/${query}`;

    try{
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error('API Limit Reached');
        const data = await response.json();
        widgetConfig1.symbol = `MEXC:${data.symbol.toUpperCase()}USDT`;

        widgetConfig2.symbols = [
            [`MEXC:${data.symbol.toUpperCase()}USDT|1D`]
        ];

        initializeWidget();
        displayCoinInfo(data);
    } catch(error){
        coinInfoError.style.display = 'flex';
        console.log(error);
    }
}

function initializeWidget(){
    const themeConfig = getThemeConfig();
    widgetConfig1.colorTheme = themeConfig.theme;
    widgetConfig2.colorTheme = themeConfig.theme;
    widgetConfig2.backgroundColor = themeConfig.backgroundColor;
    widgetConfig2.colorTheme = themeConfig.gridColor;

    createWidget('ticker-widget', widgetConfig1, 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js');
    createWidget('mini-chart-widget', widgetConfig2, 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js');
}

function displayCoinInfo(coin){
    const coinInfo = document.querySelector('.oin-info');
    const rightSec = document.querySelector('.coin-container .right-setion');
    const coinDesc = document.getElementById('.coin-desc-p');

    coinInfo.innerHTML = `
    <div class="logo">
    <img src="${coin.image.thumb}" alt="${coin.name}">
    <h4>${coin.name} <span>(${coin.symbol.toUpperCase()})</span></h4>
    <p>#${coin.market_cap_rank}</p>
    </div>
    <div class="status">
    <div class="item">
        <p class="str">Market Cap</p>
        <p class="num">$${coin.market_data_cap.usd != null ? coin.market_data.market_cap.usd.toLocaleString(undefined, {minimumFractionDigits: 3, maximumFractionDigits: 3 }) : "N/A"}</p>
    </div>
    <div class="item">
        <p class="str">Current Price</p>
        <p class="num">$${coin.market_data.market_cap.usd != null ? coin.market_data.market_cap.usd.toLocaleString(undefined {minimumFractionDigits: 3, maximumFractionDigits: 3 }) : "N/A"}</p>
    </div>
    <div class="item">
        <p class="str">All Time Low</p>
        <p class="num">$73,738.000</p>
    </div>
    <div class="item">
        <p class="str">All Time Low</p>
        <p class="num">$67.810</p>
    </div>
    <div class="item">
        <p class="str">Total Volume</p>
        <p class="num">$44,479,445,945.000</p>
    </div>
    <div class="item">
        <p class="str">Total Supply</p>
        <p class="num">21,000,000.000</p>
    </div>
    <div class="item">
        <p class="str">Max Supply</p>
        <p class="num">21,000,000.000</p>
    </div>
    <div class="item">
        <p class="str">Circulating Supply</p>
        <p class="num">19,734,778.000</p>
    </div>
    </div>
    `
}