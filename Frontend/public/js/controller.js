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

// ฟังก์ชันสำหรับส่งข้อมูลทั้งหมดไปยังฐานข้อมูล
/*function submitForm() {
    // เก็บข้อมูลจากฟอร์มลงในวัตถุ
    const formData = {
        date: document.getElementsByName('date')[0].value,
        head: document.getElementsByName('head')[0].value,
        studentInfo: {
            nameTitle: document.querySelector('input[name="name_title"]:checked').value,
            fname: document.getElementsByName('fname')[0].value,
            ID: document.getElementsByName('ID')[0].value,
            class: document.getElementsByName('Class')[0].value,
            branch: document.getElementsByName('Branch')[0].value,
            // เพิ่มข้อมูลที่เหลือตามฟอร์ม
        },
        subjects: []
    };

    // ดึงข้อมูลในตารางทีละแถวและเก็บลงใน formData.subjects
    const table = document.getElementById('subjectTable').getElementsByTagName('tbody')[0];
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const subjectData = {
            id: row.cells[1].querySelector('input').value,
            name: row.cells[2].querySelector('input').value,
            section: row.cells[3].querySelector('input').value,
            datetime: row.cells[4].querySelector('input').value,
            credits: row.cells[5].querySelector('input').value,
            teacher: row.cells[6].querySelector('input').value
        };
        formData.subjects.push(subjectData);
    }

    // ส่งข้อมูลไปยัง API
    fetch('https://your-api-url.com/save-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Data saved successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to save data.');
    });
}*/
