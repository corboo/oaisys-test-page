// Add smooth scrolling and interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll-triggered animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.capability, .tip, .specialist').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover effects to capabilities
    document.querySelectorAll('.capability').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click interaction to specialists
    document.querySelectorAll('.specialist').forEach(specialist => {
        specialist.addEventListener('click', function() {
            const name = this.querySelector('h3').textContent;
            const expertise = this.querySelector('p').textContent;
            
            // Create a temporary tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = `Click to chat with ${name} about ${expertise}`;
            tooltip.style.cssText = `
                position: fixed;
                background: #333;
                color: white;
                padding: 10px 15px;
                border-radius: 5px;
                font-size: 0.9rem;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            // Position tooltip near click
            const rect = this.getBoundingClientRect();
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            
            // Show and hide tooltip
            setTimeout(() => tooltip.style.opacity = '1', 10);
            setTimeout(() => {
                tooltip.style.opacity = '0';
                setTimeout(() => document.body.removeChild(tooltip), 300);
            }, 2000);
        });
    });

    // Add parallax effect to hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add typing effect to the main title (optional enhancement)
    const title = document.querySelector('.hero h1');
    if (title) {
        const originalText = title.innerHTML;
        title.innerHTML = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                title.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add dynamic capability descriptions
    const capabilityDescriptions = {
        "Real-Time Research": [
            "Flight searches that return actual prices and times",
            "Restaurant recommendations with real availability", 
            "Weather forecasts with specific conditions",
            "News updates from reliable sources"
        ],
        "Specialist Network": [
            "Claire for meal planning and recipe creation",
            "Nigel for plant care and garden design",
            "Marco for detailed travel itineraries",
            "Olly for personalized fitness programs"
        ],
        "Technical Tasks": [
            "Deploy websites to production in minutes",
            "Create and manage GitHub repositories",
            "Write and execute code in multiple languages",
            "Integrate with APIs and external services"
        ],
        "Connected Services": [
            "Access to Google Calendar, Gmail, and Drive",
            "Integration with Spotify, social media",
            "Secure API vault with 15+ services",
            "Personal data with full privacy protection"
        ]
    };

    // Rotate capability descriptions on hover
    document.querySelectorAll('.capability').forEach(cap => {
        const title = cap.querySelector('h3').textContent;
        const descriptions = capabilityDescriptions[title];
        const originalDesc = cap.querySelector('p').textContent;
        let currentIndex = 0;

        cap.addEventListener('mouseenter', function() {
            if (descriptions && descriptions.length > 1) {
                const descElement = cap.querySelector('p');
                const interval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % descriptions.length;
                    descElement.style.opacity = '0.5';
                    setTimeout(() => {
                        descElement.textContent = descriptions[currentIndex];
                        descElement.style.opacity = '1';
                    }, 150);
                }, 2000);

                cap.dataset.interval = interval;
            }
        });

        cap.addEventListener('mouseleave', function() {
            if (cap.dataset.interval) {
                clearInterval(cap.dataset.interval);
                const descElement = cap.querySelector('p');
                descElement.textContent = originalDesc;
                descElement.style.opacity = '1';
            }
        });
    });
});