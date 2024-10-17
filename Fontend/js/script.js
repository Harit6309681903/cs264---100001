function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Application-Key': '{TU111d6e88fd2df0b68bb33f1a1f782fe9d964b65e1c8b7ac74dcc6c03615901fa8a25871bdd67656d13a8677e171c7559}',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password})
    })
    
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
    })
    .catch(error => console.error('Error:', error));
}

