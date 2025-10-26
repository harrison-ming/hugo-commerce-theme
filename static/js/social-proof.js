/**
 * Social Proof Notification System
 * Shows realistic purchase notifications in bottom-left corner
 */

(function() {
  // Sample purchase data - realistic names and locations
  const purchaseData = [
    {
      name: "Sarah from Austin, TX",
      action: "Just Bought EXPRESS SHIPPING (Insured & Tracked)",
      time: "2 minutes ago"
    },
    {
      name: "Michael from Seattle, WA",
      action: "Just Purchased FAMILY PROTECTION PACK (2 Decrees)",
      time: "5 minutes ago"
    },
    {
      name: "Jennifer from Miami, FL",
      action: "Just Bought ULTIMATE ABUNDANCE PACK (3 Decrees)",
      time: "8 minutes ago"
    },
    {
      name: "David from Boston, MA",
      action: "Just Ordered with PRIORITY DELIVERY",
      time: "12 minutes ago"
    },
    {
      name: "Lisa from Denver, CO",
      action: "Just Purchased CELESTIAL DECREE + Gift Wrapping",
      time: "15 minutes ago"
    },
    {
      name: "Robert from Portland, OR",
      action: "Just Bought EXPRESS SHIPPING (Insured & Tracked)",
      time: "18 minutes ago"
    },
    {
      name: "Emily from Chicago, IL",
      action: "Just Purchased FAMILY PROTECTION PACK (2 Decrees)",
      time: "22 minutes ago"
    },
    {
      name: "James from Phoenix, AZ",
      action: "Just Ordered ULTIMATE ABUNDANCE PACK (3 Decrees)",
      time: "25 minutes ago"
    },
    {
      name: "Amanda from Nashville, TN",
      action: "Just Bought with PREMIUM GIFT BOX",
      time: "28 minutes ago"
    },
    {
      name: "Christopher from San Diego, CA",
      action: "Just Purchased CELESTIAL DECREE (Single)",
      time: "32 minutes ago"
    }
  ];

  let currentIndex = 0;
  let notificationElement = null;

  // Create notification container
  function createNotificationElement() {
    const notification = document.createElement('div');
    notification.id = 'social-proof-notification';
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: -400px;
      max-width: 350px;
      background: white;
      border-radius: 8px;
      padding: 12px 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 9999;
      transition: left 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      cursor: pointer;
      border-left: 4px solid #3FA026;
    `;

    notification.innerHTML = `
      <div style="flex-shrink: 0;">
        <div style="
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #3FA026, #5ED54B);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
        ">👤</div>
      </div>
      <div style="flex: 1; min-width: 0;">
        <div id="notification-name" style="
          font-weight: 600;
          font-size: 14px;
          color: #1f2937;
          margin-bottom: 4px;
        "></div>
        <div id="notification-action" style="
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 6px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        "></div>
        <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: #9ca3af;">
          <span id="notification-time"></span>
          <span style="color: #3FA026;">✓ verified</span>
        </div>
      </div>
    `;

    document.body.appendChild(notification);
    return notification;
  }

  // Show notification with slide-in animation
  function showNotification(data) {
    if (!notificationElement) {
      notificationElement = createNotificationElement();
    }

    // Update content
    document.getElementById('notification-name').textContent = data.name;
    document.getElementById('notification-action').textContent = data.action;
    document.getElementById('notification-time').textContent = data.time;

    // Slide in
    setTimeout(() => {
      notificationElement.style.left = '20px';
    }, 100);

    // Slide out after 5 seconds
    setTimeout(() => {
      notificationElement.style.left = '-400px';
    }, 5000);
  }

  // Start notification loop
  function startNotificationLoop() {
    // Show first notification after 3 seconds
    setTimeout(() => {
      showNotification(purchaseData[currentIndex]);
      currentIndex = (currentIndex + 1) % purchaseData.length;

      // Continue showing notifications every 8 seconds
      setInterval(() => {
        showNotification(purchaseData[currentIndex]);
        currentIndex = (currentIndex + 1) % purchaseData.length;
      }, 8000);
    }, 3000);
  }

  // Close notification on click
  document.addEventListener('click', function(e) {
    if (e.target.closest('#social-proof-notification')) {
      if (notificationElement) {
        notificationElement.style.left = '-400px';
      }
    }
  });

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startNotificationLoop);
  } else {
    startNotificationLoop();
  }

  // Hide on mobile devices (optional)
  if (window.innerWidth < 768) {
    const style = document.createElement('style');
    style.textContent = '#social-proof-notification { display: none !important; }';
    document.head.appendChild(style);
  }
})();
