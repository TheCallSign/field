var titles = document.getElementById("titles");
var titlesScrollOffset = 25;
var titlesScrollAmmount = 0.5;
var scrollInterval = 15;
var scrollCheck;
var onTitles = false;
var mouseX;
var titleItems = document.getElementsByClassName("title-item");
var animationCheck;

//keep track of mouse x
document.addEventListener("mousemove", function(event){
    mouseX = event.pageX;
});

titles.onmouseenter = function() {
     onTitles = true;
     animationCheck = window.setInterval(checkAnimation, 10);
}

titles.onmouseleave = function() {
    onTitles = false;   
    clearInterval(animationCheck);
}

//scroll check
var scroll = 0;
var maxScroll = 30;
scrollCheck = window.setInterval(function(){
    
    if(onTitles){
        //get mouse pos as %
        var w = titles.offsetWidth;
        var pos = mouseX / w * 100;

        if(titlesScrollOffset >= pos ){ //check left third
                if(Math.abs(scroll-titlesScrollAmmount) < maxScroll)
                    scroll -= titlesScrollAmmount;
        } else if (pos >= (100 - titlesScrollOffset)){ //check right third
            if(scroll+titlesScrollAmmount < maxScroll)   
                scroll += titlesScrollAmmount;
        } else {
            scroll = 0;
        }

        titles.scrollLeft += scroll;
    } else {
        scroll = 0;
    }
}, scrollInterval);

//animate hovered item
$('.title-item').hover(function(){
    $(this).css('background', 'gray');
}, function(){
    $(this).css('background', 'none');
    
});
