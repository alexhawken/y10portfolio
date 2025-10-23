var currentPage = 'home';
var currentImageIndex = 0;
var images = [];
var isTransitioning = false;

function showPage(page) {
    var oldPage = currentPage;
    if (oldPage === page || isTransitioning) return;
    
    isTransitioning = true;
    
    var overlay = document.getElementById('pageTransition');
    var oldPageElement = document.getElementById(oldPage + 'Page');
    var newPageElement = document.getElementById(page + 'Page');
    
    // Slide in animation
    overlay.classList.add('active');
    
    setTimeout(function() {
        // Change page content while covered
        if (oldPageElement) {
            oldPageElement.classList.remove('active');
            oldPageElement.style.display = 'none';
        }
        
        if (newPageElement) {
            newPageElement.style.display = 'block';
            setTimeout(function() {
                newPageElement.classList.add('active');
            }, 50);
        }
        
        currentPage = page;
        
        if (page === 'home') {
            document.getElementById('timelineNav').classList.add('show');
            window.scrollTo(0, 0);
            setTimeout(updateNavigation, 100);
        } else if (page === 'gallery') {
            document.getElementById('timelineNav').classList.remove('show');
            window.scrollTo(0, 0);
        }
        
        var navLinks = document.querySelectorAll('.nav-link');
        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].classList.remove('active');
            if (navLinks[i].getAttribute('data-page') === page) {
                navLinks[i].classList.add('active');
            }
        }
        
        // Slide out animation
        setTimeout(function() {
            overlay.classList.remove('active');
            overlay.classList.add('exit');
            
            setTimeout(function() {
                overlay.classList.remove('exit');
                isTransitioning = false;
            }, 800);
        }, 100);
    }, 800);
}

function scrollToSection(sectionId) {
    if (currentPage !== 'home') {
        showPage('home');
        setTimeout(function() {
            var element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1000);
    } else {
        var element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function updateNavigation() {
    if (currentPage !== 'home') return;
    
    var sections = document.querySelectorAll('#homePage .full-section, #homePage .hero-section');
    var navItems = document.querySelectorAll('.timeline-nav-item');
    var currentSection = '';
    
    for (var i = 0; i < sections.length; i++) {
        var sectionTop = sections[i].offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            currentSection = sections[i].getAttribute('id');
        }
    }
    
    for (var i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove('active');
        if (navItems[i].getAttribute('data-section') === currentSection) {
            navItems[i].classList.add('active');
        }
    }
}

function loadImageGallery() {
    var imageGrid = document.getElementById('imageGrid');
    
    images = [
        { filename: 'family1.jpg', title: 'Family Photo', description: 'Family gathering at a special occasion', category: 'Family' },
        { filename: 'chloe1.jpg', title: 'Chloe the Dog', description: 'My amazing dog Chloe relaxing at home', category: 'Pets' },
        { filename: 'fish1.jpg', title: 'Fish Tank', description: 'My fish that I care for', category: 'Pets' },
        { filename: 'sushi1.png', title: 'Sushi', description: 'My favourite food', category: 'Food' },
        { filename: '../projects/term1-website.jpg', title: 'Recipe Recreation', description: 'My first HTML/CSS portfolio website', category: 'Projects' },
        { filename: '../projects/term2-arduino.jpg', title: 'Arduino GPT Machine', description: 'My Fact-O-Matic Arduino Project', category: 'Projects' },
        { filename: '../projects/term3-blender-1.jpg', title: 'Creating Ears', description: 'Creating the Ear Buttons for my mouse', category: 'Projects' },
        { filename: '../projects/term3-blender-2.jpg', title: 'BambuStudio', description: 'Getting ready for 3D printing', category: 'Projects' },
        { filename: '../projects/term3-blender-3.jpg', title: 'Printed Cat', description: 'My 3D Printed Cat', category: 'Projects' },
        { filename: '../projects/term4-websiteport2-1.png', title: 'Maze Portfolio', description: 'My Maze Portfolio', category: 'Projects' },
        { filename: '../projects/term4-websiteport2-2.png', title: 'Version 1', description: 'The First Version of my new Portfolio', category: 'Projects' },
        { filename: '../projects/term4-websiteport2-3.png', title: 'Loading Bug', description: 'A bug that occured when creating the loading animation', category: 'Projects' },


    ];
    
    imageGrid.innerHTML = '';
    
    for (var i = 0; i < images.length; i++) {
        var image = images[i];
        var imageCard = document.createElement('div');
        imageCard.className = 'image-card';
        imageCard.style.animationDelay = (i * 0.1) + 's';
        
        var img = document.createElement('img');
        img.src = 'images/library/' + image.filename;
        img.alt = image.title;
        img.setAttribute('data-index', i);
        img.onclick = function() { openLightbox(parseInt(this.getAttribute('data-index'))); };
        img.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
            this.onerror = null;
        };
        
        var infoDiv = document.createElement('div');
        infoDiv.className = 'image-info';
        
        var categoryDiv = document.createElement('div');
        categoryDiv.className = 'image-category';
        categoryDiv.textContent = image.category;
        
        var titleH3 = document.createElement('h3');
        titleH3.textContent = image.title;
        
        var descP = document.createElement('p');
        descP.textContent = image.description;
        
        infoDiv.appendChild(categoryDiv);
        infoDiv.appendChild(titleH3);
        infoDiv.appendChild(descP);
        
        imageCard.appendChild(img);
        imageCard.appendChild(infoDiv);
        imageGrid.appendChild(imageCard);
    }
}

function openLightbox(imageIndex) {
    currentImageIndex = imageIndex;
    showLightboxImage();
    document.getElementById('lightbox').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function showLightboxImage() {
    var image = images[currentImageIndex];
    document.getElementById('lightboxImage').src = 'images/library/' + image.filename;
    document.getElementById('lightboxCaption').innerHTML = '<strong>' + image.title + '</strong><br>' + image.description;
}

function navigateLightbox(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    showLightboxImage();
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.addEventListener('scroll', updateNavigation);

document.addEventListener('keydown', function(event) {
    var lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'block') {
        if (event.key === 'Escape') {
            closeLightbox();
        } else if (event.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (event.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var loadingScreen = document.getElementById('loadingScreen');
    
    // Wait for red combs to completely cover screen (all combs finished + a bit extra)
    setTimeout(function() {
        loadingScreen.classList.add('covered');
    }, 2000);
    
    // Hold the red screen for a moment, then fade out
    setTimeout(function() {
        loadingScreen.classList.add('fade-out');
    }, 2400);
    
    // Finally hide completely after fade
    setTimeout(function() {
        loadingScreen.classList.add('hidden');
    }, 3700);
    
    loadImageGallery();
    showPage('home');
});
