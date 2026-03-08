# Antique Chairs Fundraiser Website

A beautiful, fully-functional fundraising website for antique chair preservation and restoration.

## 🪑 Features

### **Professional Design**
- Elegant antique-inspired color scheme (warm browns, golds)
- Responsive design that works on all devices
- Smooth animations and hover effects
- Professional typography (Playfair Display + Source Sans Pro)

### **Fundraising Tools**
- **Progress Tracking** - Visual progress bar with live updates
- **Donation System** - Multiple amount options + custom amounts
- **Donor Management** - Collects donor information with email validation
- **Local Storage** - Saves donations and progress (ready for backend integration)

### **Content Sections**
- **Hero Section** - Compelling call-to-action with floating chair animation
- **Mission Statement** - Clear explanation of preservation goals
- **Chair Gallery** - Showcase of featured antique pieces needing restoration
- **Donation Form** - Professional form with amount selection
- **Contact Information** - Easy ways to get in touch

### **Interactive Elements**
- Mobile-responsive navigation with hamburger menu
- Smooth scrolling between sections
- Animated counters for fundraising stats
- Hover effects on chair cards
- Form validation with success/error messages
- Parallax scrolling effects

## 📁 Files Structure

```
antique-chairs-fundraiser/
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Interactive functionality
└── README.md           # This documentation
```

## 🎨 Design Features

### **Color Palette**
- Primary: `#8B4513` (Saddle Brown)
- Accent: `#D2691E` (Chocolate)
- Dark: `#2c1810` (Dark Brown)
- Light: `#f5f1eb` (Antique White)

### **Typography**
- Headers: Playfair Display (elegant serif)
- Body: Source Sans Pro (readable sans-serif)

### **Animations**
- Floating chair icon in hero section
- Fade-in animations for sections
- Progress bar shimmer effect
- Hover transformations
- Smooth button transitions

## 🚀 Customization Guide

### **Update Chair Information**
Edit the chair cards in `index.html`:

```html
<div class="chair-card">
    <div class="chair-info">
        <h3>Your Chair Name</h3>
        <p class="period">circa 1900</p>
        <p class="description">Your chair description...</p>
        <div class="restoration-cost">
            <span class="cost">$500 needed</span>
        </div>
    </div>
</div>
```

### **Change Fundraising Goal**
Update the goal amount in `index.html`:

```html
<h3 id="goal-amount">$50,000</h3> <!-- Change this -->
```

And update the progress calculation in `script.js`.

### **Add Real Images**
Replace the chair icon placeholders with actual photos:

1. Add your images to the project folder
2. Replace the chair-image content:

```html
<div class="chair-image">
    <img src="your-chair-photo.jpg" alt="Antique Chair">
</div>
```

3. Update CSS for proper image styling

### **Contact Information**
Update contact details in `index.html`:

```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <span>your-email@example.com</span>
</div>
```

### **Social Media Links**
Update social media URLs in the footer:

```html
<a href="https://facebook.com/yourpage"><i class="fab fa-facebook"></i></a>
```

## 💳 Payment Integration

Currently, the donation system stores data locally. To connect real payment processing:

### **Stripe Integration**
```javascript
// In script.js, replace the setTimeout simulation with:
stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
}).then(function(result) {
    if (result.error) {
        showMessage(result.error.message, 'error');
    } else {
        // Send to your backend
        processPayment(result.paymentMethod, selectedAmount);
    }
});
```

### **PayPal Integration**
Add PayPal buttons to the donation section:

```html
<div id="paypal-button-container"></div>
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>
```

### **Backend Requirements**
- Donation processing endpoint
- Email confirmation system  
- Progress tracking database
- Admin dashboard for managing campaigns

## 📊 Analytics Integration

Add Google Analytics or similar:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🌐 Deployment Options

### **Static Hosting (Recommended for MVP)**
- **Netlify**: Drag & drop deployment, free SSL
- **Vercel**: Git integration, automatic deployments  
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3**: Scalable static hosting

### **Full-Stack Hosting**
- **Heroku**: Easy deployment with backend support
- **DigitalOcean**: VPS with full control
- **AWS**: Complete cloud solution
- **Google Cloud**: Integrated services

## 🔧 Technical Requirements

### **Browser Support**
- Chrome/Safari/Firefox (latest versions)
- Mobile Safari/Chrome
- Internet Explorer not supported (uses modern CSS)

### **Dependencies**
- Google Fonts (Inter, Playfair Display)
- Font Awesome icons
- No JavaScript frameworks required

### **Performance**
- Total size: ~45KB (HTML + CSS + JS)
- Optimized for fast loading
- Mobile-first responsive design
- Accessible navigation

## 🎯 SEO Optimization

The website includes:
- Semantic HTML structure
- Meta descriptions and titles
- Alt text ready for images
- Structured navigation
- Mobile-responsive design
- Fast loading times

## 📝 Content Strategy

### **Compelling Copy**
- Emotional connection to history preservation
- Clear value proposition
- Specific restoration needs
- Transparent fund usage

### **Visual Storytelling**
- Before/after restoration photos
- Craftsman process images  
- Historical context photos
- Donor recognition gallery

## 🤝 Community Features

Consider adding:
- Donor wall/recognition page
- Progress updates blog
- Restoration photo gallery
- Email newsletter signup
- Social media integration
- Volunteer opportunities

---

## 🚀 Ready to Launch!

Your antique chairs fundraising website is complete and ready to help preserve history. The elegant design reflects the craftsmanship you're working to save, while the modern functionality makes donating easy and engaging.

**Next steps:**
1. Add your actual chair photos and descriptions
2. Set up payment processing
3. Connect to your email system
4. Deploy to your chosen platform
5. Start spreading the word!

*Built with ❤️ for preserving craftsmanship heritage*