/*--------------------------------------
		CUSTOM FUNCTION WRITE HERE		
--------------------------------------*/
"use strict";
jQuery(document).on('ready', function () {


	/*--------------------------------------
			DASHBOARD MENU					
	--------------------------------------*/
  if (jQuery('#tg-btnmenutoggle').length > 0) {
    jQuery("#tg-btnmenutoggle").on('click', function (event) {
      event.preventDefault();
      jQuery('#tg-wrapper').toggleClass('tg-openmenu');
    });
  }

	/*----------------------------------
			table 				
	-----------------------------------*/
  $('#clientstable').DataTable({
    dom: 'lrtip',
    bInfo: false,
    paging: false,
    ordering: false,
    scrollY: "500px",
    scrollX: true,
    scrollCollapse: true,
    responsive: true,
  });
  // $('.dataTables_scrollBody').mCustomScrollbar({
  //   axis: "y",
  // });
	/*----------------------------------
			Scrollbar				
	-----------------------------------*/
  $('#tg-nicescrollbar').mCustomScrollbar({
    axis: "y",
  });
	/*----------------------------------
			image file				
	-----------------------------------*/
  $('#image-file').change(function () {
    $(this).closest('form').submit();
  });

  $('#viewForm').click(function () {
    var $this = $(this);
    $this.toggleClass('editForm');
    if ($this.hasClass('editForm')) {
      $this.text('Edit Form');
      $("#addShipmentForm :input").attr("readonly", true);
      // $('#btnSaveAndProceed').hide();
    } else {
      $this.text('View Form');
      $("#addShipmentForm :input").attr("readonly", false);
      // $('#btnSaveAndProceed').show();
    }
  });

});


function userLogin() {
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

          } else if (res.success) {
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
  document.getElementById('btnSubmit').disabled = true;
  var email = document.getElementById('email').value;
  if (email) {
    $.ajax({
      type: "POST",
      url: "/forgotpassword/forgetPassword",
      data: { email: email },
      success: function (res) {
        if (res.error) {
          document.getElementById('btnSubmit').disabled = false;
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
    document.getElementById('btnSubmit').disabled = false;
    var error = document.getElementById('error');
    error.style.color = 'red'
    error.innerHTML = 'Please enter an email address.'
  }
}

// RESET PASSWORD FUNCTION

function resetPassword() {
  document.getElementById('btnSubmit').disabled = true;
  var pass1 = document.getElementById('pass1').value;
  var pass2 = document.getElementById('pass2').value;
  var token = document.getElementById('token').value;
  if (pass1 && pass2) {
    if (pass1.trim().toString() === pass2.trim().toString()) {

      $.ajax({
        type: "POST",
        url: "/resetpassword/resetpassword",
        data: { password: pass1, token: token },
        success: function (res) {
          if (res.error) {
            document.getElementById('btnSubmit').disabled = false;
            var error = document.getElementById('error');
            error.style.color = 'red'
            error.innerHTML = res.error

          } else if (res.success) {
            if (res.user.role === 'admin') {
              window.location.href = '/'
            } else {
              var error = document.getElementById('error');
              error.style.color = 'green'
              error.innerHTML = 'Password Reset Successfully.Please visit login page'
            }
          }
        }
      });
    } else {
      document.getElementById('btnSubmit').disabled = false;
      var error = document.getElementById('error');
      error.style.color = 'red'
      error.innerHTML = 'Password not match'
    }
  } else {
    document.getElementById('btnSubmit').disabled = false;
    var error = document.getElementById('error');
    error.style.color = 'red'
    error.innerHTML = 'All fields must not be empty.'
  }
}

function updateProfile() {
  var firstname = document.getElementById('firstname').value;
  var lastname = document.getElementById('lastname').value;
  var email = document.getElementById('email').value;
  var address = document.getElementById('address').value;
  if (firstname && lastname && email && address) {
    $.ajax({
      type: "POST",
      url: "/profile/updateprofile",
      data: { firstname, lastname, email, address },
      success: function (res) {
        if (res.error) {
          document.getElementById('btnSubmit').disabled = false;
          var error = document.getElementById('error');
          error.style.color = 'red'
          error.innerHTML = res.error

        } else if (res.success) {
          window.location.href = '/profile';
        }
      }
    });
  } else {
    document.getElementById('btnSubmit').disabled = false;
    var error = document.getElementById('error');
    error.style.color = 'red'
    error.innerHTML = 'Fix all the missing fields.'
  }
}
