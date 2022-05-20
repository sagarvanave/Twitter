function validateForm() {
    var passwordField = document.getElementById("pwd");
    var passwordConfirmField = document.getElementById("cpwd");
    var form = document.getElementById("registerForm");
    if (passwordField.value != passwordConfirmField.value) {
        alert("Passwords does not match. Please try again.");
    }
    else {
        form.submit();
    }
}