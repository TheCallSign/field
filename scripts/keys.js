var muted = false;
toggleMute(); //set mute on by default
var mouseX;
var mouseY;

$( document ).ready(function() {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var currentPortfolioItem = document.getElementsByClassName('portfolio-item')[0];
    var onKeys = false;
    var lowNote = 200;
    var interval = 100;
    var noteDuration = 500;
    var keyFadeTime = 300;
    var index;
    var keys = $('.keys');
    var keyBackgrounds = $('.key-background');
    var key;
    var background;
    var lastIndex;
    var keySoundLoop;
    var scroll = 0;

    $('#keys li').hover(function(){
        index = $(this).index();
        key = keys.eq(index);
        //fade out last background
        if(lastIndex != index){ //make sure the last background isnt the current background
            keyBackgrounds.eq(lastIndex).fadeTo(keyFadeTime,0);
        }
        //show selected background
        background = keyBackgrounds.eq(index);
        background.fadeTo(keyFadeTime,1);
        //update last background
        lastIndex = index;

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
         playNote(lowNote + (index * interval),noteDuration);
               
    });


    $('#keys').hover(()=>{
        onKeys = true;
        var step = 0.2;

        keySoundLoop = setInterval(()=>{
            var width = $('#keys').width();
            var pos = (mouseX / width) * 100;
            var multiplier = 3;
            var maxSpeed = 3;

            if(pos < 33){ //mouse on left hand side, scroll left                
                if(Math.abs(scroll) < maxSpeed ){
                    scroll -= step;               
                }
            } else if (pos > 66){ //mouse on right hand side, scroll right
                if(Math.abs(scroll) < maxSpeed ){
                    scroll += step;                    
                }
            } else { //mouse in middle, dont scroll
                scroll = 0;
            }

            var $keys = $('#keys');
            var currentScroll = $keys.scrollLeft();
            $keys.scrollLeft(currentScroll+scroll);

        },10);

    }, () => {
        onKeys = false;
        clearInterval(keySoundLoop);
        scroll = 0;
        console.log('end sound');
    });

    $(document).mousemove(function(event){
        mouseX = event.pageX;
        mouseY = event.pageY;
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
