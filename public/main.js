document.addEventListener("DOMContentLoaded", () => {
  // Cache de Seletores DOM
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const testimonialsSlider = document.getElementById("testimonials-slider");
  const prevBtn = document.getElementById("prev-testimonial");
  const nextBtn = document.getElementById("next-testimonial");
  const testimonials = document.querySelectorAll(".testimonial");
  const btnHero = document.getElementById("btn-hero");
  const loader = document.querySelector(".loader");
  const navbar = document.querySelector(".navbar");
  const floatingIcons = document.querySelectorAll(".floating-icon");
  const counters = document.querySelectorAll(".counter");
  const navbarLinks = document.querySelectorAll(".navbar-menu a, .footer-links a");

  // Configurações de Tema
  const sunIcon = "☀️";
  const moonIcon = "🌙";

  // Função para atualizar o ícone do tema
  const updateThemeIcon = () => {
    if (body.dataset.theme === "dark") {
      themeToggle.textContent = sunIcon;
      themeToggle.setAttribute("aria-label", "Alternar para o modo claro");
    } else {
      themeToggle.textContent = moonIcon;
      themeToggle.setAttribute("aria-label", "Alternar para o modo escuro");
    }
  };

  // Função para alternar o tema
  const toggleTheme = () => {
    body.dataset.theme = body.dataset.theme === "dark" ? "light" : "dark";
    updateThemeIcon();
    localStorage.setItem("theme", body.dataset.theme);
  };

  // Inicialização do Tema
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    body.dataset.theme = savedTheme ? savedTheme : "light";
    updateThemeIcon();
  };

  // Slider de Testemunhos
  let currentSlide = 0;
  const totalSlides = testimonials.length;
  let slideInterval;

  const showSlide = (index) => {
    currentSlide = (index + totalSlides) % totalSlides;
    testimonialsSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
  };

  const nextSlide = () => showSlide(currentSlide + 1);
  const prevSlideFunc = () => showSlide(currentSlide - 1);

  const startSlideInterval = () => {
    slideInterval = setInterval(nextSlide, 5000);
  };

  const stopSlideInterval = () => {
    clearInterval(slideInterval);
  };

  const initializeSlider = () => {
    if (!testimonialsSlider || totalSlides === 0) return;
    
    showSlide(currentSlide);
    nextBtn && nextBtn.addEventListener("click", nextSlide);
    prevBtn && prevBtn.addEventListener("click", prevSlideFunc);
    testimonialsSlider.addEventListener("mouseenter", stopSlideInterval);
    testimonialsSlider.addEventListener("mouseleave", startSlideInterval);
    startSlideInterval();
  };

  // Animações com GSAP
  const initializeGSAPAnimations = () => {
    // Animações da Seção Hero
    gsap.from(".hero h1", {
      duration: 1,
      opacity: 0,
      y: -50,
      ease: "power3.out",
    });

    gsap.from(".hero p", {
      duration: 1,
      opacity: 0,
      y: 50,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.from("#btn-hero", {
      duration: 1,
      opacity: 0,
      scale: 0.8,
      delay: 1,
      ease: "elastic.out(1, 0.5)",
    });

    // Animações do Botão Hero
    if (btnHero) {
      btnHero.addEventListener("mouseenter", () => {
        gsap.to(btnHero, {
          duration: 0.3,
          scale: 1.1,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
        });
      });

      btnHero.addEventListener("mouseleave", () => {
        gsap.to(btnHero, {
          duration: 0.3,
          scale: 1,
          boxShadow: "none",
        });
      });
    }

    // Animação do Loader
    if (loader) {
      window.addEventListener("load", () => {
        loader.classList.add("hidden");
        gsap.from(".navbar, .hero-content", {
          opacity: 0,
          y: 20,
          duration: 1,
          delay: 1,
        });
      });
    }

    // Transição de Fundo da Navbar no Scroll
    if (navbar) {
      gsap.to(".navbar", {
        scrollTrigger: {
          trigger: ".navbar",
          start: "top top",
          end: "+=500",
          toggleClass: { targets: ".navbar", className: "navbar-scrolled" },
          scrub: true,
        },
      });
    }

    // Efeito Parallax para o Fundo do Hero
    gsap.to(".hero", {
      backgroundPositionY: "50%",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Indicador de Progresso de Rolagem
    const progressBar = document.createElement("div");
    progressBar.classList.add("scroll-progress");
    document.body.appendChild(progressBar);

    gsap.to(".scroll-progress", {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Ícones Flutuantes
    floatingIcons.forEach((icon) => {
      gsap.to(icon, {
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 2,
      });
    });

    // Animações de ScrollTrigger para Seções
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
      });
    });

    // Scroll Suave com o Plugin ScrollTo do GSAP
    if (navbarLinks.length > 0) {
      navbarLinks.forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: targetElement, offsetY: 70 },
              ease: "power2.inOut",
            });
          }
        });
      });
    }

    // Animação de Contagem de Números
    counters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        gsap.to(counter, {
          innerText: target,
          duration: 2,
          ease: "power1.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 80%",
            toggleActions: "play none none none",
            onUpdate: () => {
              counter.textContent = Math.floor(counter.innerText);
            },
          },
        });
      };
      updateCount();
    });
  };

  // Navbar Fixa com Base na Direção de Rolagem
  const initializeFixedNavbar = () => {
    let lastScroll = 0;

    if (!navbar) return;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > lastScroll && currentScroll > 100) {
        // Rolando para baixo
        if (!navbar.classList.contains("hidden")) {
          gsap.to(navbar, {
            y: -navbar.offsetHeight,
            duration: 0.3,
            ease: "power2.out",
          });
          navbar.classList.add("hidden");
        }
      } else {
        // Rolando para cima
        if (navbar.classList.contains("hidden")) {
          gsap.to(navbar, { y: 0, duration: 0.3, ease: "power2.out" });
          navbar.classList.remove("hidden");
        }
      }

      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    };

    // Implementar debounce para otimizar eventos de rolagem
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  };

  // Inicialização Geral
  const init = () => {
    initializeTheme();
    toggleTheme && themeToggle.addEventListener("click", toggleTheme);
    initializeSlider();
    initializeGSAPAnimations();
    initializeFixedNavbar();
  };

  init();
});