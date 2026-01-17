/**
 * ONIONVULN PORTFOLIO - JavaScript
 * Handles navigation, animations, and form interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // Mobile Navigation Toggle
  // ============================================

  const navToggle = document.querySelector(".nav-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")

      // Animate hamburger to X
      const spans = navToggle.querySelectorAll("span")
      spans.forEach((span, index) => {
        span.style.transition = "all 0.3s ease"
      })

      if (navLinks.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })

    // Close mobile menu when clicking on a link
    navLinks.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active")
        const spans = navToggle.querySelectorAll("span")
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      })
    })
  }

  // ============================================
  // Scroll Animations
  // ============================================

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe cards and sections for scroll animations
  document.querySelectorAll(".card, .repo-card, .social-link, .timeline-item").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // ============================================
  // Navigation Scroll Effect
  // ============================================

  const nav = document.querySelector(".nav")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 100) {
      nav.style.background = "rgba(10, 10, 10, 0.98)"
    } else {
      nav.style.background = "rgba(10, 10, 10, 0.95)"
    }

    lastScroll = currentScroll
  })

  // ============================================
  // Contact Form Handler
  // ============================================

  const contactForm = document.getElementById("contact-form")
  const formStatus = document.getElementById("form-status")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      }

      // Simulate form submission
      formStatus.textContent = "> Sending message..."
      formStatus.style.color = "#b0b0b0"

      setTimeout(() => {
        // In production, this would send to a backend
        console.log("Form submitted:", data)
        formStatus.textContent = "> Message sent successfully!"
        formStatus.style.color = "#00ff00"
        contactForm.reset()

        // Reset status after 5 seconds
        setTimeout(() => {
          formStatus.textContent = ""
        }, 5000)
      }, 1500)
    })
  }

  // ============================================
  // Terminal Typing Effect
  // ============================================

  function typeWriter(element, text, speed = 50) {
    let i = 0
    element.textContent = ""

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i)
        i++
        setTimeout(type, speed)
      }
    }

    type()
  }

  // Apply typing effect to hero badge if it exists
  const heroBadge = document.querySelector(".hero-badge")
  if (heroBadge) {
    const originalText = heroBadge.textContent
    heroBadge.textContent = ""

    setTimeout(() => {
      typeWriter(heroBadge, originalText, 30)
    }, 500)
  }

  // ============================================
  // Glitch Effect on Hover
  // ============================================

  document.querySelectorAll(".glitch").forEach((el) => {
    el.addEventListener("mouseenter", function () {
      this.style.textShadow = "2px 0 #00ff00, -2px 0 #ff0000"
      setTimeout(() => {
        this.style.textShadow = "none"
      }, 200)
    })
  })

  // ============================================
  // Keyboard Navigation Enhancement
  // ============================================

  document.addEventListener("keydown", (e) => {
    // ESC key closes mobile menu
    if (e.key === "Escape" && navLinks && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active")
      const spans = navToggle.querySelectorAll("span")
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })

  // ============================================
  // Console Easter Egg
  // ============================================

  console.log("%c◎ onionvuln", "font-size: 24px; font-weight: bold; color: #00ff00;")
  console.log("%cPeeling back the layers of digital security.", "font-size: 12px; color: #b0b0b0;")
  console.log("%cGitHub: https://github.com/onionvuln", "font-size: 12px; color: #666666;")
})
