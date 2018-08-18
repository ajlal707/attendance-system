


$(document).ready(function () {


    $.ajax({
        type: "POST",
        url: "/editAd/getResult",
        data: {},
        success: function (res) {
            if (res.error) {
                var error = document.getElementById('error');
                error.style.color = 'red'
                error.innerHTML = res.error

            } else if (res.success) {
                var result = res.result
                var radioBtn1 = document.getElementById('temp-1')
                var radioBtn2 = document.getElementById('temp-2')
                var radioBtn3 = document.getElementById('temp-3')
                var radioBtn4 = document.getElementById('temp-4')


                var image = document.getElementById('imageDiv');
                var video = document.getElementById('videoImg');
                radioBtn1.disabled = true
                radioBtn2.disabled = true
                radioBtn3.disabled = true
                radioBtn4.disabled = true
                if (result.templateId === 'temp-1') {

                    video.style.display = 'block';
                    image.style.display = 'none';
                    radioBtn1.checked = true

                    let videoSelect = document.getElementById(result.videosId);
                    videoSelect.checked = true;

                } else if (result.templateId === 'temp-2') {

                    image.style.display = 'block';
                    video.style.display = 'none';
                    radioBtn2.checked = true

                    let imageSelect = document.getElementById(result.imageId);
                    imageSelect.checked = true;

                } else if (result.templateId === 'temp-3') {

                    video.style.display = 'none';
                    image.style.display = 'none';
                    radioBtn3.checked = true

                } else if (result.templateId === 'temp-4') {

                    video.style.display = 'block';
                    image.style.display = 'none';
                    radioBtn4.checked = true

                    let videoSelect = document.getElementById(result.videosId);
                    videoSelect.checked = true;
                }

                let text = document.getElementById('textId');
                text.value = result.textsId;
                let duration = document.getElementById('duration');
                duration.value = result.duration;
                let user = document.getElementById('userId');
                user.value = result.userId;

            }
        }
    });

});