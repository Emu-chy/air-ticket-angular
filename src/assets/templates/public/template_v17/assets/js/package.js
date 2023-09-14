'use strict';

jQuery(document).ready(function($) {

	function feature_total_price() {
		var total = 0;
		jQuery( '.package_price' ).each(function(index, el) {
			if(index>0){
				total += parseFloat( jQuery(this).val() );

			}
		});
			var feature_value = 0;
			jQuery( '.feature_value' ).each(function(index, el) {
				if( jQuery(this).is(':checked') ){
					feature_value += parseFloat( jQuery(this).attr('features-value') );				
				}
			});

			jQuery( ".basic_cost" ).html( total + '.00' );
			jQuery( ".extra_charge" ).html( feature_value + '.00' );
			jQuery( ".grand_total" ).html( (total+feature_value) + '.00' );

	}

	// --------------------------------------------------------
	function set_package_total() {
		var total = 0;

		jQuery( '.package_price' ).each(function(index, el) {
			if(index>0){
				// var amount = jQuery(this).html().replace( ',','' );
				total += parseFloat( jQuery(this).val() );
			}
		});

		var feature_value = 0;

		jQuery( ".basic_cost" ).html( total + '.00' );
		jQuery( ".extra_charge" ).html( feature_value + '.00' );
		jQuery( ".grand_total" ).html( (total + feature_value) + '.00' );

	}

	jQuery(document).ready(function($) {
		setTimeout(function() {
			set_package_total();
		}, 100);

		$( '.feature_value' ).click(function() 
		{
			feature_total_price();
		});

	});

	// -------------------------------------------------------
	function package_room_table( numRoom ) {
		var exsitedTable = (jQuery(".packagetable").length-1);
		var js_payment_table = jQuery( '.js_payment_table' ).html();
		if( exsitedTable > numRoom ) {
			for (var i = exsitedTable; i >= 0; i--) {
				if( i > numRoom ){
					jQuery( "#pg_"+i ).remove();
				}				
			}
		}
		for (var i = numRoom; i > 0; i--) {
			if(i>exsitedTable) {
				var newString = js_payment_table.replace(/{{INDEX}}/g, i);
				jQuery( ".payment-border" ).append(newString);
			}
		}
		feature_total_price();		
	}	
	jQuery( '#price-details-label' ).keydown(function(e) {
		var thisnum = jQuery( this ).val();
		if( e.which>=97 && e.which<=101 ){
			e.preventDefault(); 
			var obj = {};
			obj[97] = 1; obj[98] = 2; obj[99] = 3;
			obj[100] = 4; obj[101] = 5;
			jQuery('#price-details-label').val( obj[e.which] );
			package_room_table( obj[e.which] );
		}
		else {
			return false;
		}
		return false;
	});
	jQuery( '#price-details-label' ).change(function(event) {
		var thisnum = jQuery( this ).val();
		package_room_table( thisnum );
	});
	// --------------------------------------------------------
	
	function load_package_price( package_category_obj ) {
		jQuery( ".payment-border" ).html("");
		var num_room = jQuery( "#price-details-label" ).val();
		var package_code = jQuery( "#package_code" ).val();
		jQuery.ajax({
			url: webURL+'package/load_price_table',
			type: 'POST',
			data: {num_room:num_room, price_category:package_category_obj.val(),package_code:package_code},
		})
		.done(function(respond) {
			var json_obj = JSON.parse( respond );
			jQuery( ".js_payment_table" ).html( json_obj.payment_table );
			jQuery( ".payment-border" ).html( json_obj.string );
		})
		.fail(function() {
			alert( "error on package price" )

		});

		setTimeout( function(){ feature_total_price();}  , 1000 );
		
	}
	jQuery( "#price_category" ).change(function(event) {
		load_package_price( jQuery(this) ); 
	}); 

	// --------------------------------------------------------	
	
	jQuery( ".payment-border" ).delegate('.package_selected_persons', 'change', function(event) {
		var thisslno = jQuery(this).attr('slno');
		var thisval = jQuery(this).val();
		var base_price = jQuery( ".cpp_"+thisslno ).val();

		jQuery( ".adult_total_"+thisslno ).html( (base_price*2)+'.00' );
		jQuery( ".pp_"+thisslno ).val( base_price*2 );		

		jQuery( '.trlb1_'+thisslno ).hide();
		jQuery( '.trlb2_'+thisslno ).hide(); 

		if(thisval==3)
		{
			jQuery( ".ppp_"+thisslno ).html( '2' );
			jQuery( '.trlb1_'+thisslno ).show();
		}
		if(thisval==4)
		{
			jQuery( ".ppp_"+thisslno ).html( '2' ); 
			jQuery( '.trlb1_'+thisslno ).show();
			jQuery( '.trlb2_'+thisslno ).show();
		}
		if(thisval==2 || thisval==5 || thisval==1)
		{
			jQuery( ".ppp_"+thisslno ).html( thisval );

			jQuery( '.trlb1_total_'+thisslno ).html( '0.00' );
			jQuery( '.trlb2_total_'+thisslno ).html( '0.00' );
			jQuery( '.child1_'+thisslno+'_input_price' ).val( '0' );
			jQuery( '.child2_'+thisslno+'_input_price' ).val( '0' );
			
			if(thisval==2) {

			}
			else if(thisval==1) {
				jQuery( ".ppp_"+thisslno ).html( thisval );
				jQuery( ".adult_total_"+thisslno ).html( (base_price*1)+'.00' );
				jQuery( ".pp_"+thisslno ).val( base_price*1 );
			}
			else {
				jQuery( ".ppp_"+thisslno ).html( 3 );
				jQuery( ".adult_total_"+thisslno ).html( (base_price*3)+'.00' );
				jQuery( ".pp_"+thisslno ).val( base_price*3 );
			}
		}
		feature_total_price();
	});

	// --------------------------------------------------------
	
	jQuery( ".payment-border" ).delegate('.child1_info', 'change', function(event) {
		var thisid 	= 	jQuery(this).attr('id');
		var price 	= 	jQuery('option:selected', this).attr('price');
		var thisval =	jQuery(this).val();
		jQuery( "."+thisid+"_input_price" ).val( price );
		jQuery( "."+thisid+"_price" ).html( price );
		jQuery( '.'+thisid ).show();
		feature_total_price();
	});

	// --------------------------------------------------------

	jQuery( ".package_payment_method" ).click(function(event) {
		var thisval = jQuery( this ).val();
		var text = jQuery( this ).attr('text');

		if( thisval==4 ) {			
			jQuery( '.package_payment_terms1' ).hide();
			jQuery( '.package_payment_terms2' ).show();
		}
		else {
			jQuery( '.package_payment_text' ).html( text );
			jQuery( '.package_payment_terms2' ).hide();
			jQuery( '.package_payment_terms1' ).show();
		}
	});

	// --------------------------------------------------------

});

	// Package View Details 
	$(".package-view-details").on('click',function(){
	    var packageid  = $(this).attr('packageid');
	      $.ajax({
	        type:'GET',            
	        url: webURL+'package/view_details/'+packageid,
	        success: function(response) {  
	              $(".package-modal-body").html(response);
	              $('#package-modal').modal({show: 'true'});
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
	        },
	        error: function(){             
	          $('.imgLoader').fadeOut();                
	        }
	    });

	  })

	/*Filter*/
	// Country Filtering  
