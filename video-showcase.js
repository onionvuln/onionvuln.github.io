/**
 * VIDEO SHOWCASE & PARTICLES ANIMATION
 * Creates animated particles and video-like showcase for OnionVuln
 */

;(() => {
  document.addEventListener("DOMContentLoaded", () => {
    initHeroParticles()
    initVideoShowcase()
    initCodeRain()
  })

  // Create floating particles in hero section
  function initHeroParticles() {
    const container = document.getElementById("heroParticles")
    if (!container) return

    const particleCount = 30

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "hero-particle"
      particle.style.left = `${Math.random() * 100}%`
      particle.style.animationDelay = `${Math.random() * 20}s`
      particle.style.animationDuration = `${15 + Math.random() * 10}s`
      particle.style.opacity = `${0.3 + Math.random() * 0.7}`
      particle.style.width = `${2 + Math.random() * 3}px`
      particle.style.height = particle.style.width
      container.appendChild(particle)
    }
  }

  // Initialize video showcase with animated text
  function initVideoShowcase() {
    const videoTitle = document.getElementById("videoTitle")
    const videoPlayBtn = document.getElementById("videoPlayBtn")
    const videoParticles = document.getElementById("videoParticles")
    const videoProgressBar = document.getElementById("videoProgressBar")
    const videoTime = document.getElementById("videoTime")

    if (!videoTitle) return

    // Animated typing text
    const phrases = [
      "ONIONVULN",
      "Security Research",
      "Vulnerability Discovery",
      "Penetration Testing",
      "Open Source Tools",
    ]

    let phraseIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 100

    function typePhrase() {
      const currentPhrase = phrases[phraseIndex]

      if (isDeleting) {
        videoTitle.textContent = currentPhrase.substring(0, charIndex - 1)
        charIndex--
        typingSpeed = 50
      } else {
        videoTitle.textContent = currentPhrase.substring(0, charIndex + 1)
        charIndex++
        typingSpeed = 100
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true
        typingSpeed = 2000 // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
        typingSpeed = 500 // Pause before next phrase
      }

      setTimeout(typePhrase, typingSpeed)
    }

    typePhrase()

    // Create video particles
    if (videoParticles) {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"
        particle.style.left = `${Math.random() * 100}%`
        particle.style.animationDelay = `${Math.random() * 15}s`
        particle.style.animationDuration = `${10 + Math.random() * 10}s`
        videoParticles.appendChild(particle)
      }
    }

    // Video progress simulation
    let progress = 0
    let isPlaying = true

    function updateProgress() {
      if (!isPlaying) return

      progress += 0.5
      if (progress > 100) progress = 0

      if (videoProgressBar) {
        videoProgressBar.style.width = `${progress}%`
      }

      if (videoTime) {
        const currentSec = Math.floor((progress / 100) * 20)
        videoTime.textContent = `00:${currentSec.toString().padStart(2, "0")} / 00:20`
      }

      requestAnimationFrame(updateProgress)
    }

    updateProgress()

    // Play button interaction
    if (videoPlayBtn) {
      videoPlayBtn.addEventListener("click", () => {
        isPlaying = !isPlaying
        const icon = videoPlayBtn.querySelector("svg")

        if (isPlaying) {
          icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>'
          updateProgress()
        } else {
          icon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
        }
      })
    }
  }

  // Create Matrix-style code rain effect
  function initCodeRain() {
    const container = document.getElementById("codeRain")
    if (!container) return

    const characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    const columnCount = 15

    for (let i = 0; i < columnCount; i++) {
      const column = document.createElement("div")
      column.className = "code-column"
      column.style.left = `${(i / columnCount) * 100}%`
      column.style.animationDelay = `${Math.random() * 10}s`
      column.style.animationDuration = `${8 + Math.random() * 8}s`

      // Generate random characters for this column
      let text = ""
      const charCount = 20 + Math.floor(Math.random() * 20)
      for (let j = 0; j < charCount; j++) {
        text += characters.charAt(Math.floor(Math.random() * characters.length))
      }
      column.textContent = text

      container.appendChild(column)
    }
  }
})()
