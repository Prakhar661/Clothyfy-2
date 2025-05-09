(function($) {
    "use strict";  
    
    //* Form js
    function verificationForm(){
        //jQuery time
        var current_fs, next_fs, previous_fs; //fieldsets
        var left, opacity, scale; //fieldset properties which we will animate
        var animating; //flag to prevent quick multi-click glitches

        $(".next").click(function () {
            if (animating) return false;
            animating = true;

            current_fs = $(this).parent();
            next_fs = $(this).parent().next();

            //activate next step on progressbar using the index of next_fs
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now, mx) {
                    //as the opacity of current_fs reduces to 0 - stored in "now"
                    //1. scale current_fs down to 80%
                    scale = 1 - (1 - now) * 0.2;
                    //2. bring next_fs from the right(50%)
                    left = (now * 50) + "%";
                    //3. increase opacity of next_fs to 1 as it moves in
                    opacity = 1 - now;
                    current_fs.css({
                        'transform': 'scale(' + scale + ')',
                        'position': 'absolute'
                    });
                    next_fs.css({
                        'left': left,
                        'opacity': opacity
                    });
                },
                duration: 800,
                complete: function () {
                    current_fs.hide();
                    animating = false;
                },
                //this comes from the custom easing plugin
                easing: 'easeInOutBack'
            });
        });

        $(".previous").click(function () {
            if (animating) return false;
            animating = true;

            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();

            //de-activate current step on progressbar
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

            //show the previous fieldset
            previous_fs.show();
            //hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now, mx) {
                    //as the opacity of current_fs reduces to 0 - stored in "now"
                    //1. scale previous_fs from 80% to 100%
                    scale = 0.8 + (1 - now) * 0.2;
                    //2. take current_fs to the right(50%) - from 0%
                    left = ((1 - now) * 50) + "%";
                    //3. increase opacity of previous_fs to 1 as it moves in
                    opacity = 1 - now;
                    current_fs.css({
                        'left': left
                    });
                    previous_fs.css({
                        'transform': 'scale(' + scale + ')',
                        'opacity': opacity
                    });
                },
                duration: 800,
                complete: function () {
                    current_fs.hide();
                    animating = false;
                },
                //this comes from the custom easing plugin
                easing: 'easeInOutBack'
            });
        });

        $(".submit").click(function () {
            // Show success message and redirect to home page
            alert("Order completed successfully!");
            window.location.href = "index.html";
            return false;
        });
    }; 
    
    //* Add Phone no select
    function phoneNoselect() {
        if ($("#phone").length) {
            $("#phone").intlTelInput({
                initialCountry: "in",
                separateDialCode: true,
                utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
                autoPlaceholder: "aggressive",
                preferredCountries: ["in", "us", "gb", "ca", "au"]
            }); 
        }
    }; 

    //* Select js
    function niceSelect(){
        if ($('.product_select').length){ 
            $('.product_select').niceSelect();
        }
    }; 

    /* Load functions when document is ready */
    $(document).ready(function() {
        verificationForm();
        
        // Initialize phone selector if intlTelInput is loaded
        if ($.fn.intlTelInput) {
            phoneNoselect();
        } else {
            console.log("intlTelInput library not loaded");
        }
        
        // Initialize nice select if loaded
        if ($.fn.niceSelect) {
            niceSelect();
        } else {
            console.log("niceSelect library not loaded");
        }
        
        // Theme toggle functionality
        $('.theme-toggle').on('click', function() {
            $('html').attr('data-theme', 
                $('html').attr('data-theme') === 'dark' ? 'light' : 'dark'
            );
            
            // Update icon
            const icon = $(this).find('i');
            if (icon.hasClass('bx-moon')) {
                icon.removeClass('bx-moon').addClass('bx-sun');
            } else {
                icon.removeClass('bx-sun').addClass('bx-moon');
            }
            
            // Save theme preference
            localStorage.setItem('theme', $('html').attr('data-theme'));
        });
        
        // Make sure the first fieldset is visible and active
        $('#msform fieldset:first-of-type').show();
        $('#progressbar li:first-of-type').addClass('active');
        
        // Make code verification auto-focus next input
        $('.code_group input').on('input', function() {
            if ($(this).val().length === 1 && $(this).next('input').length) {
                $(this).next('input').focus();
            }
        });
        
        // Update Buy Now buttons to redirect to checkout
        $(document).on('click', '#btn', function(e) {
            e.preventDefault();
            window.location.href = 'checkout.html';
        });
    });
})(jQuery); 