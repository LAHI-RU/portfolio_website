# Lahiru Bandara Portfolio

Static portfolio for Lahiru Bandara, focused on current software engineering experience, full-stack projects, AI-driven workflows, and contact conversion.

## Current Positioning

- Associate Software Engineer at Rangiri Holdings (Pvt) Ltd
- Laravel, React, MySQL, Python, OpenAI API, and agentic workflow automation
- Bachelor of Computer Science, Eastern University Sri Lanka
- Projects include ERP-style systems, AI document tools, authentication, and ML-powered disease detection

## Tech Stack

- HTML5 with semantic sections and accessible navigation
- CSS design tokens with responsive component layouts
- Tailwind CSS CDN as the utility framework layer
- Vanilla JavaScript modules for theme, navigation, filtering, reveal animations, and contact UX
- Boxicons for icons

## Project Structure

```text
portfolio_website/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── Lahiru_Bandara.pdf
│   ├── profile.png
│   ├── profile1.png
│   ├── blog1.png
│   └── project*.png
└── README.md
```

## Local Preview

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8000/index.html
```

## Contact Form

The contact form validates input and opens a prefilled email by default. To use EmailJS instead, load the EmailJS browser SDK and set the values in `CONTACT_CONFIG` inside `script.js`:

- `emailJsPublicKey`
- `emailJsServiceId`
- `emailJsTemplateId`

If those values are empty, the mailto fallback is used.