var $categoryCountry = $('div.Packageresults div.result'); // Path for flights
$(".PackageCityCountry").on('change', '.CityName',function(event){
  $categoryCountry.hide(); // if any of the checkboxes for brand or team are checked, you want to show LIs containing their value, and you want to hide all the rest.
  var $selectedFilters1 = $(".PackageCityCountry .CityName").filter(':checked');
    if ($selectedFilters1.length > 0) {
    $errorMessage.hide();
    $selectedFilters1.each(function (i, el) {
      $('div.Packageresults div.result[data-country="'+ el.value +'"]').show();  
    });
  } else {
      $errorMessage.show();
  }
});

// Package Name Filtering 
$(".PackageTypes").on('change', '.PackageNames',function(event){
  $categoryCountry.hide(); // if any of the checkboxes for brand or team are checked, you want to show LIs containing their value, and you want to hide all the rest.
  var $selectedFilters1 = $(".PackageTypes .PackageNames").filter(':checked');
    if ($selectedFilters1.length > 0) { 
    $errorMessage.hide();
    $selectedFilters1.each(function (i, el) {
      $('div.Packageresults div.result[data-package="'+ el.value +'"]').show();  
    });
  } else {
      $errorMessage.show();
  }
});



function showByDuration( range ) 
{
    var ranges = range.trim().split('|');
    var categoryCountry = $('div.Packageresults div.result'), 
        rangeval ='',
        start = 0,
        end = 0,
        total_days = 0, 
        total_night = 0,
        indexes = [];

    categoryCountry.show();

    for (var i =0;  ranges.length >i; i++) 
    {
        if( ranges[i]!='' )
        {
            rangeval  = ranges[i];            
            rangeval  = rangeval.split('_');
            start     = rangeval[0];
            end       = rangeval[1]; 

            categoryCountry.each(function(index, element)
            {
                total_days = jQuery(this).attr( 'data-duration' );
                total_night = (parseInt(total_days)-1);

                if( start <= total_night && end >=total_night )
                {
                    indexes.push( index );
                }
            });
        }      
    }

    categoryCountry.hide();
    categoryCountry.each(function(index, element)
    {
        var thisObj = jQuery(this);

        for (var i =0;  indexes.length >i; i++)
        {
            if(indexes[i]==index)
            {
                thisObj.show();
            }
        }
    });

    if(indexes=='' && jQuery( ".PackagesDuration" ).is(':checked')==false)
      categoryCountry.show();    

}

