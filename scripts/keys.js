    var muted = false;
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
        if(portfolioItem){
            currentPortfolioItem.style.zIndex = "-1";
            portfolioItem.style.zIndex = "1";

            $(portfolioItem).fadeTo(700,1);
            $(currentPortfolioItem).fadeTo(100,0);
            currentPortfolioItem = portfolioItem;
        }

        //play note
        //uncomment to turn on keyboard
         playNote(lowNote + (index * interval),noteDuration);

               
    }, function(){
        $(this).css('background-image', '');
        
    });

    var keyHoverLoop;

    $('#keys').hover(()=>{
        onKeys = true;
        keyHoverLoop = setInterval(()=>{
            var width = $('#keys').width();
            var pos = (mouseX / width) * 100;
            var scroll = 0;
            var multiplier = 3;

            if(pos < 33){ //mouse on left hand side, scroll left
                pos /= 10;
                scroll = map(pos,0,10,-5,5);
            } else if (pos > 66){ //mouse on right hand side, scroll right
                pos /= 10;
                scroll = map(pos,0,10,-5,5);
            } else { //mouse in middle, dont scroll
                scroll = 0;
            }

            //multiply scroll 
            // scroll *= multiplier;

            var $keys = $('#keys');
            var currentScroll = $keys.scrollLeft();
            $keys.scrollLeft(currentScroll+scroll);

            console.log("scroll: " + scroll);

        },10);
    }, () => {
        onKeys = false;
        console.log('offKeys');
        clearInterval(keyHoverLoop);
    });

    $(document).mousemove(function(event){
        mouseX = event.pageX;
    });

    function playNote(frequency, duration) {
        //check if sound is enabled
        if(!muted){
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
    }

    function map(x,in_min,in_max,out_min,out_max){
        return Math.round((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
    }


}); //docready

    function toggleMute(){
        muted = !muted;
        var color;
        if (muted){
            color = "red";
        } else {
            color = "none";
        }
        $('#mute').css('background', color);
    }
