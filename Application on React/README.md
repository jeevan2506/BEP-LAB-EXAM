# React Form App

A professional React app with a well-styled contact form and client-side validation. Built with Vite for fast development.

## Quick Start (PowerShell)

```powershell
npm install
npm run dev
```

Open the shown localhost URL in your browser (usually http://localhost:5173).

## What It Contains

- `src/components/ContactForm.jsx` — accessible form, validation, success state
- `src/styles.css` — compact, modern styling
- `src/App.jsx` — layout and page structure

## Features

✅ **Form Validation**: Name, email format, message length, and consent checkbox
✅ **Accessible**: Proper labels, ARIA attributes, semantic HTML
✅ **Responsive Design**: Works on desktop and mobile
✅ **Professional UI**: Modern styling with gradient header and card layout
✅ **Success Feedback**: Clear success messages and form reset

## Notes

- This is a client-side demo. The form submission is simulated with setTimeout.
- To wire it to a real API, replace the setTimeout in `ContactForm.jsx` with a fetch/axios call to your backend.
- Example API integration:
  ```javascript
  fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  })
  ```
