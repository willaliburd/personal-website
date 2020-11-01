/*
Theme Name: Resumr
Author: CREATEBRILLIANCE - Media & Consulting
Author URI: http://www.createbrilliance.com
Version: 1.0
*/

var Resumr;

( function($) {"use strict";

Resumr = window.Resumr || {};

/****************************************************************************************************
 * NAVIGATION
 *
 *
 *
****************************************************************************************************/
Resumr.nav = function (option){
	
	
		$('.sidebar-nav').onePageNav({
			currentClass : 'active',
			changeHash : false,
			scrollSpeed : 750,
			scrollOffset : 0,
			scrollThreshold : 0.5,
			easing : 'easeOutExpo',
			filter : ':not(.ex)',
			end:function(){closeMenu()}
		});




		//SIDE MENU


		//add delay to li elemnts from menu
		var delay = 0;
		$("#sidebar-wrapper .sidebar-nav li a").each(function() {
			delay = delay + 1;
			$(this).css({
				"transition-delay" : "0." + delay + "s",
				"-webkit-transition-delay" : "0." + delay + "s",
				"-o-transition-delay" : "0." + delay + "s",
				"-moz-transition-delay" : "0." + delay + "s"
			});

		});

		//trigger function for menu
		$("#menu-toggle").bind("click touchstart", function(e) {
			e.preventDefault();
			if ($("#menu-toggle").hasClass("bt-menu-open")) {				
				closeMenu();				
			} else {				
				showMenu();
			}
		});
			
		if(option == "touch"){
			//swipe		
			$("body").swipe({
				//Generic swipe handler for all directions
				swipe : function(event, direction, distance, duration, fingerCount) {
					//use direction right on your own risk. buggy when scrolling
					/*if(direction == "right"){ //open menu
						showMenu();
					}*/
					if(direction == "left"){ //close
						if ($("#menu-toggle").hasClass("bt-menu-open")) {
							closeMenu();
						}
					}
				},
				threshold : 75,
				allowPageScroll:"vertical"
			});
		}	
		
		
		function closeMenu(){
				$("#menu-toggle").removeClass("bt-menu-open").addClass("bt-menu-close");
				$("#sidebar-wrapper").removeClass("active");					
				$(".slide-menu section").unbind("click");			
				$("body").removeClass("slide-menu");	
		}
		function showMenu(){
				$("#menu-toggle").removeClass("bt-menu-close").addClass("bt-menu-open");
				$("#sidebar-wrapper").addClass("active");
				$("body").addClass("slide-menu");
				//click handler for click outside = close menu
				$(".slide-menu section").click(function(){
    				closeMenu();
				});
		}
		
		
		
}
/****************************************************************************************************
 * header carousel
 *
 *
 *
****************************************************************************************************/
Resumr.bootstrapCarousel = function (options){
	
		$.each(options, function(index,value) {
          
          if(value != null){
          	//if carousel has parameters 
         	$(index).carousel(value);
          }else{
          	//if there are no parameters
          	$(index).carousel();
          }
              
       });


}	
/****************************************************************************************************
 * OWL CAROUSEL
 *
 *
 *
****************************************************************************************************/
Resumr.owlCarousel = function (options){
	
	$.each(options, function(index,value) {
          
          if(value != null){
          	//if carousel has parameters 
         	$(index).owlCarousel(value);
          }else{
          	//if there are no parameters
          	$(index).owlCarousel();
          }
              
       });


		
}

/****************************************************************************************************
 * PORTFOLIO
 * 
 *
 *
 *
****************************************************************************************************/

Resumr.portfolio = function (selector,options){
				$(selector).portfolioExpander(options);
	
}	
		
/****************************************************************************************************
 * NIVO-LIGHTBOX
 * fixed ios issues
 *
 *
 *
****************************************************************************************************/
	
		if (/webkit.*mobile/i.test(navigator.userAgent)) {
			$('.lightbox').nivoLightbox({
				effect : 'nonexistent',
				afterHideLightbox : function() {
					$('.nivo-lightbox-content').empty();
				}
			});
		} else {
			$('.lightbox').nivoLightbox({
				effect : 'fall'
			});
		}

/****************************************************************************************************
 * ANIMATED KNOBS
 *
 *
 *
****************************************************************************************************/
Resumr.knobs = function(animated){
		
		if(animated == "animated"){
		
				if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
					// Triggering only when it is inside viewport
					$('.knob').waypoint(function() {
						// Triggering now
						var $this = $(this);
						var myVal = $this.attr("rel");
						$this.knob({
						});
						$({
							value : 0
						}).animate({
							value : myVal
						}, {
							duration : 1000,
							easing : 'swing',
							step : function() {
								$this.val(Math.ceil(this.value)).trigger('change');
							}
						})
					}, {
						triggerOnce : true,
						offset : function() {
							return $(window).height() - $(this).outerHeight();
						}
					});
				} else {
					$(".knob").each(function() {
						var $this = $(this);
						var myVal = $this.attr("rel");
						$(this).knob();
						$(this).val(myVal);
						$this.val(Math.ceil(myVal)).trigger('change');
					});	
		
				}
		
		}
		
}		
/****************************************************************************************************
 * SCROLL TOP
 *
 *
 *
****************************************************************************************************/
Resumr.scrollTop = function() {

		var windowWidth = $(window).width(), didScroll = false;
		var $arrow = $('#back-to-top');
		$arrow.bind("click touchstart", function(e) {
			$('body,html').animate({
				scrollTop : "0"
			}, 750, 'easeOutExpo');
			e.preventDefault();
		})
		$(window).scroll(function() {
			didScroll = true;
		});
		setInterval(function() {
			if (didScroll) {
				didScroll = false;
				if ($(window).scrollTop() > 1000) {
					$arrow.css('display', 'block');
				} else {
					$arrow.css('display', 'none');
				}
			}
		}, 250);


}
/****************************************************************************************************
 * CONTACT FORM
 *
 *
 *
****************************************************************************************************/
Resumr.contactForm = function (){


		$("#contact-submit").on('click touchstart', function(e) {
			e.preventDefault();
			$("#contact-submit").html("<i class='fa fa-cog fa-spin'></i> SENDING").prop('disabled', true);
			var $contact_form = $('#contact-form');
			var fields = $contact_form.serialize();
			$.ajax({
				type : "POST",
				url : "inc/contact.php",
				data : fields,
				dataType : 'json',
				success : function(response) {
					if (response.status) {
						$('#contact-form input').val('');
						$('#contact-form textarea').val('');
					}
					$('#contact-form-response').empty().html(response.html);
					$("#contact-submit").html("<i class='fa fa-check'></i> SUBMIT").prop('disabled', false);
				}
			});
			return false;
		});
		
}
/****************************************************************************************************
 * GOOGLE MAPS INTEGRATION
 *
 *
 *
****************************************************************************************************/
Resumr.map = function (options){


		var settings = $.extend({
            type		: 	"color",
            selector	: 	"map-container"
        }, options);

		var mapSelector = settings.selector;

		var mapOptions = {
			location : $("#" + mapSelector).attr("data-location"),
			infoBoxText : $("#" + mapSelector).attr("data-text"),
			zoomLevel : $("#" + mapSelector).attr("data-zoom"),
			mapType : $("#" + mapSelector).attr("data-mapType"),
			
		}

		initmap(mapSelector, mapOptions);

		function initmap(selector, mapOptions) {

			var address = mapOptions.location;
			
			if(settings.type != "color"){
				//black and white
			var mapStyleOptions = [{
				featureType : "all",
				elementType : "all",
				stylers : [{
					saturation : -100,
					invert_lightness : true
				}]
			}];
			}else{
				//color
				var mapStyleOptions = [{
				featureType : "all",
				elementType : "all"
				}]
			}

			var map = new google.maps.Map(document.getElementById(selector), {
				mapTypeId : google.maps.MapTypeId.mapType,
				scrollwheel : false,
				draggable : false,
				disableDefaultUI : true,
				zoom : parseInt(mapOptions.zoomLevel),
				styles :mapStyleOptions
			});

			//responsive center
			google.maps.event.addDomListener(window, "resize", function() {
				var center = map.getCenter();
				google.maps.event.trigger(map, "resize");
				map.setCenter(center);
			});

			var map_pin = "img/assets/map-marker.png";
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				'address' : address
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var marker = new google.maps.Marker({
						position : results[0].geometry.location,
						map : map,
						icon : map_pin
					});

					map.setCenter(results[0].geometry.location);

					/*CREATE INFOBOX*/
					
					var boxText = document.createElement("div");
					boxText.innerHTML = "<div class='infoBox'>" + "<div class='content'>" + mapOptions.infoBoxText + "</div>" + "</div>";
					var myOptions1 = {
						content : boxText,
						disableAutoPan : false,
						pixelOffset : new google.maps.Size(30, 0),
						boxClass : 'map-box',
						alignBottom : true,
						pane : "floatPane"
					};
					var ib = new InfoBox(myOptions1);
					ib.open(map, marker);
					google.maps.event.addListener(marker, "click", function() {
						ib.open(map, marker);
					});

				}
			});
		}
		
		
}		
/****************************************************************************************************
 * HELPER
 *
 *
 *
****************************************************************************************************/
	if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {

		$(".background-middle-full").removeClass("fixed");
	}




