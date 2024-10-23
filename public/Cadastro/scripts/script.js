document.addEventListener("DOMContentLoaded", () => {
  // Selecionando elementos do DOM
  const switchCtn = document.querySelector("#switch-cnt");
  const switchC1 = document.querySelector("#switch-c1");
  const switchC2 = document.querySelector("#switch-c2");
  const switchCircle = document.querySelectorAll(".switch__circle");
  const switchBtn = document.querySelectorAll(".switch-btn");
  const aContainer = document.querySelector("#a-container");
  const bContainer = document.querySelector("#b-container");
  const allButtons = document.querySelectorAll(".submit");

  // Função para prevenir o comportamento padrão dos botões
  const preventDefault = (e) => e.preventDefault();

  // Função para alternar os formulários
  const changeForm = () => {
    switchCtn.classList.add("is-gx");
    setTimeout(() => {
      switchCtn.classList.remove("is-gx");
    }, 1500);

    switchCtn.classList.toggle("is-txr");
    switchCircle.forEach((circle) => circle.classList.toggle("is-txr"));

    switchC1.classList.toggle("is-hidden");
    switchC2.classList.toggle("is-hidden");
    aContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-z200");
  };

  // Adicionando eventos aos botões
  allButtons.forEach((btn) => btn.addEventListener("click", preventDefault));
  switchBtn.forEach((btn) => btn.addEventListener("click", changeForm));

  // Função para exibir mensagens ao usuário
  const displayMessage = (message, type) => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.textContent = message;
      messageContainer.className = `message ${type}`;
      // Remover a mensagem após alguns segundos
      setTimeout(() => {
        messageContainer.textContent = "";
        messageContainer.className = "message";
      }, 5000);
    } else {
      alert(message); // Fallback caso o container não exista
    }
  };

  // Função para validar email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Função para registrar usuário com validação
  const registerUser = async (event) => {
    event.preventDefault();
    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;

    // Validação dos campos
    if (!name || !email || !password) {
      displayMessage("Por favor, preencha todos os campos.", "error");
      return;
    }

    if (!validateEmail(email)) {
      displayMessage("Por favor, insira um email válido.", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        displayMessage("Usuário registrado com sucesso.", "success");
        localStorage.setItem("token", data.token);
      } else {
        displayMessage(data.message || "Erro ao registrar usuário.", "error");
      }
    } catch (error) {
      console.error("Erro:", error);
      displayMessage("Erro ao registrar usuário.", "error");
    }
  };

  // Função para login do usuário com validação
  const loginUser = async (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    // Validação dos campos
    if (!email || !password) {
      displayMessage("Por favor, preencha todos os campos.", "error");
      return;
    }

    if (!validateEmail(email)) {
      displayMessage("Por favor, insira um email válido.", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        displayMessage("Login bem-sucedido.", "success");
        localStorage.setItem("token", data.token);
        // Redireciona para a página desejada após login bem-sucedido
        window.location.href = "../../Mercado/Mercado.html";
      } else {
        displayMessage(data.message || "Erro ao fazer login.", "error");
      }
    } catch (error) {
      console.error("Erro:", error);
      displayMessage("Erro ao fazer login.", "error");
    }
  };

  // Adicionando eventos aos botões de registro e login
  const registerButton = document.getElementById("register-button");
  const loginButton = document.getElementById("login-button");

  if (registerButton) {
    registerButton.addEventListener("click", registerUser);
  }

  if (loginButton) {
    loginButton.addEventListener("click", loginUser);
  }
});