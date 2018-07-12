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
    child.id = names[i]
    document.getElementById('menu').appendChild(child);
    var animDate = lottie
    //child.onclick = function () {alert('what' + i)};
    var data = {
      container: child, //get corresponding div
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: menuPaths[i]
    }
    
    let animation = lottie.loadAnimation(data);
    menuAnimations.push(animation)
    //console.log(JSON.stringify(animation, null, 2));

  }

  