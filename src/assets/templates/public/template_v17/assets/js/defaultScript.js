//startDate define from template page

        jQuery(".FromdatePicker").datepicker({
            dateFormat: "dd-mm-yy",
            yearRange: "-100:+0",
            maxViewMode: 2,
            clearBtn: true,
            multidate: false,
            autoclose: true,
            assumeNearbyYear: 20,
            enableOnReadonly: true,
            zIndexOffset: 501,
            changeMonth: true,
            changeYear: true 
        }); 

        jQuery( ".TodatePicker" ).click( function($) {
            jQuery(this).datepicker("destroy");
            var minToDate    = '';
            var getStartDate = jQuery( '.FromdatePicker' ).val();
            if( getStartDate!="" ) {
                minToDate = getStartDate;
            }           
            jQuery(this).datepicker({
                dateFormat: "dd-mm-yy",
                minDate: minToDate,
                yearRange: "-100:+0",
                maxViewMode: 2,
                clearBtn: true,
                multidate: false,
                autoclose: true,
                assumeNearbyYear: 20,
                enableOnReadonly: true,
                zIndexOffset: 501,
                changeMonth: true,
                changeYear: true 
            }).datepicker("show").on('change', function(){
                jQuery(this).datepicker( 'destroy' );
            });         
        }); 


        jQuery(".datePickerStart").datepicker({
            dateFormat: "dd-mm-yy",
            minDate: startDate,
            maxViewMode: 2,
            clearBtn: true,
            multidate: false,
            autoclose: true,
            assumeNearbyYear: 20,
            enableOnReadonly: true,
            zIndexOffset: 501
        }); 

        jQuery( ".datePickerStart" ).bind( 'change', function($){
            jQuery( ".datePickerEnd" ).val("");     
        });

        jQuery( ".datePickerEnd" ).click( function($) {
            jQuery(this).datepicker("destroy");
            var getStartDate = jQuery( '.datePickerStart' ).val();
            if( getStartDate!="" ) {
                startDate = getStartDate;
            }
            jQuery(this).datepicker({
                dateFormat: "dd-mm-yy",
                minDate: startDate,
                maxViewMode: 2,
                clearBtn: true,
                multidate: false,
                autoclose: true,
                assumeNearbyYear: 20,
                enableOnReadonly: true,
                zIndexOffset: 501
            }).datepicker("show").on('change', function(){
                jQuery(this).datepicker( 'destroy' );
            });         
        }); 

        jQuery(".hajj_datePickerStart").datepicker({
            dateFormat: "dd-mm-yy",
            minDate: startDate,
            maxViewMode: 2,
            clearBtn: true,
            multidate: false,
            autoclose: true,
            assumeNearbyYear: 20,
            enableOnReadonly: true,
            zIndexOffset: 501
        }); 

        jQuery( ".hajj_datePickerStart" ).bind( 'change', function($){
            jQuery( ".hajj_datePickerEnd" ).val("");    
        });

        jQuery( ".hajj_datePickerEnd" ).click( function($) {
            jQuery(this).datepicker("destroy");
            /*var startDate = "<?=date('d-m-Y')?>";*/
            var getStartDate = jQuery( '.hajj_datePickerStart' ).val();
            if( getStartDate!="" ) {
                startDate = getStartDate;
            }
            jQuery(this).datepicker({
                dateFormat: "dd-mm-yy",
                minDate: startDate,
                maxViewMode: 2,
                clearBtn: true,
                multidate: false,
                autoclose: true,
                assumeNearbyYear: 20,
                enableOnReadonly: true,
                zIndexOffset: 501
            }).datepicker("show").on('change', function(){
                jQuery(this).datepicker( 'destroy' );
            });
        }); 

                // Hotel Datepicker
        jQuery(".hotel_datePickerStart").datepicker({
            dateFormat: "dd-mm-yy",
            minDate: startDate,
            maxViewMode: 2,
            clearBtn: true,
            multidate: false,
            autoclose: true,
            assumeNearbyYear: 20,
            enableOnReadonly: true,
            zIndexOffset: 501
        }); 

        jQuery( ".hotel_datePickerStart" ).bind( 'change', function($){
            jQuery( ".hotel_datePickerEnd" ).val("");   
        });

        jQuery( ".hotel_datePickerEnd" ).click( function($) {
            jQuery(this).datepicker("destroy");
            var getStartDate = jQuery( '.hotel_datePickerStart' ).val();
            if( getStartDate!="" ) 
            {           
                startDate = new Date(getStartDate.split("-").reverse().join("-"));
                startDate.setDate(startDate.getDate()+1);
            }

            jQuery(this).datepicker({
                dateFormat: "dd-mm-yy",
                minDate: startDate,
                maxViewMode: 2,
                clearBtn: true,
                multidate: false,
                autoclose: true,
                assumeNearbyYear: 20,
                enableOnReadonly: true,
                zIndexOffset: 501
            }).datepicker("show").on('change', function(){
                jQuery(this).datepicker( 'destroy' );
            });
                        
        });

        
          jQuery( ".btn_modify_search" ).click(function(event) {
              jQuery( ".open_modify_search" ).toggle('slow');
          });

          
          jQuery( ".hotel_modify_search" ).click(function(event) {
              jQuery( ".open_hotel_modify_search" ).toggle('slow');
          });


        $(document).ready(function () {          
        $(".modify-search-section").hide();
        // $(".sidebar-content").hide();
        //$(".flight-details").hide();

        $(".modify-btn").click(function () {
            $(".modify-search-section").slideToggle("slow");
        });
    

        $('#toggle-button').click(function () {
            var toggleWidth = $("#toggle").width() == 250 ? "0px" : "250px";
            $('#toggle').animate({width: toggleWidth});
            $('#toggle').toggleClass("highlight");
        });
    });

    // signle & multiple dates starts
    function converDate( date ) {
        var datestr = date.split('-');
        return datestr[2] + "/" + datestr[1] + "/" + datestr[0];
    }
    function validate_multi_date(obj) {
        var arr1 = [];
        jQuery(".multi_date").each(function(index, el) {
            arr1.push( el.value );
        });
        var caurrentIndex = 0;
        for (var i = arr1.length - 1; i >= 0; i--) {
            if(obj.value==arr1[i])
                caurrentIndex = i;
        }
        caurrentIndex = parseInt(caurrentIndex);
        jQuery("input.multi_date").each(function(index2, el2) {
            if(caurrentIndex<index2 && el2.value!=""){
                var d1 = new Date( converDate(obj.value) );
                var d2 = new Date( converDate(el2.value) );
                if( d1.getTime() > d2.getTime() ){
                    jQuery(this).val( "" );
                }
            }   
        });
    }
   
        jQuery("#append_multi_stop_row").delegate('.multi_date', 'click', function(e) {
            // jQuery(this).datepicker("destroy");
            jQuery( "input.multi_date" ).each(function(index, el) {
                jQuery( this ).attr('dtsl', index);                     
            });
            var thisDTSL = jQuery(this).attr('dtsl');              
            jQuery( "input.multi_date" ).each(function(index2, el2) {
                if( el2.value!="" && index2<thisDTSL )
                    startDate = el2.value;
            });
            jQuery(this).datepicker({
                dateFormat: "dd-mm-yy",
                minDate: startDate,
                maxViewMode: 2,
                clearBtn: true,
                multidate: false,
                autoclose: true,
                assumeNearbyYear: 20,
                enableOnReadonly: true,
                zIndexOffset: 501
            }).datepicker("show").on('change', function(){
                jQuery(this).datepicker( 'destroy' );
            });
        });

    //Hajj Multi Datepicker Start 
    // signle & multiple dates starts

    function validate_hajj_multi_date(obj) {
        var arr1 = [];
        jQuery(".hajj_multi_date").each(function(index, el) {
            arr1.push( el.value );
        });
        var caurrentIndex = 0;
        for (var i = arr1.length - 1; i >= 0; i--) {
            if(obj.value==arr1[i])
                caurrentIndex = i;
        }
        caurrentIndex = parseInt(caurrentIndex);
        jQuery("input.hajj_multi_date").each(function(index2, el2) {
            if(caurrentIndex<index2 && el2.value!=""){
                var d1 = new Date( converDate(obj.value) );
                var d2 = new Date( converDate(el2.value) );
                if( d1.getTime() > d2.getTime() ){
                    jQuery(this).val( "" );
                }
            }   
        });
    }

        jQuery("#hajj_append_multi_stop_row").delegate('.hajj_multi_date', 'click', function(e) {
            //jQuery(this).datepicker("destroy");
            jQuery( "input.hajj_multi_date" ).each(function(index, el) {
                jQuery( this ).attr('dtsl', index);                     
            });
            var thisDTSL = jQuery(this).attr('dtsl');
            //var startDate = ''//current date 
            jQuery( "input.hajj_multi_date" ).each(function(index2, el2) {
                if( el2.value!="" && index2<thisDTSL )
                    startDate = el2.value;
            });
            jQuery(this).datepicker({
                dateFormat: "dd-mm-yy",
                minDate: startDate,
                maxViewMode: 2,
                clearBtn: true,
                multidate: false,
                autoclose: true,
                assumeNearbyYear: 20,
                enableOnReadonly: true,
                zIndexOffset: 501
            }).datepicker("show").on('change', function(){
                jQuery(this).datepicker( 'destroy' );
            });         
        });


    // Hajj Multi datepicker end 

    function validate_train_multi_date(obj) {
        var arr1 = [];
        jQuery(".trainDatePicker").each(function(index, el) {
            arr1.push( el.value );
        });
        var caurrentIndex = 0;
        for (var i = arr1.length - 1; i >= 0; i--) {
            if(obj.value==arr1[i])
                caurrentIndex = i;
        }
        caurrentIndex = parseInt(caurrentIndex);
        jQuery("input.trainDatePicker").each(function(index2, el2) {
            if(caurrentIndex<index2 && el2.value!=""){
                var d1 = new Date( converDate(obj.value) );
                var d2 = new Date( converDate(el2.value) );
                if( d1.getTime() > d2.getTime() ){
                    jQuery(this).val( "" );
                }
            }   
        });
    }

        jQuery("#append_train_data_row").delegate('.trainDatePicker', 'click', function(e) {
            jQuery( "input.trainDatePicker" ).each(function(index, el) {
                jQuery( this ).attr('dtsl', index);                     
            });
            var thisDTSL = jQuery(this).attr('dtsl');
          /*  var startDate = "<?=date('d-m-Y')?>";*/
            jQuery( "input.trainDatePicker" ).each(function(index2, el2) {
                if( el2.value!="" && index2<thisDTSL )
                    startDate = el2.value;
            });
            jQuery(this).datepicker({
                dateFormat: "dd-mm-yy",
                startDate: startDate,
                maxViewMode: 2,
                clearBtn: true,
                multidate: false,
                autoclose: true,
                assumeNearbyYear: 20,
                enableOnReadonly: true,
                zIndexOffset: 501
            });
            $(this).datepicker("show");
        });


