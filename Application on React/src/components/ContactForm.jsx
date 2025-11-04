import React, { useState } from 'react'

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
    agree: false,
  })

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(null)
  const [submittedData, setSubmittedData] = useState(null)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  function validate() {
    const err = {}
    if (!form.name.trim()) err.name = 'Please enter your full name.'
    if (!form.email.trim()) err.email = 'Please enter your email.'
    else if (!validateEmail(form.email)) err.email = 'Enter a valid email address.'
    if (!form.message.trim() || form.message.trim().length < 10) err.message = 'Please enter a short message (10+ characters).'
    if (!form.agree) err.agree = 'You must agree to be contacted.'
    return err
  }

  function handleSubmit(e) {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) {
      setErrors(v)
      setSuccess(null)
      return
    }

    setSubmitting(true)
    setErrors({})

    // Simulate async submit
    setTimeout(() => {
      setSubmitting(false)
      setSuccess(true)
      setSubmittedData({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      })
      setForm({ name: '', email: '', subject: 'general', message: '', agree: false })
    }, 900)
  }

  function handleResubmit() {
    setSuccess(null)
    setSubmittedData(null)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {success && submittedData ? (
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h3 className="success-title">Message Sent Successfully!</h3>
          <p className="success-subtitle">Thank you for reaching out. We'll get back to you soon.</p>
          
          <div className="submission-summary">
            <div className="summary-item">
              <span className="summary-label">Name:</span>
              <span className="summary-value">{submittedData.name}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Email:</span>
              <span className="summary-value">{submittedData.email}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Subject:</span>
              <span className="summary-value">{submittedData.subject}</span>
            </div>
            <div className="summary-item full-width">
              <span className="summary-label">Your Message:</span>
              <span className="summary-value message-text">{submittedData.message}</span>
            </div>
          </div>

          <button type="button" className="btn primary" onClick={handleResubmit}>
            Send Another Message
          </button>
        </div>
      ) : (
        <>
          <div className="field-row">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>

          <div className="field-row">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="field-row">
            <label htmlFor="subject">Subject</label>
            <select id="subject" name="subject" value={form.subject} onChange={handleChange}>
              <option value="general">General inquiry</option>
              <option value="sales">Sales</option>
              <option value="support">Support</option>
            </select>
          </div>

          <div className="field-row">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={6} placeholder="Tell us about your project, timeline, and budget." />
            {errors.message && <div className="field-error">{errors.message}</div>}
          </div>

          <div className="field-row checkbox-row">
            <label className="checkbox-label">
              <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
              I agree to be contacted about my inquiry
            </label>
            {errors.agree && <div className="field-error">{errors.agree}</div>}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn primary" disabled={submitting} aria-disabled={submitting}>
              {submitting ? 'Sending…' : 'Send message'}
            </button>
            <button type="button" className="btn" onClick={() => { setForm({ name: '', email: '', subject: 'general', message: '', agree: false }); setErrors({}); setSuccess(null); }}>
              Reset
            </button>
          </div>
        </>
      )}
    </form>
  )
}
