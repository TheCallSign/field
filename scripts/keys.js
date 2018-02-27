$( document ).ready(function() {
    console.log( "ready!" );
    var currentPortfolioItem = document.getElementsByClassName('portfolio-item')[0];

    // $('#keys li').hover(function(){
    //     var index = $(this).index();
    //     var portfolioItem = document.getElementsByClassName('portfolio-item')[index];

    //     currentPortfolioItem.style.zIndex = "-1";
    //     portfolioItem.style.zIndex = "1";

    //     $(portfolioItem).fadeTo(700,1);
    //     $(currentPortfolioItem).fadeTo(100,0);
    //     currentPortfolioItem = portfolioItem;
    
    //     // background-image: url("../media/images/Portfolio-TitleHover(P5).png");

    //     var backgroundImage = 'url("media/images/Portfolio-TitleHover(P' + (index + 1) +').png")';
    //     $(this).css('background-image', backgroundImage);
    //     // $(this).css('background-color', 'red');
        
    //     console.log('setting ' + backgroundImage);

    // });

    $('#keys li').hover(function(){
        var index = $(this).index();

        //display key background color
        var backgroundImage = 'url("media/images/Portfolio-TitleHover(P' + (index + 1) +').png")';
        $(this).css('background-image', backgroundImage);

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

    // function displayBackground(element){
    //     $(element).css('background-image', );
    // }
});


