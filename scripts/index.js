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

//////////////civvies rotation
var $civvies_items = $('.civvies-item');
var civvies_index = 0;

// var civvies_autoslide = setInterval(function(){
//   civvies_index++;
//   var current = civvies_index % $civvies_items.length;
//   var prevIndex = (civvies_index-1) % $civvies_items.length;
//   var fadeTime = 500;
//   var $currentItem = $civvies_items.eq(current);
//   var $prevItem = $civvies_items.eq(prevIndex);
  
//   console.log('show: ' + current + ' hide: ' + prevIndex)

//   //hide all items
//   $prevItem.fadeTo(fadeTime, 0, function(){
//     $prevItem.hide();
//     $prevItem.css('display','none')
    
//     //unhide current item
//     $currentItem.show();
//     $currentItem.css('opacity','1');
    
//     //set opacity of everything to 0
//     //to get ready for progressive fade in 
//     var img = $currentItem.find('img');
//     var h2 = $currentItem.find('h2');
//     var info = $currentItem.find('.left');
    

//     img.css('opacity', 0);
//     h2.css('opacity', 0);
//     info.css('opacity', 0);
    
//     //fade in info 
//     info.fadeTo(fadeTime, 1,function(){
//       img.fadeTo(fadeTime, 1,function(){ //fade in image
//         h2.fadeTo(fadeTime, 1,function(){ //fade in composer
      
//         });
//       });
//     });
    
//   });


// }, 3000);

////////////////////////team
var $team = $('#team');

$team.mousemove(function(e){
  var x = e.pageX;
  var w = $team.width();
  var p = x / w * 100;
  var cursor = 'url(../media/Team - Assets/Team/Team-CursorLeft(T1).svg)';

  if(p > 50){
    cursor = 'url(../media/Team - Assets/Team/Team-CursorRight(T1).svg)';
  }

  $('html').css('cursor',cursor)
  // console.log(cursor)
});


$team.click(function(e){
  var x = e.pageX;
  var w = $team.width();
  var p = x / w * 100;
  var direction = 0;  
  if(p > 50){
    console.log('right')
    direction = 1;    
  } else {
    console.log('left')
    direction = -1;
  }

  cycleTeam(direction);

});

var current_team_index = 0;
var $team_members = $('.team-member');
var teamFadeTime = 500;

function cycleTeam(direction){
  //fade out current
  var $current = $team_members.eq(current_team_index);
  $current.fadeTo(teamFadeTime, 0, function(){
    $(this).css('display', 'none');
    //fade in next
    current_team_index += direction;
    current_team_index = current_team_index % $team_members.length;
    $current = $team_members.eq(current_team_index);

    //set visible
    $current.css('display','block');
    $current.css('opacity','1');
    

    var $name = $current.find('img');
    var $role = $current.find('ul');
    var $bio = $current.find('p');
    
    //hide everything before fade
    $name.css('opacity',0);
    $role.css('opacity',0);
    $bio.css('opacity',0);
    

    //fade in name
    $name.fadeTo(teamFadeTime,1, function(){
      $role.fadeTo(teamFadeTime,1,function(){
        $bio.fadeTo(teamFadeTime,1)
      })
    })
  });
  

}





