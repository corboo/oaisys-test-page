document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const submitBtn = form.querySelector('.signup-btn');
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            interest: document.getElementById('interest').value
        };
        
        // Validate required fields
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.interest) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email
        if (!isValidEmail(formData.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = 'Joining...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            console.log('Form Data:', formData);
            
            // Store data locally for now (replace with actual backend)
            localStorage.setItem('wonderDomeSignup', JSON.stringify({
                ...formData,
                timestamp: new Date().toISOString()
            }));
            
            showMessage('Welcome to Wonder Dome! We\'ll be in touch soon.', 'success');
            form.reset();
            
            // Reset button
            setTimeout(() => {
                submitBtn.innerHTML = 'Join the Wonder';
                submitBtn.disabled = false;
            }, 2000);
            
        }, 1500);
    });
    
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
        message.textContent = text;
        
        // Add styles
        message.style.cssText = `
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 8px;
            text-align: center;
            font-weight: 500;
            background: ${type === 'success' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)'};
            border: 1px solid ${type === 'success' ? 'rgba(76, 175, 80, 0.5)' : 'rgba(244, 67, 54, 0.5)'};
            color: ${type === 'success' ? '#4CAF50' : '#F44336'};
        `;
        
        // Insert message
        form.appendChild(message);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
    }
    
    // Add some interactive effects
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
    
    // Add floating animation to signup container
    const signupContainer = document.querySelector('.signup-container');
    let floatDirection = 1;
    
    setInterval(() => {
        floatDirection *= -1;
        signupContainer.style.transform = `translateY(${floatDirection * 2}px)`;
    }, 3000);
});

// Add some console art for fun
console.log(`
╦ ╦╔═╗╔╗╔╔╦╗╔═╗╦═╗  ╔╦╗╔═╗╔╦╗╔═╗
║║║║ ║║║║ ║║║╣ ╠╦╝   ║║║ ║║║║║╣ 
╚╩╝╚═╝╝╚╝═╩╝╚═╝╩╚═  ═╩╝╚═╝╩ ╩╚═╝

Welcome to Wonder Dome - Built with ❤️
`);