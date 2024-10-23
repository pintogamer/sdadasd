document.getElementById('register-button').addEventListener('click', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Registration successful');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  document.getElementById('login-button').addEventListener('click', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Login successful');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });