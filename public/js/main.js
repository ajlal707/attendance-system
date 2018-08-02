function userLogin() {
    document.getElementById('error').value = '';
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email && password) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            $.ajax({
                type: "POST",
                url: "/userLogin",
                data: { email, password },
                success: function (res) {
                    if (res.error) {
                        var error = document.getElementById('error');
                        error.style.color = 'red'
                        error.innerHTML = res.error

                    } else {
                        window.location.href = '/dashboard';
                    }
                }
            });
        } else {
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = 'Email format invalid.'
        }
    } else {
        var error = document.getElementById('error');
        error.style.color = 'red'
        error.innerHTML = 'Fix the missing fields.'
    }
}
// signup user
function matchPassword() {
    document.getElementById('error').value = '';
    var password1 = document.getElementById('pass1').value;
    var password2 = document.getElementById('pass2').value;
    if (password1 === password2) {
        var error = document.getElementById('error');
        error.style.color = 'green'
        error.innerHTML = 'Password match.'
    } else {
        var error = document.getElementById('error');
        error.style.color = 'red'
        error.innerHTML = 'Password not match.'
    }
}

function addUser() {
    document.getElementById('error').value = '';
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (password.length > 5) {

        if (email && password && username) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                $.ajax({
                    type: "POST",
                    url: "/addUser/addNewUser",
                    data: { username, email, password },
                    success: function (res) {
                        if (res.error) {
                            var error = document.getElementById('error');
                            error.style.color = 'red'
                            error.innerHTML = res.error

                        } else if (res.success) {
                            window.location.href = '/addUser';
                        }
                    }
                });
            } else {
                var error = document.getElementById('error');
                error.style.color = 'red'
                error.innerHTML = 'Email format invalid.'
            }
        } else {
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = 'Fix the missing fields.'
        }
    } else {
        var error = document.getElementById('error');
        error.style.color = 'red'
        error.innerHTML = 'Password length grater then 5.'
    }
}
//end signup user



// RESET PASSWORD FUNCTION

function resetPassword() {
    document.getElementById('error').value = '';
    var pass1 = document.getElementById('pass1').value;
    var pass2 = document.getElementById('pass2').value;
    if (pass1 && pass2) {
        if (pass1.length > 5) {
            $.ajax({
                type: "POST",
                url: "/changePassword/resetpassword",
                data: { password: pass1 },
                success: function (res) {
                    if (res.error) {
                        var error = document.getElementById('error');
                        error.style.color = 'red'
                        error.innerHTML = res.error

                    } else {
                        window.location.href = '/'
                    }
                }
            });

        } else {
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = 'Password length must be 6'
        }

    } else {
        var error = document.getElementById('error');
        error.style.color = 'red'
        error.innerHTML = 'All fields must not be empty.'
    }
}

function updateProfile() {
    document.getElementById('error').value = '';
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    if (username && email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            $.ajax({
                type: "POST",
                url: "/profile/updateprofile",
                data: { username, email },
                success: function (res) {
                    if (res.error) {
                        var error = document.getElementById('error');
                        error.style.color = 'red'
                        error.innerHTML = res.error

                    } else if (res.success) {
                        window.location.href = '/profile';
                    }
                }
            });
        } else {
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = 'Invalid email'
        }
    } else {
        var error = document.getElementById('error');
        error.style.color = 'red'
        error.innerHTML = 'username, email must not be empty.'
    }
}

