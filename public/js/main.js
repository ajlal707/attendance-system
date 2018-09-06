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
                            window.location.href = '/viewAllUsers';
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
        error.innerHTML = 'Password length greater then 5.'
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
// check if image uploader filled

function checkInput() {
    document.getElementById('error').value = '';
    var imageUploader = document.getElementById('uploader').value;
    if (imageUploader) {

    } else {
        var error = document.getElementById('error');
        error.style.color = 'red'
        error.innerHTML = 'Select image first'
    }
}
// delete image 
function deleteImage(imageId) {
    $.ajax({
        type: "POST",
        url: "/addImages/deleteImage",
        data: { imageId },
        success: function (res) {
            if (res.error) {
                var error = document.getElementById('error1');
                error.style.color = 'red'
                error.innerHTML = res.error

            } else if (res.success) {
                window.location.href = '/addImages';
            }
        }
    });

}

//delete video
function deleteVideo(videoId) {
    $.ajax({
        type: "POST",
        url: "/addVideos/deleteVideo",
        data: { videoId },
        success: function (res) {
            if (res.error) {
                var error = document.getElementById('error');
                error.style.color = 'red'
                error.innerHTML = res.error

            } else if (res.success) {
                window.location.href = '/addVideos';
            }
        }
    });

}

// add text method
function saveText() {
    document.getElementById('error').value = '';
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    title = title.trim()
    description = description.trim()
    if (title) {
        if (title.length < 41) {
            if (description) {
                if (description.length < 251) {
                    $.ajax({
                        type: "POST",
                        url: "/addText/addText",
                        data: { title, description },
                        success: function (res) {
                            if (res.error) {
                                var error = document.getElementById('error');
                                error.style.color = 'red'
                                error.innerHTML = res.error

                            } else if (res.success) {
                                window.location.href = '/addText';
                            }
                        }
                    });
                } else {
                    var error = document.getElementById('error');
                    error.style.color = 'red'
                    error.innerHTML = 'Description character length must less then 250.'
                    setTimeout(function () {
                        document.getElementById("error").innerHTML = '';
                    }, 10000);
                }

            } else {
                var error = document.getElementById('error');
                error.style.color = 'red'
                error.innerHTML = 'Description field must not be empty.'
                setTimeout(function () {
                    document.getElementById("error").innerHTML = '';
                }, 10000);
            }
        } else {
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = 'Title character length must less then 40.'
            setTimeout(function () {
                document.getElementById("error").innerHTML = '';
            }, 10000);
        }

    } else {
        var error = document.getElementById('error');
        error.style.color = 'red'
        error.innerHTML = 'Title field must not be empty.'
        setTimeout(function () {
            document.getElementById("error").innerHTML = '';
        }, 10000);
    }
}

// copy text into popup
function copyTextToPopup(title, description) {
    console.log(title, description)
    document.getElementById('popupTitle').innerHTML = title;
    document.getElementById('popupdescription').innerHTML = description

}
// delete text 

function deleteText(textId) {
    $.ajax({
        type: "POST",
        url: "/addText/deleteText",
        data: { textId },
        success: function (res) {
            if (res.error) {
                var error = document.getElementById('error1');
                error.style.color = 'red'
                error.innerHTML = res.error

            } else if (res.success) {
                window.location.href = '/addText';
            }
        }
    });
}
//hide div with help of template
function hideDive(id) {
    var temp = document.getElementById(id);
    var temp1 = document.getElementById('temp-1');
    var temp2 = document.getElementById('temp-2');
    var temp3 = document.getElementById('temp-3');
    var temp4 = document.getElementById('temp-4');

    var image = document.getElementById('imageDiv');
    var video = document.getElementById('videoImg');
    var n = $("input:checkbox:checked").length;

    $("input:checkbox:checked").prop('checked', false);

    if (temp.checked && temp1.checked) {
        video.style.display = 'block';
        image.style.display = 'none';

    } else if (temp.checked && temp2.checked) {
        image.style.display = 'block';
        video.style.display = 'none';
    } else if (temp.checked && temp3.checked) {
        video.style.display = 'none';
        image.style.display = 'none';
    } else if (temp.checked && temp4.checked) {
        video.style.display = 'block';
        image.style.display = 'none';
    }

}
// select one image function
function checkTempplate(id) {
    console.log(id)

    document.getElementById('error').innerHTML = ''
    var selectedElement = document.getElementById(id);
    var temp1 = document.getElementById('temp-1');
    var temp2 = document.getElementById('temp-2');
    var temp3 = document.getElementById('temp-3');
    var temp4 = document.getElementById('temp-4');

    if (temp1.checked === true || temp2.checked === true || temp3.checked === true || temp4.checked === true) {



        if (selectedElement.checked === true) {
            var n = $("input:checkbox:checked").length;
            if (n > 1) {
                var error = document.getElementById('error');
                error.style.color = 'red'
                error.innerHTML = '1 element selected already'
                selectedElement.checked = false;
                setTimeout(function () {
                    document.getElementById("error").innerHTML = '';
                }, 10000);
            } else {

                selectedElement.checked = true;
            }

        } else {
            selectedElement.checked = false;
        }
    } else {
        var error = document.getElementById('error');
        error.style.color = 'red'
        error.innerHTML = ' First of All select Template.'

        selectedElement.checked = false;
        setTimeout(function () {
            document.getElementById("error").innerHTML = '';
        }, 10000);
    }
}




