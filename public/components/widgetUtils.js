// widgetUtils.js

const addedWidgets = new Set();

function createTradingViewWidget(item) {
    if (addedWidgets.has(item.symbol)) {
        console.warn(`Widget for ${item.symbol} already added.`);
        return null;
    }

    addedWidgets.add(item.symbol);

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'glide__slide market-item';

    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.async = true;
    scriptElement.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
    scriptElement.innerHTML = JSON.stringify({
        "symbol": item.symbol,
        "width": "100%",
        "colorTheme": "dark",
        "isTransparent": true,
        "locale": "br"
    });

    widgetContainer.appendChild(scriptElement);
    return widgetContainer;
}