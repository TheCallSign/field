	var currentIndex = 0;
	var teamMembers = $('.team-member');
	var numTeamMembers = teamMembers.length;
	var paused = false;
	var arrowLeft;
	var arrowRight;
	
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
				arrowLeft.show();			
				arrowRight.show();			
			} else { //cant go right
				arrowRight.hide();			
				arrowLeft.show();
			}
		} else { //cant go left
				arrowLeft.hide();
				arrowRight.show();		
		}
	} else { //not paused
		arrowLeft.hide();			
		arrowRight.hide();		
	}
}