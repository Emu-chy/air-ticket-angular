var UniqueID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Agent Login Area
function submit_agent_login_form(form) {
	$(".actionMsg").html( "" );
	$("#emailErrorMsg").html("");
	var email = form.email.value,
		password = form.password.value;
	if( email.trim()=="" || password.trim()==""  ){
		$(".actionMsg").html("Email or Password is empty.");
		return false;
	}
	if( validateEmail(email)!=true ){
		$(".actionMsg").html("Invalid email address.");
		return false;
	}
	$.ajax({
		url: webURL + 'login/agent_login',
		type: 'POST',
		data: { formData:$(form).serialize() },
		beforeSend: function() { jQuery(".lodrefrentwhole").show(); },
	})
	.done(function(jsonResponse) {
		jQuery(".lodrefrentwhole").hide();
		var jsonArray = JSON.parse(jsonResponse);
		$(".agent_login_token").val(jsonArray._token);

		if(jsonArray.msg!=""){
			$(".actionMsg").html( "<h5>" + jsonArray.msg + "</h5>" );
		}
		
		if(jsonArray.success=='true'){
			console.log("redirect to dashboard page.");
			//alert('ok');
			//window.location.href = webURL + 'home/index';
			window.location.reload();
		}
	})
	.fail(function() {
		alert( "Error. Fail to submit agent login form!" );
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	return false;			
}

// Agent Registration
function submit_agent_registration_form(form) {
	$(".actionMsg").html( "" );
	$("#emailErrorMsg").html("");
	var email = form.email_address.value,
		password = form.pwd.value;

	if( email.trim()=="" || password.trim()=="" ){
		$(".Reg-actionMsg").html("Email or Password is empty.");

		return false;
	}
	if( validateEmail(email)!=true ){
		$(".Reg-actionMsg").html("Invalid email address.");
		return false;
	}
	$.ajax({
		url: webURL + 'login/agent_registration',
		type: 'POST',
		data:  $(form).serialize() ,
		beforeSend: function() { jQuery(".lodrefrentwhole").show(); },
	})
	.done(function(jsonResponse) {
		jQuery(".lodrefrentwhole").hide();
		var jsonArray = JSON.parse(jsonResponse);
		$("#agent_login_token").val(jsonArray._token);

		if(jsonArray.msg!=""){
			$(".Reg-actionMsg").html( jsonArray.msg  );
		}
		
		if(jsonArray.success=='true'){
			console.log("redirect to dashboard page.");
			//alert('ok');
			//window.location.href = webURL + 'home/index';
			window.location.reload();
		}
	})
	.fail(function() {
		alert( "Error. Fail to submit agent login form!" );
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	return false;			
}

	// Datepicker Area : Start
	  
	// Datepicker Area : End

	// File Upload Area : Start
	$('.file').on('change', function () {
	        var file = $(".file");
	        var file_data = $(this).prop('files')[0];
	        //alert(file_data); 
	        var itemid = $(this).attr('itemid');
	        var form_data = new FormData();
	        form_data.append('file',file_data);
	        $.ajax({
	            url: webURL+'ajax/ProfileSet', // point to server-side controller method  
	            dataType: 'text', // what to expect back from the server 
	            cache: false,
	            contentType: false,
	            processData: false,
	            data: form_data,
	            type: 'post',
	            success: function (response) {
	                var objresponse = jQuery.parseJSON(response);
	                if(objresponse.flag==0)
	                {
	                    alert(objresponse.msg);    
	                    file.replaceWith( file.val('').clone( true ) );
	                }
	                else
	                {
	                    $("#filelist").val(objresponse.FileName);
	                }
	               
	            },
	            error: function (response) {
	                $('#msg').html(response); // display error response from the server
	            }
	        });
	    }); 
	// File Upload Area : End

	// Online Transaction
    $(".AmountDeposited,.paymentoption").on('keyup change',function(){
      var AmountDeposited =  $('.AmountDeposited').val();
      var paymentoption   =  $('.paymentoption:checked').val();

      if(AmountDeposited.length > 0 && paymentoption.length > 0)
      {
        $.ajax({
         url: webURL + 'home/online_service_charge',
         type: 'POST',
         data: {'amount':AmountDeposited ,'paymentoption':paymentoption},
        })
        .done(function(response) {
          var obj = JSON.parse(response); 
          if(obj.status==true)
          {
            $(".ServiceCharge").val(obj.service_charge);
          }
          else
          {
            $(".ServiceCharge").val('');
          }
        })
        .fail(function() {
          console.log("error");
        });
      } 
    });

    // Change Password
		jQuery(document).ready(function($) {
		  jQuery( "#confirm_pwd" ).keyup(function(event) {
		     jQuery("#confirm_pwd_help").html("");
		     jQuery("#update_password_btn").attr('disabled', 'disabled');

		     var confirm_pwd = jQuery(this).val(),
		     new_pwd = jQuery("#new_pwd").val();

		     if(new_pwd != confirm_pwd){
		        jQuery("#confirm_pwd_help").html("<strong> Confirm password does not match with new password. </strong>");
		     }
		     else {
		        if(confirm_pwd!="")
		          jQuery("#update_password_btn").removeAttr('disabled');
		     }
		  });
		});

	//Visa Passport Upload Option
	jQuery(document).ready(function($) {
		/* loader will hide */
		$(".visa-pp-image-upload").on('click',function(){
			var itemid = $(this).attr('itemid');
			$("#"+itemid).click();
		})

		jQuery( '.ajax_uploads' ).on('change', function(event) {				
		    for (var i = 0; i < this.files.length; i++) {
		        if( this.files[i].size>1000000000 ) {
		        	alert( 'Please select lower than 5mb' );
		            // alert( 'The selected file ' + filename_underline(this.files[i].name) + ' size is greater than 100kb.' );
		            jQuery(this).val('');
		            return false;
		        }
		    }

		    var thisId 		= jQuery(this).attr('id'); 
			var formData 	= new FormData();

			formData.append("userfile", this.files[0]);
			formData.append('field_id', jQuery(this).attr('id') );
			formData.append('booking_no', jQuery('#'+thisId).attr('booking_no') );
			formData.append('passenger_id', jQuery('#'+thisId).attr('passenger_id') );
			formData.append('option_type', jQuery('#'+thisId).attr('option_type') );
			formData.append('passenger_fullname', jQuery('#'+thisId).attr('passenger_fullname') );
			/* loader will show */

		    $.ajax({
		    	url: webURL + 'ajax/ajax_upload_action',
		    	type: 'POST',
		        cache: false,
		        contentType: false,
		        processData: false,			    	
		    	data: formData,
		    })
		    .done(function( json_response ) {
		    	var response = JSON.parse( json_response );
		    	//console.log(response);
		    	jQuery( '.' + response.field_id ).val(response.field_name);
		    	jQuery( '.img_' + response.field_id ).attr('src', response.img_path );
		    	jQuery( '.remove_' + response.field_id ).attr('file-name',response.field_name);
		    	jQuery( '.remove_' + response.field_id ).attr('file-id',response.field_id);
		    	jQuery( '.remove_' + response.field_id ).show('slow');
		    })
		    .fail(function() {
		    	console.log("error on file uploading");
		    })
		    .always(function() {
		    	/* loader will hide */
		    	console.log("file upload complete");
		    });
		});
	}); 


	// Online Payment For Package
	function OnlinepaymentCharge()
    {
      var AmountDeposited =  $("#Total-payable-amount").attr('payable-amount');
      var paymentoption   =  $('.Booking-paymentoption:checked').val();
      if( paymentoption!=undefined && AmountDeposited.length > 0 && paymentoption.length > 0)
      {
        $.ajax({
         url: webURL + 'ajax/online_service_charge',
         type: 'POST',
         data: {'amount':AmountDeposited ,'paymentoption':paymentoption},
        })
        .done(function(response) {
          var obj = JSON.parse(response); 
          if(obj.status==true)
          {
                    	
            $(".online-service-charge").html(obj.service_charge);
            $(".online-Total-Pay").html(obj.onlinePayamount);
            $(".online-payment-area").show(500);
          }
          else
          {
          	 $(".online-payment-area").hide(500);
            $(".ServiceCharge").val('');
          }
        })
        .fail(function() {
          console.log("error");
        });
      }
      else
      {
      	 $(".online-payment-area").hide(500);
      } 
    }


	// For Set Message Flash Data
	$(document).ready(function(){
		setTimeout(function() { $(".message").fadeOut(2500); }, 3000);
		setTimeout(function() { $(".messageerror").fadeOut(2500); }, 3000);
	}); 

    // If payment confirm checkbox checked then show Booking Confirm Button
    $("#Flightconfirm").on('click',function()
    {
		if($('#confirm').prop('checked'))
		{
			$('.Flight-booking-submit').prop('disabled', false);
		}
		else
		{
			$('.Flight-booking-submit').prop('disabled', true);
		}            
    });

	// Ricket Fare Show/Hide
   	$(document).ready(function(){
      $('#fare_show_hide').on('click',function(){
        var itemvalue = $(this).attr('itemvalue');
        $.ajax({
          type:'GET',            
          url: webURL+'flight/ticket_price_status/'+itemvalue,
          success: function(response) {  
               
          },
          error: function(){             
            
          }
        });

        if(itemvalue=='1')
        {
          $(this).attr('itemvalue','2');
          $(this).html('Show Fare Info');
          $('#hide_area').hide('slow');
        }
        else
        {
          $(this).attr('itemvalue','1');
          $(this).html('Hide Fare Info');
          $('#hide_area').show('slow');
        }
      });
  	});


  	// Ticket Price Modify
  	$("#BasePrice, #TaxPrice").on('change',function(){

        var BasePrice     = $("#BasePrice").val();
        var TaxPrice      = $("#TaxPrice").val();

          if(BasePrice >=0  && BasePrice != '') 
          {
            BasePrice = parseFloat(BasePrice);
          }
          else 
          {
          $("#BasePrice").val(' ').focus();            
            BasePrice=0;
          }

          if(TaxPrice >=0 && TaxPrice != '')
          {
            TaxPrice = parseFloat(TaxPrice);
          } 
          else
          {
          $("#TaxPrice").val('').focus();            
            TaxPrice = 0;
          }

          var othercharges  = parseFloat($("#othercharges").html());
          var total 		= BasePrice+TaxPrice+othercharges;
          $("#total").html(total);
    })


	//General  airport list search 
	$(document).on('focus keyup',".flightairports", function(){  
		$(this).autocomplete({   
	      	source: webURL+"dashboard/get_airports",
	       	messages: {
				noResults: '',
				results: function() {}
	        },
	      	minLength: 2,//search after two characters
	      	autoFocus: true, // first item will automatically be focused
	      	select: function(event,ui){
	        	$(this).focus();
	        }
		}).on('focus', function(event) {
			$(this).autocomplete("search", "top-cities");
		});
   	});

   	 //Hajj airport list search  
	 $(document).on('focus keyup',".hajj_flightairports", function(){  
	 	var itemattr =  $(this).attr('itemattr');
		$(this).autocomplete({   
			source: function(request, response) {
	    		$.getJSON(webURL+"dashboard/get_hajj_airports", { term:request.term,extraParams:itemattr }, 
	              response);
	  		},
	       	messages: {
				noResults: '',
				results: function() {}
	        },
	      	minLength: 2,//search after two characters
	      	autoFocus: true, // first item will automatically be focused
	      	select: function(event,ui){
	        	//$(this).focus();
	        }
		}).on('focus', function(event) {
			$(this).autocomplete("search", "hajj-cities");
		});
	});


	 // Package Tour Location  
	jQuery(document).on('keyup',".TourLocation", function() {   
		jQuery(this).autocomplete({   
			source: webURL+"package/get_location",
			messages: {
				noResults: '',
				results: function() {				
				}
			},
			minLength: 2,//search after two characters
			autoFocus: true, // first item will automatically be focused
			select: function(event,ui){
				// jQuery(this).focus();
			},
			close: function (event, ui) {			
		        var $canfocus = $(':focusable');
		        var index = $canfocus.index(document.activeElement) + 1;
		        if (index >= $canfocus.length) index = 0;
		        $canfocus.eq(index).focus();
	      	}
		});
	}); 



	 //Departure and arrival airport check
	 jQuery(document).ready(function($) {
		jQuery(".arriv_1").blur(function(event) {
		    var this_dep = jQuery( ".depa_1" ).val().trim();
		    var this_arr = jQuery( this ).val().trim();
		    if( this_dep!=null && this_arr.length>0 && this_dep==this_arr ){
		        alert( "Departure and arrival cannot be same." );
		        jQuery( this ).val("");
		    }
		});

		jQuery( "#append_multi_stop_row" ).delegate('.arriv_multi', 'blur', function(event) {
		    _validate_multi_dep_arrv(this);
		});
		jQuery(".arriv_multi").blur(function(event) {
		    _validate_multi_dep_arrv(this);
		});
		jQuery(".flight_trip_option_go_home").click(function(event) {
		    window.location.href = webURL + 'home/index';
		});
	});

		//Flight option value set
	jQuery( ".flight_trip_options" ).click(function(event) {
		var trip_option = jQuery(this).attr('trip-option');
		jQuery( ".flight_trip_option_value" ).val(trip_option);
	});

	//Return date disable for one way journey
	jQuery(".round_oneway").click(function(event) {
		jQuery( ".one_way_end_date" ).removeAttr('disabled');		
		jQuery( ".one_way_end_date" ).val("");	
		jQuery( ".one_way_end_check" ).removeClass('one_way_end_line');
		var trip_option = jQuery(this).attr('trip-option');
		if( trip_option=='one_way' )
		{
			jQuery( ".one_way_end_date" ).attr('disabled', true);
			jQuery( ".one_way_end_check" ).addClass('one_way_end_line');
		}
	});


	 // **************************************************************
	 // general flight passenger  count 
	 function setQuantitySelectorTotal() {
		var adultNum = jQuery( ".quantity-selector-current-adult" ).text(); 
		var childNum = jQuery( ".quantity-selector-current-child" ).text();
		var infantNum = jQuery( ".quantity-selector-current-infant" ).text();
		var total = parseInt(adultNum)+parseInt(childNum)+parseInt(infantNum); 
		jQuery( ".quantity-selector-total" ).val( total + " Passenger" );         
	}
	function quantity_selector_decrement(argument) {
		var selector = "quantity-selector-current-"+argument;
		var selector_input = "quantity-selector-current-"+argument+"-input";
		var adultNum = jQuery( "."+selector ).text();
		var total = parseInt(jQuery( ".quantity-selector-total" ).val()); 
		if(total>1 && adultNum>0){			
			if(argument=='adult'){
				var adult = parseInt(jQuery( "."+selector ).text());
				if(adult==0){
					return false;
				}

				var childNum = parseInt(jQuery( ".quantity-selector-current-child" ).text());					
				var infantNum = parseInt(jQuery( ".quantity-selector-current-infant" ).text());
				if(childNum==0 && adultNum==1){
					quantity_selector_increment("child"); 
				}
				if(adult >=0 && infantNum >=0 && adult==infantNum){
					quantity_selector_decrement("infant"); 
				}
			}

			jQuery( "."+selector ).text( parseInt(adultNum)-1 ); 
			jQuery( "#"+selector_input ).val( parseInt(adultNum)-1 );   
			console.log( argument + " is decremented." );      	
		}else if(adultNum==1 && argument=='adult') {	
			jQuery( "."+selector ).text( parseInt(adultNum)-1 ); 
			jQuery( "#"+selector_input ).val( parseInt(adultNum)-1 );  
			quantity_selector_increment("child"); 
		}
		else if(adultNum==1 && argument=='child') {	
			jQuery( "."+selector ).text( parseInt(adultNum)-1 ); 
			jQuery( "#"+selector_input ).val( parseInt(adultNum)-1 );  
			quantity_selector_increment("adult"); 
		}
		setQuantitySelectorTotal();
	}
	function quantity_selector_increment(argument) {
		var selector = "quantity-selector-current-"+argument;
		var selector_input = "quantity-selector-current-"+argument+"-input";
		var adultNum = jQuery( "."+selector ).text();
		var total = parseInt(jQuery( ".quantity-selector-total" ).val());
		if(total<9 && total>=0){
			jQuery( "."+selector ).text( parseInt(adultNum)+1 );
			jQuery( "#"+selector_input ).val( parseInt(adultNum)+1 );
			console.log( argument + " is incremented." );      	        	
		}
		setQuantitySelectorTotal();
	}

	    // General flight passenger count 
		jQuery( ".quantity-selector-decrement-adult" ).click(function(event) {
			quantity_selector_decrement("adult");
		}); 
		jQuery( ".quantity-selector-increment-adult" ).click(function(event) {
			quantity_selector_increment("adult");
		});
		jQuery( ".quantity-selector-decrement-child" ).click(function(event) {
			quantity_selector_decrement("child");
			//fight_search_pax_age_list('single','general','decrement');
		}); 
		jQuery( ".quantity-selector-increment-child" ).click(function(event) {
			quantity_selector_increment("child");
			//fight_search_pax_age_list('single','general','increment');
		});
		jQuery( ".quantity-selector-decrement-infant" ).click(function(event) {
			quantity_selector_decrement("infant");
		}); 
		jQuery( ".quantity-selector-increment-infant" ).click(function(event) {
			var total_adult  = parseInt(jQuery(".quantity-selector-current-adult").text());
			var total_infant = parseInt(jQuery(".quantity-selector-current-infant").text());
			if(total_adult > total_infant)
			{
				quantity_selector_increment("infant");
			}
		}); 

		// *************************************************************
		// multi flight passenger count 
		function setQuantitySelectorTotal_2(slug) {
			var adultNum = jQuery( "."+slug+"quantity-selector-current-adult-2" ).text();
			var childNum = jQuery( "."+slug+"quantity-selector-current-child-2" ).text();
			var infantNum = jQuery( "."+slug+"quantity-selector-current-infant-2" ).text();
			var total = parseInt(adultNum)+parseInt(childNum)+parseInt(infantNum);
			jQuery( "."+slug+"quantity-selector-total-2" ).val( total + " Passenger" );         
		}

		function quantity_selector_decrement_2(argument, slug) {
			var selector = ( slug + "quantity-selector-current-"+argument );
			var selector_input = ( slug + "quantity-selector-current-"+argument+"-input" );
			var adultNum = jQuery( "."+selector ).text();
			var total = parseInt(jQuery( "."+slug+"quantity-selector-total-2" ).val());
			if(total>1 && adultNum>0){			
				if(argument=='adult-2'){
					var adult = parseInt(jQuery( "."+selector ).text());					
					if(adult==0){					
						return false;
					}

					var childNum = parseInt(jQuery( ".quantity-selector-current-child-2" ).text());					
					var infantNum = parseInt(jQuery( ".quantity-selector-current-infant-2" ).text());
					if(childNum==0 && adultNum==1){
						quantity_selector_increment_2("child-2",''); 
					}
					if(adult >=0 && infantNum >=0 && adult==infantNum)
					{
						quantity_selector_decrement_2("infant-2",''); 
					}

				}
				jQuery( "."+selector ).text( parseInt(adultNum)-1 );  
				jQuery( "#"+selector_input ).val( parseInt(adultNum)-1 );  
				console.log( argument + " is decremented." );      	
			}else if(adultNum==1 && argument=='adult-2'){
				jQuery( "."+selector ).text( parseInt(adultNum)-1 );  
				jQuery( "#"+selector_input ).val( parseInt(adultNum)-1 );  
				quantity_selector_increment_2('child-2','');
			}
			else if(adultNum==1 && argument=='child-2'){
				jQuery( "."+selector ).text( parseInt(adultNum)-1 );  
				jQuery( "#"+selector_input ).val( parseInt(adultNum)-1 );  
				quantity_selector_increment_2('adult-2','');
			}

			setQuantitySelectorTotal_2(slug);
		}
		function quantity_selector_increment_2(argument, slug) {
			var selector = ( slug + "quantity-selector-current-"+argument );
			var selector_input = ( slug + "quantity-selector-current-"+argument+"-input" );
			var adultNum = jQuery( "."+selector ).text();
			var total = parseInt(jQuery( "."+slug+"quantity-selector-total-2" ).val());
			if(total<9 && total>=0){
				jQuery( "."+selector ).text( parseInt(adultNum)+1 );
				jQuery( "#"+selector_input ).val( parseInt(adultNum)+1 ); 
				console.log( argument + " is incremented." );      	        	
			}
			setQuantitySelectorTotal_2(slug);
		}
		jQuery( ".quantity-selector-decrement-adult-2" ).click(function(event) {
			quantity_selector_decrement_2("adult-2", '');
		}); 
		jQuery( ".quantity-selector-increment-adult-2" ).click(function(event) {
			quantity_selector_increment_2("adult-2", '');
		});
		jQuery( ".quantity-selector-decrement-child-2" ).click(function(event) {
			quantity_selector_decrement_2("child-2", '');
			//fight_search_pax_age_list('multi','general','decrement');
		}); 
		jQuery( ".quantity-selector-increment-child-2" ).click(function(event) {
			quantity_selector_increment_2("child-2", '');
			//fight_search_pax_age_list('multi','general','increment');
		});
		jQuery( ".quantity-selector-decrement-infant-2" ).click(function(event) {
			quantity_selector_decrement_2("infant-2", '');
		}); 
		jQuery( ".quantity-selector-increment-infant-2" ).click(function(event) {
			var total_adult  = parseInt(jQuery(".quantity-selector-current-adult-2").text());
			var total_infant = parseInt(jQuery(".quantity-selector-current-infant-2").text());
			if(total_adult > total_infant)
			{
				quantity_selector_increment_2("infant-2", '');
			}
		}); 	


		// *************************************************************
		//Flight multi search row add
		jQuery("#multi_stop_form").delegate(".destroy-multi-stop-row","click",function(){
			jQuery( this ).parent().closest( '.fp5' ).remove();
			
		});

		jQuery("#multi_stop_form").delegate(".add-multi-stop-row","click",function(){
			var htmlData = jQuery( ".samplRow" ).html();
			var totalMrow = jQuery( ".mrow" ).length;			
			if(totalMrow<=5){
				var uniqueID = UniqueID();
				var res = htmlData.replace("{{fs_multi_id}}", "ams" + uniqueID);
				res = res.replace("{{fs_multi_id}}", "ams" + uniqueID);
				jQuery( "#append_multi_stop_row" ).append( res );
			}
		});

		//multi departure and arrival airpot check
		function _validate_multi_dep_arrv(object) {
		  var classname = jQuery( object ).attr('id');
		  var this_dep = jQuery("."+classname).val();
		  var this_arr = jQuery( object ).val();

		  if( this_dep!=null && this_arr.length>0 && this_dep==this_arr ){
		      alert( "Departure and arrival cannot be same.-" );
		      jQuery( object ).val("");
		  }
		}   


	// *************************************************************
	//Umrah flight 
		jQuery( ".hajj_quantity-selector-decrement-adult" ).click(function(event) {
			hajj_quantity_selector_decrement("adult");
		}); 
		jQuery( ".hajj_quantity-selector-increment-adult" ).click(function(event) {
			hajj_quantity_selector_increment("adult");
		});
		jQuery( ".hajj_quantity-selector-decrement-child" ).click(function(event) {
			hajj_quantity_selector_decrement("child");
			//fight_search_pax_age_list('single','hajj','decrement');
		}); 
		jQuery( ".hajj_quantity-selector-increment-child" ).click(function(event) {
			hajj_quantity_selector_increment("child");
			//fight_search_pax_age_list('single','hajj','increment');
		});
		jQuery( ".hajj_quantity-selector-decrement-infant" ).click(function(event) {
			hajj_quantity_selector_decrement("infant");
		}); 
		jQuery( ".hajj_quantity-selector-increment-infant" ).click(function(event) {
			var total_adult  = parseInt(jQuery(".hajj_quantity-selector-current-adult").text());
			var total_infant = parseInt(jQuery(".hajj_quantity-selector-current-infant").text());
			if(total_adult > total_infant)
			{
				hajj_quantity_selector_increment("infant");				
			}
		}); 


	// **********************************************************

		jQuery( ".hajj_quantity-selector-decrement-adult-2" ).click(function(event) {
			hajj_quantity_selector_decrement_2("adult-2", '');
		}); 
		jQuery( ".hajj_quantity-selector-increment-adult-2" ).click(function(event) {
			hajj_quantity_selector_increment_2("adult-2", '');
		});
		jQuery( ".hajj_quantity-selector-decrement-child-2" ).click(function(event) {
			hajj_quantity_selector_decrement_2("child-2", '');
			//fight_search_pax_age_list('multi','hajj','decrement');
		}); 
		jQuery( ".hajj_quantity-selector-increment-child-2" ).click(function(event) {
			hajj_quantity_selector_increment_2("child-2", '');
			//fight_search_pax_age_list('multi','hajj','increment');
		});
		jQuery( ".hajj_quantity-selector-decrement-infant-2" ).click(function(event) {
			hajj_quantity_selector_decrement_2("infant-2", '');
		}); 
		jQuery( ".hajj_quantity-selector-increment-infant-2" ).click(function(event) {
			var total_adult  = parseInt(jQuery(".hajj_quantity-selector-current-adult-2").text());
			var total_infant = parseInt(jQuery(".hajj_quantity-selector-current-infant-2").text());
			if(total_adult > total_infant)
			{
				hajj_quantity_selector_increment_2("infant-2", '');
			}
		}); 

		// Hajj Flight Passeneger Increment Decrement 

		function hajj_setQuantitySelectorTotal() {
			var adultNum = jQuery( ".hajj_quantity-selector-current-adult" ).text(); 
			var childNum = jQuery( ".hajj_quantity-selector-current-child" ).text();
			var infantNum = jQuery( ".hajj_quantity-selector-current-infant" ).text();
			var total = parseInt(adultNum)+parseInt(childNum)+parseInt(infantNum); 
			jQuery( ".hajj_quantity-selector-total" ).val( total + " Passenger" );          
		}
		function hajj_quantity_selector_decrement(argument) {
			var selector = "hajj_quantity-selector-current-"+argument;
			var selector_input = "hajj_quantity-selector-current-"+argument+"-input";
			var adultNum = jQuery( "."+selector ).text();
			var total = parseInt(jQuery( ".hajj_quantity-selector-total" ).val()); 
			if(total>1 && adultNum>0){			
				if(argument=='adult'){
					var adult = parseInt(jQuery( "."+selector ).text());
					if(adult==0)
						return false;

					var childNum = parseInt(jQuery( ".hajj_quantity-selector-current-child" ).text());					
					var infantNum = parseInt(jQuery( ".hajj_quantity-selector-current-infant" ).text());
					if(childNum==0 && adultNum==1){
						hajj_quantity_selector_increment("child"); 
					}
					if(adult >=0 && infantNum >=0 && adult==infantNum)
					{
						hajj_quantity_selector_decrement("infant"); 
					}

				}
				jQuery( "."+selector ).text( parseInt(adultNum)-1 ); 
				jQuery( "#"+selector_input ).val( parseInt(adultNum)-1 );   
				console.log( argument + " is decremented." );      	
			}else if(adultNum==1 && argument=='adult') {	
				jQuery( "."+selector ).text( parseInt(adultNum)-1 ); 
				jQuery( "#"+selector_input ).val( parseInt(adultNum)-1 );  
				hajj_quantity_selector_increment("child"); 
			}
			else if(adultNum==1 && argument=='child') {	
				jQuery( "."+selector ).text( parseInt(adultNum)-1 ); 
				jQuery( "#"+selector_input ).val( parseInt(adultNum)-1 );  
				hajj_quantity_selector_increment("adult"); 
			}
			hajj_setQuantitySelectorTotal();
		}
		function hajj_quantity_selector_increment(argument) {
			var selector = "hajj_quantity-selector-current-"+argument;
			var selector_input = "hajj_quantity-selector-current-"+argument+"-input";
			var adultNum = jQuery( "."+selector ).text();
			var total = parseInt(jQuery( ".hajj_quantity-selector-total" ).val());
			if(total<9 && total>=0){
				jQuery( "."+selector ).text( parseInt(adultNum)+1 );
				jQuery( "#"+selector_input ).val( parseInt(adultNum)+1 );
				console.log( argument + " is incremented." );      	        	
			}
			hajj_setQuantitySelectorTotal();
		}

		// Adult 2 Increment ****************************

		function hajj_setQuantitySelectorTotal_2(slug) {
			var adultNum = jQuery( "."+slug+"hajj_quantity-selector-current-adult-2" ).text();
			var childNum = jQuery( "."+slug+"hajj_quantity-selector-current-child-2" ).text();
			var infantNum = jQuery( "."+slug+"hajj_quantity-selector-current-infant-2" ).text();
			var total = parseInt(adultNum)+parseInt(childNum)+parseInt(infantNum);
			jQuery( "."+slug+"hajj_quantity-selector-total-2" ).val( total + " Passenger" );         
		}

		function hajj_quantity_selector_decrement_2(argument, slug) {
			var selector = ( slug + "hajj_quantity-selector-current-"+argument );
			var selector_input = ( slug + "hajj_quantity-selector-current-"+argument+"-input" );
			var adultNum = jQuery( "."+selector ).text();
			var total = parseInt(jQuery( "."+slug+"hajj_quantity-selector-total-2" ).val());
			if(total>1 && adultNum>0){			
				if(argument=='adult-2'){
					var adult = parseInt(jQuery( "."+selector ).text());
					if(adult==0){					
						return false;
					}
					var childNum = parseInt(jQuery( ".hajj_quantity-selector-current-child-2" ).text());					
					var infantNum = parseInt(jQuery( ".hajj_quantity-selector-current-infant-2" ).text());
					if(childNum==0 && adultNum==1){
						hajj_quantity_selector_increment_2("child-2"); 
					}
					if(adult >=0 && infantNum >=0 && adult==infantNum)
					{
						hajj_quantity_selector_decrement_2("infant-2"); 
					}
				}
				jQuery( "."+selector ).text( parseInt(adultNum)-1 );  
				jQuery( "#"+selector_input ).val( parseInt(adultNum)-1 );  
				console.log( argument + " is decremented." );      	
			}
			else if(adultNum==1 && argument=='adult-2'){
				jQuery( "."+selector ).text( parseInt(adultNum)-1 );  
				jQuery( "#"+selector_input ).val( parseInt(adultNum)-1 );  
				hajj_quantity_selector_increment_2('child-2','');
			}
			else if(adultNum==1 && argument=='child-2'){
				jQuery( "."+selector ).text( parseInt(adultNum)-1 );  
				jQuery( "#"+selector_input ).val( parseInt(adultNum)-1 );  
				hajj_quantity_selector_increment_2('adult-2','');
			}

			hajj_setQuantitySelectorTotal_2(slug);
		}
		
		function hajj_quantity_selector_increment_2(argument, slug) {
			var selector = ( slug + "hajj_quantity-selector-current-"+argument );
			var selector_input = ( slug + "hajj_quantity-selector-current-"+argument+"-input" );
			var adultNum = jQuery( "."+selector ).text();
			var total = parseInt(jQuery( "."+slug+"hajj_quantity-selector-total-2" ).val());
			if(total<9 && total>=0){
				jQuery( "."+selector ).text( parseInt(adultNum)+1 );
				jQuery( "#"+selector_input ).val( parseInt(adultNum)+1 ); 
				console.log( argument + " is incremented." );      	        	
			}
			hajj_setQuantitySelectorTotal_2(slug);
		}

		// Show and Hide Password in login area
		function showPassword() {
		  var x = document.getElementById("password");
		  if (x.type === "password") {
		    x.type = "text";
		  } else {
		    x.type = "password";
		  }
		}


		// Sign yup form city select
		jQuery("#user_country").change(function(event) {
			var country_code = jQuery(this).val();

			$.ajax({
				url: webURL + 'home/get_city',
				type: 'POST',
				data: {country_code: country_code},
			})
			.done(function(response) {
				jQuery( "#city" ).html(response);
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			}); 
		});

		$(".traveller-passenger-type").on('change',function(){
			$(".traveller-gender").html('');
			$(".traveller-title").html('');
			var option = $(this).val();
			$.ajax({
				url: webURL + 'ajax/traveller_option',
				type: 'POST',
				data: {option: option},
			})
			.done(function(response) {				
				jQuery( ".traveller-title" ).html(response);
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			}); 
		})


		$(".traveller-title").on('change',function(){
			var option = $(this).val();
			$.ajax({
				url: webURL + 'ajax/traveller_option',
				type: 'POST',
				data: {option: option},
			})
			.done(function(response) {
				$(".traveller-gender").html('')
				jQuery( ".traveller-gender" ).html(response);
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			}); 
		})

		$(".user-auth-check").on('focus',function(){
			$(".action-auth-msg").html('');
		})
		$(".user-auth-check").on('change',function(){
			var user = $(this).val();
			$.ajax({
				url: webURL + 'ajax/user_auth_check',
				type: 'POST',
				data: {user: user},
			})
			.done(function(response) {
				var jsonArray = JSON.parse(response);
				console.log(jsonArray);
				if(jsonArray.flag==true)
				{
					$(".action-auth-msg").html(jsonArray.msg);
				}
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			}); 

		});



// This js change for passenger search validation   

// quantity-selector-increment-infant         quantity-selector-increment-infant-2     
// hajj_quantity-selector-increment-infant      hajj_quantity-selector-increment-infant-2

// quantity_selector_decrement         quantity_selector_decrement_2
// hajj_quantity_selector_decrement     hajj_quantity_selector_decrement_2