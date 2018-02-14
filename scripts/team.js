var currentIndex = 0;
			var items = $('.team-member');
			var itemCount = items.length;
			var refreshTime = 3000;

			function cycleItems(){
				var item = $('.team-member').eq(currentIndex);
				items.hide();
				item.css('display','inline-block');
			}

			var autoSlide = setInterval(function(){
				currentIndex += 1;
				if (currentIndex > itemCount - 1){
					currentIndex = 0;
				}
				cycleItems();
			},refreshTime);
