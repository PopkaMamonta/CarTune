// Login and register animation
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Create account
document.getElementById('signUpForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                email: email,
                password: password
            })
        });

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            if (response.ok) {
                alert('User created successfully: ' + JSON.stringify(data.user));
            } else {
                alert('Error: ' + JSON.stringify(data));
            }
        } else {
            const text = await response.text();
            alert('Unexpected response: ' + text);
        }
    } catch (error) {
        alert('An unexpected error occurred: ' + error.message);
    }
});

// Login
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login Response Data:', data);
            const token = data.user.token;

            if (token) {
                localStorage.setItem('jwt', token);

                await fetchData();

                window.location.href = '/';
            } else {
                alert('Token not found in response');
            }
        } else {
            const errorData = await response.json();
            alert('Error: ' + JSON.stringify(errorData));
        }
    } catch (error) {
        alert('An unexpected error occurred: ' + error.message);
    }
});

// fetch jwt token and put auth token automatically
async function fetchData() {
    const token = localStorage.getItem('jwt');

    if (!token) {
        console.error('No token found in local storage');
        return;
    }

    try {
        const response = await fetch('/user/current', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Protected route data:', data);
        } else {
            console.error('Request failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}