# Wonder Dome Landing Page

A modern, responsive landing page for Wonder Dome with Downtown LA vibes.

## Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI** - Glass morphism design with smooth animations
- **Interactive Form** - Collects visitor information with validation
- **DTLA Aesthetic** - Urban styling with gradient overlays
- **Smooth Animations** - Floating elements, shimmer effects, and transitions
- **Form Validation** - Client-side validation with user feedback

## Files

- `index.html` - Main HTML structure
- `style.css` - All styling and animations
- `script.js` - Form handling and interactive effects
- `README.md` - This documentation

## Customization

### Adding Downtown LA Images

Replace the CSS background with actual DTLA images:

1. Add your DTLA skyline image to the project folder
2. Update the `.hero-section` background in `style.css`:

```css
.hero-section {
    background-image: url('your-dtla-image.jpg');
    background-size: cover;
    background-position: center;
}
```

### Form Data Handling

Currently, form data is stored locally. To connect to a real backend:

1. Replace the `setTimeout` simulation in `script.js` with a real API call:

```javascript
// Replace the setTimeout with:
fetch('/api/signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    showMessage('Welcome to Wonder Dome! We\'ll be in touch soon.', 'success');
    form.reset();
});
```

### Colors & Branding

Update the color scheme in `style.css`:

```css
/* Main brand colors */
.wonder-text {
    background: linear-gradient(45deg, #YOUR_COLOR_1, #YOUR_COLOR_2);
}

.signup-btn {
    background: linear-gradient(135deg, #YOUR_COLOR_1, #YOUR_COLOR_2);
}
```

## Deployment Options

### 1. Static Hosting (Easiest)
- Upload files to: Netlify, Vercel, GitHub Pages, or AWS S3
- No server required for basic functionality

### 2. With Backend
- Deploy to: Heroku, DigitalOcean, AWS, or Google Cloud
- Add Node.js/Python/PHP backend for form processing

### 3. CDN + API
- Host static files on CDN
- Use services like Formspree or Netlify Forms for form handling

## Recommended Images

For the best DTLA aesthetic, use:
- Downtown LA skyline at sunset/night
- High-res (1920x1080 or larger)
- Dark/moody tones to complement the design

## Browser Support

- Chrome/Safari/Firefox (latest)
- Mobile Safari/Chrome
- Internet Explorer not supported (uses modern CSS features)

## Performance

- Lightweight: ~11KB total (HTML + CSS + JS)
- Uses Google Fonts (Inter) - can be self-hosted if needed
- Minimal external dependencies
- Optimized for fast loading

---

Built with modern web standards and lots of ✨