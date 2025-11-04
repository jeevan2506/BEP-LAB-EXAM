document.addEventListener('DOMContentLoaded', function() {
  // Form field animations on focus
  const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea, input[type="file"]');
  
  inputs.forEach((input, index) => {
    // Staggered initial animation
    const formGroup = input.closest('.form-group');
    if (formGroup) {
      formGroup.style.opacity = '0';
      formGroup.style.animation = `fadeInUp 0.6s ease-out ${0.2 + index * 0.1}s forwards`;
    }

    input.addEventListener('focus', function() {
      const parent = this.closest('.form-group');
      if (parent) {
        parent.style.transform = 'scale(1.01)';
        parent.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }
    });
    
    input.addEventListener('blur', function() {
      const parent = this.closest('.form-group');
      if (parent) {
        parent.style.transform = 'scale(1)';
      }
    });

    // Label interaction
    const label = input.closest('.form-group')?.querySelector('label');
    if (label) {
      input.addEventListener('focus', function() {
        label.style.color = 'var(--primary)';
        label.style.transform = 'scale(1.05)';
      });

      input.addEventListener('blur', function() {
        label.style.color = 'var(--gray-700)';
        label.style.transform = 'scale(1)';
      });
    }
  });

  // Enhanced file input visual feedback
  const fileInput = document.getElementById('avatar');
  if (fileInput) {
    const fileLabel = fileInput.closest('.form-group')?.querySelector('label');
    
    fileInput.addEventListener('change', function() {
      if (this.files.length > 0) {
        const fileName = this.files[0].name;
        const fileSize = (this.files[0].size / 1024).toFixed(2);
        
        // Create visual feedback
        if (fileLabel) {
          const originalText = fileLabel.textContent;
          fileLabel.innerHTML = `<span style="font-size: 18px;">✅</span> File selected: <strong>${fileName}</strong> (${fileSize}KB)`;
          fileLabel.style.color = 'var(--success)';
          fileLabel.style.animation = 'slideInRight 0.4s ease-out';
          
          // Reset after submission
          setTimeout(() => {
            fileLabel.innerHTML = originalText;
            fileLabel.style.color = 'var(--gray-700)';
          }, 30000); // 30 seconds
        }
      }
    });

    fileInput.addEventListener('click', function() {
      if (fileLabel) {
        fileLabel.style.animation = 'pulse 0.6s ease-in-out';
      }
    });
  }

  // Form validation visual feedback with animation
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      const button = form.querySelector('button[type="submit"]');
      if (button && form.checkValidity() === false) {
        e.preventDefault();
        
        // Add shake animation to invalid fields
        inputs.forEach(input => {
          if (!input.value && input.hasAttribute('required')) {
            const parent = input.closest('.form-group');
            if (parent) {
              parent.style.animation = 'slideInLeft 0.3s ease-out 2';
            }
          }
        });
      } else if (button) {
        // Button loading state
        button.disabled = true;
        button.innerHTML = '<span style="opacity: 0.7;">Submitting...</span>';
        button.style.opacity = '0.8';
      }
    });
  }

  // Smooth scroll for any anchor links
  document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Input value persistence animation
  inputs.forEach(input => {
    if (input.value) {
      const label = input.closest('.form-group')?.querySelector('label');
      if (label) {
        label.style.color = 'var(--primary-light)';
      }
    }
  });
});

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe form elements and result page elements
document.querySelectorAll('.form-group, .result-item, .avatar-section').forEach(el => {
  observer.observe(el);
});
