


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
                var radioBtn5 = document.getElementById('temp-5')
                var radioBtn6 = document.getElementById('temp-6')
                var radioBtn7 = document.getElementById('temp-7')


                var image = document.getElementById('imageDiv');
                var video = document.getElementById('videoImg');
                radioBtn1.disabled = true
                radioBtn2.disabled = true
                radioBtn3.disabled = true
                radioBtn4.disabled = true
                radioBtn5.disabled = true
                radioBtn6.disabled = true
                radioBtn7.disabled = true

                if (result.templateId === 'temp-1') {
                    $("#2ndTextSelector").hide();
                    video.style.display = 'block';
                    image.style.display = 'none';
                    radioBtn1.checked = true

                    let videoSelect = document.getElementById(result.videosId);
                    videoSelect.checked = true;

                    let text = document.getElementById('textId');
                    text.value = result.textsId;
                } else if (result.templateId === 'temp-2') {
                    $("#2ndTextSelector").hide();
                    image.style.display = 'block';
                    video.style.display = 'none';
                    radioBtn2.checked = true

                    let imageSelect = document.getElementById(result.imageId);
                    imageSelect.checked = true;
                    let text = document.getElementById('textId');
                    text.value = result.textsId;
                } else if (result.templateId === 'temp-3') {
                    $("#2ndTextSelector").hide();
                    video.style.display = 'none';
                    image.style.display = 'none';
                    radioBtn3.checked = true
                    let text = document.getElementById('textId');
                    text.value = result.textsId;
                } else if (result.templateId === 'temp-4') {
                    $("#2ndTextSelector").hide();
                    video.style.display = 'block';
                    image.style.display = 'none';
                    radioBtn4.checked = true

                    let videoSelect = document.getElementById(result.videosId);
                    videoSelect.checked = true;
                    let text = document.getElementById('textId');
                    text.value = result.textsId;
                }else if (result.templateId === 'temp-5') {
                    $("#2ndTextSelector").hide();
                    video.style.display = 'none';
                    image.style.display = 'block';
                    radioBtn5.checked = true

                    let text = document.getElementById('textId');
                    text.value = result.textIds[0];

                    for(let i=0;i<result.imageIds.length;i++){
                        let imageSelect = document.getElementById(result.imageIds[i]);
                        imageSelect.checked = true;
                    }

                    
                }else if (result.templateId === 'temp-6') {
                    $("#2ndTextSelector").show();
                    video.style.display = 'none';
                    image.style.display = 'block';
                    radioBtn6.checked = true

                    let text = document.getElementById('textId');
                    text.value = result.textIds[0];

                    let text2 = document.getElementById('textId2');
                    text2.value = result.textIds[1];

                    let imageSelect = document.getElementById(result.imageIds[0]);
                    imageSelect.checked = true;

                }else if (result.templateId === 'temp-7') {
                    $("#2ndTextSelector").show();
                    video.style.display = 'none';
                    image.style.display = 'block';
                    radioBtn7.checked = true

                    let text = document.getElementById('textId');
                    text.value = result.textIds[0];

                    let text2 = document.getElementById('textId2');
                    text2.value = result.textIds[1];

                    for(let i=0;i<result.imageIds.length;i++){
                        let imageSelect = document.getElementById(result.imageIds[i]);
                        imageSelect.checked = true;
                    }
                }

               
                let duration = document.getElementById('duration');
                duration.value = result.duration;
                let user = document.getElementById('userId');
                user.value = result.userId;

            }
        }
    });

});