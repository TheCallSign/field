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
	//check boundries
	if(currentIndex + direction >= 0 && currentIndex + direction < numTeamMembers){
		console.log('currentIndex : ' + currentIndex);
		currentIndex += direction;
		console.log('scrolling to : ' + currentIndex);
		cycleItems();
	} else {
		console.log('I cant go that way anymore.' + 'cIndex: ' + currentIndex);
		
	}
}