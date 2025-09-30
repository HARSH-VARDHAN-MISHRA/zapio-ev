
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const menuToggler = document.getElementById('menuToggler');
    const mainNav = document.getElementById('mainNav');
    const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');

    // Helper function to close the entire menu (main nav and any open dropdown)
    function closeAllNav() {
        mainNav.classList.remove('active');
        dropdownItems.forEach(item => item.classList.remove('active'));
    }

    // 1. Sticky Header Logic
    function toggleScrolled() {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    toggleScrolled();
    window.addEventListener('scroll', toggleScrolled);

    // 2. Mobile Menu Toggle Logic (Toggles the main mobile menu open/closed)
    menuToggler.addEventListener('click', function() {
        // If the menu is currently open, close everything.
        if (mainNav.classList.contains('active')) {
            closeAllNav();
        } else {
            // If it's closed, open the main nav only.
            mainNav.classList.add('active');
        }
    });

    // 3. Mobile-Only Dropdown Toggle Logic (Click to open sub-menu)
    dropdownItems.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        toggle.addEventListener('click', function(e) {
            // Check if we are in mobile view (screen width <= 991px)
            if (window.innerWidth <= 991) {
                // This prevents navigation to ./products.html on mobile click
                e.preventDefault(); 
                
                // Close all other dropdowns before toggling this one
                dropdownItems.forEach(item => {
                    if (item !== dropdown) {
                        item.classList.remove('active');
                    }
                });

                // Toggle the active class on the parent list item to open/close the sub-menu
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // 4. CLOSURE LOGIC: Hide the entire mobile menu when any link is clicked
    document.querySelectorAll('.nav-link, .sub-menu-item').forEach(link => {
        link.addEventListener('click', function() {
            // Check if we are on a mobile screen AND the link is not the dropdown toggle itself
            if (window.innerWidth <= 991 && !link.classList.contains('dropdown-toggle')) {
                // The main navigation link was clicked, so close everything.
                closeAllNav();
            }
        });
    });
});
