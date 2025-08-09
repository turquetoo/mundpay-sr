// Mundpay One-Click Integration
console.log('⚙️ Setting up Mundpay One-Click Integration...');

// Function to initialize Mundpay buttons
function initializeMundpayButtons() {
  const fornpayButtons = document.querySelectorAll('.fornpay_btn');
  const fornpayDownsells = document.querySelectorAll('.fornpay_downsell');
  
  if (fornpayButtons.length > 0 || fornpayDownsells.length > 0) {
    console.log('✅ Mundpay buttons found:', fornpayButtons.length, 'primary,', fornpayDownsells.length, 'downsell');
    
    // The Mundpay script (oneclick.js) will handle the button functionality automatically
    // when it loads, so we just need to ensure the buttons are present
    return true;
  } else {
    console.log('⏳ Mundpay buttons not found yet');
    return false;
  }
}

// Check for Mundpay button containers
function checkForMundpayButtons() {
  const buttons = document.querySelectorAll('.fornpay_btn, .fornpay_downsell');
  if (buttons.length > 0) {
    console.log('✅ Mundpay buttons container found');
    return true;
  } else {
    console.log('⏳ Mundpay buttons container not found yet');
    return false;
  }
}

// Initialize on different timing points
document.addEventListener('DOMContentLoaded', function() {
  console.log('📄 DOMContentLoaded - checking Mundpay buttons');
  if (checkForMundpayButtons()) {
    setTimeout(initializeMundpayButtons, 100);
  }
});

window.addEventListener('load', function() {
  console.log('🌍 Window load - checking Mundpay buttons');
  if (checkForMundpayButtons()) {
    setTimeout(initializeMundpayButtons, 100);
  }
});

// Periodic check for button availability
let checkCount = 0;
const maxChecks = 10;
const checkInterval = setInterval(() => {
  checkCount++;
  
  if (checkForMundpayButtons()) {
    initializeMundpayButtons();
    clearInterval(checkInterval);
    console.log('✅ Mundpay buttons initialized on check', checkCount);
  } else if (checkCount >= maxChecks) {
    clearInterval(checkInterval);
    console.log('⚠️ Stopped checking for Mundpay buttons after', maxChecks, 'attempts');
  } else {
    console.log('🔄 Periodic check', checkCount, '- waiting for Mundpay buttons...');
  }
}, 2000);

// Load Mundpay one-click script if not already loaded
if (!document.querySelector('script[src*="oneclick.js"]')) {
  const mundpayScript = document.createElement('script');
  mundpayScript.type = 'text/javascript';
  mundpayScript.src = 'https://app.mundpay.com/js/oneclick.js';
  mundpayScript.onload = () => {
    console.log("✅ Mundpay one-click script loaded");
    setTimeout(initializeMundpayButtons, 100);
  };
  mundpayScript.onerror = (e) => {
    console.error("❌ Failed to load Mundpay one-click script:", e);
  };
  document.head.appendChild(mundpayScript);
} 