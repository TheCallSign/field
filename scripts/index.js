"use strict";

// $(document).ready(function(){
  
  const animationData = [];
  const animations = [];

  //populate animation data
  const stub = "media/Portfolio-TitleDummy";
  const numAnims = 9;

  for(var i = 1; i <= numAnims; i++){
    var animationName = stub + " " + i + "(T3).json";
    animationData.push(animationName);
  }

  //repeat to test scroll
  var repeat = 2;
  for(var j = 1; j <= repeat; j++){

    //populate animations
    for(var i in animationData){
      var child = document.createElement('LI');
      child.className = 'title-item'
      document.getElementById('title-list').appendChild(child);
      
      var data = {
        container: child, //get corresponding li
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: animationData[i]
      }
      
      let animation = lottie.loadAnimation(data);
      animations.push(animation)
    }

  }

  //wait for title items svg animations to load
  var checkTitlesExist = setInterval(function() {
    if ($('.title-item svg').length === (repeat * animationData.length)) {
       clearInterval(checkTitlesExist);

       //remove width and height
       let $svg = $('.title-item svg')
       $svg.removeAttr('width');
       $svg.removeAttr('height');
       $svg.removeAttr('style');
       
       var x = 1500,
       y = 20,
       w = 600,
       h = 2000;
       
       //set preserve aspect ratio
       $svg.attr('preserveAspectRatio','xMinYMin meet')
       $svg.attr('viewBox',`${x} ${y} ${w} ${h}`)

       $(".title-item").hover(function(){
        let index = $(this).index();
        let animation = animations[index];
        if(animation.isPaused){
          animation.stop();
          animation.play();
        }
        
      });

    } 
  }, 100);

  var checkMenuItemsExist = setInterval(function(){
    if($('.menu-item svg').length === 5 ){
      clearInterval(checkMenuItemsExist)

      //remove width and height
      let $svg = $('.menu-item svg')
      $svg.removeAttr('width');
      $svg.removeAttr('height');
      $svg.removeAttr('style');

      var x = 0,
          y = 0,
          w = 3500,
          h = w;

      //set preserve aspect ratio
      $svg.attr('preserveAspectRatio','xMinYMin meet')
      $svg.attr('viewBox',`${x} ${y} ${w} ${h}`)

      // //check menu item hover
      $('.menu-item svg').children('g').hover(function(){
        //get index of animation
        var $parent = $(this).parent(); 
        var index = $('.menu-item svg').index($parent);
        let animation = menuAnimations[index];
        if(animation.isPaused){
          animation.stop();
          animation.play();
        }

      });
    }

  }, 100);

  $('.mute').click(function(){
    $('.mute').toggle()
  });
