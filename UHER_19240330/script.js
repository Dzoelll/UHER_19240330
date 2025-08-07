document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', function(event) {
            event.stopPropagation(); // Mencegah event klik menyebar ke dokumen
            mobileNav.classList.toggle('active');
        });

        // Event listener baru untuk menutup sidebar
        document.addEventListener('click', function(event) {
            // Periksa apakah klik terjadi di luar mobileNav dan hamburgerMenu
            const isClickInsideNav = mobileNav.contains(event.target);
            const isClickOnHamburger = hamburgerMenu.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger) {
                mobileNav.classList.remove('active');
            }
        });
        
        // Menutup menu jika salah satu link diklik
        const navLinks = mobileNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
            });
        });
    }

    // Fungsionalitas Galeri (hanya berfungsi di halaman galeri)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('expanded')) {
                return;
            }

            galleryItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.add('hidden');
                }
            });

            item.classList.add('expanded');
            
            const description = item.querySelector('.card-description');
            if (description) {
                description.classList.remove('hidden');
            }

            const closeBtn = document.createElement('button');
            closeBtn.textContent = 'Kembali';
            closeBtn.classList.add('close-btn');
            item.appendChild(closeBtn);

            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                item.classList.remove('expanded');
                description.classList.add('hidden');
                galleryItems.forEach(otherItem => {
                    otherItem.classList.remove('hidden');
                });
                closeBtn.remove();
            });
        });
    });
});