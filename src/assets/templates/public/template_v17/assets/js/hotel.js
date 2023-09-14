jQuery(".search-hotel-details").hide();


/*-----------Multi Room list start--------------*/
jQuery( ".room-quantity-selector-plus" ).click(function(event) {
	var quantity = parseInt(jQuery('.room-quantity-selector-value').val());
	quantity 	 = quantity+1;
	if(quantity <= 4){
		jQuery('.room-quantity-selector-value').val(quantity);
		quantity_selector_room(quantity);
	}
}); 

jQuery( ".room-quantity-selector-minus" ).click(function(event) {
	var quantity = parseInt(jQuery('.room-quantity-selector-value').val());
	quantity 	 = quantity-1;
	if(quantity > 0){
		jQuery('.room-quantity-selector-value').val(quantity);
		jQuery("#append_multi_room_row .hrrow" ).last().remove();
	}
}); 

function quantity_selector_room(argument){
	var htmlData  = jQuery( ".samplRowRoom" ).html();
	var totalMrow = jQuery( "#append_multi_room_row .hrrow" ).length;		
	if(totalMrow<=4){
		var uniqueID = UniqueID();
		var res 	 = htmlData.replace("{{hs_multi_id}}", "ams" + uniqueID);
		res 		 = res.replace("{{hs_multi_id}}", "ams" + uniqueID);
		jQuery( "#append_multi_room_row" ).append( res );
	}
}
/*-----------Multi Room list end--------------*/
 
/*-----------child age list start--------------*/
jQuery("#append_multi_room_row").on('change','.child-quantity-selector',function(){
	var quantity = jQuery(this).val();
	var rowid 	 =  jQuery( this ).parent().closest( '.hrrow' ).attr('id');
	quantity_selector_child(rowid,quantity);

})
function quantity_selector_child(rowid,quantity){
		var htmlData 	= jQuery( ".samplRowChild" ).html();
		var childlength = jQuery( "#append_multi_room_row #"+rowid+" .row-child" ).length;		
		if(quantity==0){
			jQuery("#append_multi_room_row #"+rowid).find('.row-child ').remove();
		}
		else{
			if(childlength < quantity ){
				for(cid=childlength;cid<quantity;cid++){
					jQuery( "#append_multi_room_row #"+rowid ).append( htmlData );
				}
			}else{
				jQuery("#append_multi_room_row #"+rowid+" .row-child").last().remove();
			}
		}
}
/*-----------child age list end--------------*/
function hotel_loader(e)
{
	var hotel_destination_id = $("#hotel_destination_id").val();
	if(hotel_destination_id.length==0)
	{
		$("#Search_hotel_destination").val('');
		$("#error_destination").html('Please select valid destination');		
		e.preventDefault();
	}
	else
	{	
		$(".lodrefrentwhole").show();		
	}

}

$(document).on('keyup',".hoteldestination", function(){  
			$("#hotel_destination_id").val('');
			$("#error_destination").html('')
		    $(this).autocomplete({   
		      source: webURL+"hotel/find_destination",
		       messages: {
		              noResults: '',
		              results: function() {}
		          },
		      minLength: 3,//search after three characters
		      autoFocus: true, // first item will automatically be focused
		      change: function(event,ui){
		        $(this).focus();
		        //console.log(ui.item.id);
		        $("#hotel_destination_id").val(ui.item.id);
		           
		        }
		    });

		  }); 
$(document).on('focus',".hoteldestination", function(){  
	var Search_hotel_destination = $("#Search_hotel_destination").val();
	if(Search_hotel_destination.length ==0)
	{
		 $("#hotel_destination_id").val(ui.item.id);
	}

}); 

//Room available js 
$(".hotel-available-rooms").on('click',function(){
	var itemattr = $(this).attr('itemattr');
	var itemkey = $(this).attr('itemkey');
	    $(".lodrefrentwhole").show();           
	    $.ajax({
	    type:'POST', 
	    data:{HotelItemData:itemattr},
	    url: webURL+'hotel/rooms_available', 
	    success: function(response) {  
	        var response = JSON.parse(response); 
	        if(response.flag==true)
	        {
	          $(".lodrefrentwhole").hide();   
	          //alert(response.room_details);
			  $("#hotelRoomslist"+itemkey).html(response.room_details);
	        }
	        else
	        {

	          alert('No data found');
	          $(".lodrefrentwhole").hide();   
	        }

	    },
	    error: function(){             
	      $(".lodrefrentwhole").hide();             
	    }
	});

})

