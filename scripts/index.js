"use strict";

$(document).ready(function(){
  
  const animationData = ['ViewboxSync/nike.json','ViewboxSync/nestle.json'];
  const animations = [];
  
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
  
  //wait for svg animations to load
  var checkExist = setInterval(function() {
    if ($('svg').length) {
       console.log("Exists!");
       clearInterval(checkExist);

       //remove width and height
       let $svg = $('svg')
       $svg.removeAttr('width');
       $svg.removeAttr('height');
       $svg.removeAttr('style');

       //set preserve aspect ratio
       $svg.attr('preserveAspectRatio','xMinYMin meet')
       $svg.attr('viewBox','1500 20 600 2000')

    } 
  }, 100);

  let animation;
  $(".title-item").hover(function(){
    let index = $(this).index();
    animation = animations[index];
    
    animation.play();
    
  }, function(){
    animation.stop();
  });
  
  
});