// create ads function
function createAd() {
    document.getElementById('error').innerHTML = ''
    var temp1 = document.getElementById('temp-1');
    var temp2 = document.getElementById('temp-2');
    var temp3 = document.getElementById('temp-3');
    var temp4 = document.getElementById('temp-4');
    var duration = document.getElementById('duration').value;
    var userId = document.getElementById('userId').value;
    var textId = document.getElementById('textId').value;
    var imageId = ''
    var videoId = ''
    var template = ''
    if (temp1.checked === true) {

        var n = $("input:checkbox:checked").length;
        if (n == 1) {
            videoId = $('input:checkbox:checked')[0].id;
            template = 'temp-1'


            $.ajax({
                type: "POST",
                url: "/createAds/createAd",
                data: { videoId, textId, duration, userId, template },
                success: function (res) {
                    if (res.error) {
                        var error = document.getElementById('error');
                        error.style.color = 'red'
                        error.innerHTML = res.error
                        window.scrollTo(0, 700);

                    } else if (res.success) {
                        window.location.href = '/viewAllAds';

                    }
                }
            });
        } else {
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = 'Video not selected.'
            setTimeout(function () {
                document.getElementById("error").innerHTML = '';
            }, 6000);
            window.scrollTo(0, 700);
        }


    } else if (temp2.checked === true) {
        var n = $("input:checkbox:checked").length;
        if (n == 1) {
            imageId = $('input:checkbox:checked')[0].id;

            template = 'temp-2'

            $.ajax({
                type: "POST",
                url: "/createAds/createAd",
                data: { imageId, textId, duration, userId, template },
                success: function (res) {
                    if (res.error) {
                        var error = document.getElementById('error');
                        error.style.color = 'red'
                        error.innerHTML = res.error
                        window.scrollTo(0, 700);
                    } else if (res.success) {
                        window.location.href = '/createAds';
                    }
                }
            });
        } else {
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = 'Image not selected.'
            setTimeout(function () {
                document.getElementById("error").innerHTML = '';
            }, 10000);
            window.scrollTo(0, 700);
        }
    } else if (temp3.checked === true) {

        template = 'temp-3'
        $.ajax({
            type: "POST",
            url: "/createAds/createAd",
            data: { textId, duration, userId, template },
            success: function (res) {
                if (res.error) {
                    var error = document.getElementById('error');
                    error.style.color = 'red'
                    error.innerHTML = res.error
                    window.scrollTo(0, 700);
                } else if (res.success) {
                    window.location.href = '/createAds';
                }
            }
        });

    } else if (temp4.checked === true) {
        var n = $("input:checkbox:checked").length;
        if (n == 1) {
            template = 'temp-4'
            videoId = $('input:checkbox:checked')[0].id;

            $.ajax({
                type: "POST",
                url: "/createAds/createAd",
                data: { videoId, textId, duration, userId, template },
                success: function (res) {
                    if (res.error) {
                        var error = document.getElementById('error');
                        error.style.color = 'red'
                        error.innerHTML = res.error
                        window.scrollTo(0, 700);
                    } else if (res.success) {
                        window.location.href = '/createAds';

                        setTimeout(function () {
                            document.getElementById("error").innerHTML = '';
                        }, 10000);
                        window.scrollTo(0, 700);
                    }
                }
            });
        } else {
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = 'Video not selected.'
            setTimeout(function () {
                document.getElementById("error").innerHTML = '';
            }, 10000);
            window.scrollTo(0, 700);
        }
    } else {
        var error = document.getElementById('error1');
        error.style.color = 'red'
        error.innerHTML = 'Template not selected.'
        setTimeout(function () {
            document.getElementById("error").innerHTML = '';
        }, 10000);
        window.scrollTo(0, 0);
    }
}

