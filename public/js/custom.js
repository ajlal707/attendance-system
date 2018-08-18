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
  var set = function () {
    var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
    var topOffset = 70;
    if (width < 1170) {
      $("body").addClass("mini-sidebar");
      $('.navbar-brand span').hide();
      $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
      $(".sidebartoggler i").addClass("ti-menu");
    }
    else {
      $("body").removeClass("mini-sidebar");
      $('.navbar-brand span').show();
      //$(".sidebartoggler i").removeClass("ti-menu");
    }

    var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
    height = height - topOffset;
    if (height < 1) height = 1;
    if (height > topOffset) {
      $(".page-wrapper").css("min-height", (height) + "px");
    }

  };
  $(window).ready(set);
  $(window).on("resize", set);
  // ============================================================== 
  // Theme options
  // ==============================================================     
  $(".sidebartoggler").on('click', function () {
    if ($("body").hasClass("mini-sidebar")) {
      $("body").trigger("resize");
      $(".scroll-sidebar, .slimScrollDiv").css("overflow", "hidden").parent().css("overflow", "visible");
      $("body").removeClass("mini-sidebar");
      $('.navbar-brand span').show();
      //$(".sidebartoggler i").addClass("ti-menu");
    }
    else {
      $("body").trigger("resize");
      $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
      $("body").addClass("mini-sidebar");
      $('.navbar-brand span').hide();
      //$(".sidebartoggler i").removeClass("ti-menu");
    }
  });
  // topbar stickey on scroll

  $(".fix-header .topbar").stick_in_parent({});


  // this is for close icon when navigation open in mobile view
  $(".nav-toggler").click(function () {
    $("body").toggleClass("show-sidebar");
    $(".nav-toggler i").toggleClass("mdi mdi-menu");
    $(".nav-toggler i").addClass("mdi mdi-close");
  });

  $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
    $(".app-search").toggle(200);
  });
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

  // $.ajax({
  //   type: "POST",
  //   url: "/editAd/getResult",
  //   data: {},
  //   success: function (res) {
  //     if (res.error) {
  //       var error = document.getElementById('error');
  //       error.style.color = 'red'
  //       error.innerHTML = res.error

  //     } else if (res.success) {
  //       var result = res.result
  //       var radioBtn1 = document.getElementById('temp-1')
  //       var radioBtn2 = document.getElementById('temp-2')
  //       var radioBtn3 = document.getElementById('temp-3')
  //       var radioBtn4 = document.getElementById('temp-4')

        
  //       var image = document.getElementById('imageDiv');
  //       var video = document.getElementById('videoImg');
  //       radioBtn1.disabled = true
  //       radioBtn2.disabled = true
  //       radioBtn3.disabled = true
  //       radioBtn4.disabled = true
  //       if (result.templateId === 'temp-1') {

  //         video.style.display = 'block';
  //         image.style.display = 'none';
  //         radioBtn1.checked = true

  //         let videoSelect = document.getElementById(result.videosId);
  //         videoSelect.checked = true;

  //       } else if (result.templateId === 'temp-2') {

  //         image.style.display = 'block';
  //         video.style.display = 'none';
  //         radioBtn2.checked = true

  //       } else if (result.templateId === 'temp-3') {

  //         video.style.display = 'none';
  //         image.style.display = 'none';
  //         radioBtn3.checked = true

  //       } else if (result.templateId === 'temp-4') {

  //         video.style.display = 'block';
  //         image.style.display = 'none';
  //         radioBtn4.checked = true

  //         let videoSelect = document.getElementById(result.videosId);
  //         videoSelect.checked = true;
  //       }

  //       let text = document.getElementById('textId');
  //       text.value = result.textsId;
  //       let duration = document.getElementById('duration');
  //       duration.value = result.duration;
  //       let user = document.getElementById('userId');
  //       user.value = result.userId;

  //     }
  //   }
  // });

});
