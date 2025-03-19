document.addEventListener('DOMContentLoaded', function() {
  // Get both forms
  const demoForm = document.getElementById('demo-form');
  const whitepaperForm = document.getElementById('whitepaper-form');
  
  // N8n webhook URL - replace this with your actual n8n webhook URL
  const N8N_WEBHOOK_URL = 'https://prasannak.app.n8n.cloud/webhook-test/demo-request';
  
  // Handle demo request form submission
  if (demoForm) {
    demoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('demo-name').value;
      const company = document.getElementById('demo-company').value;
      const email = document.getElementById('demo-email').value;
      const teamSize = document.getElementById('demo-team-size').value;
      
      // Show loading state
      const submitButton = demoForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';
      
      // Remove any existing error messages
      const existingError = demoForm.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }
      
      // Send data to n8n webhook
      fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          company: company,
          email: email,
          teamSize: teamSize,
          formType: 'demo',
          source: window.location.href,
          timestamp: new Date().toISOString()
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Show success message
        demoForm.innerHTML = '<div class="success-message"><h3>Thank you for your interest!</h3><p>We\'ll be in touch shortly to schedule your executive demo.</p></div>';
        
        // Track form submission event (if analytics is set up)
        if (typeof gtag === 'function') {
          gtag('event', 'demo_request', {
            'event_category': 'form',
            'event_label': 'executive_demo',
            'product_focus': 'bigtech_capabilities'
          });
        }
      })
      .catch(error => {
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'There was an error submitting your request. Please try again or contact us directly.';
        demoForm.prepend(errorDiv);
        
        // Log error
        console.error('Error:', error);
      });
    });
  }
  
  // Handle whitepaper form submission
  if (whitepaperForm) {
    whitepaperForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const email = document.getElementById('whitepaper-email').value;
      
      // Show loading state
      const submitButton = whitepaperForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Downloading...';
      
      // Remove any existing error messages
      const existingError = whitepaperForm.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }
      
      // Send data to n8n webhook
      fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          formType: 'whitePaper',
          whitePaperType: 'engineering_excellence',
          source: window.location.href,
          timestamp: new Date().toISOString()
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Show success message and download link
        whitepaperForm.innerHTML = '<div class="success-message"><h3>Thank you!</h3><p>Your whitepaper is ready. <a href="assets/files/LegacyBoost-Engineering-Excellence.pdf" download>Download now</a></p></div>';
        
        // Track form submission event (if analytics is set up)
        if (typeof gtag === 'function') {
          gtag('event', 'whitepaper_download', {
            'event_category': 'form',
            'event_label': 'engineering_excellence',
            'whitepaper_type': 'engineering_excellence'
          });
        }
        
        // After a delay, automatically trigger the download
        setTimeout(function() {
          const downloadLink = document.createElement('a');
          downloadLink.href = 'assets/files/LegacyBoost-Engineering-Excellence.pdf';
          downloadLink.download = 'LegacyBoost-Engineering-Excellence.pdf';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }, 1500);
      })
      .catch(error => {
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'There was an error processing your request. Please try again or contact us directly.';
        whitepaperForm.prepend(errorDiv);
        
        // Log error
        console.error('Error:', error);
      });
    });
  }
});
