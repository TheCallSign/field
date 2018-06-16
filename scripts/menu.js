let menuStub = "media/Menu-"
let names = ['Civvies', 'Contact','Follow','OurTeam','Portfolio'];

var menuPaths = []
var menuAnimations = []

//add filenames to menuPaths
for(var i in names){
    menuPaths.push(menuStub + names[i] + "(T1).json");
}

$menu = $('#menu')
//add animations to menuAnimations
for(var i in menuPaths){
    var child = document.createElement('DIV');
    child.className = 'menu-item'
    document.getElementById('menu').appendChild(child);
    var animDate = lottie

    var data = {
      container: child, //get corresponding div
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: menuPaths[i]
    }
    
    let animation = lottie.loadAnimation(data);
    menuAnimations.push(animation)
  }


  // $(".menu-item:nth-child(2)").hover(function(){
  //   // let index = $(this).index();
  //   // var animation = menuAnimations[index];
  //   // animation.stop();
  //   // animation.play();
  //   // console.log(index)
  //   console.log('g')  
  
  // });

  