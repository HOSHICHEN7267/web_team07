document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("register-form");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const errorMessage = document.getElementById("error-message");

    form.addEventListener("submit", function (event) {
        if (password.value !== confirmPassword.value) {
            event.preventDefault(); // 阻止表單提交
            errorMessage.textContent = "❌ 密碼不一致，請重新輸入";
            errorMessage.style.color = "red";
            confirmPassword.style.border = "2px solid red";
        } else {
            errorMessage.textContent = "";
            confirmPassword.style.border = "2px solid green";
        }
    });

    confirmPassword.addEventListener("input", function () {
        if (password.value !== confirmPassword.value) {
            errorMessage.textContent = "❌ 密碼不一致，請重新輸入";
            errorMessage.style.color = "red";
            confirmPassword.style.border = "2px solid red";
        } else {
            errorMessage.textContent = "";
            confirmPassword.style.border = "2px solid green";
        }
    });
});
