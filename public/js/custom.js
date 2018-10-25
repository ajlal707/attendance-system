/*
Template Name: Admin Press Admin
Author: Themedesigner
Email: niravjoshi87@gmail.com
File: js
*/
$(function () {
    "use strict";
    $(function () {
        $(".preloader").fadeOut();
    });
    jQuery(document).on('click', '.mega-dropdown', function (e) {
        e.stopPropagation()
    });
    // ============================================================== 
    // This is for the top header part and sidebar part
    // ==============================================================  
    // var set = function () {
    //   var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
    //   var topOffset = 70;
    //   if (width < 1170) {
    //     $("body").addClass("mini-sidebar");
    //     $('.navbar-brand span').hide();
    //     $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
    //     $(".sidebartoggler i").addClass("ti-menu");
    //   }
    //   else {
    //     $("body").removeClass("mini-sidebar");
    //     $('.navbar-brand span').show();
    //     //$(".sidebartoggler i").removeClass("ti-menu");
    //}

    //   var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
    //   height = height - topOffset;
    //   if (height < 1) height = 1;
    //   if (height > topOffset) {
    //     $(".page-wrapper").css("min-height", (height) + "px");
    //   }

    // };
    // $(window).ready(set);
    // $(window).on("resize", set);
    // ============================================================== 
    // Theme options
    // ==============================================================     
    // $(".sidebartoggler").on('click', function () {
    //   if ($("body").hasClass("mini-sidebar")) {
    //     $("body").trigger("resize");
    //     $(".scroll-sidebar, .slimScrollDiv").css("overflow", "hidden").parent().css("overflow", "visible");
    //     $("body").removeClass("mini-sidebar");
    //     $('.navbar-brand span').show();
    //$(".sidebartoggler i").addClass("ti-menu");
    // }
    // else {
    //   $("body").trigger("resize");
    //   $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
    //   $("body").addClass("mini-sidebar");
    //   $('.navbar-brand span').hide();
    //$(".sidebartoggler i").removeClass("ti-menu");
    //   }
    // });
    // topbar stickey on scroll

    // $(".fix-header .topbar").stick_in_parent({});


    // this is for close icon when navigation open in mobile view
    // $(".nav-toggler").click(function () {
    //   $("body").toggleClass("show-sidebar");
    //   $(".nav-toggler i").toggleClass("mdi mdi-menu");
    //   $(".nav-toggler i").addClass("mdi mdi-close");
    // });

    // $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
    //   $(".app-search").toggle(200);
    // });
    // ============================================================== 
    // Right sidebar options
    // ============================================================== 
    $(".right-side-toggle").click(function () {
        $(".right-sidebar").slideDown(50);
        $(".right-sidebar").toggleClass("shw-rside");
    });

    $('.floating-labels .form-control').on('focus blur', function (e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

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
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    // ============================================================== 
    //Popover
    // ============================================================== 
    $(function () {
        $('[data-toggle="popover"]').popover()
    })
    // ============================================================== 
    // Sidebarmenu
    // ============================================================== 
    $(function () {
        $('#sidebarnav').metisMenu();
    });

    // ============================================================== 
    // Slimscrollbars
    // ============================================================== 
    $('.scroll-sidebar').slimScroll({
        position: 'left'
        , size: "5px"
        , height: '100%'
        , color: '#dcdcdc'
    });
    $('.message-center').slimScroll({
        position: 'right'
        , size: "5px"

        , color: '#dcdcdc'
    });


    $('.aboutscroll').slimScroll({
        position: 'right'
        , size: "5px"
        , height: '80'
        , color: '#dcdcdc'
    });
    $('.message-scroll').slimScroll({
        position: 'right'
        , size: "5px"
        , height: '570'
        , color: '#dcdcdc'
    });
    $('.chat-box').slimScroll({
        position: 'right'
        , size: "5px"
        , height: '470'
        , color: '#dcdcdc'
    });

    $('.slimscrollright').slimScroll({
        height: '100%'
        , position: 'right'
        , size: "5px"
        , color: '#dcdcdc'
    });

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
            text = text.substring(0, 49) + '...';
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
                for (var i = 0; i < userAds.length; i++) {



                    if (userAds[i].videosId) {
                        arr.push(userAds[i].duration)
                        let src = userAds[i].videosId.filePath.replace("public/", "")
                        let title = userAds[i].textsId.title
                        let description = userAds[i].textsId.description
                        let slider = document.getElementById('slider')
                        let model1 = userLcdHtml(src, title, description)
                        slider.insertAdjacentHTML('beforeend', model1);

                    } else if (userAds[i].imageId) {
                        arr.push(userAds[i].duration)
                        let src = userAds[i].imageId.filePath.replace("public/", "")
                        let title = userAds[i].textsId.title
                        let description = userAds[i].textsId.description
                        let slider = document.getElementById('slider')
                        let model1 = userLcdHtml2(src, title, description)
                        slider.insertAdjacentHTML('beforeend', model1);

                    } else if (userAds[i].textsId) {
                        arr.push(userAds[i].duration)
                        let title = userAds[i].textsId.title
                        let description = userAds[i].textsId.description
                        let slider = document.getElementById('slider')
                        let model1 = userLcdHtml3(title, description)
                        slider.insertAdjacentHTML('beforeend', model1);
                    }
                }
                $('.ss-slider').slick({
                    rows: 1,
                    slidesPerRow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    speed: 4000,
                    arrows: false,
                })

                // var video = $('.ss-slider .slick-active').find('iframe').get(0).play();

                $('.ss-slider').on("afterChange", function (event, slick, currentSlide, nextSlide) {
                    // $('.ss-slider .slick-slide').find('video').get(slick.currentSlide - 1).pause();
                    if ($(slick.$slides[slick.currentSlide]).find('iframe').get(0)) {
                        let src = $(slick.$slides[slick.currentSlide]).find('iframe').get(0).src;
                       
                        $(slick.$slides[slick.currentSlide]).find('iframe')[0].src=  '';
                        $(slick.$slides[slick.currentSlide]).find('iframe')[0].src=  src;
                        // $(slick.$slides[slick.currentSlide]).find('iframe').get(0).attr('src', src);
                    }

                    $('.ss-slider').slick("setOption", "autoplaySpeed", (arr[slick.currentSlide] * 1000));
                });
            }
        }
    });
});
function userLcdHtml(videoSrc, title, description) {

    return `<div id="model1" class="modalone ss-slidermodal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <div class="modal-contentarea">
                    <button class="nxtbtn">
                        <i class="ti-arrow-right"></i>
                    </button>
                    <div class="row paddingzero">
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-5">
                            <div class="row">
                                <div class="modalcontent-box">
                                    <div class="titel">
                                    </div>
                                    <div class="text-box">
                                        <h3 id="textTitleId">${title}</h3>
                                        <p id="textDescriptionId">${description}</p>
                                    </div>.slide-content {
                                        width: 50% !important;
                                    }
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-7">
                            <div class="row">
                                <div class="video-box">
                                    <figure>
                                        <iframe id="videoSrcId" src="${videoSrc}" loop="true" allow="autoplay" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>.slide-content {
                    width: 50% !important;
                }
            </div>
        </div>
        
    </div>
</div>`

}
function userLcdHtml2(src, title, description) {
    return ` <div class="modaltwo ss-slidermodal">
  <div class="modal-dialog">
      <div class="modal-content">.slide-content {
        width: 50% !important;
    }
          <div class="modal-body">
              <div class="modal-contentarea">
                  <div class="row paddingzero">
                      <div class="col-xs-12 col-sm-12 col-md-6">
                          <div class="row">
                              <div class="img-box">
                                  <figure>
                                      <img id="imageSrcId1"  src="${src}" alt="image description">
                                  </figure>
                              </div>
                          </div>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-6">
                          <div class="row">
                              <div class="modalcontent-box">
                                  <div class="modalcontent-boxholder">
                                      <div class="text-box">
                                          <h2 id="textTitleId1">${title}</h2>
                                          <p id="textDescriptionId1">${description}.</p>
                                          <figure class="modal-logo">
                                              <img src="img/carsonline-logo.png" alt="image description">
                                          </figure>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>`
}
function userLcdHtml3(title, description) {
    return `<div class="modalthree ss-slidermodal">
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-body">
                          <div class="modal-contentarea">
                              <div class="tg-modalbox">
                                  <div class="modalcontent-box">
                                      <strong class="tg-logo">
                                          <img src="img/carsonline-logo.png" alt="image description">
                                      </strong>
                                      <div class="text-box">
                                          <h3 id="textTitleId2">${title}</h3>
                                          <div class="description">
                                              <p id="textDescriptionId2">${description}.</p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div> `
}
