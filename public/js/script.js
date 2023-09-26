document.addEventListener('DOMContentLoaded', function () {
    function checkPasswords() {
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const passwordError = document.getElementById('password-error');

        if (passwordInput && confirmPasswordInput && passwordError) {
            if (passwordInput.value !== confirmPasswordInput.value) {
                passwordError.textContent = "Passwords do not match";
            } else {
                passwordError.textContent = "";
            }
        }
    }

    function togglePasswordVisibility(input, icon) {
        if (input && icon) {
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }
    }

    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordToggleIcon1 = document.getElementById('password-toggle-icon-1');
    const passwordToggleIcon2 = document.getElementById('password-toggle-icon-2');
    const passwordInputLogin = document.getElementById('password-login');
    const passwordToggleIconLogin = document.getElementById('password-toggle-icon-0');

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('keyup', checkPasswords);
    }

    if (passwordToggleIcon1) {
        passwordToggleIcon1.addEventListener('click', function () {
            togglePasswordVisibility(passwordInput, passwordToggleIcon1);
        });
    }

    if (passwordToggleIcon2) {
        passwordToggleIcon2.addEventListener('click', function () {
            togglePasswordVisibility(confirmPasswordInput, passwordToggleIcon2);
        });
    }

    if (passwordToggleIconLogin) {
        passwordToggleIconLogin.addEventListener('click', function () {
            togglePasswordVisibility(passwordInputLogin, passwordToggleIconLogin);
        });
    }
});
