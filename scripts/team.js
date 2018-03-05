	var currentIndex = 0;
	var teamMembers = $('.team-member');
	var numTeamMembers = teamMembers.length;
$( document ).ready(function() {

//swap team members
	var refreshTime = 3000;

	var paused = false;

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
	}, function(){
		paused = false;
	});

});

function cycleItems(){
	var item = $('.team-member').eq(currentIndex);
	teamMembers.hide();
	item.css('display','inline-block');
}


function scrollTeam(direction){
	var newIndex = currentIndex + direction;

	//check boundries
	if(newIndex >= 0){ //can go left
		if(newIndex < numTeamMembers){ //can go right
			currentIndex = newIndex;
			cycleItems();
			$('.arrow-control').css('display','inline-block');
			
		} else {
			$('#arrow-right').css('display','none');			
		}
	} else {
		$('#arrow-left').css('display','none');
	} 
}