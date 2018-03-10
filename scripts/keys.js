var muted = false;
toggleMute(); //set mute on by default
var mouseX;
var mouseY;
var startingPortfolio = 0;
$( document ).ready(function() {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var lastPortfolioItem = $('.portfolio-item').eq(startingPortfolio);//document.getElementsByClassName('portfolio-item')[0];
    var portfolioItem = lastPortfolioItem;
    var onKeys = false;
    var lowNote = 200;
    var interval = 100;
    var noteDuration = 500;
    var keyFadeTime = 300;
    var index = 0;
    var keys = $('.keys');
    var keyBackgrounds = $('.key-background');
    var key;
    var background;
    var lastIndex = index;
    var keySoundLoop;
    var scroll = 0;
    var portfolioFadeTime = 700;
    var playingVideo = false;

    //display starting portfolio piece
    lastPortfolioItem.fadeTo(portfolioFadeTime, 1);
    //display starting key background

    $('#keys li').hover(function(){
        index = $(this).index();
        key = keys.eq(index);
        //fade out last background
        if(lastIndex != index){ //make sure the last selection isnt the current selection
            keyBackgrounds.eq(lastIndex).fadeTo(keyFadeTime,0);
            //show selected background
            background = keyBackgrounds.eq(index);
            background.fadeTo(keyFadeTime,1);

            //change video
            portfolioItem = $('.portfolio-item').eq(index);
            lastPortfolioItem.css('z-index',-1);
            portfolioItem.css('z-index',1);
            portfolioItem.fadeTo(portfolioFadeTime, 1);
            lastPortfolioItem.fadeTo(portfolioFadeTime, 0);
            lastPortfolioItem = portfolioItem;
        
            //update last background
            lastIndex = index;
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
            var maxSpeed = 6;

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
    });

    $('#keys li,#video').click(function(){
        // if(lastIndex != index){
        //     playingVideo = true;
        // }
            playVideo(index);
    });

    $(document).mousemove(function(event){
        mouseX = event.pageX;
        mouseY = event.pageY;
    });

    function playVideo(videoIndex){
        var portfolioItem = $('.portfolio-item')[videoIndex];
        var video = $(portfolioItem).children('video');
        $(portfolioItem).children('img').fadeTo(portfolioFadeTime,0);//css('display','none');
        $(video).fadeTo(portfolioFadeTime,1);//css('display','inline-block');
        if(!playingVideo){
            $(video)[0].play();
        } else {
            $(video)[0].pause();            
        }
        playingVideo = !playingVideo;
        
    }

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
    $('audio,video').each(function(){
        $(this).prop('muted', muted);
    });

}
