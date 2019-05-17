$(document).ready(function () {
    $("#2ndTextSelector").hide();
    //  document.getElementsByClassName("file-drop-zone-title")[0].innerHTML = "Click here to select images ...";

})
// function checkboxes() {
//     let checkboxCount = $('input:checkbox:checked')
//     let checkboxIds = [];

//     for (var i = 0; i < checkboxCount.length; i++) {
//         if (checkboxCount[i].type === "checkbox" && checkboxCount[i].checked === true) {
//             checkboxIds.push(checkboxCount[i].id)
//         }
//     }
//     return checkboxIds;
// }
// function forPopUpCheckBoxs() {
//     let checkboxCount = $('input:checkbox:checked')
//     let checkboxSrc = [];

//     for (var i = 0; i < checkboxCount.length; i++) {
//         if (checkboxCount[i].type === "checkbox" && checkboxCount[i].checked === true) {
//             checkboxSrc.push(checkboxCount[i].dataset.set)
//         }
//     }
//     return checkboxSrc;
// }
function userLogin() {
    document.getElementById('error').value = '';
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email) {
        if (password) {
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
                            if (res.success.role === 'admin') {
                                window.location.href = '/dashboard';
                            } else {
                                window.location.href = '/userDashboard';
                            }
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
            error.innerHTML = 'Password must not be empty.'
        }
    } else {
        var error = document.getElementById('error');
        error.style.color = 'red'
        error.innerHTML = 'Email must not be empty.'
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
        let resetBtn = document.getElementById('resetButton')
        resetBtn.disabled = false;
    } else {
        let resetBtn = document.getElementById('resetButton')
        resetBtn.disabled = true;
        var error = document.getElementById('error');
        error.style.color = 'red'
        error.innerHTML = 'Password not match.'
    }
}
function addUser() {
    document.getElementById('error').value = '';
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var employeeId = document.getElementById('employeeId').value;
    var employeeLeaves = document.getElementById('employeeLeaves').value;
    var password = document.getElementById('password').value;
    if (password.length > 5) {

        if (email && password && username && employeeId && employeeLeaves) {

            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                employeeLeaves = employeeLeaves * 1;

                if (Number.isInteger(employeeLeaves)) {
                    $.ajax({
                        type: "POST",
                        url: "/addUser/addNewUser",
                        data: { username, email, password, employeeId, employeeLeaves },
                        success: function (res) {
                            if (res.error) {
                                var error = document.getElementById('error');
                                error.style.color = 'red'
                                error.innerHTML = res.error
                                setTimeout(() => {
                                    error.innerHTML = ''
                                }, 4000);

                            } else if (res.success) {
                                window.location.href = '/viewAllUsers';
                            }
                        }
                    });
                } else {
                    var error = document.getElementById('error');
                    error.style.color = 'red'
                    error.innerHTML = 'Give employee Leaves in numbers.'
                    setTimeout(() => {
                        error.innerHTML = ''
                    }, 4000);
                }
            } else {
                var error = document.getElementById('error');
                error.style.color = 'red'
                error.innerHTML = 'Email format invalid.'
                setTimeout(() => {
                    error.innerHTML = ''
                }, 4000);
            }
        } else {
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = 'Fix the missing fields.'
            setTimeout(() => {
                error.innerHTML = ''
            }, 4000);

        }
    } else {
        var error = document.getElementById('error');
        error.style.color = 'red'
        error.innerHTML = 'Password length greater then 5.'
        setTimeout(() => {
            error.innerHTML = ''
        }, 4000);

    }
}
//end signup user
// RESET PASSWORD FUNCTION
function resetPassword() {
    document.getElementById('error').value = '';
    var pass1 = document.getElementById('pass1').value;
    var pass2 = document.getElementById('pass2').value;
    if (pass1 && pass2) {
        if (pass1 === pass2) {

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
            error.innerHTML = 'Password not match.'
        }
    } else {
        var error = document.getElementById('error');
        error.style.color = 'red'
        error.innerHTML = 'All fields must not be empty.'
    }
}
// update profile
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
function changeUserProfilePic() {

    let fileObj = document.getElementById("image-file").files[0];
    if (fileObj) {
        var formData = new FormData();
        formData.append('file', fileObj);

        $.ajax({
            type: "POST",
            url: "/profile/uploadImage",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.success) {
                    window.location.href = '/profile';
                } else {
                    var error = document.getElementById('error1');
                    error.style.color = 'red'
                    error.innerHTML = response.error
                    setTimeout(function () {
                        document.getElementById("error").innerHTML = '';
                    }, 10000);
                }
            }
        });
    } else {
        var error = document.getElementById('error1');
        error.style.color = 'red'
        error.innerHTML = 'First select an image.'
        setTimeout(function () {
            document.getElementById("error").innerHTML = '';
        }, 10000);
    }
}

function uploadNewImage() {
    document.getElementById("saveImage").disabled = true;

    let fileObj = document.getElementById("galleryImg").files;
    if (fileObj) {
        var formData = new FormData();
        for (let i = 0; i < fileObj.length; i++) {
            formData.append('galleryImg', fileObj[i]);
        }
        $.ajax({
            type: "POST",
            url: "/addImages/uploadGalleryImg",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.success) {
                    document.getElementById("saveImage").disabled = false;
                    $("#saveImage").removeAttr("disabled");
                    window.location.href = '/addImages';
                } else {
                    document.getElementById("saveImage").disabled = false;
                    var error = document.getElementById('error');
                    error.style.color = 'red'
                    error.innerHTML = response.error
                    setTimeout(function () {
                        document.getElementById("error").innerHTML = '';
                    }, 10000);
                }
            }
        });
    } else {
        document.getElementById("saveImage").disabled = false;
        var error = document.getElementById('error');
        error.style.color = 'red'
        error.innerHTML = 'First select image.'
        setTimeout(function () {
            document.getElementById("error").innerHTML = '';
        }, 10000);
    }
}

// user functions
function selectPopup() {
    var btn = document.getElementById('previewBtn');
    btn.setAttribute('data-target', '#temp-11');
}
function applyLeave() {
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    var reason = document.getElementById('reason').value;
    debugger
    if (startDate && endDate && reason) {
        $.ajax({
            type: "POST",
            url: "/userDashboard/applyUserLeave",
            data: { startDate, endDate, reason },
            success: function (response) {
                if (response.success) {
                    window.location.href = '/userDashboard';
                } else {
                    var error = document.getElementById('error');
                    error.style.color = 'red'
                    error.innerHTML = response.error
                    setTimeout(function () {
                        document.getElementById("error").innerHTML = '';
                    }, 5000);
                }
            }
        });
    } else {
        var error = document.getElementById('error');
        error.style.color = 'red'
        error.innerHTML = 'All fields (start-date, end-date, reason) mendatory.'
        setTimeout(function () {
            document.getElementById("error").innerHTML = '';
        }, 5000);
    }
}