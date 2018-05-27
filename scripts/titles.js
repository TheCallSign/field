var $titles = $("#titles"),
      titlesWidth = $titles.outerWidth(true),
      titlesScrollWidth = $titles[0].scrollWidth,
      wDiff = (titlesScrollWidth / titlesWidth) - 1, // widths difference ratio
      mPadd = 60, // Mousemove Padding
      damp = 20, // Mousemove response softness
      mX = 0, // Real mouse position
      mX2 = 0, // Modified mouse position
      posX = 0,
      mmAA = titlesWidth - (mPadd * 2), // The mousemove available area
      mmAAr = (titlesWidth / mmAA); // get available mousemove fidderence ratio

    $titles.mousemove(function(e) {
      mX = e.pageX - $(this).offset().left;
      mX2 = Math.min(Math.max(0, mX - mPadd), mmAA) * mmAAr;
    });

    setInterval(function() {
      posX += (mX2 - posX) / damp; // zeno's paradox equation "catching delay"	
      $titles.scrollLeft(posX * wDiff);
    }, 10);


const animationNames = [];
animationNames[0] = '';
animationNames[1] = '';
animationNames[2] = '';
animationNames[3] = '';
animationNames[4] = '';
animationNames[5] = '';
animationNames[6] = '';
animationNames[7] = '';
animationNames[8] = 'addidas';

const animationData = [];
const animations = [];

for(i in animationNames){
  var parent = document.getElementsByClassName('title-item')[i];
  // var child = document.createElement('DIV');
  // parent.appendChild(child);

  animationData[i] = {
    container: document.getElementsByClassName('container')[0],//parent, //get corresponding li
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: animationNames[i] + '.json'
  };

  animations[i] = lottie.loadAnimation(animationData[i]);

}

var anim;

$(".title-item").hover(function(){
    let index = $(this).index();
    let animData = animationData[index];

    if(animData && animData.path !== '.json'){ //make sure not empty path
      anim = animations[i];
      anim.play();
    }

}, function(){
  anim.stop();
});
