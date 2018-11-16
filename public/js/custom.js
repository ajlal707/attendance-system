

$(function () {
    "use strict";
    $(function () {
        $(".preloader").fadeOut();

    });
    jQuery(document).on('click', '.mega-dropdown', function (e) {
        e.stopPropagation()
    });
    // ============================================================== 
    // Auto select left navbar
    // ============================================================== 
    $(function () {
        var url = window.location;
        var element = $('ul#sidebarnav a').filter(function () {
            return this.href == url;
        }).addClass('active').parent().addClass('active');
        while (true) {
            if (element.is('li')) {
                element = element.parent().addClass('in').parent().addClass('active');
            }
            else {
                break;
            }
        }

    });
    // ============================================================== 
    //tooltip
    // ============================================================== 
    // $(function () {
    //     $('[data-toggle="tooltip"]').tooltip()
    // })
    // ============================================================== 
    //Popover
    // ============================================================== 
    // $(function () {
    //     $('[data-toggle="popover"]').popover()
    // })
    // ============================================================== 
    // Sidebarmenu
    // ============================================================== 
    // $(function () {
    //     $('#sidebarnav').metisMenu();
    // });

    // ============================================================== 
    // Slimscrollbars
    // ==============================================================
    $(function () { 
    $('.scroll-sidebar').slimScroll({
        position: 'left'
        , size: "5px"
        , height: '100%'
        , color: '#dcdcdc'
    });
    });
    // $('.message-center').slimScroll({
    //     position: 'right'
    //     , size: "5px"

    //     , color: '#dcdcdc'
    // });


    // $('.aboutscroll').slimScroll({
    //     position: 'right'
    //     , size: "5px"
    //     , height: '80'
    //     , color: '#dcdcdc'
    // });
    // $('.message-scroll').slimScroll({
    //     position: 'right'
    //     , size: "5px"
    //     , height: '570'
    //     , color: '#dcdcdc'
    // });
    // $('.chat-box').slimScroll({
    //     position: 'right'
    //     , size: "5px"
    //     , height: '470'
    //     , color: '#dcdcdc'
    // });

    // $('.slimscrollright').slimScroll({
    //     height: '100%'
    //     , position: 'right'
    //     , size: "5px"
    //     , color: '#dcdcdc'
    // });

    // ============================================================== 
    // Resize all elements
    // ============================================================== 
    $("body").trigger("resize");
    // ============================================================== 
    // To do list
    // ============================================================== 
    $(".list-task li label").click(function () {
        $(this).toggleClass("task-done");
    });

    // ============================================================== 
    // Login and Recover Password 
    // ============================================================== 
    $('#to-recover').on("click", function () {
        $("#loginform").slideUp();
        $("#recoverform").fadeIn();
    });

    // ============================================================== 
    // Collapsable cards
    // ==============================================================
    $('a[data-action="collapse"]').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.card').find('[data-action="collapse"] i').toggleClass('ti-minus ti-plus');
        $(this).closest('.card').children('.card-body').collapse('toggle');

    });
    // Toggle fullscreen
    $('a[data-action="expand"]').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.card').find('[data-action="expand"] i').toggleClass('mdi-arrow-expand mdi-arrow-compress');
        $(this).closest('.card').toggleClass('card-fullscreen');
    });

    // Close Card
    $('a[data-action="close"]').on('click', function () {
        $(this).closest('.card').removeClass().slideUp('fast');
    });
    // for selctor 
    jQuery('.at-select option').each(function () {
        var text = jQuery(this).text();
        if (text.length > 50) {
            text = text.trim()
            text = text.substring(0, 45) + '...';
            jQuery(this).text(text);
        }
    });
    jQuery('.at-select2 option').each(function () {
        var text = jQuery(this).text();
        if (text.length > 50) {
            text = text.replace(/\s\s+/g, ' ');
            text = text.trim()
            text = text.substring(0, 45) + '...';
            jQuery(this).text(text);
        }
    });

    $.ajax({
        type: "GET",
        url: "/userLcd/getResult",
        data: {},
        success: function (res) {
            if (res.userAds) {
                let userAds = res.userAds
                let arr = [];
                let templateArr = [];
                let imageLength = [];
                let textLength = [];
                for (var i = 0; i < userAds.length; i++) {

                    if (userAds[i].videosId) {
                        arr.push(userAds[i].duration)
                        let src = userAds[i].videosId.filePath.replace("public/", "")
                        let title = userAds[i].textsId.title
                        let description = userAds[i].textsId.description
                        let slider = document.getElementById('at-usersliders')
                        let model1 = userLcdHtml(src, title, description)
                        imageLength.push(userAds[i].imageIds.length)
                        textLength.push(userAds[i].textIds.length)
                        slider.insertAdjacentHTML('beforeend', model1);

                    } else if (userAds[i].imageId) {
                        arr.push(userAds[i].duration)
                        let src = userAds[i].imageId.filePath.replace("public/", "")
                        let title = userAds[i].textsId.title
                        let description = userAds[i].textsId.description
                        let slider = document.getElementById('at-usersliders')
                        let model1 = userLcdHtml2(src, title, description)

                        imageLength.push(userAds[i].imageIds.length)
                        textLength.push(userAds[i].textIds.length)

                        slider.insertAdjacentHTML('beforeend', model1);

                    } else if (userAds[i].textsId) {
                        arr.push(userAds[i].duration)
                        let title = userAds[i].textsId.title
                        let description = userAds[i].textsId.description
                        let slider = document.getElementById('at-usersliders')
                        let model1 = userLcdHtml3(title, description)
                        imageLength.push(userAds[i].imageIds.length)
                        textLength.push(userAds[i].textIds.length)

                        slider.insertAdjacentHTML('beforeend', model1);
                    } else if (userAds[i].imageIds && userAds[i].templateId === 'temp-5') {
                        arr.push(userAds[i].duration)
                        templateArr.push(userAds[i].templateId)
                        imageLength.push(userAds[i].imageIds.length)
                        textLength.push(userAds[i].textIds.length)

                        let title = userAds[i].textIds[0].title
                        let description = userAds[i].textIds[0].description
                        let slider = document.getElementById('at-usersliders')
                        let imageIds = userAds[i].imageIds
                        let model1 = userLcdHtml4(title, description, imageIds)
                        slider.insertAdjacentHTML('beforeend', model1);
                    } else if (userAds[i].imageIds && userAds[i].templateId === 'temp-6') {
                        arr.push(userAds[i].duration)
                        templateArr.push(userAds[i].templateId)
                        imageLength.push(userAds[i].textIds.length)
                        textLength.push(userAds[i].textIds.length)

                        let title = userAds[i].textIds[0].title
                        let description = userAds[i].textIds[0].description
                        let title1 = userAds[i].textIds[1].title
                        let description1 = userAds[i].textIds[1].description
                        let slider = document.getElementById('at-usersliders')
                        let imageIds = userAds[i].imageIds
                        let model1 = userLcdHtml5(title, description, title1, description1, imageIds)
                        slider.insertAdjacentHTML('beforeend', model1);
                    } else if (userAds[i].imageIds && userAds[i].templateId === 'temp-7') {
                        arr.push(userAds[i].duration)
                        templateArr.push(userAds[i].templateId)
                        imageLength.push(userAds[i].imageIds.length)
                        textLength.push(userAds[i].textIds.length)

                        let title = userAds[i].textIds[0].title
                        let description = userAds[i].textIds[0].description
                        let title1 = userAds[i].textIds[1].title
                        let description1 = userAds[i].textIds[1].description
                        let slider = document.getElementById('at-usersliders')
                        let imageIds = userAds[i].imageIds
                        let model1 = userLcdHtml6(title, description, title1, description1, imageIds)
                        slider.insertAdjacentHTML('beforeend', model1);
                    }
                }
                $('.at-imagesliders').slick({
                    speed: 3000,
                    arrows: false,
                    autoplay: true,
                    infinite: false,
                    pauseOnHover: false,
                    accessibility: false,
                })
                $('.at-textboxholder').slick({
                    speed: 2000,
                    arrows: false,
                    autoplay: true,
                    infinite: false,
                    pauseOnHover: false,
                    accessibility: false,
                })
                $('.at-imgvideoholder .video-box').slick({
                    speed: 3000,
                    arrows: false,
                    autoplay: true,
                    infinite: false,
                    pauseOnHover: false,
                    accessibility: false,
                })
                $('.at-textalider').slick({
                    speed: 2000,
                    arrows: false,
                    autoplay: true,
                    infinite: false,
                    pauseOnHover: false,
                    accessibility: false,
                })
                $('#at-usersliders').slick({
                    rows: 1,
                    slidesPerRow: 1,
                    slidesToScroll: 1,
                    pauseOnHover: false,
                    autoplay: true,
                    speed: 3000,
                    arrows: false
                })
                $('#at-usersliders').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                    if (templateArr[slick.currentSlide] === 'temp-5') {
                        $('.at-imagesliders').slick({
                            speed: 3000,
                            arrows: false,
                            autoplay: true,
                            infinite: false,
                            pauseOnHover: false,
                            accessibility: false,
                        })
                    }
                    if (templateArr[slick.currentSlide] === 'temp-6') {
                        $('.at-textboxholder').slick({
                            speed: 2000,
                            arrows: false,
                            autoplay: true,
                            infinite: false,
                            pauseOnHover: false,
                            accessibility: false,
                        })
                    }
                    if (templateArr[slick.currentSlide] === 'temp-7') {
                        $('.at-imgvideoholder .video-box').slick({
                            speed: 3000,
                            arrows: false,
                            autoplay: true,
                            infinite: false,
                            pauseOnHover: false,
                            accessibility: false,
                        })
                        $('.at-textalider').slick({
                            speed: 2000,
                            arrows: false,
                            autoplay: true,
                            infinite: false,
                            pauseOnHover: false,
                            accessibility: false,
                        })
                    }
                });
                $('#at-usersliders').on("afterChange", function (event, slick, currentSlide, nextSlide) {
                    
                    if ($(slick.$slides[slick.currentSlide]).find('iframe').get(0)) {
                        let src = $(slick.$slides[slick.currentSlide]).find('iframe').get(0).src;
                        $(slick.$slides[slick.currentSlide]).find('iframe')[0].src = '';
                        $(slick.$slides[slick.currentSlide]).find('iframe')[0].src = src;
                    }
                    // if (templateArr[slick.currentSlide] === 'temp-5') {

                    //     $('.at-imagesliders').slick({
                    //         speed: 3000,
                    //         arrows: false,
                    //         autoplay: true,
                    //         infinite: false,
                    //         pauseOnHover: false,
                    //         accessibility: false,
                    //     })
                    // }
                    // if (templateArr[slick.currentSlide] === 'temp-6') {
                    //     $('.at-textboxholder').slick({
                    //         speed: 2000,
                    //         arrows: false,
                    //         autoplay: true,
                    //         infinite: false,
                    //         pauseOnHover: false,
                    //         accessibility: false,
                    //     })
                    // }
                    // if (templateArr[slick.currentSlide] === 'temp-7') {
                    //     $('.at-imgvideoholder .video-box').slick({
                    //         speed: 3000,
                    //         arrows: false,
                    //         autoplay: true,
                    //         infinite: false,
                    //         pauseOnHover: false,
                    //         accessibility: false,
                    //     })
                    //     $('.at-textalider').slick({
                    //         speed: 2000,
                    //         arrows: false,
                    //         autoplay: true,
                    //         infinite: false,
                    //         pauseOnHover: false,
                    //         accessibility: false,
                    //     })
                    // }

                    let delay = ((arr[slick.currentSlide])
                        * ((imageLength[slick.currentSlide]) ? ((imageLength[slick.currentSlide])) : 1)
                        * 1000);
                    $('#at-usersliders').slick("setOption", "autoplaySpeed", delay)
                });
            }
        }
    });
});
function userLcdHtml(videoSrc, title, description) {
    return `<div class="at-usersliderholder">
                <div class="at-slidercontent at-addbgone">
                    <button class="nxtbtn">
                        <i class="ti-arrow-right"></i>
                    </button>
                    <div class="at-textboxholder">
                        <div class="text-box">
                            <h3 id="textTitleId">${title}</h3>
                            <p id="textDescriptionId">${description}</p>
                        </div>
                    </div>
                    <div class="at-imgvideoholder">
                        <div class="video-box">
                            <figure>
                                <iframe id="videoSrcId" src="${videoSrc}" loop="true" allow="autoplay" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>`
}
function userLcdHtml2(src, title, description) {
    return `<div class="at-usersliderholder">
                <div class="at-slidercontent at-addbgtwo">
                    <button class="nxtbtn at-left">
                        <i class="ti-arrow-right"></i>
                    </button>
                    <div class="at-imgvideoholder">
                        <div class="video-box">
                            <figure>
                              <img id="imageSrcId1"  src="${src}" alt="image description">
                            </figure>
                        </div>
                    </div>
                    <div class="at-textboxholder">
                        <div class="text-box">
                            <h3 id="textTitleId">${title}</h3>
                            <p id="textDescriptionId">${description}</p>
                        </div>
                    </div>
                </div>
            </div>`
}
function userLcdHtml3(title, description) {
    return `<div class="at-usersliderholder at-textuser">
                <div class="at-slidercontent at-addbgfour">
                    <div class="at-textboxholder">
                        <div class="text-box">
                            <h3 id="textTitleId2">${title}</h3>
                            <div class="description">
                                <p id="textDescriptionId2">${description}.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
}
function userLcdHtml4(title, description, imageIds) {
    return `<div class="at-usersliderholder">
                <div class="at-slidercontent at-addbgsix">
                    <button class="nxtbtn">
                        <i class="ti-arrow-right"></i>
                    </button>
                    <div class="at-textboxholder">
                        <div class="text-box">
                            <h3 id="textTitleId">${title}</h3>
                            <p id="textDescriptionId">${description}</p>
                        </div>
                    </div>
                    <div class="at-imgvideoholder">
                        <div class="video-box">
                            <div id="at-imagesliders" class="at-imagesliders at-imagessliders">
                                ${imageIds.map(imgId => `<figure class="at-sliderimg" style="background: url('${imgId.filePath.replace("public", "")}'); background-size:cover; background-position:center center;"></figure>`)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
}
function userLcdHtml5(title, description, title1, description1, imageIds) {

    return `<div class="at-usersliderholder">
                <div class="at-slidercontent at-addbgseven">
                    <button class="nxtbtn">
                        <i class="ti-arrow-right"></i>
                    </button>
                    <div class="at-textboxholder">
                        <div class="text-box">
                            <h3 id="popupTitle6">${title}</h3>
                            <p id="popupdescription6">${description}</p>
                        </div>
                        <div class="text-box">
                            <h3 id="popupTitle6">${title1}</h3>
                            <p id="popupdescription6">${description1}</p>
                        </div>
                    </div>
                    <div class="at-imgvideoholder">
                        <div class="video-box">
                          ${imageIds.map(imgId => `<figure class="at-sliderimg" style="background: url('${imgId.filePath.replace("public", "")}'); background-size:cover; background-position:center center;"></figure>`)}

                        </div>
                    </div>
                </div>
            </div>`
}
function userLcdHtml6(title, description, title1, description1, imageIds) {

    return `<div class="at-usersliderholder">
                <div class="at-slidercontent at-addbgthree">
                    <button class="nxtbtn">
                        <i class="ti-arrow-right"></i>
                    </button>
                    <div class="at-textboxholder">
                        <div class="text-box">
                            <h3 id="popupTitle6">${title}</h3>
                            <p id="popupdescription6">${description}</p>
                        </div>
                        <div class="text-box">
                            <h3 id="popupTitle6">${title1}</h3>
                            <p id="popupdescription6">${description1}</p>
                        </div>
                    </div>
                      <div class="at-imgvideoholder">
                        <div class="video-box">
                        ${imageIds.map(imgId => `<figure class="at-sliderimg" style="background: url('${imgId.filePath.replace("public", "")}'); background-size:cover; background-position:center center;"></figure>`)}

                        </div>
                    </div>
                </div>
            </div>`
}