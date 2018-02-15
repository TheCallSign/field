$( document ).ready(function() {
    console.log( "ready!" );


    $('#keys li').hover(function(){
        var index = $(this).index();

        var portfolioItem = document.getElementsByClassName('portfolio-item')[index];
        $(portfolioItem).fadeTo(1000,1);



    });

});

