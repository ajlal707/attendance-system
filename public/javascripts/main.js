/*--------------------------------------
		CUSTOM FUNCTION WRITE HERE		
--------------------------------------*/
"use strict";
jQuery(document).on('ready', function () {
  function initGraph(id) {
    setTimeout(function () {

      var ctx1 = document.getElementById(id);
      if (!ctx1) return true
      var data1 = {
        labels: ["1", "2", "3", "4",],
        datasets: [
          {
            label: "weekly",
            backgroundColor: "rgba(242,101,34,1)",
            borderColor: "rgba(242,101,34,0.8)",
            pointBorderColor: "rgb(252,176,59)",
            pointHighlightStroke: "rgba(60,184,120,1)",
            data: [0, 59, 80, 58, 20, 55, 40]
          },
          {
            label: "weekly",
            backgroundColor: "rgba(18,62,168,1)",
            borderColor: "rgba(18,62,168,0.8)",
            pointBorderColor: "rgb(252,176,59)",
            pointBackgroundColor: "rgba(221,221,221,1)",
            data: [28, 48, 40, 19, 86, 27, 90],
          }

        ]
      };
      var areaChart = new Chart(ctx1, {
        type: "line",
        data: data1,
        options: {
          tooltips: { mode: "label" },
          elements: { point: { hitRadius: 90 } },
          scales: {
            yAxes: [{
              stacked: true, gridLines: { color: "#fff", },
              ticks: { fontFamily: "Poppins", fontColor: "#2f2c2c" }
            }],
            xAxes: [{
              stacked: true, gridLines: { color: "#fff", },
              ticks: { fontFamily: "Poppins", fontColor: "#2f2c2c" }
            }]
          },
          animation: { duration: 3000 },
          responsive: true,
          maintainAspectRatio: false,
          legend: { display: false, },
          tooltips: { backgroundColor: 'rgba(47,44,44,.9)', cornerRadius: 0, footerFontFamily: "'Poppins'" }
        }
      });

    }, 1000)
  }

	/*--------------------------------------
			MOBILE MENU						
	--------------------------------------*/
  // function collapseMenu(){
  // 	jQuery('.wp-navigation ul li.menu-item-has-children, .wp-dashboardnav ul li.menu-item-has-children, .wp-navigation ul li.menu-item-has-mega-menu').prepend('<span class="wp-dropdowarrow"><i class="fa fa-angle-down"></i></span>');
  // 	jQuery('.wp-navigation ul li.menu-item-has-children span, .wp-dashboardnav ul li.menu-item-has-children span, .wp-navigation ul li.menu-item-has-mega-menu span').on('click', function() {
  // 		jQuery(this).parent('li').toggleClass('wp-open');
  // 		jQuery(this).next().next().slideToggle(300);
  // 	});
  // }
  // collapseMenu();
	/*--------------------------------------
			MOBILE MENU						
	--------------------------------------*/
  function collapseMenu() {
    jQuery('.wp-navigation ul li.menu-item-has-children, .wp-dashboardnav ul li.menu-item-has-children').prepend('<span class="wp-dropdowarrow"><i class="fa fa-angle-down"></i></span>');
    jQuery('.wp-navigation ul li.menu-item-has-children span, .wp-dashboardnav ul li.menu-item-has-children a').on('click', function () {
      jQuery(this).parent('li').toggleClass('wp-open');
      jQuery(this).next().slideToggle(300);
    });
  }
  collapseMenu();
	/*--------------------------------------
			MEGA MENU						
	--------------------------------------*/
  jQuery(function ($) {
    function hoverIn() {
      var a = jQuery(this);
      var nav = a.closest('.wp-navigation');
      var mega = a.find('.mega-menu');
      var offset = rightSide(nav) - leftSide(a);
      mega.width(Math.min(rightSide(nav), columns(mega) * 230));
      mega.css('left', Math.min(0, offset - mega.width()));
    }
    function hoverOut() { }
    function columns(mega) {
      var columns = 0;
      mega.children('.mega-menu-row').each(function () {
        columns = Math.max(columns, jQuery(this).children('.mega-menu-col').length);
      });
      return columns;
    }
    function leftSide(elem) {
      return elem.offset().left;
    }
    function rightSide(elem) {
      return elem.offset().left + elem.width();
    }
    jQuery('.menu-item-has-mega-menu').hover(hoverIn, hoverOut);
  });
	/*--------------------------------------
			DASHBOARD MENU					
	--------------------------------------*/
  if (jQuery('#wp-closenav').length > 0) {
    jQuery("#wp-closenav").on('click', function (event) {
      event.preventDefault();
      jQuery('#wp-wrapper').toggleClass('wp-openmenu');
      jQuery('body').toggleClass('wp-noscroll');
      jQuery('.wp-sidebarwrapper ul.sub-menu').hide();
    });
  }
	/* -------------------------------------
			COUNTER
	-------------------------------------- */
  var _wp_counters = jQuery('#wp-statisticscounters');
  _wp_counters.appear(function () {
    var _wp_counter = jQuery('.wp-countercontent h3 span');
    _wp_counter.countTo();
  });

	/*--------------------------------------
			THEME VERTICAL SCROLLBAR		
	--------------------------------------*/
  if (jQuery('.wp-verticalscrollbar').length > 0) {
    var _tg_verticalscrollbar = jQuery('.wp-verticalscrollbar');
    _tg_verticalscrollbar.mCustomScrollbar({
      axis: "y",
    });
  }
  if (jQuery('.wp-horizontalthemescrollbar').length > 0) {
    var _tg_horizontalthemescrollbar = jQuery('.wp-horizontalthemescrollbar');
    _tg_horizontalthemescrollbar.mCustomScrollbar({
      axis: "x",
      advanced: { autoExpandHorizontalScroll: true },
    });
  }
	/*--------------------------------------
			THEME VERTICAL SCROLLBAR		
	--------------------------------------*/
  // function init_chart(){
  // var ctx1 = document.getElementById("high-canvas");
  // var data1 = {
  // 	labels: ["1", "2", "3", "4",],
  // 	datasets: [
  // 		{
  // 			label: "weekly",
  // 			backgroundColor: "rgba(242,101,34,1)",
  // 			borderColor: "rgba(242,101,34,0.8)",
  // 			pointBorderColor: "rgb(252,176,59)",
  // 			pointHighlightStroke: "rgba(60,184,120,1)",
  // 			data: [0, 59, 80, 58, 20, 55, 40]
  // 		},
  // 		{
  // 			label: "weekly",
  // 			backgroundColor: "rgba(18,62,168,1)",
  // 			borderColor: "rgba(18,62,168,0.8)",
  // 			pointBorderColor: "rgb(252,176,59)",
  // 			pointBackgroundColor: "rgba(221,221,221,1)",
  // 			data: [28, 48, 40, 19, 86, 27, 90],
  // 		}

  // 	]
  // };

  // setTimeout(function(){
  initGraph('high-canvas')
  // }, 3000)
  // var areaChart = new Chart(ctx1, {
  // 	type:"line",
  // 	data:data1,
  // 	options: {
  // 		tooltips: {mode:"label"},
  // 		elements:{point: {hitRadius:90}},
  // 		scales: {yAxes: [{stacked: true,gridLines: {color: "#fff",},
  // 		ticks: {fontFamily: "Poppins", fontColor:"#2f2c2c"}}],
  // 		xAxes: [{stacked: true,gridLines: {color: "#fff",},
  // 		ticks: {fontFamily: "Poppins",fontColor:"#2f2c2c"}}]},
  // 		animation: {duration:	3000},
  // 		responsive: true,
  // 		maintainAspectRatio:false,
  // 		legend: {display: false,},
  // 		tooltips: {backgroundColor:'rgba(47,44,44,.9)',cornerRadius:0,footerFontFamily:"'Poppins'"}
  // 	}
  // });
  // }
  // 
  // init_chart();

  /*--------------------------------------
      DATA TABLE		
  --------------------------------------*/
  $(document).ready(function () {
    $('#example').DataTable({
      responsive: true,
      scrollY: 640,
    });
  });
  /*--------------------------------------
      TINYMCE WYSIWYG EDITOR			
  --------------------------------------*/
  if (jQuery('#wp-tinymceeditor').length > 0) {
    tinymce.init({
      selector: 'textarea#wp-tinymceeditor',
      height: 250,
      theme: 'modern',
      plugins: ['advlist autolink lists link image charmap print preview hr anchor pagebreak', 'searchreplace wordcount visualblocks visualchars code fullscreen', 'insertdatetime media nonbreaking save table contextmenu directionality', 'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help'],
      toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      toolbar2: 'print preview media | forecolor backcolor emoticons | codesample help',
      image_advtab: true,
    });
  }


	/*--------------------------------------
			Google Map
	--------------------------------------*/
  if (jQuery('#wp-locationmap').length > 0) {
    var _wp_locationmap = jQuery('#wp-locationmap');
    _wp_locationmap.gmap3({
      marker: {
        address: '1600 Elizabeth St, Melbourne, Victoria, Australia',
        options: {
          title: 'Robert Frost Elementary School'
        }
      },
      map: {
        options: {
          zoom: 16,
          scrollwheel: false,
          disableDoubleClickZoom: true,
        }
      }
    });
  }
  jQuery(document).ready(function () {
    new dragdrop.start((dom, api) => {
      dom.addEventListener('drop', (event) => {
        //console.log( api.orders );
      })
    });
  });
	/*--------------------------------------
			PRETTY PHOTO GALLERY			
	--------------------------------------*/
  if (jQuery('#wp-prettyphoto').length > 0) {
    jQuery("a[data-rel]").each(function () {
      jQuery(this).attr("rel", jQuery(this).data("rel"));
    });
    jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
      animation_speed: 'normal',
      theme: 'dark_square',
      slideshow: 3000,
      autoplay_slideshow: false,
      social_tools: false
    });
  }
});


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

          } else if (res.success.role === 'admin') {
            window.location.href = '/admin/dashboard';
          }
          else {
            window.location.href = '/users/dashboard';
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