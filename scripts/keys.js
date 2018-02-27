$( document ).ready(function() {
    console.log( "ready!" );
    var currentPortfolioItem = document.getElementsByClassName('portfolio-item')[0];
    var mouseX;
    var onKeys = false;

    $('#keys li').hover(function(){
        var index = $(this).index();

        //display key background color
        var backgroundImage = 'url("media/images/Backgorund/Portfolio-TitleHover(P' + (index + 1) +').png")';
        $(this).css('background-image', backgroundImage);
        $(this).css('background-position', 'center');
        $(this).css('border-radius', '0.6em');
        
        //change video
        var portfolioItem = document.getElementsByClassName('portfolio-item')[index];
        currentPortfolioItem.style.zIndex = "-1";
        portfolioItem.style.zIndex = "1";

        $(portfolioItem).fadeTo(700,1);
        $(currentPortfolioItem).fadeTo(100,0);
        currentPortfolioItem = portfolioItem;


               
    }, function(){
        $(this).css('background-image', '');
        
    });

    $('#keys ul').hover(()=>{
        onKeys = true;
    }, () => {
        onKeys = false;
    });

    $(document).mousemove(function(event){
        mouseX = event.pageX;

        if(onKeys){
            var width = $('#keys ul').width();
            var pos = (mouseX / width) * 100;
            var scroll = 0;

            if(pos < 33){ //mouse on left hand side, scroll left
                scroll = -1;
            } else if (pos > 66){ //mouse on right hand side, scroll right
                scroll = 1;
            } else { //mouse in middle, dont scroll
                scroll = 0;
            }

            console.log("scroll: " + scroll);
        }

        
    });

});