// preview ad function
function selectPopup() {
    //texts object geting
    var texts = document.getElementById('textId');
    texts = texts.options[texts.selectedIndex].dataset.set
    texts = texts.split(":")
    var title = texts[0].trim()
    var description = texts[1].trim()
    // geting video object



    var temp1 = document.getElementById('temp-1');
    var temp2 = document.getElementById('temp-2');
    var temp3 = document.getElementById('temp-3');
    var temp4 = document.getElementById('temp-4');

    var btn = document.getElementById('previewBtn');
    if (temp1.checked === true) {

        btn.setAttribute('data-target', '#temp-11');
        document.getElementById('popupTitle1').innerHTML = title
        document.getElementById('popupdescription1').innerHTML = description
        var videofilePath = $('input:checkbox:checked')[0].dataset.set
        document.getElementById('videoSrc').src = videofilePath.replace('public', '');

    }
    if (temp2.checked === true) {
        btn.setAttribute('data-target', '#temp-22');
        document.getElementById('popupTitle2').innerHTML = title
        document.getElementById('popupdescription2').innerHTML = description

        var imageFilePath = $('input:checkbox:checked')[0].dataset.set
        document.getElementById('imageSrc').src = imageFilePath.replace('public', '');
    }
    if (temp3.checked === true) {
        btn.setAttribute('data-target', '#temp-33');
        document.getElementById('popupTitle3').innerHTML = title
        document.getElementById('popupdescription3').innerHTML = description

    }
    if (temp4.checked === true) {
        btn.setAttribute('data-target', '#temp-44');
        document.getElementById('popupTitle4').innerHTML = title
        document.getElementById('popupdescription4').innerHTML = description
        var videofilePath = $('input:checkbox:checked')[0].dataset.set
        document.getElementById('videoSrc2').src = videofilePath.replace('public', '');

    }
}


// copy data view-ad to popup functions
function copyToViewTemplate1(id) {
    var videofilePath = document.getElementById('videoSrc-' + id).dataset.set
    document.getElementById('title11').innerHTML = document.getElementById('title-' + id).innerHTML;
    document.getElementById('des11').innerHTML = document.getElementById('description-' + id).innerHTML;
    document.getElementById('videoSrc1').src = videofilePath
}

function copyToViewTemplate2(id) {
    var imageFilePath = document.getElementById('imageSrc2-' + id).dataset.set
    document.getElementById('title22').innerHTML = document.getElementById('title-' + id).innerHTML;
    document.getElementById('des22').innerHTML = document.getElementById('description-' + id).innerHTML;
    document.getElementById('imageSrc22').src = imageFilePath
}

function copyToViewTemplate3(id) {
    document.getElementById('title33').innerHTML = document.getElementById('title-' + id).innerHTML;
    document.getElementById('des33').innerHTML = document.getElementById('description-' + id).innerHTML;
}

function copyToViewTemplate4(id) {
    var videofilePath = document.getElementById('videoSrc-' + id).dataset.set
    document.getElementById('title44').innerHTML = document.getElementById('title-' + id).innerHTML;
    document.getElementById('des44').innerHTML = document.getElementById('description-' + id).innerHTML;
    document.getElementById('videoSrc44').src = videofilePath
}
// end copy data view-ad to popup functions

