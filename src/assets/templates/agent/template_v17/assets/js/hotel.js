/*-----------search city list--------------*/
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


	//Specific Room available check js 
	$(".hotel-Rooms-list").on('click','.specific-room-available-check',function(){
		var itemattr = $(this).attr('item-search-key');	
		    //$(".lodrefrentwhole").show();           
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
		var itemattr 	= $(this).attr('itemattr');
		var itemkey 	= $(this).attr('itemkey');
		    $(".lodrefrentwhole").hide();           
		    $.ajax({
		    type:'POST', 
		    data:{HotelItemData:itemattr},
		    url: webURL+'hotel/hotel_details', 
		    success: function(response) {  
		        var response = JSON.parse(response); 

		        if(response.flag==true)
		        {   
					$('.hotelmodaldetails').html(response.hotel_details);
					$(".lodrefrentwhole").hide();   
					$('#myHotelCarousel').carousel();
					$('#hotel-modal').modal({show: 'true'});
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


	//Search form js
	$("#hotel_rooms_no").on('click',function(){
		var maxroomid 		= parseInt($( ".search-room-list-area > div:last" ).data( "search-room" ));
		var hotel_rooms_no  = parseInt($(this).val());
		var search_room 	= $('.hotel-room-pax-list').html();

		if(maxroomid < hotel_rooms_no)
		{
			var search_room_row = '';
			for(var i=maxroomid;i<hotel_rooms_no;i++)
			{
				var rowid =i+1;
				search_room_row   	= search_room_row+'<div class="col-md-12 search-room-list" id="search-hotel-room-'+rowid+'"  data-search-room="'+rowid+'">'+search_room+'</div>';		
			}
			$(".search-room-list-area").last().append(search_room_row);
		}
		else
		{
			var changeroom =  maxroomid - hotel_rooms_no ;
			var rowid      =  maxroomid 
			for(var i=0;i<changeroom;i++)
			{		
				$('.search-room-list-area #search-hotel-room-'+rowid).remove();		
				var rowid =rowid-1;
			}
		}
	})
