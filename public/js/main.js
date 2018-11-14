$(document).ready(function () {
    $("#2ndTextSelector").hide();
})
function checkboxes() {
    let checkboxCount = $('input:checkbox:checked')
    let checkboxIds = [];

    for (var i = 0; i < checkboxCount.length; i++) {
        if (checkboxCount[i].type === "checkbox" && checkboxCount[i].checked === true) {
            checkboxIds.push(checkboxCount[i].id)
        }
    }
    return checkboxIds;
}
function forPopUpCheckBoxs() {
    let checkboxCount = $('input:checkbox:checked')
    let checkboxSrc = [];

    for (var i = 0; i < checkboxCount.length; i++) {
        if (checkboxCount[i].type === "checkbox" && checkboxCount[i].checked === true) {
            checkboxSrc.push(checkboxCount[i].dataset.set)
        }
    }
    return checkboxSrc;
}
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
                window.scrollTo(0, 300)
                setTimeout(function () {
                    document.getElementById("error1").innerHTML = '';
                }, 8000)
            } else if (res.success) {
                window.location.href = '/addImages';
            }
        }
    })
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
                window.scrollTo(0, 300)
                setTimeout(function () {
                    document.getElementById("error").innerHTML = '';
                }, 8000);

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
                window.scrollTo(0, 300)
                setTimeout(function () {
                    document.getElementById("error1").innerHTML = '';
                }, 8000);
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
    var temp5 = document.getElementById('temp-5');
    var temp6 = document.getElementById('temp-6');
    var temp7 = document.getElementById('temp-7');

    var image = document.getElementById('imageDiv');
    var video = document.getElementById('videoImg');
    var n = $("input:checkbox:checked").length;

    $("input:checkbox:checked").prop('checked', false);
    if (temp.checked && temp1.checked) {
        video.style.display = 'block';
        image.style.display = 'none';
        $("#2ndTextSelector").hide();

    } else if (temp.checked && temp2.checked) {
        image.style.display = 'block';
        video.style.display = 'none';
        $("#2ndTextSelector").hide();

    } else if (temp.checked && temp3.checked) {
        video.style.display = 'none';
        image.style.display = 'none';
        $("#2ndTextSelector").hide();

    } else if (temp.checked && temp4.checked) {
        video.style.display = 'block';
        image.style.display = 'none';
        $("#2ndTextSelector").hide();

    } else if (temp.checked && temp5.checked) {
        image.style.display = 'block';
        video.style.display = 'none';
        $("#2ndTextSelector").hide();

    } else if (temp.checked && temp6.checked) {
        image.style.display = 'block';
        video.style.display = 'none';
        $("#2ndTextSelector").show();
    } else if (temp.checked && temp7.checked) {
        image.style.display = 'block';
        video.style.display = 'none';
        $("#2ndTextSelector").show();
    }
}
// select one image function
function checkTempplate(id) {
    document.getElementById('error').innerHTML = ''
    var selectedElement = document.getElementById(id);
    var temp1 = document.getElementById('temp-1');
    var temp2 = document.getElementById('temp-2');
    var temp3 = document.getElementById('temp-3');
    var temp4 = document.getElementById('temp-4');
    var temp5 = document.getElementById('temp-5');
    var temp6 = document.getElementById('temp-6');
    var temp7 = document.getElementById('temp-7');

    if (temp1.checked === true || temp2.checked === true || temp3.checked === true || temp4.checked === true ||
        temp5.checked === true || temp6.checked === true || temp7.checked === true) {

        if (temp5.checked === true || temp7.checked === true) {
            return true
        } else {
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
    var temp5 = document.getElementById('temp-5');
    var temp6 = document.getElementById('temp-6');
    var temp7 = document.getElementById('temp-7');
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
    } else if (temp5.checked === true) {
        template = 'temp-5'
        let imageIds = checkboxes();
        let textIds = [];
        textIds.push(textId)
        if (imageIds.length > 0) {
            $.ajax({
                type: "POST",
                url: "/createAds/createAdNew",
                data: { imageIds, textIds, duration, userId, template },
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
            error.innerHTML = 'No image selected.'
            window.scrollTo(0, 700);
        }
    } else if (temp6.checked === true) {
        var n = $("input:checkbox:checked").length;
        if (n == 1) {
            template = 'temp-6'
            var textId2 = document.getElementById('textId2').value;
            let imageIds = checkboxes();
            let textIds = [];
            textIds.push(textId)
            textIds.push(textId2)
            $.ajax({
                type: "POST",
                url: "/createAds/createAdNew",
                data: { imageIds, textIds, duration, userId, template },
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
            error.innerHTML = 'Image not selected.'
            setTimeout(function () {
                document.getElementById("error").innerHTML = '';
            }, 10000);
            window.scrollTo(0, 700);
        }
    } else if (temp7.checked === true) {
        template = 'temp-7'
        var textId2 = document.getElementById('textId2').value;
        let imageIds = checkboxes();
        let textIds = [];
        textIds.push(textId)
        textIds.push(textId2)
        if (imageIds.length > 0) {
            $.ajax({
                type: "POST",
                url: "/createAds/createAdNew",
                data: { imageIds, textIds, duration, userId, template },
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
            error.innerHTML = 'No image selected.'
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
    var temp5 = document.getElementById('temp-5');
    var temp6 = document.getElementById('temp-6');
    var temp7 = document.getElementById('temp-7');
    var btn = document.getElementById('previewBtn');
    if (temp1.checked === true) {
        document.getElementById('popupTitle1').innerHTML = title
        document.getElementById('popupdescription1').innerHTML = description
        if ($('input:checkbox:checked').length > 0) {
            var videofilePath = $('input:checkbox:checked')[0].dataset.set
            document.getElementById('videoSrc').src = videofilePath.replace('public', '');
            btn.setAttribute('data-target', '#temp-11');

        } else {
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = 'No Video select.'
            window.scrollTo(0, 700);
            setTimeout(() => {
                document.getElementById('error').innerHTML = '';
            }, 8000);
        }
    }
    if (temp2.checked === true) {

        document.getElementById('popupTitle2').innerHTML = title
        document.getElementById('popupdescription2').innerHTML = description
        if ($('input:checkbox:checked').length > 0) {
            btn.setAttribute('data-target', '#temp-22');
            var imageFilePath = $('input:checkbox:checked')[0].dataset.set

            document.getElementById('imageSrc').src = imageFilePath.replace('public', '');

        } else {
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = 'No image select.'
            window.scrollTo(0, 700);
            setTimeout(() => {
                document.getElementById('error').innerHTML = '';
            }, 8000);
        }
    }
    if (temp3.checked === true) {
        btn.setAttribute('data-target', '#temp-33');
        document.getElementById('popupTitle3').innerHTML = title
        document.getElementById('popupdescription3').innerHTML = description
    }
    if (temp4.checked === true) {
        document.getElementById('videoSrc').src = ''
        document.getElementById('popupTitle1').innerHTML = title
        document.getElementById('popupdescription1').innerHTML = description
        if ($('input:checkbox:checked').length > 0) {
            var videofilePath = $('input:checkbox:checked')[0].dataset.set
            document.getElementById('videoSrc').src = videofilePath.replace('public', '');
            btn.setAttribute('data-target', '#temp-11');
        } else {
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = 'No video select.'
            window.scrollTo(0, 700);
            setTimeout(() => {
                document.getElementById('error').innerHTML = '';
            }, 8000);
        }
    }
    if (temp5.checked === true) {
        document.getElementById('popupTitle5').innerHTML = title
        document.getElementById('popupdescription5').innerHTML = description

        let parentDiv = document.getElementById('at-imagesliders');
        parentDiv.classList.remove('slick-slider')
        parentDiv.classList.remove('slick-initialized')
        parentDiv.innerHTML = ''

        let imagefilePaths = forPopUpCheckBoxs();
        if (imagefilePaths.length) {
            $(".preloader").css("display", "block");
            $(".preloader").delay(6000).fadeOut("slow");
            if (imagefilePaths.length == 1) {
                let a = imagefilePaths[0].replace('public', '');
                let imageFigure = `<figure class="at-sliderimg">
                                     <img src="${a}" alt="image description">
                                   </figure>`
                parentDiv.insertAdjacentHTML('beforeend', imageFigure);
            } else {
                for (let i = 0; i < imagefilePaths.length; i++) {
                    let a = imagefilePaths[i].replace('public', '');
                    let imageFigure = `<figure class="at-sliderimg">
                                         <img src="${a}" alt="image description">
                                       </figure>`
                    parentDiv.insertAdjacentHTML('beforeend', imageFigure);
                }
                $('#at-imagesliders').slick({
                    speed: 3000,
                    arrows: false,
                    autoplay: true,
                    infinite: false,
                    pauseOnHover: false,
                    accessibility: false,
                })
            }
            $('#temp-55').modal('show');
        } else {
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = 'No image select.'
            window.scrollTo(0, 700);
        }
    }
    if (temp6.checked === true) {
        let inputLength = $('input:checkbox:checked')
        if (inputLength.length > 0) {
            var imageFilePath = $('input:checkbox:checked')[0].dataset.set
            $(".preloader").css("display", "block");
            $(".preloader").delay(5000).fadeOut("slow");
            $('#at-textalider').slick({
                speed: 2000,
                arrows: false,
                autoplay: true,
                infinite: false,
                pauseOnHover: false,
                accessibility: false,
            });
            document.getElementById('img666').src = imageFilePath.replace('public', '');

            document.getElementById('popupTitle6').innerHTML = title
            document.getElementById('popupdescription6').innerHTML = description
            //texts object geting
            var text2 = document.getElementById('textId2');
            text2 = text2.options[text2.selectedIndex].dataset.set
            text2 = text2.split(":")
            var title2 = text2[0].trim()
            var description2 = text2[1].trim()
            document.getElementById('popupTitle66').innerHTML = title2
            document.getElementById('popupdescription66').innerHTML = description2

            $('#temp-66').modal('show');
        } else {
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = 'No image select.'
            window.scrollTo(0, 700);
        }
    }
    if (temp7.checked === true) {

        document.getElementById('popupTitle7').innerHTML = title
        document.getElementById('popupdescription7').innerHTML = description

        let parentDiv = document.getElementById('at-imagesliders-two');
        parentDiv.classList.remove('slick-slider')
        parentDiv.classList.remove('slick-initialized')
        parentDiv.innerHTML = ''
        let imagefilePaths = forPopUpCheckBoxs();
        if (imagefilePaths.length) {
            $(".preloader").css("display", "block");
            $(".preloader").delay(6000).fadeOut("slow");
            //texts object geting
            var text2 = document.getElementById('textId2');
            text2 = text2.options[text2.selectedIndex].dataset.set
            text2 = text2.split(":")
            var title2 = text2[0].trim()
            var description2 = text2[1].trim()
            document.getElementById('popupTitle77').innerHTML = title2
            document.getElementById('popupdescription77').innerHTML = description2
            if (imagefilePaths.length == 1) {
                let a = imagefilePaths[0].replace('public', '');
                let imageFigure = `<figure class="at-sliderimg">
                                     <img src="${a}" alt="image description">
                                   </figure>`
                parentDiv.insertAdjacentHTML('beforeend', imageFigure);
            } else {
                for (let i = 0; i < imagefilePaths.length; i++) {
                    let a = imagefilePaths[i].replace('public', '');
                    let imageFigure = `<figure class="at-sliderimg">
                                         <img src="${a}" alt="image description">
                                      </figure>`
                    parentDiv.insertAdjacentHTML('beforeend', imageFigure);
                }
                $('#at-imagesliders-two').slick({
                    speed: 3000,
                    arrows: false,
                    autoplay: true,
                    infinite: false,
                    pauseOnHover: false,
                    accessibility: false,
                });
            }
            $('#at-textsliders-two').slick({
                speed: 2000,
                arrows: false,
                autoplay: true,
                infinite: false,
                pauseOnHover: false,
                accessibility: false,
            })
            $('#temp-77').modal('show');
        } else {
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = 'No image select.'
            window.scrollTo(0, 700);
        }
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
function copyToViewTemplate5(id) {

    $(".preloader").css("display", "block");
    $(".preloader").delay(5000).fadeOut("slow");

    let parentDiv = document.getElementById('at-imagesliders');
    parentDiv.classList.remove('slick-slider')
    parentDiv.classList.remove('slick-initialized')
    parentDiv.innerHTML = ''

    var imageArray = document.getElementById('imageSrc-' + id).dataset.set
    let jsonImageArray = JSON.parse(imageArray)
    document.getElementById('popupTitle5').innerHTML = document.getElementById('title-' + id).innerHTML;
    document.getElementById('popupdescription5').innerHTML = document.getElementById('description-' + id).innerHTML;

    if (jsonImageArray.imageIds.length == 1) {
        let a = jsonImageArray.imageIds[0].filePath.replace('public', '');
        let imageFigure = `<figure class="at-sliderimg">
                            <img src="${a}" alt="image description">
                         </figure>`
        parentDiv.insertAdjacentHTML('beforeend', imageFigure);
    } else {
        for (let i = 0; i < jsonImageArray.imageIds.length; i++) {
            let a = jsonImageArray.imageIds[i].filePath.replace('public', '');
            let imageFigure = `<figure class="at-sliderimg">
                                 <img src="${a}" alt="image description">
                               </figure>`
            parentDiv.insertAdjacentHTML('beforeend', imageFigure);
        }
        $('#at-imagesliders').slick({
            speed: 3000,
            arrows: false,
            autoplay: true,
            infinite: false,
            pauseOnHover: false,
            accessibility: false,
        })
    }
    $('#temp-5').modal('show');
}
function copyToViewTemplate6(id) {
    $('#at-textalider').slick({
        speed: 3000,
        arrows: false,
        autoplay: true,
        infinite: false,
        pauseOnHover: false,
        accessibility: false,
    })
    $(".preloader").css("display", "block");
    $(".preloader").delay(6000).fadeOut("slow");

    var imageArray = document.getElementById('imageSrc-' + id).dataset.set
    let jsonImageArray = JSON.parse(imageArray)
    document.getElementById('img666').src = jsonImageArray.imageIds[0].filePath.replace('public', '');
    document.getElementById('popupTitle6').innerHTML = jsonImageArray.textIds[0].title
    document.getElementById('popupdescription6').innerHTML = jsonImageArray.textIds[0].description
    document.getElementById('popupTitle66').innerHTML = jsonImageArray.textIds[1].title
    document.getElementById('popupdescription66').innerHTML = jsonImageArray.textIds[1].description

    $('#temp-6').modal('show');
}
function copyToViewTemplate7(id) {

    $(".preloader").css("display", "block");
    $(".preloader").delay(6000).fadeOut("slow");

    var imageArray = document.getElementById('imageSrc-' + id).dataset.set
    let jsonImageArray = JSON.parse(imageArray)

    document.getElementById('popupTitle7').innerHTML = jsonImageArray.textIds[0].title
    document.getElementById('popupdescription7').innerHTML = jsonImageArray.textIds[0].description
    document.getElementById('popupTitle77').innerHTML = jsonImageArray.textIds[1].title
    document.getElementById('popupdescription77').innerHTML = jsonImageArray.textIds[1].description

    let parentDiv = document.getElementById('at-imagesliders-two');
    parentDiv.classList.remove('slick-slider')
    parentDiv.classList.remove('slick-initialized')
    parentDiv.innerHTML = ''
    if (jsonImageArray.imageIds.length == 1) {
        let a = jsonImageArray.imageIds[0].filePath.replace('public', '');
        let imageFigure = `<figure class="at-sliderimg">
                               <img src="${a}" alt="image description">
                           </figure>`
        parentDiv.insertAdjacentHTML('beforeend', imageFigure);

    } else {
        for (let i = 0; i < jsonImageArray.imageIds.length; i++) {
            let a = jsonImageArray.imageIds[i].filePath.replace('public', '');
            let imageFigure = `<figure class="at-sliderimg">
                                  <img src="${a}" alt="image description">
                               </figure>`
            parentDiv.insertAdjacentHTML('beforeend', imageFigure);
        }
        $('#at-imagesliders-two').slick({
            speed: 3000,
            arrows: false,
            autoplay: true,
            infinite: true,
            pauseOnHover: false,
            accessibility: false,
        });
    }
    $('#at-textalider-two').slick({
        speed: 2000,
        arrows: false,
        autoplay: true,
        infinite: false,
        pauseOnHover: false,
        accessibility: false,
    })
    $('#temp-7').modal('show');
}
// end copy data view-ad to popup functions
function updateAd() {
    document.getElementById('error').innerHTML = ''
    var temp1 = document.getElementById('temp-1');
    var temp2 = document.getElementById('temp-2');
    var temp3 = document.getElementById('temp-3');
    var temp4 = document.getElementById('temp-4');
    var temp5 = document.getElementById('temp-5');
    var temp6 = document.getElementById('temp-6');
    var temp7 = document.getElementById('temp-7');
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
    } else if (temp5.checked === true) {

        template = 'temp-5'
        let imageIds = checkboxes();
        let textIds = [];
        textIds.push(textId)
        $.ajax({
            type: "POST",
            url: "/editAd/updateNewWay",
            data: { adIdForUpdate, imageIds, textIds, duration, userId, template },
            success: function (res) {
                if (res.error) {
                    var error = document.getElementById('error');
                    error.style.color = 'red'
                    error.innerHTML = res.error
                    window.scrollTo(0, 700);
                } else if (res.success) {
                    window.location.href = '/viewAllAds';

                    setTimeout(function () {
                        document.getElementById("error").innerHTML = '';
                    }, 10000);
                    window.scrollTo(0, 700);
                }
            }
        });
    } else if (temp6.checked === true) {
        var n = $("input:checkbox:checked").length;
        if (n == 1) {
            template = 'temp-6'
            var textId2 = document.getElementById('textId2').value;
            let imageIds = checkboxes();
            let textIds = [];
            textIds.push(textId)
            textIds.push(textId2)
            $.ajax({
                type: "POST",
                url: "/editAd/updateNewWay",
                data: { adIdForUpdate, imageIds, textIds, duration, userId, template },
                success: function (res) {
                    if (res.error) {
                        var error = document.getElementById('error');
                        error.style.color = 'red'
                        error.innerHTML = res.error
                        window.scrollTo(0, 700);
                    } else if (res.success) {
                        window.location.href = '/viewAllAds';

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
            error.innerHTML = 'Image not selected.'
            setTimeout(function () {
                document.getElementById("error").innerHTML = '';
            }, 10000);
            window.scrollTo(0, 700);
        }
    } else if (temp7.checked === true) {
        template = 'temp-7'
        var textId2 = document.getElementById('textId2').value;
        let imageIds = checkboxes();
        let textIds = [];
        textIds.push(textId)
        textIds.push(textId2)
        if (imageIds.length == 1 || imageIds.length > 1) {
            $.ajax({
                type: "POST",
                url: "/editAd/updateNewWay",
                data: { adIdForUpdate, imageIds, textIds, duration, userId, template },
                success: function (res) {
                    if (res.error) {
                        var error = document.getElementById('error');
                        error.style.color = 'red'
                        error.innerHTML = res.error
                        window.scrollTo(0, 700);
                    } else if (res.success) {
                        window.location.href = '/viewAllAds';

                        setTimeout(function () {
                            document.getElementById("error").innerHTML = '';
                        }, 10000);
                        window.scrollTo(0, 300);
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

function pauseVideo(no) {
    if (no == '1') {
        let videoSrc = document.getElementById('videoSrc');
        videoSrc.src = ''
    } else {
        let videoSrc2 = document.getElementById('videoSrc2');
        videoSrc2.src = ''
    }
}
function pauseVideo1(no) {
    if (no == '1') {
        let videoSrc = document.getElementById('videoSrc1');
        videoSrc.src = ''
    } else {
        let videoSrc2 = document.getElementById('videoSrc44');
        videoSrc2.src = ''
    }
}