function updateAd() {
    document.getElementById('error').innerHTML = ''
    var temp1 = document.getElementById('temp-1');
    var temp2 = document.getElementById('temp-2');
    var temp3 = document.getElementById('temp-3');
    var temp4 = document.getElementById('temp-4');
    var duration = document.getElementById('duration').value;
    var userId = document.getElementById('userId').value;
    var textId = document.getElementById('textId').value;
    var adIdForUpdate = document.getElementById('adIdForUpdate').value;

    var imageId = ''
    var videoId = ''
    var template = ''
    if (temp1.checked === true) {


        var n = $("input:checkbox:checked").length;
        if (n == 1) {
            videoId = $('input:checkbox:checked')[0].id;
            template = 'temp-1'
            $.ajax({
                type: "POST",
                url: "/editAd/update",
                data: { adIdForUpdate, videoId, textId, duration, userId, template },
                success: function (res) {
                    if (res.error) {
                        var error = document.getElementById('error');
                        error.style.color = 'red'
                        error.innerHTML = res.error

                    } else if (res.success) {
                        if (res.calledUrl === '/viewAllAds') {
                            window.location.href = '/viewAllAds';
                        } else {
                            window.location.href = '/dashboard';
                        }
                    }
                }
            });
        } else {
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = 'Video not selected.'
            setTimeout(function () {
                document.getElementById("error").innerHTML = '';
            }, 10000);
            window.scrollTo(0, 700);
        }


    } else if (temp2.checked === true) {


        var n = $("input:checkbox:checked").length;
        if (n == 1) {
            imageId = $('input:checkbox:checked')[0].id;
            template = 'temp-2'

            $.ajax({
                type: "POST",
                url: "/editAd/update",
                data: { adIdForUpdate, imageId, textId, duration, userId, template },
                success: function (res) {
                    if (res.error) {
                        var error = document.getElementById('error');
                        error.style.color = 'red'
                        error.innerHTML = res.error

                    } else if (res.success) {
                        if (res.calledUrl === '/viewAllAds') {
                            window.location.href = '/viewAllAds';
                        } else {
                            window.location.href = '/dashboard';
                        }
                    }
                }
            });
        } else {
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = 'Image not selected.'
            setTimeout(function () {
                document.getElementById("error").innerHTML = '';
            }, 10000);
            window.scrollTo(0, 250);

        }
    } else if (temp3.checked === true) {


        template = 'temp-3'
        $.ajax({
            type: "POST",
            url: "/editAd/update",
            data: { adIdForUpdate, textId, duration, userId, template },
            success: function (res) {
                if (res.error) {
                    var error = document.getElementById('error');
                    error.style.color = 'red'
                    error.innerHTML = res.error

                } else if (res.success) {
                    if (res.calledUrl === '/viewAllAds') {
                        window.location.href = '/viewAllAds';
                    } else {
                        window.location.href = '/dashboard';
                    }
                }
            }
        });

    } else if (temp4.checked === true) {

        var n = $("input:checkbox:checked").length;
        if (n == 1) {
            template = 'temp-4'
            videoId = $('input:checkbox:checked')[0].id;

            $.ajax({
                type: "POST",
                url: "/editAd/update",
                data: { adIdForUpdate, videoId, textId, duration, userId, template },
                success: function (res) {
                    if (res.error) {
                        var error = document.getElementById('error');
                        error.style.color = 'red'
                        error.innerHTML = res.error

                    } else if (res.success) {
                        if (res.calledUrl === '/viewAllAds') {
                            window.location.href = '/viewAllAds';
                        } else {
                            window.location.href = '/dashboard';
                        }

                        setTimeout(function () {
                            document.getElementById("error").innerHTML = '';
                        }, 10000);
                    }
                }
            });
        } else {
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = 'Video not selected.'
            setTimeout(function () {
                document.getElementById("error").innerHTML = '';
            }, 10000);
            window.scrollTo(0, 250);
        }
    } else {
        var error = document.getElementById('error');
        error.style.color = 'red'
        error.innerHTML = 'Template not selected.'
        setTimeout(function () {
            document.getElementById("error").innerHTML = '';
        }, 10000);
        window.scrollTo(0, 0);
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

    let fileObj = document.getElementById("galleryImg").files[0];
    if (fileObj) {
        var formData = new FormData();
        formData.append('galleryImg', fileObj);

        $.ajax({
            type: "POST",
            url: "/addImages/uploadGalleryImg",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.success) {
                    window.location.href = '/addImages';
                } else {
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
        var error = document.getElementById('error');
        error.style.color = 'red'
        error.innerHTML = 'First select image.'
        setTimeout(function () {
            document.getElementById("error").innerHTML = '';
        }, 10000);
    }
}


function saveNewVideo() {

    let fileObj = document.getElementById("video-file").files[0];
    if (fileObj) {
        var formData = new FormData();
        formData.append('file', fileObj);
        $('#loader').addClass('showElement')
        document.getElementById("status").style.display = "block";
        $.ajax({
            type: "POST",
            url: "/addVideos/uploadGalleryVideo",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.success) {
                    window.location.href = '/addVideos';
                } else {
                    document.getElementById("status").style.display = "none";
                    $('#loader').removeClass('showElement')
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
        document.getElementById("status").style.display = "none";
        $('#loader').removeClass('showElement')
        var error = document.getElementById('error1');
        error.style.color = 'red'
        error.innerHTML = 'First select video.'
        setTimeout(function () {
            document.getElementById("error1").innerHTML = '';
        }, 10000);
    }
}