/*				
 * 
 * 
 * 
 *  	WINDOW PRELOAD FUNCTIONS
 * 
 * 
 * 
 * 
 * */

/****************************************************************************************************
 * PRELOADER
 *
 *
 *
****************************************************************************************************/
Resumr.preloader = function() {


		
		$(window).load(function() {
			$('#preloader').fadeOut(800, function() {
				$('body').css('overflow', 'visible');
			});
		});
			
}			
/****************************************************************************************************
 *  SCROLLING ANIMATIONS
 *	
 *	takes data-animation, data-animation-delay as data attributes. Element needs to have class animation
 *
****************************************************************************************************/			
Resumr.scrollAnim = function(option){	
		$(window).load(function() {
			if(option == "yes"){		
					//trigger css3 animations
					// Handle appear event for animated elements
					var wpOffset = 80;
					if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
						wpOffset = 100;

						$.fn.waypoint.defaults = {
							context : window,
							continuous : true,
							enabled : true,
							horizontal : false,
							offset : 0,
							triggerOnce : false
						};

						$('.animated').waypoint(function() {
							var elem = $(this);
							var animation = elem.data('animation');
							if (!elem.hasClass('visible') && elem.attr('data-animation') !== undefined) {
								if (elem.attr('data-animation-delay') !== undefined) {
									var timeout = elem.data('animation-delay');
									setTimeout(function() {
										elem.addClass(animation + " visible");
									}, timeout);
								} else {
									elem.addClass(elem.data('animation') + " visible");
								}
							}
						}, {
							offset : wpOffset + '%'
						});
					} else {
						//if mobile, don't do it just display elements
						$('.animated').each(function() {
							$(this).css("visibility", "visible");
						});
					}



				}else{
				//don't trigger css3 animation, but display elements
						$('.animated').each(function() {
							$(this).css("visibility", "visible");
						});
				}
		}); //window load
}


/****************************************************************************************************
 * SUPERSLIDES
 *
 *
 *
****************************************************************************************************/
Resumr.headSlider = function(selector, options){
	
	$(window).load(function() {			
		$(selector).superslides(options);
	});
	
}




}(jQuery)); 
