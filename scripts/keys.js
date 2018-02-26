$( document ).ready(function() {
    console.log( "ready!" );
    var currentPortfolioItem = document.getElementsByClassName('portfolio-item')[0];

    $('#keys li').hover(function(){
        var index = $(this).index();
        var portfolioItem = document.getElementsByClassName('portfolio-item')[index];

        currentPortfolioItem.style.zIndex = "-1";
        portfolioItem.style.zIndex = "1";

        $(portfolioItem).fadeTo(700,1);
        $(currentPortfolioItem).fadeTo(100,0);
        currentPortfolioItem = portfolioItem;

    });

});

