// marketGlides.js

document.addEventListener('DOMContentLoaded', function() {
    fetchMarketItems();
});

function fetchMarketItems() {
    const marketItems = {
        stocks: [
            { symbol: 'NASDAQ:AAPL', name: 'S&P 500 Index' },
            { symbol: 'FOREXCOM:NSXUSD', name: 'US 100 Cash CFD' },
            { symbol: 'FOREXCOM:DJI', name: 'Dow Jones Industrial Average Index' }
        ],
        bonds: [
            { symbol: 'CBOT:ZB1!', name: 'T-Bond' },
            { symbol: 'CBOT:UB1!', name: 'Ultra T-Bond' },
            { symbol: 'EUREX:FGBL1!', name: 'Euro Bund' }
        ],
        mutualfunds: [
            { symbol: 'MUTF:VGSTX', name: 'Vanguard Star Fund' },
            { symbol: 'MUTF:VTSAX', name: 'Vanguard Total Stock Market Index Fund' }
        ],
        etfs: [
            { symbol: 'AMEX:SPY', name: 'SPDR S&P 500 ETF' },
            { symbol: 'AMEX:IVV', name: 'iShares Core S&P 500 ETF' }
        ],
        cryptocurrencies: [
            { symbol: 'BITFINEX:BTCUSD', name: 'Bitcoin' },
            { symbol: 'BITFINEX:ETHUSD', name: 'Ethereum' }
        ],
        commodities: [
            { symbol: 'COMEX:GC1!', name: 'Gold Futures' },
            { symbol: 'NYMEX:CL1!', name: 'WTI Crude Oil Futures' }
        ]
    };

    renderMarketItems(marketItems);
    initializeMarketGlides();
}

function renderMarketItems(marketItems) {
    for (const [category, items] of Object.entries(marketItems)) {
        const categoryContainer = document.getElementById(`${category}-items`);
        if (categoryContainer) {
            categoryContainer.innerHTML = ''; // Limpa os itens antes de adicionar novos
            items.forEach(item => {
                const widget = createTradingViewWidget(item);
                if (widget) {
                    categoryContainer.appendChild(widget);
                }
            });
        }
    }
}

function initializeMarketGlides() {
    const categories = ['stocks', 'bonds', 'mutualfunds', 'etfs', 'cryptocurrencies', 'commodities'];
    categories.forEach(category => {
        const glideElement = document.querySelector(`#${category}-items-glide`);
        if (glideElement) {
            new Glide(`#${category}-items-glide`, {
                type: 'carousel',
                perView: 4,
                gap: 10,
                hoverpause: true,
                animationDuration: 2000,
                animationTimingFunc: 'ease-in-out'
            }).mount();
        }
    });
}