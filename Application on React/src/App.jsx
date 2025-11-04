import React from 'react'
import ContactForm from './components/ContactForm'

export default function App() {
  return (
    <div className="app-root">
      <main className="main-content">
        <div className="form-container">
          <div className="form-header">
            <h1>Get In Touch</h1>
            <p>Send us a message and we'll respond as soon as possible</p>
          </div>
          <ContactForm />
        </div>
      </main>
    </div>
  )
}