function getByDuration()
{
    var ranges = '';
    jQuery( ".PackagesDuration" ).each(function(index, element)
    {
        if( jQuery(this).is(":checked") )
        {
            ranges += jQuery(this).val() + '|';
        }
    });
    showByDuration( ranges );
}

jQuery(document).ready(function($){
    jQuery( ".PackagesDuration" ).click(function()
    {
        getByDuration();
    });
}); 


function showByPrice( priceRange ) 
{
    var ranges = priceRange.trim().split('|');
    var priceCategory = $('div.Packageresults div.result'),
        rangeval ='',
        start = 0,
        end = 0,
        indexes = [];

    priceCategory.show();

    for (var i =0;  ranges.length >i; i++) 
    {
        if( ranges[i]!='' )
        {
            rangeval  = ranges[i];            
            rangeval  = rangeval.split('_');
            start     = parseInt(rangeval[0]);
            end       = parseInt(rangeval[1]); 
            priceCategory.each(function(index, element)
            {
               var total_price = parseInt(jQuery(this).attr( 'data-price' )); 
                if( start <= total_price && end >= total_price )
                {
                    indexes.push( index );
                }
            });
        }      
    }

    priceCategory.hide();
    priceCategory.each(function(index, element)
    {
        var thisObj = jQuery(this);

        for (var i =0;  indexes.length >i; i++)
        {
            if(indexes[i]==index)
            {
                thisObj.show();
            }
        }
    });

    if(indexes=='' && jQuery( ".PackagesPrice" ).is(':checked')==false)
      priceCategory.show();    

}


function getByPrice()
{
  var ranges = ''; 
  jQuery( ".PackagesPrice" ).each(function(index, element)
  {
    if( jQuery(this).is(":checked") )
    {
      ranges += jQuery(this).val() + '|'; 
    }
  }); 
  showByPrice( ranges ); 
}

    jQuery( ".PackagesPrice" ).click(function()
    {
        getByPrice();
    });



function submit_package_payment_process_form(e){
	var flag = 'yes';
	$(".package_booking_validation .packagetable").each(function(key,value) {
	 	var table_id         = $(this).attr('id');
	 	var selected_persons = parseInt($("#"+table_id+" .package_selected_persons").val());
	 	var chidltable       = parseInt(key+1);
	 			
	 	if(selected_persons==3 || selected_persons==4){
	 		var child1= parseInt($("#"+table_id+" #child1_"+chidltable).val());
	 		if(child1==0){
	 			flag = 'no';	
	 			alert("Please select the child information for ROOM "+chidltable);
	 			$("#"+table_id+" #child1_"+chidltable).focus();
	 		    return false;
	 		}
	 	}	 

	 	if(selected_persons==4){
	 		var child2= parseInt($("#"+table_id+" #child2_"+chidltable).val());
	 		if(child2==0){
	 			flag = 'no';		
	 			alert("Please select the child information for ROOM "+chidltable);
	 			$("#"+table_id+" #child2_"+chidltable).focus();
	 			return false;	
	 		}
	 	}
	});

	if( flag=='yes') return true;
	if( flag=='no')	 return false;
}