// Flight template 4 js 
        // search page show details
      $(".flight-search-list").on('click',function(){
        var itemid = $(this).attr('itemlist');

        var itemstatus = $(".flight-search-list-"+itemid).attr('itemstatus');
        if(itemstatus=='hide')
        {
          $(".flight-search-list-"+itemid).attr('itemstatus','show');
          $(".flight-search-list-"+itemid).show(400);
        }
        else
        {
          $(".flight-search-list-"+itemid).attr('itemstatus','hide');
           $(".flight-search-list-"+itemid).hide(400);
        }
      })


        // search page show fare rules
       $("#flight-seacrh-common-modal").on('click','.flight-fare-rules',function(){
          var FlightItemNo   = $(this).attr('FlightItemNo');
          var requestItem    = $("#requestItem").attr('requestItem');
          var FlightItemData = $('#ticketid1'+FlightItemNo).attr('fitemvalue');
          var farerules    = $("#flight-seacrh-common-modal #f-rule .fare-rules").text();
          farerules = jQuery.trim( farerules );
          if(farerules.length === 0)
          {

              $(".lodrefrentwhole").show();           
                $.ajax({
                type:'POST', 
                data:{FlightItemData:FlightItemData,requestItem:requestItem},
                url: webURL+'flight/FareRules',
                success: function(response) {  
                    var response = JSON.parse(response);
                    if(response.flag==true)
                    {
                      $(".lodrefrentwhole").hide();    
                      $("#flight-seacrh-common-modal #f-rule .fare-rules").html(response.pricecheckhtml);
                        $('#FareRulesModal').modal({
                          show: true
                        })
                    }
                    else
                    {
                      $(".lodrefrentwhole").hide();
                    }
                },
                error: function(){             
                  $(".lodrefrentwhole").hide();          
                }
             });
          }

      })

              //select for booking
      $(".flight-view-details-button").on('click',function(){
          var FlightItemNo   = $(this).attr('FlightItemNo');
          var requestItem    = $("#requestItem").attr('requestItem');
          var FlightItemData = $('#ticketid1'+FlightItemNo).attr('fitemvalue'); 
          
          $(".lodrefrentwhole").show();           
            $.ajax({
            type:'POST', 
            data:{FlightItemData:FlightItemData,requestItem:requestItem},
            url: webURL+'flight/search_details', 
            success: function(response) {  
                 var response = JSON.parse(response); 
                if(response.flag==true)
                {
                  $(".lodrefrentwhole").hide(); 
                  $("#flight-seacrh-common-modal").html(response.viewhtml);
                    $('#flight-seacrh-common-modal').modal({
                        fadeDuration: 250,
                        fadeDelay: .5
                    });
                }
                else
                {
                  $(".lodrefrentwhole").hide();
                }

            },
            error: function(){             
              $(".lodrefrentwhole").hide();             
            }
        });
      })

       //select for booking
      $(".flight-book-button").on('click',function(){
          var FlightItemNo   = $(this).attr('FlightItemNo');
          var requestItem    = $("#requestItem").attr('requestItem');
          var FlightItemData = $('#ticketid1'+FlightItemNo).attr('fitemvalue'); 
          $(".lodrefrentwhole").show();           
            $.ajax({
            type:'POST', 
            data:{FlightItemData:FlightItemData,requestItem:requestItem},
            url: webURL+'flight/PriceRecheck', 
            success: function(response) {  
                var response = JSON.parse(response); 
                if(response.flag==true)
                {                     
                  if(response.status == 1)
                  {                   
                    window.location.href = response.href; 
                  }
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

SortbyPrice('ascending');
$('#SortbyPrice').on('click', function () {
  $(this).toggleClass("ascending descending");
   
  $("ul.sortul li").each(function (){
    $(this).removeClass('active'); 
    
  });
  // alert(type);
  //$(this).parent().addClass();

  $(this).parent().addClass('active');
    var type = $(this).attr('class');
    SortbyPrice(type);
    //tooltip();
});

$('#SortbyDuration').on('click', function () {
  $(this).toggleClass("ascending descending");
 
  $("ul.sortul li").each(function (){
    $(this).removeClass('active');
  });
  $(this).parent().addClass('active');
    var type = $(this).attr('class');
  //alert(type);
    SortbyDuration(type);
    //tooltip();
});

$('#SortbyArrive').on('click', function () {
  $(this).toggleClass("ascending descending");
  
  $("ul.sortul li").each(function (){
    $(this).removeClass('active');
  });
  $(this).parent().addClass('active');
    var type = $(this).attr('class');
  //alert(type);
    SortbyArrive(type);
    //tooltip();
});

$('#SortbyDeparture').on('click', function () {
  $(this).toggleClass("ascending descending");
  
  $("ul.sortul li").each(function (){
    $(this).removeClass('active');
  });
  $(this).parent().addClass('active');
    var type = $(this).attr('class');
  //alert(type);
    SortbyDeparture(type);
    //tooltip();
});

$('#SortbyAirline').on('click', function () {
  $(this).toggleClass("ascending descending");
  
  $("ul.sortul li").each(function (){
    $(this).removeClass('active');
  });

  $(this).parent().addClass('active');
    var type = $(this).attr('class');
    //alert(type);
    SortbyAirline(type);
});

function SortbyDeparture(type){
  if (type == 'ascending') {
      $('div.flight').map(function () {
      return {val: parseFloat($(this).data('depature'), 10), el: this};
      }).sort(ascending).map(function () {
      return this.el;
      }).appendTo('.flights');
  }else{
    $('div.flight').map(function () {
      return {val: parseFloat($(this).data('depature'), 10), el: this};
      }).sort(descending).map(function () {
      return this.el;
      }).appendTo('.flights');
  }
}

function SortbyArrive(type){
  if (type == 'ascending') {
      $('div.flight').map(function () {
      return {val: parseInt($(this).data('arrive')), el: this};
      }).sort(ascending).map(function () {
      return this.el;
      }).appendTo('.flights');
  }else{
    $('div.flight').map(function () {
      return {val: parseInt($(this).data('arrive')), el: this};
      }).sort(descending).map(function () {
      return this.el;
      }).appendTo('.flights');
  }
}

function SortbyDuration(type){
  if (type == 'ascending') {//alert(lcnt);
  
      $('div.flight').map(function () {
      return {val: parseInt($(this).data('duration'), 10), el: this};
      }).sort(ascending).map(function () {
      return this.el;
      }).appendTo('.flights');
  }else{
    $('div.flight').map(function () {
        alert($(this).data('duration'));
      return {val: parseInt($(this).data('duration'), 10), el: this};
      }).sort(descending).map(function () {
      return this.el;
      }).appendTo('.flights');
  }
}



function SortbyPrice(type){
  if (type == 'ascending') {
    //alert(11);
      $('div.flight').map(function () {
      return {val: parseFloat($(this).data('price')), el: this};
      }).sort(ascending).map(function () {
      return this.el;
      }).appendTo('.flights');
  }else{
    $('div.flight').map(function () {
      return {val: parseFloat($(this).data('price')), el: this};
      }).sort(descending).map(function () {
      return this.el;
      }).appendTo('.flights'); 
  }
}

function SortbyAirline(type){
  if (type == 'ascending') {
      $('div.flight').map(function () {
      return {val: $(this).data('airline').replace(/,/g, ''), el: this};
      }).sort(aasc).map(function () {
      return this.el;
      }).appendTo('.flights');
  }else{
    $('div.flight').map(function () {
      return {val: $(this).data('airline').replace(/,/g, ''), el: this};
      }).sort(adesc).map(function () {
      return this.el;
      }).appendTo('.flights');
  }
}

function aasc(a, b){
  //alert(a.val);
  return (a.val > b.val) ? 1 : 0;
}

function adesc(a, b){
  return (a.val < b.val) ? 1 : 0;
}

function descending(a, b) {
  //alert('descending');
    return b.val - a.val;
}

function ascending(a, b) {
  //alert('ascending');
    return a.val - b.val;
}  

var $categoryContent = $('div.flights div.flight'); // Path for flights
//Top Airlines Filter
$("#TopAirlineFilter_carrier .TopFlightairline").on('click', function(event){
  $categoryContent.hide();
  var TopAirlineFilter_id =  $(this).attr('id');
  var Filter_Itemvalue    =  $("#"+TopAirlineFilter_id).attr('Itemvalue');
  var Filter_Itemstatus   =  $("#"+TopAirlineFilter_id).attr('Itemstatus');
  if(Filter_Itemstatus==0)
  {
    $("#"+TopAirlineFilter_id).attr('Itemstatus',1);
    $("#"+TopAirlineFilter_id+ ' .Filter-amount-value').addClass('Filter-amount-value-active');
  }
  else
  {
    $("#"+TopAirlineFilter_id).attr('Itemstatus',0);
    $("#"+TopAirlineFilter_id+ ' .Filter-amount-value').removeClass('Filter-amount-value-active');
  }

$('#TopAirlineFilter_carrier .TopFlightairline').each(function (index, event) {
 
   FilterItemvalue =  $(this).attr('Itemvalue') ;
   Itemstatus      =  $(this).attr('Itemstatus') ;
   if(Itemstatus==1)
   {
     $('div.flights div.flight[data-airlinecode="'+ FilterItemvalue +'"]').show();    
   }
});

});
var $errorMessage = $('#errorMessage'); //Error Message
var $categoryContentStops = $('div.flights div.flight'); // Path for flights
$(".AirlineFilterStops").on('change', '.FStops',function(event){
  $categoryContentStops.hide(); // if any of the checkboxes for brand or team are checked, you want to show LIs containing their value, and you want to hide all the rest.
  var $selectedFilters1 = $(".AirlineFilterStops .FStops").filter(':checked');
    if ($selectedFilters1.length > 0) {
    $errorMessage.hide();
    $selectedFilters1.each(function (i, el) {
      $('div.flights div.flight[data-stops="'+ el.value +'"]').show();
    });
  } else {
      $errorMessage.show();
  }
});

var $categoryContentAirLines = $('div.flights div.flight'); // Path for flights
$(".pfilter-inner-airlines").on('click',function(){
     $categoryContentAirLines.hide();  
    if($( this ).hasClass( "pfilter-inner-active" ))
    {
        $(this).removeClass('pfilter-inner-active')
    }
    else
    {
       $(this).addClass('pfilter-inner-active')
    }
    var $selectedFilters1 = $(".pfilter-inner-list .pfilter-inner-airlines").filter('.pfilter-inner-active');

    if ($selectedFilters1.length > 0) {
        $errorMessage.hide();
        $selectedFilters1.each(function (i, el) {       
             var airlinecode = $(this).attr('item-airlinecode');
          $('div.flights div.flight[data-airlinecode="'+ airlinecode +'"]').show();
        });
      } else {
          $errorMessage.show();
      }

});



$("#AirlineFilterResult").on('change','.Flightairline', function(event){
  $categoryContent.hide(); // if any of the checkboxes for brand or team are checked, you want to show LIs 
  var $selectedFilters = $("#AirlineFilterResult .Flightairline").filter(':checked');


  var singleFilters    = $(this).val();
  if($(this).is(':checked'))
  {
    var AllStatus = true;
  }
  else
  {
     var AllStatus = false;
  }
  if ($selectedFilters.length > 0) {
    $errorMessage.hide();
      if(singleFilters=='all' && AllStatus==true)
      {
         $('#AirlineFilterResult .Flightairline').prop("checked",true);
         $categoryContent.show(); 
         //alert('show');
      }
      else if(singleFilters=='all' && AllStatus==false)
      {
        $('#AirlineFilterResult .Flightairline').prop('checked',false);
         $categoryContent.hide(); 
         //alert('hide');
      }
      else if(singleFilters!='all')
      {
          $('#AirlineFilterResult #all').prop('checked',false);

            $selectedFilters.each(function (i, el) {
                  $('div.flights div.flight[data-airlinecode="'+ el.value +'"]').show();

                  $('#'+el.id).prop('checked');
                  $('#'+el.id).parent().attr("checked");
                
            });
      }

  } else {
      $errorMessage.show();
  }
});

          var setMinPrice = $("#setMinPrice").val();
          var setMaxPrice = $("#setMaxPrice").val();
          //alert(setMaxPrice);
          slider_range( setMinPrice, setMaxPrice );

      function showFlights(minPrice, maxPrice) 
      {
        $("div.flights div.flight").removeClass('Fcount').hide().filter(function() {          
          var price = $(this).find("span.FlightTicketPrice").html();  
          var price = parseFloat(price);         
          return price >= minPrice && price <= maxPrice;
        }).addClass('Fcount').show();
      
      }
      function slider_range(min, max) {
          $( "#slider-range" ).slider({
              range: true,
              min: parseInt(min),
              max: parseInt(max),
              values: [ parseInt(min), parseInt(max) ],
              slide: function( event, ui ) {
                  $( "#amount" ).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
              },
              change: function( event, ui ) {
               one=ui.values[0];
               two=ui.values[1];
               showFlights(one, two);
              
              }
          });
          $( "#amount" ).val( "" + $( "#slider-range" ).slider( "values", 0 ) + " - " + $( "#slider-range" ).slider( "values", 1 ) );        
      }


  var startTime;
  var endTime;
  function slideTime(event, ui){
    var val0 = $("#DepSlider").slider("values", 0),
      val1 = $("#DepSlider").slider("values", 1),
      minutes0 = parseInt(val0 % 60, 10),
      hours0 = parseInt(val0 / 60 % 24, 10),
      minutes1 = parseInt(val1 % 60, 10),
      hours1 = parseInt(val1 / 60 % 24, 10);
      
    startTime = getTime(hours0, minutes0);
    endTime = getTime(hours1, minutes1);
    // startTime = hours0+':'+minutes0;
    // endTime = hours1+':'+minutes1;
    $("#Dep").val(startTime + ' - ' + endTime);
  }
  function getTime(hours, minutes) {
    var time = null;
    minutes = minutes + "";
    if (hours < 12) {
      time = "AM";
    }
    else {
      time = "PM";
    }
    if (hours == 0) {
      hours = 12;
    }
    if (hours > 12) {
      hours = hours - 12;
    }
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }
    return hours + ":" + minutes + " " + time;
  }
$('#departtime').addClass('in');  
    $( "#DepSlider" ).slider({
      range: true,
      min: 0,
      max: 1439,
      step: 1,
      values: [ 0, 1439 ],
      slide: slideTime,
      change: function( event, ui ) {
         one=ui.values[0];
         two=ui.values[1];
         //alert(one+'-'+two);
          showDepFlights(one, two);
        
      }
    });
slideTime();

function showDepFlights(mint, maxt) {
    $("div.flights div.flight").hide().filter(function() {
      var dep = $(this).data("depature");
      return dep >= mint && dep <= maxt;
    }).show();
}


var flightloder = 0
    // this is the id of the form
$(".Flight_search_loader").submit(function(e) {
    if(flightloder==0)
    {
        //e.preventDefault(); // avoid to execute the actual submit of the form.   
        var form = $(this);
        var url = form.attr('action');
        $.ajax({
               type: "POST",
               url: webURL+'home/search_view',
               data: {passData:form.serialize()}, // serializes the form's elements.
               success: function(response)
               {
                   flightloder = 1;
                   $(".flight-search-request").html(response);
                    var galleryTop = new Swiper('.flight-search-request .top-search-slider-banner', {
                        spaceBetween: 10,
                        loop:true,
                        loopedSlides: 5, //looped slides should be the same
                        observer: true,
                        observeParents: true,
                        navigation: {
                        nextEl: '.flight-search-request .swiper-button-next',
                        prevEl: '.flight-search-request .swiper-button-prev',
                        }

                        });

                    $('#flight-search-Loader').modal({
                        fadeDuration: 250,
                        fadeDelay: .5
                    });
                    //return false;
                   //form.submit();
                    setTimeout(function(){
                        form.submit()
                       },2000);
                    
               }
             });    

        return false;
    }
    else
    {
        //alert('ok');
        return true;
    }

});

$(".Flight-booking-payment").on('click',function()
{
  var ticketType = $(this).attr('value');
  if(ticketType=='2')
  {
    $('.Booking-paymentoption-required').attr("required","true");
    
  }
  else
  {
    $('.Booking-paymentoption-required').removeAttr("required");
  }
})

jQuery(document).ready(function($) {


  jQuery('.adults_date').datepicker({
        maxDate: adults_date_maxDate,
        yearRange: "-100:+0",
        dateFormat: 'dd-mm-yy',
        numberOfMonths:1,
        changeMonth: true,
        changeYear: true

  }); 
  jQuery('.childs_date').datepicker({
      dateFormat: 'dd-mm-yy',   
      minDate: childs_date_minDate,
      maxDate: childs_date_maxDate,      
      changeMonth: true,
      changeYear: true
  }); 
  jQuery('.infants_date').datepicker({
      dateFormat: 'dd-mm-yy',            
      viewDate: infants_date_viewDate,
      minDate: infants_date_minDate,
      maxDate: infants_date_maxDate,
      changeMonth: true,
      changeYear: true
  });
  jQuery('.passport_exp_minDate').datepicker({
      dateFormat: 'dd-mm-yy',
      minDate: passport_exp_minDate,
      changeMonth: true,
      changeYear: true
  }); 


  //packages date picker
  var packageEpiaryMinDate =  $("#package-expiary-date").attr('package-expiary-min-date');
  var packageExpiaryMaxDate = $("#package-expiary-date").attr('package-expiary-max-date');
  //alert(packageExpiaryMaxDate)

  jQuery('.package-expiary-date').datepicker({
      dateFormat: 'dd-mm-yy', 
      minDate: packageEpiaryMinDate,             
      maxDate: packageExpiaryMaxDate,             
      changeMonth: true,
      changeYear: true,

  });


  jQuery( ".booking_gender" ).change(function(event) {
      var thisRowId = jQuery(this).attr('rowid'),
          thisVal   = jQuery(this).find(':selected').val();

      if( thisVal=="Male" )
      {
          if(jQuery('#title_' + thisRowId + ' option[value=Mr]').length)
          {
              jQuery( "#title_" + thisRowId ).val("Mr").click();
          }
          else
          {
              jQuery( "#title_" + thisRowId ).val("Master").click();
          }
      }
      else if( thisVal=="Female" )
      {
          if(jQuery('#title_' + thisRowId + ' option[value=Ms]').length)
          {
              jQuery( "#title_" + thisRowId ).val("Ms").click();
          }
          else
          {
              jQuery( "#title_" + thisRowId ).val("Miss").click();
          }                
      }
  }); 

    $(".custome-read-only").on('keydown paste', function(e){
        e.preventDefault();
    });

  jQuery( ".booking_title" ).change(function(event) {
      var thisRowId = jQuery(this).attr('rowid'),
          thisVal   = jQuery(this).find(':selected').val();

      if( thisVal=="Mr" )
      {
          jQuery( "#gender_" + thisRowId ).val("Male").click();
      }
      else if( thisVal=="Ms" || thisVal=="Mrs" )
      {
          jQuery( "#gender_" + thisRowId ).val("Female").click();
      }
      else if( thisVal=="Master" )
      {
          jQuery( "#gender_" + thisRowId ).val("Male").click();
      }
      else if( thisVal=="Miss" )
      {
          jQuery( "#gender_" + thisRowId ).val("Female").click();
      }
  });
  
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


    $(".Booking-paymentoption").on('click',function(){      
      OnlinepaymentCharge();
    })

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

    //hide the flight itinerary
    $(".search-flight-itinerary").hide();
        
    $("#common_loader").on('submit',function(){
       $(".lodrefrentwhole").show();           
    })

    $(".my_common_loader").on('submit',function(){
       $(".lodrefrentwhole").show();           
    })

    $('.common_loader').on('click',function(){
     $(".lodrefrentwhole").show();
    })

    $('#flight-seacrh-common-modal').on('click','.common_loader',function(){
     $(".lodrefrentwhole").show();
    })
    
    $(".section-header h2 ").on('click',function(){
        $(this).children('i').toggleClass('fa-caret-down fa-caret-up')
    })

    $(".modal").on('click','.section-header h2',function(){
        $(this).children('i').toggleClass('fa-caret-down fa-caret-up')
    })

    $(function(){
            $(".modal").on("click",'.section-header',function(){
                $(this).next().slideToggle("slow");
            });
        });



     $('.text-validation').change(function (e) {        
          var regex = new RegExp("^[a-zA-Z ]+$");
          var input = $(this).val();
          if(regex.test(input)) {
             return true;
          }else {
              $(this).val('');
              return false;
          }
    });

    $('.text-validation').keypress(function (e) {
        var regex = new RegExp("^[a-zA-Z ]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }
        else{
            e.preventDefault();             
            return false;
        }
    });
    $('.passport-validation').change(function (e) {
        var regex = new RegExp("^[a-zA-Z0-9]+$");
        var input = $(this).val();
          if(regex.test(input)) {
             return true;
          }else {
              $(this).val('');
              return false;
          }
    });

    $('.passport-validation').keypress(function (e) {
        var regex = new RegExp("^[a-zA-Z0-9]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }
        else{
            e.preventDefault();             
            return false;
        }
    });

/*    $('.text-only').keypress(function (e) {
        var regex = new RegExp("^[a-zA-Z]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }
        else{
            e.preventDefault();             
            return false;
        }
    });*/
    $('.number-validation').change(function (e) {
        var regex = new RegExp("^[0-9]+$");
        var input = $(this).val();

        if(input.length <= 13) {
          if(regex.test(input)) {
             return true;
          }else {
              $(this).val('');
              return false;
          }
      }else{
        alert('Invalid');
        $(".number-validation").val('');
      }
    });

        $('.number-validation').keypress(function (e) {
        var regex = new RegExp("^[0-9]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }
        else{
            e.preventDefault();             
            return false;
        }
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
//passenger list
$(document).on('keyup',".passengerList", function(){
            var itemid  = $(this).attr('itemid');
            var passenger_type = $("#passenger_type_"+itemid).val();

            $(this).autocomplete({   
              source: webURL+"flight/getAllPassengers/"+passenger_type,
               messages: {
                      noResults: '',
                      results: function() {}
                  },
              minLength: 3,//search after two characters
              autoFocus: true, // first item will automatically be focused    //console.log(ui.item.id);
              select: function(event,ui){               
                $(this).focus();
                var itemId = ui.item.id;  
                    $.ajax({
                        url: webURL + "flight/passengerDetails/"+itemId,
                        type: 'POST',
                        success: function (response) {
                            var response        = JSON.parse(response);                         
                            var passenger       = response.passenger;   
                            var country_info    = response.country_info;    
                            $('#title_'+itemid).val(passenger.title).change();
                            $('#fname_'+itemid).val(passenger.first_name);
                            $('#lname_'+itemid).val(passenger.last_name);
                            $('#gender_'+itemid).val(passenger.gender).change();

                            var dob = passenger.dob;
                            var dob = moment(dob, "YYYY-MM-DD").format("DD-MM-YYYY"); 
                            //alert(date_string); 

                            $('#dob_'+itemid).val(dob);
                            
                            $('#email_'+itemid).val(passenger.email);
                            $('#contact_no_'+itemid).val(passenger.contact_no);
                            $('#passport_no_'+itemid).val(passenger.passport_number);

                            var passport_expiry = passenger.passport_expiry;
                            var passport_expiry = moment(passport_expiry, "YYYY-MM-DD").format("DD-MM-YYYY"); 

                            $('#passport_exp_date_'+itemid).val(passport_expiry);

                            // $('#nationality_'+itemid).val(country_info.country_id).change();
                            $('#nationality_'+itemid).val(passenger.nationality).change();
                            $('#passengerId_'+itemid).val(passenger.passenger_id);                           
                        },

                        error: function (response) {
                            $('#msg').html(response); 
                        }
                    }) 
                }
            });
        }); 
