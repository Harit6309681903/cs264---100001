// api docker
/*function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    //const data = "{ UserName :"  + username + ", Password: " + password + "}" ;
    const data = { UserName : "username", Password: "passwords"} ;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Application-Key': 'TU111d6e88fd2df0b68bb33f1a1f782fe9d964b65e1c8b7ac74dcc6c03615901fa8a25871bdd67656d13a8677e171c7559',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
    })
    .catch(error => console.error('Error:', error));
}*/

function submitLogin(event) {
    // ป้องกันการส่งฟอร์มและรีเฟรชหน้า
    event.preventDefault();

    // ดึงค่าจากฟิลด์ username และ password
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // สร้างข้อมูล data สำหรับการส่งไปยัง API
    const data = {
        UserName: username,
        PassWord: password
    };

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Application-Key': 'TU111d6e88fd2df0b68bb33f1a1f782fe9d964b65e1c8b7ac74dcc6c03615901fa8a25871bdd67656d13a8677e171c7559',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())

    .then(data => {
        console.log('Data received:', data);
        
        // ตรวจสอบว่ามี message จาก API หรือไม่
        document.getElementById('message').innerText = data.message;

        if(data.message === "Success"){
            // บันทึกข้อมูล JSON ที่ได้รับจาก API ลงใน localStorage
            localStorage.setItem('userData', JSON.stringify(data));

            window.location.href = 'chose_form.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = "An error occurred. Please try again.";
    });
}


