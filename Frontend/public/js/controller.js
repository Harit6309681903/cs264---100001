// ฟังก์ชันสำหรับเพิ่มแถวใหม่ในตาราง
function addRow() {
    const table = document.getElementById('subjectTable').getElementsByTagName('tbody')[0];
    const rowCount = table.rows.length;
    const row = table.insertRow(rowCount);

    row.innerHTML = `
        <td align="center">${rowCount + 1}</td>
        <td align="center"><input type="text" name="TID_subject_${rowCount + 1}"></td>
        <td align="center"><input type="text" name="Tnsubject_${rowCount + 1}"></td>
        <td align="center"><input type="text" name="Tsection_${rowCount + 1}"></td>
        <td align="center"><input type="text" name="Tdatetime_${rowCount + 1}"></td>
        <td align="center"><input type="number" name="Tcredit_${rowCount + 1}" min="1" max="4"></td>
        <td align="center"><input type="text" name="Tteacher_${rowCount + 1}"></td>
    `;
}

//function ตรวจสอบและส่งข้อมูลให้ API
function handleSubmit(event) {
    event.preventDefault();

    // ตรวจสอบข้อมูล
    const isValid = validateForm(event);

    if (isValid) {
        // หากข้อมูลถูกต้องเรียก submitForm()
        submitForm();
    }
}

function validateForm(event) {
    event.preventDefault(); // ป้องกันไม่ให้ฟอร์มส่งข้อมูลทันที

    const firstName = document.forms["myForm"]["fname"].value;
    const studentId = document.forms["myForm"]["ID"].value;
    const phoneNumber = document.forms["myForm"]["tel"].value;
    const branch = document.forms["myForm"]["Branch"].value;

    // ตรวจสอบว่าชื่อถูกกรอกหรือไม่
    if (firstName.trim() === "") {
        alert("กรุณากรอกชื่อ");
        return false;
    }

    // ตรวจสอบว่าเลขทะเบียนเป็นตัวเลขเท่านั้นและมีความยาวที่ถูกต้อง
    if (isNaN(studentId) || studentId.length !== 10) {
        alert("กรุณากรอกเลขทะเบียนให้ถูกต้อง (10 หลัก)");
        return false;
    }

    // ตรวจสอบว่าเบอร์โทรศัพท์เป็นตัวเลขและมีความยาวเหมาะสม
    if (isNaN(phoneNumber) || phoneNumber.length < 9 || phoneNumber.length > 10) {
        alert("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (9-10 หลัก)");
        return false;
    }

    // ตรวจสอบว่าสาขาวิชาถูกกรอกหรือไม่
    if (branch.trim() === "") {
        alert("กรุณากรอกสาขาวิชา");
        return false;
    }

    // หากข้อมูลถูกต้องทั้งหมด ให้ส่งฟอร์มได้
    alert("ส่งข้อมูลเรียบร้อยแล้ว");
    return true;
}

//ใส่วันเดือนปี Automatic 
function setDateToday() {
    const dateInput = document.querySelector('input[name="date"]');
    const today = new Date();

    // กำหนดวันที่เป็นฟอร์แมต YYYY-MM-DD ให้กับ input date
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มที่ 0 ต้อง +1
    const day = String(today.getDate()).padStart(2, '0');
    dateInput.value = `${year}-${month}-${day}`;
}

function populateForm() {
    // ดึงข้อมูล JSON จาก localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (userData) {
        // ตั้งค่าข้อมูลในฟิลด์ของฟอร์ม
        document.querySelector('input[name="fname"]').value = userData.displayname_th;
        document.querySelector('input[name="ID"]').value = userData.username;
        document.querySelector('input[name="Branch"]').value = userData.department;
        document.querySelector('input[name="email"]').value = userData.email;
    }
}

//ฟังก์ชันสองฟังก์ชันทำงานรวมกัน
function initializePage() {
    populateForm(); // เรียกฟังก์ชัน populateForm เพื่อเติมข้อมูลในฟอร์ม
    setDateToday(); // เรียกฟังก์ชัน setDateToday เพื่อใส่วันปัจจุบัน
}

window.onload = initializePage;

//ดึงข้อมูล JSON
const userData = JSON.parse(localStorage.getItem('userData'));

// ตรวจสอบข้อมูลก่อนใช้งาน
if (userData) {
    console.log("ข้อมูลผู้ใช้:", userData);
}


function submitForm() {
    // เก็บข้อมูลจากฟอร์มลงในวัตถุ
    const formData = {
        userName: document.querySelector('input[name="fname"]').value,
        email: document.querySelector('input[name="email"]').value,
        faculty: "วิทยาศาสตร์และเทคโนโลยี",
        type: "student",
        idStudent: document.querySelector('input[name="ID"]').value,
        houseNumber: document.querySelector('input[name="hnumber"]').value,
        subDistrict: document.querySelector('input[name="hsubdistrict"]').value,
        district: document.querySelector('input[name="hdistrict"]').value,
        country: document.querySelector('input[name="hprovince"]').value,
        postcode: document.querySelector('input[name="hpostcode"]').value,
        phoneNumber: document.querySelector('input[name="tel"]').value,
        idSubject: document.querySelector('input[name="TID_subject_1"]').value,
        nameSubject: document.querySelector('input[name="Tnsubject_1"]').value,
        sectionColum: document.querySelector('input[name="Tsection_1"]').value,
        dataSubject: document.querySelector('input[name="Tdatetime_1"]').value,
        unitSubject: document.querySelector('input[name="Tcredit_1"]').value,
        teacherSubject: document.querySelector('input[name="Tteacher_1"]').value
    };
//ส่งไปยังAPI
fetch('http://localhost:8080/api/user', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Error while saving data.");
    }
})
.then(data => {
    alert('บันทึกสำเร็จ!'); // แจ้งเตือนเมื่อบันทึกสำเร็จ
    console.log(data); // ดูผลลัพธ์ที่ส่งกลับ
})
.catch(error => {
    console.error('Error:', error);
    alert('บันทึกไม่สำเร็จ');
});
}
