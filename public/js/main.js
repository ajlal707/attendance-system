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
    var password1 = document.getElementById('password').value;
    var password2 = document.getElementById('confirmPassword').value;
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
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var zipcode = document.getElementById('zipcode').value;
    if (password === confirmPassword) {
        if (firstName && lastName && email && password && username && city && state && zipcode) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                $.ajax({
                    type: "POST",
                    url: "/signup/signup",
                    data: { firstName, lastName, username, email, password, city, state, zipcode },
                    success: function (res) {
                        if (res.error) {
                            var error = document.getElementById('error');
                            error.style.color = 'red'
                            error.innerHTML = res.error

                        } else if (res.success) {
                            window.location.href = '/';
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
        error.innerHTML = ' cant signup password not match.'
    }

}
//end signup user

// FORGOT PASSWORD FUNCTION

function forgotpassword() {
    document.getElementById('error').value = '';
    var email = document.getElementById('email').value;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        $.ajax({
            type: "POST",
            url: "/forgotpassword/forgetPassword",
            data: { email: email },
            success: function (res) {
                if (res.error) {
                    var error = document.getElementById('error');
                    error.style.color = 'red'
                    error.innerHTML = 'User with this email doesn\'t exists';
                } else if (res.success) {
                    var error = document.getElementById('error');
                    error.style.color = 'green'
                    error.innerHTML = 'Please check your email and click the secure link'
                }
            }
        });
    } else {
        var error = document.getElementById('error');
        error.style.color = 'red'
        error.innerHTML = 'Please enter an valid email address.'
    }
}


// RESET PASSWORD FUNCTION

function resetPassword() {
    document.getElementById('error').value = '';
    var pass1 = document.getElementById('pass1').value;
    var pass2 = document.getElementById('pass2').value;
    var token = document.getElementById('token').value;
    if (pass1 && pass2) {
        if (pass1.trim().toString() === pass2.trim().toString()) {
            if (pass1.length > 5) {
                $.ajax({
                    type: "POST",
                    url: "/resetpassword/resetpassword",
                    data: { password: pass1, token: token },
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
            error.innerHTML = 'Password not match'
        }
    } else {
        var error = document.getElementById('error');
        error.style.color = 'red'
        error.innerHTML = 'All fields must not be empty.'
    }
}

function updateProfile() {
    document.getElementById('error').value = '';
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var streetAddress = document.getElementById('streetAddress').value;
    var country = document.getElementById('country').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var zipcode = document.getElementById('zipcode').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    if (firstName && lastName && email && phoneNumber) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            $.ajax({
                type: "POST",
                url: "/users/profile/updateprofile",
                data: { firstName, lastName, email, address, zipcode, city, state, streetAddress, country, phoneNumber },
                success: function (res) {
                    if (res.error) {
                        var error = document.getElementById('error');
                        error.style.color = 'red'
                        error.innerHTML = res.error

                    } else if (res.success) {
                        window.location.href = '/users/profile';
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
        error.innerHTML = 'firstname, lastname, email, phone number must not be empty.'
    }
}

function updateAdminProfile() {
    document.getElementById('error').value = '';
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var streetAddress = document.getElementById('streetAddress').value;
    var country = document.getElementById('country').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var zipcode = document.getElementById('zipcode').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    if (firstName && lastName && email && phoneNumber) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            $.ajax({
                type: "POST",
                url: "/admin/profile/updateprofile",
                data: { firstName, lastName, email, address, zipcode, city, state, streetAddress, country, phoneNumber },
                success: function (res) {
                    if (res.error) {
                        var error = document.getElementById('error');
                        error.style.color = 'red'
                        error.innerHTML = res.error

                    } else if (res.success) {
                        window.location.href = '/admin/profile';
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
        error.innerHTML = 'firstname, lastname, email, phone number must not be empty.'
    }
}