//Specific Room available check js 
$(".hotel-Rooms-list").on('click','.specific-room-available-check',function(){
	var itemattr = $(this).attr('item-search-key');	
	    $(".lodrefrentwhole").show();           
	    $.ajax({
	    type:'POST', 
	    data:{HotelItemData:itemattr},
	    url: webURL+'hotel/booking_prepare_check', 
	    success: function(response) {  
	        var response = JSON.parse(response); 
	        if(response.status==true)
	        {
	          $(".lodrefrentwhole").hide();   
	          window.location.href = response.href;
	     			  
	        }
	        else
	        {
	          $(".lodrefrentwhole").hide();   
	          alert(response.msg);
	        }

	    },
	    error: function(){             
	      $(".lodrefrentwhole").hide();             
	    }
	});

})

//Room available js 
$(".hotel-view-details").on('click',function(){
	var itemattr = $(this).attr('itemattr');
	var itemkey = $(this).attr('itemkey');
	    $(".lodrefrentwhole").show();           
	    $.ajax({
	    type:'POST', 
	    data:{HotelItemData:itemattr},
	    url: webURL+'hotel/hotel_details', 
	    success: function(response) {  
	        var response = JSON.parse(response); 
	        if(response.flag==true)
	        {   
	        	//alert(response.room_details);
					$('.hotelmodaldetails').html(response.hotel_details);
					$(".lodrefrentwhole").hide();   
					$('#myHotelCarousel').carousel();
					$('#hotel-modal').modal({show: 'true'});
					 var galleryThumbs = new Swiper('.gallery-thumbs', {
				        spaceBetween: 10,
				        slidesPerView: 4,
				        loop: true,
				        freeMode: true,
				        loopedSlides: 5, //looped slides should be the same
				        watchSlidesVisibility: true,
				        watchSlidesProgress: true,
				        observer: true,
				        observeParents: true,
				    });
				    var galleryTop = new Swiper('.gallery-top', {
				        spaceBetween: 10,
				        loop:true,
				        loopedSlides: 5, //looped slides should be the same
				        observer: true,
				        observeParents: true,
				        navigation: {
				            nextEl: '.swiper-button-next',
				            prevEl: '.swiper-button-prev',
				        },
				        thumbs: {
				            swiper: galleryThumbs,
				        },
				    });
	        }
	        else
	        {

	          alert('No data found');
	          $(".lodrefrentwhole").hide();   
	        }

	    },
	    error: function(){             
	      $(".lodrefrentwhole").hide();             
	    }
	});

})



$('.hotel-thum-image').each(function(){
  	var itemimage = $(this).attr("item-image");
		if(itemimage.length > 0)
		{   
			$(this).attr('src',itemimage);
		} 
});

