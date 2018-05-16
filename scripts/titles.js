var titles = document.getElementById("titles");
var titlesScrollLimit = 25;
var titlesScrollAmmount = 3;
var scrollCheck;
var onTitles = false;
var mouseX;

titles.onmouseenter = function(event) {
     onTitles = true;
}

titles.onmouseleave = function() {
    onTitles = false;   
}

document.addEventListener("mousemove", function(event){
    mouseX = event.pageX;
})

var scroll = 0;
var maxScroll = 10;
scrollCheck = window.setInterval(function(){
    
    if(onTitles){
        //get mouse pos
        var w = titles.offsetWidth;
        var pos = mouseX / w * 100;

        if(titlesScrollLimit >= pos ){ //check left
                if(Math.abs(scroll-titlesScrollAmmount) < maxScroll)
                    scroll -= titlesScrollAmmount;
        } else if (pos >= (100 - titlesScrollLimit)){ //check right
            if(scroll+titlesScrollAmmount < maxScroll)   
                scroll += titlesScrollAmmount;
        } else {
            scroll = 0;
        }

        console.log('scroll: ' + scroll);

        titles.scrollLeft += scroll;

    } else {
        scroll = 0;
    }
}, 25);
