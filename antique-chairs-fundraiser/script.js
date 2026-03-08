document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Donation Amount Selection
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.querySelector('.custom-amount-input');
    const customAmountField = document.getElementById('customAmount');
    let selectedAmount = 0;
    
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            
            if (this.classList.contains('custom-amount')) {
                this.classList.add('selected');
                customAmountInput.style.display = 'block';
                customAmountField.focus();
                selectedAmount = 0; // Will be set when custom amount is entered
            } else {
                this.classList.add('selected');
                customAmountInput.style.display = 'none';
                selectedAmount = parseInt(this.dataset.amount);
            }
        });
    });
    
    // Handle custom amount input
    customAmountField.addEventListener('input', function() {
        selectedAmount = parseInt(this.value) || 0;
    });
    
    // Donation Form Submission
    const donationForm = document.getElementById('donationForm');
    
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate donation amount
        if (selectedAmount <= 0) {
            showMessage('Please select or enter a donation amount.', 'error');
            return;
        }
        
        // Get form data
        const formData = {
            amount: selectedAmount,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value,
            updates: document.getElementById('updates').checked
        };
        
        // Validate required fields
        if (!formData.firstName || !formData.lastName || !formData.email) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email
        if (!isValidEmail(formData.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show processing state
        const submitButton = donationForm.querySelector('.btn-primary');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitButton.disabled = true;
        
        // Simulate donation processing (replace with actual payment processing)
        setTimeout(() => {
            // Store donation data locally (replace with actual backend)
            const donations = JSON.parse(localStorage.getItem('chairsDonations') || '[]');
            donations.push({
                ...formData,
                timestamp: new Date().toISOString(),
                id: Date.now()
            });
            localStorage.setItem('chairsDonations', JSON.stringify(donations));
            
            // Update progress
            updateProgress(selectedAmount);
            
            showMessage(`Thank you for your generous donation of $${selectedAmount}! You'll receive a confirmation email shortly.`, 'success');
            donationForm.reset();
            
            // Reset amount selection
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            customAmountInput.style.display = 'none';
            selectedAmount = 0;
            
            // Reset button
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
            
        }, 2000);
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('.btn-primary');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate sending message
        setTimeout(() => {
            showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
            contactForm.reset();
            
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
    
    // Progress Update Function
    function updateProgress(donationAmount) {
        const currentRaised = parseInt(document.getElementById('raised-amount').textContent.replace('$', '').replace(',', ''));
        const newRaised = currentRaised + donationAmount;
        const goal = parseInt(document.getElementById('goal-amount').textContent.replace('$', '').replace(',', ''));
        const currentDonors = parseInt(document.getElementById('donors-count').textContent);
        
        // Update amounts
        document.getElementById('raised-amount').textContent = `$${newRaised.toLocaleString()}`;
        document.getElementById('donors-count').textContent = (currentDonors + 1).toString();
        
        // Update progress bar
        const percentage = Math.min((newRaised / goal) * 100, 100);
        document.querySelector('.progress-fill').style.width = `${percentage}%`;
        document.querySelector('.progress-text').textContent = `${percentage.toFixed(1)}% funded`;
        
        // Store in localStorage
        localStorage.setItem('chairsProgress', JSON.stringify({
            raised: newRaised,
            donors: currentDonors + 1,
            percentage: percentage
        }));
    }
    
    // Load saved progress on page load
    function loadProgress() {
        const savedProgress = localStorage.getItem('chairsProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            document.getElementById('raised-amount').textContent = `$${progress.raised.toLocaleString()}`;
            document.getElementById('donors-count').textContent = progress.donors.toString();
            document.querySelector('.progress-fill').style.width = `${progress.percentage}%`;
            document.querySelector('.progress-text').textContent = `${progress.percentage.toFixed(1)}% funded`;
        }
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show message function
    function showMessage(text, type) {
        // Remove any existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const message = document.createElement('div');
        message.className = `form-message ${type}`;
        message.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${text}`;
        
        // Add styles
        message.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: ${type === 'success' ? 'linear-gradient(135deg, #28a745, #20c997)' : 'linear-gradient(135deg, #dc3545, #fd7e14)'};
            animation: slideDown 0.3s ease;
        `;
        
        // Add animation keyframes
        if (!document.querySelector('#message-animations')) {
            const style = document.createElement('style');
            style.id = 'message-animations';
            style.textContent = `
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                }
                @keyframes slideUp {
                    from {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-20px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Insert message
        document.body.appendChild(message);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.style.animation = 'slideUp 0.3s ease';
                setTimeout(() => {
                    if (message.parentNode) {
                        message.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Counter animation for stats
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = element.textContent.includes('$') ? `$${value.toLocaleString()}` : value.toString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate counters when progress section comes into view
                if (entry.target.classList.contains('progress-section')) {
                    const raisedElement = document.getElementById('raised-amount');
                    const goalElement = document.getElementById('goal-amount');
                    const donorsElement = document.getElementById('donors-count');
                    
                    const savedProgress = localStorage.getItem('chairsProgress');
                    if (savedProgress) {
                        const progress = JSON.parse(savedProgress);
                        animateCounter(raisedElement, 0, progress.raised, 2000);
                        animateCounter(donorsElement, 0, progress.donors, 1500);
                    } else {
                        animateCounter(raisedElement, 0, 12450, 2000);
                        animateCounter(donorsElement, 0, 87, 1500);
                    }
                    animateCounter(goalElement, 0, 25000, 2500);
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Load progress on page load
    loadProgress();
    
    // Add some Easter eggs
    let clickCount = 0;
    document.querySelector('.logo').addEventListener('click', function() {
        clickCount++;
        if (clickCount === 7) {
            showMessage('🪑 You found the secret! Thanks for supporting antique preservation!', 'success');
            clickCount = 0;
        }
    });
    
    // Add floating animation to chair cards
    document.querySelectorAll('.chair-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.style.animation = 'fadeInUp 0.8s ease forwards';
    });
    
    // Add floating animation keyframes
    if (!document.querySelector('#card-animations')) {
        const style = document.createElement('style');
        style.id = 'card-animations';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log(`
    🪑 Heritage Chairs Fundraiser 🪑
    ════════════════════════════════
    Preserving history, one chair at a time.
    Built with ❤️ for antique preservation.
    `);
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const chairShowcase = document.querySelector('.chair-showcase');
    
    if (heroContent && chairShowcase) {
        const rate = scrolled * -0.5;
        chairShowcase.style.transform = `translateY(${rate * 0.3}px) rotate(${scrolled * 0.05}deg)`;
    }
});

// Add some interactive hover effects
document.addEventListener('mousemove', function(e) {
    const chairs = document.querySelectorAll('.chair-image i');
    chairs.forEach(chair => {
        const rect = chair.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const distance = Math.sqrt(x * x + y * y);
        
        if (distance < 100) {
            const angle = Math.atan2(y, x);
            const moveX = Math.cos(angle) * (100 - distance) * 0.1;
            const moveY = Math.sin(angle) * (100 - distance) * 0.1;
            chair.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
            chair.style.transform = 'translate(0, 0)';
        }
    });
});