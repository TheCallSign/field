$( document ).ready(function() {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var currentPortfolioItem = document.getElementsByClassName('portfolio-item')[0];
    var mouseX;
    var onKeys = false;

    var lowNote = 200;
    var interval = 100;
    var noteDuration = 500;

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

        //play note
        playNote(lowNote + (index * interval),noteDuration);

               
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
            var width = $('#keys').width();
            var pos = (mouseX / width) * 100;
            var scroll = 0;
            var multiplier = 3;

            if(pos < 33){ //mouse on left hand side, scroll left
                scroll = 0 - pos / 10;
                // scroll += 10;
            } else if (pos > 66){ //mouse on right hand side, scroll right
                scroll = pos / 10;
            } else { //mouse in middle, dont scroll
                scroll = 0;
            }

            //multiply scroll 
            // scroll *= multiplier;

            var $keys = $('#keys');
            var currentScroll = $keys.scrollLeft();
            $keys.scrollLeft(currentScroll+scroll);

            // console.log('currentScroll: ' + currentScroll);
            // console.log('newScroll: ' + $keys.scrollLeft());
            // console.log("scroll: " + scroll);
        }
        
    });

    function playNote(frequency, duration) {
        // create Oscillator node
        var oscillator = audioCtx.createOscillator();

        oscillator.type = 'sine';
        oscillator.frequency.value = frequency; // value in hertz
        oscillator.connect(audioCtx.destination);
        oscillator.start();

        setTimeout(
            function(){
                oscillator.stop();
            }, duration);
    }


}); //docready


