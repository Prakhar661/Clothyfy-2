$(document).ready(function () {
    // Smooth scrolling for anchor links
    $("a").on("click", function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $("html, body").animate(
                {
                    scrollTop: $(hash).offset().top,
                },
                800,
                function () {
                    window.location.hash = hash;
                }
            );
        }
    });

    // Close mobile menu when clicking menu items
    $(".menu-items a").click(function () {
        $("#checkbox").prop("checked", false);
    });

    // Theme toggle functionality
    const themeToggle = $("#themeToggle");
    
    if (themeToggle.length) {
        const icon = themeToggle.find("i");
        const html = $("html");

        // Check for saved theme preference or use system preference
        const savedTheme = localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

        // Apply the saved theme
        html.attr('data-theme', savedTheme);
        updateIcon(savedTheme);

        // Toggle theme on button click
        themeToggle.on('click', function() {
            const currentTheme = html.attr('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            html.attr('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });

        // Update the icon based on current theme
        function updateIcon(theme) {
            if (theme === 'dark') {
                icon.removeClass('bx bxs-moon').addClass('bx bxs-sun');
            } else {
                icon.removeClass('bx bxs-sun').addClass('bx bxs-moon');
            }
        }

        // Handle system theme changes
        try {
            const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Try the standard event listener method first (Chrome, Firefox)
            darkModeMediaQuery.addEventListener('change', function(e) {
                if (!localStorage.getItem('theme')) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    html.attr('data-theme', newTheme);
                    updateIcon(newTheme);
                }
            });
        } catch (e1) {
            try {
                // Fall back to the older method for Safari
                const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                darkModeMediaQuery.addListener(function(e) {
                    if (!localStorage.getItem('theme')) {
                        const newTheme = e.matches ? 'dark' : 'light';
                        html.attr('data-theme', newTheme);
                        updateIcon(newTheme);
                    }
                });
            } catch (e2) {
                console.error('Browser does not support matchMedia listeners');
            }
        }
    }
});