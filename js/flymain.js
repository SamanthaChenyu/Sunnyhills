window.onload = function changeimg () { 

    if ( $(window).width() < 769 ){
        $('#mobilne001').attr("src", "images/mb1.jpg");
        $('#mobilne002').attr("src", "images/mb6.jpg");
        $('#mobilne003').attr("src", "images/mb2.jpg");
        $('#mobilne004').attr("src", "images/mb3.jpg");
        $('#mobilne005').attr("src", "images/mb4.jpg");
    }  else {
        $('#mobilne001').attr("src", "images/main_slide1.jpg");
        $('#mobilne002').attr("src", "images/main_slide6.jpg");
        $('#mobilne003').attr("src", "images/main_slide2.jpg");
        $('#mobilne004').attr("src", "images/main_slide3.jpg");
        $('#mobilne005').attr("src", "images/main_slide4.jpg");
    }
}
$(document).ready(function(){
  $('.menu .str').click(function(){
    $('.menu-checkbox').click();
  });
  $('.js-kv').height($(window).height());

    var loader = imagesLoaded('.kv__img img');
    var len = loader.images.length + 1;/* for ready */
    var imgs = 0;
     var $pg = $('.pg');

  $(function () {
      imgs++;
      progress($pg, imgs, len);
  });
      loader.on('progress', function () {
      imgs++;
      progress($pg, imgs, len);
  });
      $('.kv__img img').imagesLoaded(function() {
          setTimeout(function () {
              $pg.fadeOut();
                }, 500)
      });
      function progress($pg, cnt, max) {
          var per =  Math.round(cnt/max*100);
              $pg.css({width: per + '%'});
      }
});
$(function() {
    $(window).load(function() {
        $(".loading").fadeOut();
    });
});
$(function(){ 
  $(".svg-arrow").click(function(){
    $("html,body").animate({scrollTop:$('.part2').offset().top - 60}, 900);
    return false;
  });
});
$(function(){ 
  $("#wind").click(function(){
    $("html,body").animate({scrollTop:$('.article').offset().top - 60}, 900);
    return false;
  });
});
$(function(){ 
  $("#dart").click(function(){
    $("html,body").animate({scrollTop:$('.article2').offset().top - 60}, 900);
    return false;
  });
});
$(function(){ 
  $("#people").click(function(){
    $("html,body").animate({scrollTop:$('.article3').offset().top - 60}, 900);
    return false;
  });
});
$(function(){ 
  $("#emotion").click(function(){
    $("html,body").animate({scrollTop:$('.article4').offset().top - 60}, 900);
    return false;
  });
});
$(function(){ 
  $(".wind").click(function(){
    $("html,body").animate({scrollTop:$('.article').offset().top}, 900);
    return false;
  });
});
$(function(){ 
  $(".dart").click(function(){
    $("html,body").animate({scrollTop:$('.article2').offset().top}, 900);
    return false;
  });
});
$(function(){ 
  $(".people").click(function(){
    $("html,body").animate({scrollTop:$('.article3').offset().top}, 900);
    return false;
  });
});
$(function(){ 
  $(".emotion").click(function(){
    $("html,body").animate({scrollTop:$('.article4').offset().top}, 900);
    return false;
  });
});

$(document).scroll(function() {
    var top = $(window).scrollTop();
    var width = $(window).width();
    if ( top > 100 && width < 1330 ) {
      $("#include").hide();
    } 
    if ( top < 100 && width < 1330 ) {
      $("#include").show();
    }
});







