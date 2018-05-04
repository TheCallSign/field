var currentIndex = 0;
var teamMembers = $('.team-member');
var numTeamMembers = teamMembers.length;
var paused = false;
var arrowLeft;
var arrowRight;
var arrowFadeTime = 20;
var teamInfoFadeTime = 500;
var cycleTime = 5000;
var onMouseTrap = false;
	
$( document ).ready(function() {
	arrowLeft = $('#arrow-left');
	arrowRight = $('#arrow-right');

	//swap team members
	var autoSlide = setInterval(function(){
		if(!paused){
			scrollTeam(1);
		}
	},cycleTime);

	$('#team').mousemove(function(event){
		paused = true;
		var y = event.pageY - $(this).offset().top;
		var h = $(this).height();
		var pos = y / h * 100;
		if(pos >= 50) {
			 displayArrowControls(); //show arrows		
			 onMouseTrap = true;	
		}else {
			hideArrowControls(); //hide arrows
			onMouseTrap = false;
		}
		console.log('enter');
	});

	$('#team').mouseleave(function(event){
		paused = false;
		hideArrowControls(); //hide arrows
		console.log('exit');
		
	});

}); //docready

function getMouseYRelativeTo(event, elem){
	var y = event.pageY - $(elem).offset().top;
	var h = $(this).height();
	var pos = y / h * 100;
	return pos;
}

function cycleItems(){
	var item = $('.team-member').eq(currentIndex);
	// teamMembers.hide();
	var prevItem = $(teamMembers).eq(currentIndex-1);
	// $(prevItem).hide();

	var pImg = prevItem.children('img');
	var pName = prevItem.children('h2');
	var pRoles = prevItem.children('ul');
	var pText = prevItem.children('p');

	// fade out previous item
	pImg.fadeTo(teamInfoFadeTime, 0, function(){
		pName.fadeTo(teamInfoFadeTime, 0, function(){
			pRoles.fadeTo(teamInfoFadeTime, 0, function(){
				pText.fadeTo(teamInfoFadeTime, 0, function(){
					prevItem.hide();
					prevItem.css('display', 'none');

					//hide all team members (TODO: duplicate team member bug)
					$('.team-member').hide();
					//unhide current team member
					item.show();
					//set opacity of everything to 0
					//to get ready for progressive fade in 
					var img = item.children('img');
					var name = item.children('h2');
					var roles = item.children('ul');
					var text = item.children('p');

					img.css('opacity', 0);
					name.css('opacity', 0);
					roles.css('opacity', 0);
					text.css('opacity', 0);
					
					//fade in mugshot
					img.fadeTo(teamInfoFadeTime, 1, function(){
						//fade in name
						name.fadeTo(teamInfoFadeTime, 1, function(){
							//fade in roles
							roles.fadeTo(teamInfoFadeTime,1, function(){
								//fade in text
								text.fadeTo(teamInfoFadeTime,1);
							});
						});
					});
				});
			});
		});
	});	
	// updateArrowControls();
}

function scrollTeam(direction){
	if(currentIndex+direction>=0 && currentIndex+direction <numTeamMembers){
		currentIndex += direction;
	} else {
		currentIndex = 0;
	}
	cycleItems();
	// hideArrowControls();
	// displayArrowControls(); //update arrows		
}

function updateArrowControls(){
	if(onMouseTrap){
		displayArrowControls();
	} else {
		hideArrowControls();
	}
}

function hideArrowControls(){
	arrowLeft.fadeTo(arrowFadeTime, 0);
	arrowRight.fadeTo(arrowFadeTime, 0);	
	console.log('hiding arrow controls');
	
}

function displayArrowControls(){
	console.log('showing arrow controls');
	
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
		console.log('arrows displayed');
}

