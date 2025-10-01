
document.addEventListener('DOMContentLoaded', function () {
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
    menuToggler.addEventListener('click', function () {
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
        toggle.addEventListener('click', function (e) {
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
        link.addEventListener('click', function () {
            // Check if we are on a mobile screen AND the link is not the dropdown toggle itself
            if (window.innerWidth <= 991 && !link.classList.contains('dropdown-toggle')) {
                // The main navigation link was clicked, so close everything.
                closeAllNav();
            }
        });
    });
});







function handleFormSubmission(formId, phpEndpoint) {
    const form = document.getElementById(formId);
    const loading = form.querySelector('.loading');
    const errorMessage = form.querySelector('.error-message');
    const sentMessage = form.querySelector('.sent-message');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Reset states
        loading.classList.remove('d-none');
        errorMessage.classList.add('d-none');
        sentMessage.classList.add('d-none');

        const formData = new FormData(form);

        fetch(phpEndpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(async response => {
                loading.classList.add('d-none');

                const data = await response.text();
                console.log('Server response:', data);

                if (!response.ok) {
                    errorMessage.textContent = data || 'Something went wrong. Please try again.';
                    errorMessage.classList.remove('d-none');
                    return;
                }

                if (data.trim() === 'OK') {
                    sentMessage.classList.remove('d-none');
                    form.reset();
                } else {
                    errorMessage.innerHTML = data || 'Submission failed. Please try again.';
                    errorMessage.classList.remove('d-none');
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                loading.classList.add('d-none');
                errorMessage.textContent = 'Something went wrong. Please try again later.';
                errorMessage.classList.remove('d-none');
            });
    });
}



// Initialize both forms
handleFormSubmission('contact-form', 'forms/contact.php');
handleFormSubmission('dealership-form', 'forms/dealership.php');
