$(document).ready(function () {
var holder = null;


/*Gathers information for storyboard*/
/*$.getJSON('js/timeline_devops.json', function (data) {*/
$.getJSON('js/timeline_devops.json', function (data) {
        try{
        holder =data;
        buildtimeline();
        }
        catch(err){
            log('Error retrieving JSON File.',err.message);
        }
});



/*Build Core Asset List*/
function buildtimeline() {
var timeholder="<ul class=\"cbp_tmtimeline\">";

try{
$.each(holder.timeline, function(index, content) {
     //set background image if present
     // if (!content.background || !content.background.length){    }
      //else { $("html").css('background-image','url('+content.background+')');  }
      timeholder=timeholder+"<li><time class=\"cbp_tmtime\"><span>"+content.role+"</span><span>Day "+content.day+"</span></time>"+
      "<div class=\"cbp_tmicon\"></div><div class=\"cbp_tmlabel\"><img class=\"step_image\" src=\""+content.image+" \"><h2>"+content.title+"</h2><p>"+content.notes+"</p><div class=\"link_holder\">";


     if (!content.links || !content.links.length){    }
     else {
          $.each(content.links, function(index, s_link) {
            timeholder=timeholder+"<a class=\"links\" href=\""+s_link.link+"\" target=\"_new\">"+s_link.text+"</a>";
          });
     }
    if (!content.videos || !content.videos.length){    }
     else {
          $.each(content.videos, function(index, s_vid) {
            timeholder=timeholder+"<a class=\"showvideo links\" href=\"#\" video-link=\""+s_vid.link+"\">"+s_vid.text+"</a>";
          });
     }


     timeholder=timeholder+"</div></li>"

});
timeholder=timeholder+"</ul>"
$(".cbp_tmtimeline").replaceWith(timeholder);
}
catch(err){
  log('Error building core HTML from JSON.',err.message);
}

}




/*Code to Dynamically play video*/
 var _video = document.getElementById("playvideo");
 var src='empty';
 var isVideoShowing =false;

/*On click play the video*/
$(document.body).on('click', '.showvideo' , function(event) {
event.preventDefault();
src = $(this).attr('video-link');
swapvideo();
showvideo();
_video.play();
isVideoShowing =true;

});

/*Code to close the video*/
$(document.body).on('click', '#c_video' , function() {
      //Pause the video
     _video.pause();
      //hide video region
     $("#blackout").hide();
     isVideoShowing =false;
} );

/*function swaps out video and poster for playing another*/
function swapvideo() {
//swap the core html
$('#playvideo').html('<source src="'+src+'" type="video/mp4"/>' +
'<p><br><br>' +'Your browser does not support the HTML 5 video. ' +
'<a href="'+src+'"> ' +'Try downloading the video instead from here.<\/a><\/p>');
$('#playvideo').load();
$('#playvideo').show();
}

/*Function to show video with blackout*/
function showvideo(){
   $("#blackout").fadeIn(400);
};

/*When video ends show the poster*/
_video.addEventListener('ended', function () {
_video.pause();
_video.currentTime = 1;
}, false);


});
