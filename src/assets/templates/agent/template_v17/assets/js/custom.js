/*!
 * jquery.scrollto.js 0.0.1 - https://github.com/yckart/jquery.scrollto.js
 * Scroll smooth to any element in your DOM.
 *
 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/02/17
 **/
$.scrollTo = $.fn.scrollTo = function(x, y, options){
    if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);

    options = $.extend({}, {
        gap: {
            x: 0,
            y: 0
        },
        animation: {
            easing: 'easeInOutExpo',
            duration: 600,
            complete: $.noop,
            step: $.noop
        }
    }, options);

    return this.each(function(){
        var elem = $(this);
        elem.stop().animate({
            scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
            scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y - 69 // *edited
        }, options.animation);
    });
};


(function($) {
    "use strict";

    var swiper = new Swiper('.main-slider .swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        observer: true,
        observeParents: true,
        effect: 'fade',
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    });


    /* ===== SWIPER SLIDER MAIN ===== */
    var swiper = new Swiper('.popular-slider .swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
        loopFillGroupWithBlank: true,
        observer: true,
        observeParents: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-nav-next',
            prevEl: '.swiper-nav-prev',
        },
        breakpoints: {
            280: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
        }
    });


    //===================================service slider=========================

    var swiper = new Swiper('.service-slider .swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
        loopFillGroupWithBlank: true,
        observer: true,
        observeParents: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-nav-next',
            prevEl: '.swiper-nav-prev',
        },
        breakpoints: {
            280: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        }
    });

    //===================================service slider=========================

    var swiper = new Swiper('.blog-content .swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
        loopFillGroupWithBlank: true,
        observer: true,
        observeParents: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-nav-next',
            prevEl: '.swiper-nav-prev',
        },
        breakpoints: {
            280: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        }
    });





    var swiper = new Swiper('.com-partner .swiper-container', {
        slidesPerView: 2,
        spaceBetween: 10,
        //autoplay use for area scrollable
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        // init: false,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.swiper-nav-next',
            prevEl: '.swiper-nav-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
        }
    });


    var swiper = new Swiper('.price-filter .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 10,
            },
        }
    });


    //================Hotel Details Slider=====================//
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
    /* ===== SWIPER SLIDER MAIN ===== */

    // $(window).on("scroll", function(){
    //     var scrollTop = $(window).scrollTop();
    //     if(scrollTop >609){
    //         $(".temp-header").addClass("fixed-menu");
    //     }else {
    //         $(".temp-header").removeClass("fixed-menu");
    //     }
    // });


    $(document).ready(function() {
        $('.advance-content').hide();
        $(".advance-search .advance-btn").click(function() {
            $('.advance-content').slideToggle();
        });

    //    Popup Script

        $(function() {
            $('a[data-modal]').on('click', function() {
                $($(this).data('modal')).modal({
                    fadeDuration: 250,
                    fadeDelay: .5
                });
                return false;
            });
        });



    //    Flight List Sidebar Accordion

        // $(".modify-search-section").hide();
        $(".sidebar-content").show();
        $("#modify-dashboard").hide();
        $("#hotel-dashboard").hide();
        $("#package-dashboard").hide();
        // $(".flight-details").hide();

        $("#modifyBtn").click(function () {
            $("#modify-dashboard").slideToggle("slow");
        });
        $("#modifyBtn").click(function () {
            $("#hotel-dashboard").slideToggle("slow");
        });

        $("#modifyBtn").click(function () {
            $("#package-dashboard").slideToggle("slow");
        });
        $("#priceRange").click(function () {
            $(".sidebar-content.price-ranges").slideToggle("slow");
            $("#priceRange").toggleClass("open");
        });
        $("#departTime").click(function () {
            $(".sidebar-content.depart-times").slideToggle("slow");
            $("#departTime").toggleClass("open");
        });
        $("#tstops").click(function () {
            $(".sidebar-content.tstops").slideToggle("slow");
            $("#tstops").toggleClass("open");
        });
        $("#aAirlines").click(function () {
            $(".sidebar-content.airlines").slideToggle("slow");
            $("#aAirlines").toggleClass("open");
        });
        $("#toggleDetails").click(function () {
            $(".flight-details").slideToggle("slow");
            $("#toggleDetails").toggleClass("open");
        });

        $('#toggle-button').click(function () {
            var toggleWidth = $("#toggle").width() == 250 ? "0px" : "250px";
            $('#toggle').animate({width: toggleWidth});
            $('#toggle').toggleClass("highlight");
        });

        $(function(){
            $(".section-header").on("click",function(){
                $(this).next().slideToggle("slow");
            });
        });

        $(function(){
            $(".modal").on("click",'.section-header',function(){
                $(this).next().slideToggle("slow");
            });
        });


        var myNavBar = {

            flagAdd: true,

            elements: [],

            init: function (elements) {
                this.elements = elements;
            },

            add : function() {
                if(this.flagAdd) {
                    for(var i=0; i < this.elements.length; i++) {
                        document.getElementById(this.elements[i]).className += " fixed-menu";
                    }
                    this.flagAdd = false;
                }
            },

            remove: function() {
                for(var i=0; i < this.elements.length; i++) {
                    document.getElementById(this.elements[i]).className =
                        document.getElementById(this.elements[i]).className.replace( /(?:^|\s)fixed-menu(?!\S)/g , '' );
                }
                this.flagAdd = true;
            }

        };

        /**
         * Init the object. Pass the object the array of elements
         * that we want to change when the scroll goes down
         */
        myNavBar.init(  [
            "header"
        ]);

        /**
         * Function that manage the direction
         * of the scroll
         */
        function offSetManager(){

            var yOffset = 0;
            var currYOffSet = window.pageYOffset;

            if(yOffset < currYOffSet) {
                myNavBar.add();
            }
            else if(currYOffSet == yOffset){
                myNavBar.remove();
            }

        }

        /**
         * bind to the document scroll detection
         */
        window.onscroll = function(e) {
            offSetManager();
        }

        /**
         * We have to do a first detectation of offset because the page
         * could be load with scroll down set.
         */
        offSetManager();

    });


    // (Optional) Active an item if it has the class "is-active"
    $(".accordion-item.is-active").children(".accordion-panel").slideDown();

    $(".accordion-item").click(function() {
        // Cancel the siblings
        $(this).siblings(".accordion-item").removeClass("is-active").children(".accordion-panel").slideUp();
        // Toggle the item
        $(this).toggleClass("is-active").children(".accordion-panel").slideToggle("ease-out");
    });


    // Login, Sign Up, Forget Password==================================

    $('.b2b-signup-section').hide();
    $('.forget-password-section').hide();

    $('.signUpBtn').on('click', function () {
        $('.b2b-signup-section').show();
        $('.b2b-login-section').hide();
        $('.forget-password-section').hide();
        $('.bk-search-section.dashboard-search').addClass('signup-board');
    });
    $('.logInBtn').on('click', function () {
        $('.b2b-signup-section').hide();
        $('.b2b-login-section').show();
        $('.forget-password-section').hide();
		$('.bk-search-section.dashboard-search').removeClass('signup-board');
    });
    $('.forGetPass').on('click', function () {
        $('.b2b-signup-section').hide();
        $('.b2b-login-section').hide();
        $('.forget-password-section').show();
		$('.bk-search-section.dashboard-search').removeClass('signup-board');
    });

    
    //Dropdown Menu************************************************
        $('.navbar .dropdown-item').on('click', function (e) {
            var $el = $(this).children('.dropdown-toggle');
            var $parent = $el.offsetParent(".dropdown-menu");
            $(this).parent("li").toggleClass('open');
            if (!$parent.parent().hasClass('navbar-nav')) {
                if ($parent.hasClass('show')) {
                    $parent.removeClass('show');
                    $el.next().removeClass('show');
                    $el.next().css({"top": -999, "left": -999});
                } else {
                    $parent.parent().find('.show').removeClass('show');
                    $parent.addClass('show');
                    $el.next().addClass('show');
                    $el.next().css({"top": $el[0].offsetTop, "left": $parent.outerWidth() - 4});
                }
                // e.preventDefault();
                e.stopPropagation();
            }
        });

        $('.navbar .dropdown').on('hidden.bs.dropdown', function () {
            $(this).find('li.dropdown').removeClass('show open');
            $(this).find('ul.dropdown-menu').removeClass('show open');
        });
    //Dropdown Menu************************************************


})(jQuery);
