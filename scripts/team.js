	var currentIndex = 0;
	var teamMembers = $('.team-member');
	var numTeamMembers = teamMembers.length;
	var paused = false;
	var arrowLeft;
	var arrowRight;
	var arrowFadeTime = 200;
	
$( document ).ready(function() {
	arrowLeft = $('#arrow-left');
	arrowRight = $('#arrow-right');
	
//swap team members
	var refreshTime = 3000;

	var autoSlide = setInterval(function(){
		if(!paused){
			currentIndex += 1;
			if (currentIndex > numTeamMembers - 1){
				currentIndex = 0;
			}
			cycleItems();
		}
	},refreshTime);

	$('#team').hover(function(){
		paused = true;
		displayArrowControls(); //show arrows			
	}, function(){
		paused = false;
		displayArrowControls(); //hide arrows
	});

});

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