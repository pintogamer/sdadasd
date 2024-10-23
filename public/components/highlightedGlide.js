document.addEventListener('DOMContentLoaded', function() {
    fetchHighlightedItems();
  });

  function fetchHighlightedItems() {
    // Simulando a resposta do servidor
    const highlightedItems = {
      destaques: [
        { symbol: 'NASDAQ:AAPL', name: 'Apple Inc.' },
        { symbol: 'BITFINEX:BTCUSD', name: 'Bitcoin' },
        { symbol: 'COMEX:GC1!', name: 'Gold Futures' },
        { symbol: 'AMEX:SPY', name: 'SPDR S&P 500 ETF' },
        { symbol: 'FOREXCOM:NSXUSD', name: 'US 100 Cash CFD' }, 
        { symbol: 'CBOT:ZB1!', name: 'T-Bond' }
      ]
    };

    renderHighlightedItems(highlightedItems.destaques); 
    initializeSwiper();
  }

  function renderHighlightedItems(items) {
    const firstGlideSlides = document.getElementById('first-glide-slides');
    firstGlideSlides.innerHTML = ''; 

    items.forEach(item => {
      const widget = createTradingViewWidget(item);
      if (widget) {
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');
        swiperSlide.appendChild(widget);
        firstGlideSlides.appendChild(swiperSlide);
      }
    });
  }

  function initializeSwiper() {
    new Swiper('.swiper', {
      slidesPerView: 4,
      spaceBetween: 10,
      loop: false, 
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        // quando a largura da janela for >= 320px
        320: {
          slidesPerView: 1,
        },
        // quando a largura da janela for >= 480px
        480: {
          slidesPerView: 2,
        },
        // quando a largura da janela for >= 640px
        640: {
          slidesPerView: 3,
        },
        // quando a largura da janela for >= 1024px
        1024: {
          slidesPerView: 4,
        }
      }
    });
  }

  // Função para criar os widgets do TradingView (manter como está)
  function createTradingViewWidget(item) {
    // Implemente a lógica para criar o widget do TradingView aqui
    // usando a biblioteca do TradingView e os dados do item.
    // Retorne o elemento do widget criado.
    // Exemplo:
    const widgetContainer = document.createElement('div');
    widgetContainer.id = `tradingview-${item.symbol.replace(/[^a-zA-Z0-9]/g, '')}`;
    // ... lógica para criar o widget do TradingView ...
    return widgetContainer;
  }