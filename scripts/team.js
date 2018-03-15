var currentIndex = 0;
var teamMembers = $('.team-member');
var numTeamMembers = teamMembers.length;
var paused = false;
var arrowLeft;
var arrowRight;
var arrowFadeTime = 200;
var teamInfoFadeTime = 500;
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
		// displayArrowControls(); //show arrows			
	}, function(){
		paused = false;
		// displayArrowControls(); //hide arrows
	});

	$('.mouse-trap').hover(function(event){
		displayArrowControls();
	}, function() {
		hideArrowControls();
	});
	

}); //docready

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
					item.css('display','inline-block');	
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
	
}

function scrollTeam(direction){
	if(currentIndex+direction>=0 && currentIndex+direction <numTeamMembers){
		currentIndex += direction;
		displayArrowControls(); //update arrows		
		cycleItems();
	}
}

function hideArrowControls(){
	arrowLeft.fadeTo(arrowFadeTime, 0);
	arrowRight.fadeTo(arrowFadeTime, 0);
	
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