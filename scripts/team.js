var currentIndex = 0;
var teamMembers = $('.team-member');
var numTeamMembers = teamMembers.length;
var paused = false;
var arrowLeft;
var arrowRight;
var arrowFadeTime = 200;
var cycleTime = 5000;
	
$( document ).ready(function() {
	arrowLeft = $('#arrow-left');
	arrowRight = $('#arrow-right');
	
	//swap team members
	var autoSlide = setInterval(function(){
		if(!paused){
			currentIndex += 1;
			if (currentIndex > numTeamMembers - 1){
				currentIndex = 0;
			}
			cycleItems();
		}
	},cycleTime);

	$('#team').hover(function(event){
		paused = true;
		displayArrowControls(); //show arrows			
	}, function(){
		paused = false;
		displayArrowControls(); //hide arrows
	});

	

}); //docready

function cycleItems(){
	var item = $('.team-member').eq(currentIndex);
	teamMembers.hide();
	item.css('display','inline-block');	
}

function scrollTeam(direction){
	if(currentIndex+direction>=0 && currentIndex+direction <numTeamMembers){
		currentIndex += direction;
		displayArrowControls(); //update arrows		
		cycleItems();
	}
}

function displayArrowControls(){

	if (paused){
		if(currentIndex > 0){ //check left
			if(currentIndex < numTeamMembers -1 ){ //check right
				arrowLeft.fadeTo(arrowFadeTime,1);			
				arrowRight.fadeTo(arrowFadeTime,1);			
			} else { //cant go right
				arrowRight.fadeTo(arrowFadeTime,0);			
				arrowLeft.fadeTo(arrowFadeTime,1);
			}
		} else { //cant go left
				arrowLeft.fadeTo(arrowFadeTime,0);
				arrowRight.fadeTo(arrowFadeTime,1);		
		}
	} else { //not paused
		arrowLeft.fadeTo(arrowFadeTime,0);			
		arrowRight.fadeTo(arrowFadeTime,0);		
	}
}

function posTop() {
	return typeof window.pageYOffset != 'undefined' ? window.pageYOffset: document.documentElement.scrollTop? document.documentElement.scrollTop: document.body.scrollTop? document.body.scrollTop:0;
}