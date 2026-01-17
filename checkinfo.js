/**
 * ============================================
 * CHECKINFO - Device Detection & AI Design System
 * Cross-browser compatible system info collector
 * with deep learning-inspired design suggestions
 * ============================================
 */

;(() => {
  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    AI_ANALYSIS_DELAY: 2500,
    LEARNING_STEPS: [
      { progress: 10, text: "Initializing neural network..." },
      { progress: 25, text: "Collecting device fingerprint..." },
      { progress: 40, text: "Analyzing browsing patterns..." },
      { progress: 55, text: "Processing color preferences..." },
      { progress: 70, text: "Evaluating screen characteristics..." },
      { progress: 85, text: "Generating design recommendations..." },
      { progress: 100, text: "Analysis complete!" },
    ],
    IP_API_URLS: [
      "https://ipapi.co/json/",
      "https://ip-api.com/json/?fields=status,message,country,regionName,city,isp,org,as,query",
      "https://api.ipify.org?format=json",
    ],
  }

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  const $ = (selector) => document.querySelector(selector)
  const $$ = (selector) => document.querySelectorAll(selector)

  function safeSet(elementId, value) {
    const el = document.getElementById(elementId)
    if (el) el.textContent = value || "Unknown"
  }

  function addClass(element, className) {
    if (element) element.classList.add(className)
  }

  function removeClass(element, className) {
    if (element) element.classList.remove(className)
  }

  // ============================================
  // BROWSER DETECTION
  // ============================================
  const BrowserDetector = {
    getUserAgent: () => navigator.userAgent || "",

    getBrowserInfo: function () {
      const ua = this.getUserAgent()
      let browserName = "Unknown"
      let browserVersion = "Unknown"
      let engine = "Unknown"

      // Detect browser
      if (ua.indexOf("Firefox") > -1) {
        browserName = "Mozilla Firefox"
        browserVersion = ua.match(/Firefox\/(\d+\.?\d*)/)?.[1] || "Unknown"
        engine = "Gecko"
      } else if (ua.indexOf("SamsungBrowser") > -1) {
        browserName = "Samsung Internet"
        browserVersion = ua.match(/SamsungBrowser\/(\d+\.?\d*)/)?.[1] || "Unknown"
        engine = "Blink"
      } else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) {
        browserName = "Opera"
        browserVersion = ua.match(/(?:Opera|OPR)\/(\d+\.?\d*)/)?.[1] || "Unknown"
        engine = "Blink"
      } else if (ua.indexOf("Edg") > -1) {
        browserName = "Microsoft Edge"
        browserVersion = ua.match(/Edg\/(\d+\.?\d*)/)?.[1] || "Unknown"
        engine = "Blink"
      } else if (ua.indexOf("Chrome") > -1) {
        browserName = "Google Chrome"
        browserVersion = ua.match(/Chrome\/(\d+\.?\d*)/)?.[1] || "Unknown"
        engine = "Blink"
      } else if (ua.indexOf("Safari") > -1) {
        browserName = "Apple Safari"
        browserVersion = ua.match(/Version\/(\d+\.?\d*)/)?.[1] || "Unknown"
        engine = "WebKit"
      } else if (ua.indexOf("MSIE") > -1 || ua.indexOf("Trident") > -1) {
        browserName = "Internet Explorer"
        browserVersion = ua.match(/(?:MSIE |rv:)(\d+\.?\d*)/)?.[1] || "Unknown"
        engine = "Trident"
      }

      return { name: browserName, version: browserVersion, engine: engine }
    },

    getCookiesEnabled: () => (navigator.cookieEnabled ? "Enabled" : "Disabled"),

    getDoNotTrack: () => {
      const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack
      if (dnt === "1" || dnt === "yes") return "Enabled"
      if (dnt === "0" || dnt === "no") return "Disabled"
      return "Not Set"
    },

    getLanguage: () => navigator.language || navigator.userLanguage || "Unknown",
  }

  // ============================================
  // DEVICE DETECTION
  // ============================================
  const DeviceDetector = {
    getDeviceType: () => {
      const ua = navigator.userAgent
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "Tablet"
      }
      if (
        /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)
      ) {
        return "Mobile"
      }
      return "Desktop"
    },

    getOS: () => {
      const ua = navigator.userAgent
      const platform = navigator.platform || ""

      let osName = "Unknown"
      let osVersion = "Unknown"

      if (/Windows/.test(ua)) {
        osName = "Windows"
        if (/Windows NT 10/.test(ua)) osVersion = "10/11"
        else if (/Windows NT 6.3/.test(ua)) osVersion = "8.1"
        else if (/Windows NT 6.2/.test(ua)) osVersion = "8"
        else if (/Windows NT 6.1/.test(ua)) osVersion = "7"
      } else if (/Mac OS X/.test(ua)) {
        osName = "macOS"
        const match = ua.match(/Mac OS X (\d+[._]\d+[._]?\d*)/)
        if (match) osVersion = match[1].replace(/_/g, ".")
      } else if (/Android/.test(ua)) {
        osName = "Android"
        const match = ua.match(/Android (\d+\.?\d*)/)
        if (match) osVersion = match[1]
      } else if (/iPhone|iPad|iPod/.test(ua)) {
        osName = "iOS"
        const match = ua.match(/OS (\d+[._]\d+[._]?\d*)/)
        if (match) osVersion = match[1].replace(/_/g, ".")
      } else if (/Linux/.test(platform)) {
        osName = "Linux"
        if (/Ubuntu/.test(ua)) osVersion = "Ubuntu"
        else if (/Fedora/.test(ua)) osVersion = "Fedora"
        else osVersion = "Generic"
      } else if (/CrOS/.test(ua)) {
        osName = "Chrome OS"
      }

      return { name: osName, version: osVersion }
    },

    getPlatform: () => navigator.platform || "Unknown",

    getCPUCores: () => navigator.hardwareConcurrency || "Unknown",

    getMemory: () => {
      if (navigator.deviceMemory) {
        return navigator.deviceMemory + " GB"
      }
      return "Not Available"
    },

    getTouchSupport: () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
      return hasTouch ? "Supported" : "Not Supported"
    },
  }

  // ============================================
  // SCREEN DETECTION
  // ============================================
  const ScreenDetector = {
    getResolution: () => screen.width + " x " + screen.height + " px",

    getViewport: () => window.innerWidth + " x " + window.innerHeight + " px",

    getColorDepth: () => (screen.colorDepth || screen.pixelDepth) + "-bit",

    getPixelRatio: () => (window.devicePixelRatio ? window.devicePixelRatio.toFixed(2) + "x" : "1x"),

    getOrientation: () => {
      if (screen.orientation) {
        return screen.orientation.type.replace("-primary", "").replace("-secondary", "")
      }
      return window.innerWidth > window.innerHeight ? "Landscape" : "Portrait"
    },

    getHDRSupport: () => {
      if (window.matchMedia) {
        if (window.matchMedia("(dynamic-range: high)").matches) {
          return "Supported"
        }
      }
      return "Not Detected"
    },
  }

  // ============================================
  // NETWORK DETECTION
  // ============================================
  const NetworkDetector = {
    getConnectionType: () => {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      if (connection) {
        return connection.effectiveType ? connection.effectiveType.toUpperCase() : "Unknown"
      }
      return "Not Available"
    },

    async fetchIPInfo() {
      // Try primary API
      try {
        const response = await fetch("https://ipapi.co/json/", {
          timeout: 5000,
          headers: { Accept: "application/json" },
        })
        if (response.ok) {
          const data = await response.json()
          return {
            ip: data.ip || "Not Available",
            ipv6: data.version === "IPv6" ? data.ip : "Not Available",
            location: [data.city, data.region, data.country_name].filter(Boolean).join(", ") || "Unknown",
            isp: data.org || "Unknown",
            timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
          }
        }
      } catch (e) {
        // Primary failed, try backup
      }

      // Backup API
      try {
        const response = await fetch("https://api.ipify.org?format=json")
        if (response.ok) {
          const data = await response.json()
          return {
            ip: data.ip || "Not Available",
            ipv6: "Not Available",
            location: "Not Available",
            isp: "Not Available",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }
        }
      } catch (e) {
        // All APIs failed
      }

      return {
        ip: "Not Available",
        ipv6: "Not Available",
        location: "Not Available",
        isp: "Not Available",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }
    },
  }

  // ============================================
  // WEBGL DETECTION
  // ============================================
  const WebGLDetector = {
    getRenderer: () => {
      try {
        const canvas = document.createElement("canvas")
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
        if (gl) {
          const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
          if (debugInfo) {
            return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          }
          return "WebGL Supported (Renderer Hidden)"
        }
      } catch (e) {
        // WebGL not available
      }
      return "WebGL Not Available"
    },
  }

  // ============================================
  // FEATURE DETECTION
  // ============================================
  const FeatureDetector = {
    features: [
      { name: "WebGL", test: () => !!window.WebGLRenderingContext },
      { name: "WebGL2", test: () => !!window.WebGL2RenderingContext },
      { name: "WebRTC", test: () => !!window.RTCPeerConnection },
      { name: "WebSocket", test: () => !!window.WebSocket },
      { name: "ServiceWorker", test: () => "serviceWorker" in navigator },
      { name: "WebAssembly", test: () => typeof WebAssembly === "object" },
      { name: "Geolocation", test: () => "geolocation" in navigator },
      { name: "Notifications", test: () => "Notification" in window },
      { name: "Bluetooth", test: () => "bluetooth" in navigator },
      { name: "USB", test: () => "usb" in navigator },
      { name: "Gamepad", test: () => "getGamepads" in navigator },
      { name: "Vibration", test: () => "vibrate" in navigator },
      { name: "Battery", test: () => "getBattery" in navigator },
      { name: "Share", test: () => "share" in navigator },
      { name: "Clipboard", test: () => "clipboard" in navigator },
      { name: "SpeechRecog", test: () => "SpeechRecognition" in window || "webkitSpeechRecognition" in window },
      { name: "IndexedDB", test: () => !!window.indexedDB },
      {
        name: "LocalStorage",
        test: () => {
          try {
            return !!localStorage
          } catch (e) {
            return false
          }
        },
      },
    ],

    detectAll: function () {
      return this.features.map((f) => ({
        name: f.name,
        supported: f.test(),
      }))
    },
  }

  // ============================================
  // MEDIA DETECTION
  // ============================================
  const MediaDetector = {
    getSupportedTypes: () => {
      const types = []
      const testTypes = ["video/mp4", "video/webm", "video/ogg", "audio/mp3", "audio/wav", "audio/ogg", "audio/aac"]

      const video = document.createElement("video")
      const audio = document.createElement("audio")

      testTypes.forEach((type) => {
        const element = type.startsWith("video") ? video : audio
        if (element.canPlayType(type)) {
          types.push(type)
        }
      })

      return types.length > 0 ? types.join(", ") : "None Detected"
    },
  }

  // ============================================
  // AI DESIGN ENGINE (Client-side ML-inspired)
  // ============================================
  const AIDesignEngine = {
    userProfile: {
      deviceType: null,
      screenSize: null,
      colorDepth: null,
      timeOfDay: null,
      pixelRatio: null,
      prefersReducedMotion: false,
      prefersDarkMode: true,
    },

    colorThemes: {
      "cyber-pink": {
        name: "Cyber Pink",
        accent: "#ff00ff",
        description: "Bold magenta tones for a cyberpunk aesthetic",
        colors: ["#ff00ff", "#ff66ff", "#cc00cc", "#990099", "#0d0012"],
      },
      "ocean-blue": {
        name: "Ocean Blue",
        accent: "#00bfff",
        description: "Cool blue hues inspired by deep waters",
        colors: ["#00bfff", "#66d9ff", "#0099cc", "#006699", "#001020"],
      },
      "sunset-orange": {
        name: "Sunset Orange",
        accent: "#ff6600",
        description: "Warm orange gradients like a sunset",
        colors: ["#ff6600", "#ff9933", "#cc5200", "#993d00", "#120800"],
      },
      "forest-green": {
        name: "Forest Green",
        accent: "#00ff88",
        description: "Fresh mint green for a natural feel",
        colors: ["#00ff88", "#66ffaa", "#00cc6a", "#009950", "#001208"],
      },
      "royal-purple": {
        name: "Royal Purple",
        accent: "#9966ff",
        description: "Elegant purple for a sophisticated look",
        colors: ["#9966ff", "#b899ff", "#7744cc", "#552299", "#0a0014"],
      },
    },

    analyzeUser: function () {
      const hour = new Date().getHours()

      this.userProfile = {
        deviceType: DeviceDetector.getDeviceType(),
        screenSize: { width: screen.width, height: screen.height },
        colorDepth: screen.colorDepth || 24,
        pixelRatio: window.devicePixelRatio || 1,
        timeOfDay: hour < 6 ? "night" : hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening",
        prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        prefersDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
      }

      return this.userProfile
    },

    generateRecommendation: function () {
      const profile = this.userProfile
      let recommendedTheme = "forest-green"
      let animationLevel = "Full"
      let reason = ""

      // Time-based color suggestion (simulated ML decision)
      if (profile.timeOfDay === "morning") {
        recommendedTheme = "ocean-blue"
        reason = "Cool blue tones to energize your morning"
      } else if (profile.timeOfDay === "afternoon") {
        recommendedTheme = "forest-green"
        reason = "Refreshing green to maintain focus"
      } else if (profile.timeOfDay === "evening") {
        recommendedTheme = "sunset-orange"
        reason = "Warm colors for a relaxed evening"
      } else {
        recommendedTheme = "cyber-pink"
        reason = "Vibrant colors for late-night browsing"
      }

      // Device-based adjustments
      if (profile.deviceType === "Mobile") {
        animationLevel = profile.prefersReducedMotion ? "Minimal" : "Reduced"
      } else {
        animationLevel = profile.prefersReducedMotion ? "Minimal" : "Full"
      }

      // Screen characteristics
      let deviceScore = "Optimized"
      if (profile.pixelRatio >= 2) {
        deviceScore = "High-DPI Ready"
      }
      if (profile.colorDepth < 24) {
        deviceScore = "Standard"
      }

      return {
        theme: recommendedTheme,
        themeData: this.colorThemes[recommendedTheme],
        animationLevel: animationLevel,
        deviceScore: deviceScore,
        reason: reason,
        suggestions: this.generateSuggestions(recommendedTheme, animationLevel),
      }
    },

    generateSuggestions: function (theme, animationLevel) {
      const themeData = this.colorThemes[theme]
      return [
        {
          icon: "🎨",
          title: "Color Scheme",
          description: themeData.description,
          colors: themeData.colors,
        },
        {
          icon: "✨",
          title: "Animation Level",
          description:
            animationLevel === "Full"
              ? "Rich animations enabled for immersive experience"
              : animationLevel === "Reduced"
                ? "Optimized animations for mobile performance"
                : "Minimal motion for accessibility",
          colors: null,
        },
        {
          icon: "📱",
          title: "Layout Optimization",
          description:
            this.userProfile.deviceType === "Mobile"
              ? "Touch-friendly spacing and larger tap targets"
              : this.userProfile.deviceType === "Tablet"
                ? "Balanced layout for tablet viewing"
                : "Full desktop experience with detailed views",
          colors: null,
        },
      ]
    },

    applyTheme: (themeName) => {
      document.body.classList.add("theme-transitioning")
      document.body.setAttribute("data-theme", themeName)

      // Save preference
      try {
        localStorage.setItem("onionvuln-theme", themeName)
      } catch (e) {
        // localStorage not available
      }

      setTimeout(() => {
        document.body.classList.remove("theme-transitioning")
      }, 500)
    },

    loadSavedTheme: function () {
      try {
        const saved = localStorage.getItem("onionvuln-theme")
        if (saved && this.colorThemes[saved]) {
          document.body.setAttribute("data-theme", saved)
          return saved
        }
      } catch (e) {
        // localStorage not available
      }
      return null
    },
  }

  // ============================================
  // UI CONTROLLER
  // ============================================
  const UIController = {
    init: function () {
      this.populateBrowserInfo()
      this.populateDeviceInfo()
      this.populateScreenInfo()
      this.fetchNetworkInfo()
      this.populateTechDetails()
      this.setupEventListeners()
      this.startAIAnalysis()
    },

    populateBrowserInfo: () => {
      const browser = BrowserDetector.getBrowserInfo()
      safeSet("browser-name", browser.name)
      safeSet("browser-version", browser.version)
      safeSet("browser-engine", browser.engine)
      safeSet("cookies-enabled", BrowserDetector.getCookiesEnabled())
      safeSet("dnt-status", BrowserDetector.getDoNotTrack())
      safeSet("browser-language", BrowserDetector.getLanguage())
    },

    populateDeviceInfo: () => {
      const os = DeviceDetector.getOS()
      safeSet("device-type", DeviceDetector.getDeviceType())
      safeSet("os-name", os.name)
      safeSet("os-version", os.version)
      safeSet("device-platform", DeviceDetector.getPlatform())
      safeSet("cpu-cores", DeviceDetector.getCPUCores())
      safeSet("device-memory", DeviceDetector.getMemory())
      safeSet("touch-support", DeviceDetector.getTouchSupport())
    },

    populateScreenInfo: () => {
      safeSet("screen-resolution", ScreenDetector.getResolution())
      safeSet("viewport-size", ScreenDetector.getViewport())
      safeSet("color-depth", ScreenDetector.getColorDepth())
      safeSet("pixel-ratio", ScreenDetector.getPixelRatio())
      safeSet("screen-orientation", ScreenDetector.getOrientation())
      safeSet("hdr-support", ScreenDetector.getHDRSupport())

      // Update on resize
      window.addEventListener("resize", () => {
        safeSet("viewport-size", ScreenDetector.getViewport())
        safeSet("screen-orientation", ScreenDetector.getOrientation())
      })
    },

    async fetchNetworkInfo() {
      safeSet("connection-type", NetworkDetector.getConnectionType())

      const ipInfo = await NetworkDetector.fetchIPInfo()
      safeSet("ip-address", ipInfo.ip)
      safeSet("ip-v6", ipInfo.ipv6)
      safeSet("ip-location", ipInfo.location)
      safeSet("ip-isp", ipInfo.isp)
      safeSet("ip-timezone", ipInfo.timezone)
    },

    populateTechDetails: () => {
      // User Agent
      safeSet("user-agent", BrowserDetector.getUserAgent())

      // WebGL
      safeSet("webgl-renderer", WebGLDetector.getRenderer())

      // Media Types
      safeSet("media-types", MediaDetector.getSupportedTypes())

      // Features
      const featureGrid = document.getElementById("feature-grid")
      if (featureGrid) {
        const features = FeatureDetector.detectAll()
        featureGrid.innerHTML = features
          .map(
            (f) =>
              `<div class="feature-item ${f.supported ? "supported" : "unsupported"}">
            ${f.supported ? "✓" : "✗"} ${f.name}
          </div>`,
          )
          .join("")
      }
    },

    setupEventListeners: function () {
      // Tech toggle
      const techToggle = document.getElementById("tech-toggle")
      const techContent = document.getElementById("tech-content")
      if (techToggle && techContent) {
        techToggle.addEventListener("click", () => {
          techToggle.classList.toggle("active")
          techContent.classList.toggle("hidden")
        })
      }

      // Theme buttons
      const applyBtn = document.getElementById("apply-theme-btn")
      const skipBtn = document.getElementById("skip-theme-btn")

      if (applyBtn) {
        applyBtn.addEventListener("click", () => {
          const recommendation = AIDesignEngine.generateRecommendation()
          AIDesignEngine.applyTheme(recommendation.theme)
          this.updateAIStatus("Theme Applied: " + recommendation.themeData.name)
        })
      }

      if (skipBtn) {
        skipBtn.addEventListener("click", () => {
          this.updateAIStatus("Original theme preserved")
        })
      }
    },

    startAIAnalysis: function () {
      // Check for saved theme first
      const savedTheme = AIDesignEngine.loadSavedTheme()

      // Analyze user
      AIDesignEngine.analyzeUser()

      // Simulate learning progress
      let stepIndex = 0
      const progressFill = document.getElementById("progress-fill")
      const progressText = document.getElementById("progress-text")

      const runStep = () => {
        if (stepIndex >= CONFIG.LEARNING_STEPS.length) {
          this.showAIResults()
          return
        }

        const step = CONFIG.LEARNING_STEPS[stepIndex]
        if (progressFill) progressFill.style.width = step.progress + "%"
        if (progressText) progressText.textContent = step.text

        stepIndex++
        setTimeout(runStep, 400)
      }

      setTimeout(runStep, 500)
    },

    showAIResults: function () {
      const recommendation = AIDesignEngine.generateRecommendation()

      // Update status
      this.updateAIStatus("Analysis Complete - Design Ready")
      const learningStatus = document.getElementById("ai-learning-status")
      if (learningStatus) learningStatus.textContent = "Personalized recommendations ready"

      // Show analysis
      const analysisEl = document.getElementById("ai-analysis")
      if (analysisEl) {
        removeClass(analysisEl, "hidden")
        safeSet("device-score", recommendation.deviceScore)
        safeSet("color-preference", recommendation.themeData.name)
        safeSet("animation-level", recommendation.animationLevel)
      }

      // Show suggestions
      const suggestionsEl = document.getElementById("ai-suggestions")
      const cardsEl = document.getElementById("suggestion-cards")

      if (suggestionsEl && cardsEl) {
        removeClass(suggestionsEl, "hidden")

        cardsEl.innerHTML = recommendation.suggestions
          .map(
            (s) => `
          <div class="suggestion-card">
            <div class="suggestion-card-icon">${s.icon}</div>
            <h4>${s.title}</h4>
            <p>${s.description}</p>
            ${
              s.colors
                ? `
              <div class="color-preview">
                ${s.colors
                  .slice(0, 5)
                  .map((c) => `<div class="color-swatch" style="background:${c}" title="${c}"></div>`)
                  .join("")}
              </div>
            `
                : ""
            }
          </div>
        `,
          )
          .join("")
      }
    },

    updateAIStatus: (message) => {
      const statusText = document.querySelector(".ai-status-text")
      if (statusText) statusText.textContent = message
    },
  }

  // ============================================
  // INITIALIZATION
  // ============================================
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => UIController.init())
  } else {
    UIController.init()
  }
})()