$(".hotel-map").on('click',function(){
	var Latitude = $(this).attr('Latitude');
	var Longitude = $(this).attr('Longitude');
	initialize(Latitude,Longitude);
})

	function initialize(Latitude,Longitude)
    {

        // Set static latitude, longitude value
        var latlng = new google.maps.LatLng(Latitude,Longitude);
        // Set map options
        var myOptions = {
            zoom: 16,
            center: latlng,
            panControl: true,
            zoomControl: true,
            scaleControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        // Create map object with options
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        // Create and set the marker
        marker = new google.maps.Marker({
            map: map,
            draggable:false,
            position: latlng
        });

        // Register Custom "dragend" Event
        google.maps.event.addListener(marker, 'dragend', function() {

            // Get the Current position, where the pointer was dropped
            var point = marker.getPosition();
            // Center the map at given point
            map.panTo(point);
            // Update the textbox
            document.getElementById('lat').value=point.lat();
            document.getElementById('lng').value=point.lng();
        });
        google.maps.event.trigger(map, 'resize');
    }


    $("#hotelName").keyup(function()
    {     
        ShowHotels();            
    });   
    
	$("#hotelAddress").keyup(function()
    {       
        ShowHotels();
    });  

 $("#slider-range").bind("slidestop",function(event,ui){  ShowHotels(); });


function ShowHotels() {
    $minVal = parseInt($("#slider-range").slider("values", 0));
    $maxVal = parseInt($("#slider-range").slider("values", 1));
    $hotel_name = $('#hotelName').val();
    $hotel_location = $('#hotelAddress').val();
    var h_cnt = 0;
    $Starval = new Array;
    $(".filtchk:checked").filter(function() {
        $Starval.push($(this).val());
    });
    $("#result_datas .hotel-search-list").filter(function() {
        $star = $(this).attr("data-star");
        $hotel_name_val = $(this).attr("data-hotel-name");
        $hotel_loc_val = $(this).attr("data-address");
        if ($Starval != '') {
           var starshow = $.inArray($star, $Starval) >= 0 ? true : false;
        } else {
            var starshow = true;
        }
        if (($hotel_name_val.toUpperCase()).indexOf($hotel_name.toUpperCase()) != -1) {
            var hotel_name_final = true;
        } else {
            var hotel_name_final = false;
        }
        if (($hotel_loc_val.toUpperCase()).indexOf($hotel_location.toUpperCase()) != -1) {
            var hotel_loc_final = true;
        } else {
            var hotel_loc_final = false;
        }
        $dataprice = parseInt($(this).attr("data-price"));
        $result_option = $(this).id;
        // alert($result_option);
        if (($dataprice <= $maxVal && $dataprice >= $minVal) && starshow && hotel_name_final && hotel_loc_final) {
        // alert($maxVal + " ===== " +$minVal);
            h_cnt += 1;
            $(this).show();
        } else {
            $(this).hide();
        }
        $('#Total-Hotel-count').html(h_cnt);
    });
}



var categoryContentstar = $('div#result_datas div.hotel-search-list'); // Path for flights
$(".filter_star").on('change', '.Hotel_star',function(event){
  categoryContentstar.hide(); // if any of the checkboxes for brand or team are checked, you want to show LIs containing their value, and you want to hide all the rest.
  var selectedFilters1 = $(".filter_star .Hotel_star").filter(':checked');
    if (selectedFilters1.length > 0) {

    selectedFilters1.each(function (i, el) {    
      $('div#result_datas div.hotel-search-list[data-star="'+ el.value +'"]').show();
      //console.log('div#result_datas div.hotel-search-list[data-star="'+ el.value +'"]');
    });
  }
});

	
	var min_count = 0;
    var sec_count = 0;
	if (Hotel_Booking_Timer !== undefined && Hotel_Booking_Timer !== null) 
	{ 
		var newVal = Hotel_Booking_Timer.split(':');
		min_count = parseInt(newVal[0], 10);
		sec_count = parseInt(newVal[1], 10);
	}
    function Hotel_countDown(){
 
        var timer = document.getElementById("Hotel_Booking_Timer");
        if(min_count >= 0){
			if(sec_count > 0)
			{
				sec_count--;
				var show_min = hotel_n(min_count);
				var show_sec = hotel_n(sec_count);
				timer.innerHTML = "Please complete your booking within "+show_min+' : '+show_sec+" seconds.";
				setTimeout("Hotel_countDown()", 1000);
				$('input[name="count_min"]').val(min_count);
				$('input[name="count_sec"]').val(sec_count);
			}else
			{
				if(min_count == 0 && sec_count == 0)
				{
					alert("SEARCH SESSION EXPIRED... Please Try Again");
					//window.location.reload();
					window.location.replace(webURL);

					//window.location.href = "http://www.globalwings.in/passanger-details.php";
				}else
				{
					sec_count = 59;
					min_count = min_count - 1;
					
					$('input[name="count_min"]').val(min_count);
					$('input[name="count_sec"]').val(sec_count);
					
					var show_min = hotel_n(min_count);
					var show_sec = hotel_n(sec_count);
					timer.innerHTML = "Please complete your booking within "+show_min+' : '+show_sec+" seconds.";
					setTimeout("Hotel_countDown()", 1000);
				}
			}
        }
    }
    
    function hotel_n(n)
    {
		return n>9? n : '0'+n;
	}
	Hotel_countDown();  