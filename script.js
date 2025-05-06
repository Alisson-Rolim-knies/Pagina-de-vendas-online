document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Smooth Scrolling
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                }
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Feature Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Countdown Timer
    const countdownElement = document.getElementById('countdown');
    
    if (countdownElement) {
        // Set the countdown date (7 days from now)
        const countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 7);
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').innerText = days.toString().padStart(2, '0');
            document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
            
            if (distance < 0) {
                clearInterval(countdownInterval);
                document.getElementById('days').innerText = '00';
                document.getElementById('hours').innerText = '00';
                document.getElementById('minutes').innerText = '00';
                document.getElementById('seconds').innerText = '00';
            }
        }
        
        // Update the countdown every second
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    }
    
    // Removed pricing toggle since we only have one price option now
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class on clicked item
            item.classList.toggle('active');
            
            // Close other items when one is opened (optional, comment out for multiple open items)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // Testimonial Slider
    const testimonialTrack = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (testimonialTrack && prevBtn && nextBtn) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        const cardWidth = testimonialCards[0].offsetWidth;
        const cardsPerView = getCardsPerView();
        const maxIndex = testimonialCards.length - cardsPerView;
        
        function getCardsPerView() {
            const viewportWidth = window.innerWidth;
            if (viewportWidth < 576) return 1;
            if (viewportWidth < 992) return 2;
            return 3;
        }
        
        function updateSliderPosition() {
            const gap = parseInt(getComputedStyle(testimonialTrack).gap);
            testimonialTrack.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
            
            // Update button states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxIndex;
            
            // Visual indication of disabled state
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        }
        
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSliderPosition();
            }
        });
        
        // Initialize slider position
        updateSliderPosition();
        
        // Update on window resize
        window.addEventListener('resize', function() {
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                // Reset position on layout change
                currentIndex = 0;
                updateSliderPosition();
            }
        });
    }
    
    // Sticky Header
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '';
            header.style.boxShadow = '';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.benefit-card, .feature-content, .pricing-card, .stat-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // Initial check and add scroll listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});
