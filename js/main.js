(function ($) {
    "use strict";

    // Force light mode - prevent dark mode
    (function() {
        // Set color-scheme immediately
        if (document.documentElement) {
            document.documentElement.style.colorScheme = 'light';
            document.documentElement.setAttribute('data-color-scheme', 'light');
        }
        if (document.body) {
            document.body.style.colorScheme = 'light';
        }
        
        // Override any dark mode styles
        var style = document.createElement('style');
        style.textContent = `
            html, body {
                color-scheme: light only !important;
            }
            :root {
                color-scheme: light only !important;
            }
        `;
        document.head.appendChild(style);
        
        // Monitor for any changes
        var observer = new MutationObserver(function(mutations) {
            if (document.documentElement) {
                document.documentElement.style.colorScheme = 'light';
            }
            if (document.body) {
                document.body.style.colorScheme = 'light';
            }
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    })();

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if (window.innerWidth >= 992) {
            if ($(this).scrollTop() > 300) {
                $('.sticky-top').css('top', '0px');
            } else {
                $('.sticky-top').css('top', '-100px');
            }
        } else {
            // On mobile, always show navbar at top
            $('.sticky-top').css('top', '0px');
        }
    });
    
    // Set navbar to top 0 on mobile immediately
    if (window.innerWidth < 992) {
        $('.sticky-top').css('top', '0px');
    }
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Update active nav link on scroll
    $(window).scroll(function() {
        var scrollPos = $(window).scrollTop() + 150;
        
        $('.navbar-nav a[href^="#"]').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            
            if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.navbar-nav a').removeClass("active");
                currLink.addClass("active");
            }
        });
    });
    
    // Handle click on nav links
    $('.navbar-nav a[href^="#"]').on('click', function(e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 400);
            
            // Update active class
            $('.navbar-nav a').removeClass("active");
            $(this).addClass("active");
            
            // Close mobile menu only below 992px
            if (window.innerWidth < 992) {
                var navbarCollapse = document.getElementById('navbarCollapse');
                if (navbarCollapse) {
                    var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (!bsCollapse) {
                        bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                            toggle: false
                        });
                    }
                    bsCollapse.hide();
                }
            }
        }
    });
    
    // Handle click on service links in footer
    $('.service-link').on('click', function(e) {
        e.preventDefault();
        var serviceNumber = $(this).data('service');
        var target = $('#service');
        
        if (target.length) {
            // Scroll to service section
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 400);
            
            // Activate the corresponding tab after scroll
            setTimeout(function() {
                // Find the tab button
                var tabButton = $('.nav-pills .nav-link[data-bs-target="#tab-pane-' + serviceNumber + '"]');
                
                if (tabButton.length) {
                    // Remove active class from all tabs
                    $('.nav-pills .nav-link').removeClass('active');
                    $('.tab-pane').removeClass('show active');
                    
                    // Activate the selected tab
                    tabButton.addClass('active');
                    $('#tab-pane-' + serviceNumber).addClass('show active');
                    
                    // Trigger click on the button to ensure Bootstrap handles it
                    tabButton[0].click();
                }
            }, 450);
        }
    });
    
})(jQuery);

