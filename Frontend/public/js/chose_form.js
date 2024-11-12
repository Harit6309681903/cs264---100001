// chose_form.js

// ฟังก์ชันสำหรับการนำทางไปยังหน้า form ตามที่เลือก
function goToForm() {
    const reasons = document.getElementsByName("reason");
    let selectedReason;

    // ตรวจสอบว่าเลือกคำร้องใด
    for (const reason of reasons) {
        if (reason.checked) {
            selectedReason = reason.value;
            break;
        }
    }

    // ตรวจสอบว่ามีการเลือกตัวเลือกใดหรือไม่
    if (!selectedReason) {
        alert("กรุณาเลือกคำร้องก่อนกดยืนยัน");
        return;
    }

    // นำทางไปยังหน้าที่สอดคล้องกับคำร้องที่เลือก
    switch (selectedReason) {
        case "lateRegistration":
            window.location.href = "form.html"; // ลิงก์ไปยังหน้า form.html
            break;
        // สามารถเพิ่ม case ได้หากมีหน้าอื่น ๆ
        default:
            alert("ยังไม่มีหน้าแบบฟอร์มสำหรับคำร้องนี้");
    }
}
