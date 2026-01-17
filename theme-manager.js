/**
 * ============================================
 * GLOBAL THEME MANAGER v2.0
 * Persists theme, colors, animations across all pages
 * Enhanced with animated borders and more themes
 * ============================================
 */

;(() => {
  const STORAGE_KEYS = {
    THEME: "onionvuln_theme",
    CUSTOM_COLORS: "onionvuln_custom_colors",
    ANIMATIONS: "onionvuln_animations",
    FONT_SIZE: "onionvuln_font_size",
    PREFERENCES: "onionvuln_preferences",
    VISIT_COUNT: "onionvuln_visits",
    LAST_VISIT: "onionvuln_last_visit",
    BORDER_STYLE: "onionvuln_border_style",
  }

  const DEFAULT_THEMES = {
    matrix: {
      accent: "#00ff00",
      accentLight: "#66ff66",
      accentDark: "#009900",
      bgPrimary: "#0a0a0a",
      bgSecondary: "#111111",
      bgTertiary: "#1a1a1a",
      textPrimary: "#ffffff",
      textSecondary: "#b0b0b0",
      borderColor: "#333333",
      borderGlow: "rgba(0, 255, 0, 0.3)",
      gradientStart: "#00ff00",
      gradientEnd: "#00aa00",
    },
    "cyber-pink": {
      accent: "#ff00ff",
      accentLight: "#ff66ff",
      accentDark: "#cc00cc",
      bgPrimary: "#0d0012",
      bgSecondary: "#1a0020",
      bgTertiary: "#2a0035",
      textPrimary: "#ffffff",
      textSecondary: "#d0a0d0",
      borderColor: "#4a2050",
      borderGlow: "rgba(255, 0, 255, 0.3)",
      gradientStart: "#ff00ff",
      gradientEnd: "#ff66cc",
    },
    "ocean-blue": {
      accent: "#00bfff",
      accentLight: "#66d9ff",
      accentDark: "#0099cc",
      bgPrimary: "#001020",
      bgSecondary: "#001830",
      bgTertiary: "#002040",
      textPrimary: "#ffffff",
      textSecondary: "#a0c0d0",
      borderColor: "#203850",
      borderGlow: "rgba(0, 191, 255, 0.3)",
      gradientStart: "#00bfff",
      gradientEnd: "#0066ff",
    },
    "sunset-orange": {
      accent: "#ff6600",
      accentLight: "#ff9933",
      accentDark: "#cc5200",
      bgPrimary: "#120800",
      bgSecondary: "#1a1000",
      bgTertiary: "#251800",
      textPrimary: "#ffffff",
      textSecondary: "#d0b090",
      borderColor: "#4a3520",
      borderGlow: "rgba(255, 102, 0, 0.3)",
      gradientStart: "#ff6600",
      gradientEnd: "#ff3300",
    },
    "royal-purple": {
      accent: "#9966ff",
      accentLight: "#b899ff",
      accentDark: "#7744cc",
      bgPrimary: "#0a0014",
      bgSecondary: "#12001f",
      bgTertiary: "#1a002a",
      textPrimary: "#ffffff",
      textSecondary: "#c0a0d0",
      borderColor: "#3a2050",
      borderGlow: "rgba(153, 102, 255, 0.3)",
      gradientStart: "#9966ff",
      gradientEnd: "#6633cc",
    },
    "blood-red": {
      accent: "#ff0000",
      accentLight: "#ff4444",
      accentDark: "#cc0000",
      bgPrimary: "#0a0000",
      bgSecondary: "#140000",
      bgTertiary: "#1f0000",
      textPrimary: "#ffffff",
      textSecondary: "#d0a0a0",
      borderColor: "#4a2020",
      borderGlow: "rgba(255, 0, 0, 0.3)",
      gradientStart: "#ff0000",
      gradientEnd: "#aa0000",
    },
    "neon-yellow": {
      accent: "#ffff00",
      accentLight: "#ffff66",
      accentDark: "#cccc00",
      bgPrimary: "#0a0a00",
      bgSecondary: "#141400",
      bgTertiary: "#1f1f00",
      textPrimary: "#ffffff",
      textSecondary: "#d0d0a0",
      borderColor: "#4a4a20",
      borderGlow: "rgba(255, 255, 0, 0.3)",
      gradientStart: "#ffff00",
      gradientEnd: "#aaaa00",
    },
    "ice-cyan": {
      accent: "#00ffff",
      accentLight: "#66ffff",
      accentDark: "#00cccc",
      bgPrimary: "#000a0a",
      bgSecondary: "#001414",
      bgTertiary: "#001f1f",
      textPrimary: "#ffffff",
      textSecondary: "#a0d0d0",
      borderColor: "#204a4a",
      borderGlow: "rgba(0, 255, 255, 0.3)",
      gradientStart: "#00ffff",
      gradientEnd: "#00aaaa",
    },
  }

  const BORDER_STYLES = ["animated", "glow-corners", "neon", "solid"]

  const ThemeManager = {
    currentTheme: "matrix",
    customColors: null,
    animationsEnabled: true,
    fontSize: 100,
    borderStyle: "animated",

    init() {
      this.loadPreferences()
      this.applyTheme()
      this.trackVisit()
      this.setupGlobalListeners()
      this.injectThemeStyles()

      // Dispatch ready event
      window.dispatchEvent(new CustomEvent("themeManagerReady", { detail: this }))
    },

    loadPreferences() {
      try {
        this.currentTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "matrix"

        const savedColors = localStorage.getItem(STORAGE_KEYS.CUSTOM_COLORS)
        if (savedColors) {
          this.customColors = JSON.parse(savedColors)
        }

        const savedAnimations = localStorage.getItem(STORAGE_KEYS.ANIMATIONS)
        this.animationsEnabled = savedAnimations !== "false"

        const savedFontSize = localStorage.getItem(STORAGE_KEYS.FONT_SIZE)
        if (savedFontSize) {
          this.fontSize = Number.parseInt(savedFontSize, 10)
        }

        const savedBorderStyle = localStorage.getItem(STORAGE_KEYS.BORDER_STYLE)
        if (savedBorderStyle && BORDER_STYLES.includes(savedBorderStyle)) {
          this.borderStyle = savedBorderStyle
        }
      } catch (e) {
        console.warn("Failed to load theme preferences:", e)
      }
    },

    savePreferences() {
      try {
        localStorage.setItem(STORAGE_KEYS.THEME, this.currentTheme)
        localStorage.setItem(STORAGE_KEYS.ANIMATIONS, String(this.animationsEnabled))
        localStorage.setItem(STORAGE_KEYS.FONT_SIZE, String(this.fontSize))
        localStorage.setItem(STORAGE_KEYS.BORDER_STYLE, this.borderStyle)

        if (this.customColors) {
          localStorage.setItem(STORAGE_KEYS.CUSTOM_COLORS, JSON.stringify(this.customColors))
        }
      } catch (e) {
        console.warn("Failed to save theme preferences:", e)
      }
    },

    trackVisit() {
      try {
        const visits = Number.parseInt(localStorage.getItem(STORAGE_KEYS.VISIT_COUNT) || "0", 10)
        localStorage.setItem(STORAGE_KEYS.VISIT_COUNT, String(visits + 1))
        localStorage.setItem(STORAGE_KEYS.LAST_VISIT, new Date().toISOString())
      } catch (e) {
        // Ignore
      }
    },

    getVisitCount() {
      return Number.parseInt(localStorage.getItem(STORAGE_KEYS.VISIT_COUNT) || "0", 10)
    },

    injectThemeStyles() {
      let styleEl = document.getElementById("theme-dynamic-styles")
      if (!styleEl) {
        styleEl = document.createElement("style")
        styleEl.id = "theme-dynamic-styles"
        document.head.appendChild(styleEl)
      }

      const colors = this.getCurrentColors()

      styleEl.textContent = `
        /* Dynamic theme border animations */
        .border-animated::before {
          background: linear-gradient(90deg, 
            transparent, 
            ${colors.accent}, 
            transparent
          ) !important;
        }
        
        .border-glow-corners::before,
        .border-glow-corners::after {
          border-color: ${colors.accent} !important;
        }
        
        .border-neon {
          border-color: ${colors.accent} !important;
          box-shadow: 
            0 0 5px ${colors.borderGlow},
            inset 0 0 5px ${colors.borderGlow} !important;
        }
        
        @keyframes neonPulse {
          0%, 100% { 
            box-shadow: 
              0 0 5px ${colors.borderGlow},
              inset 0 0 5px ${colors.borderGlow};
          }
          50% { 
            box-shadow: 
              0 0 20px ${colors.borderGlow},
              0 0 40px ${colors.borderGlow},
              inset 0 0 10px ${colors.borderGlow};
          }
        }

        /* Animated gradient text */
        .logo-text {
          background: linear-gradient(90deg, 
            ${colors.textPrimary} 0%, 
            ${colors.accent} 50%, 
            ${colors.textPrimary} 100%
          ) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
        }

        /* Card hover effects */
        .card:hover, .feature-card:hover, .repo-card:hover {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px ${colors.borderGlow} !important;
        }

        /* Button glow */
        .btn-primary:hover, .btn-accent:hover {
          box-shadow: 0 0 20px ${colors.borderGlow} !important;
        }

        /* Chatbot toggle glow */
        .chatbot-toggle {
          box-shadow: 0 4px 20px ${colors.borderGlow} !important;
        }
        
        .chatbot-toggle:hover {
          box-shadow: 0 6px 30px ${colors.borderGlow} !important;
        }

        /* Timeline glow */
        .timeline::before {
          background: linear-gradient(180deg, 
            ${colors.accent}, 
            ${colors.borderColor}, 
            ${colors.accent}
          ) !important;
        }

        /* Hero accent underline */
        .hero-title .accent::after {
          background: ${colors.accent} !important;
        }

        /* Video logo glow */
        .video-logo-ring {
          border-color: ${colors.accent} !important;
        }

        .video-logo-center span {
          color: ${colors.accent} !important;
          text-shadow: 0 0 10px ${colors.accent} !important;
        }

        @keyframes videoCoreGlow {
          0%, 100% { text-shadow: 0 0 10px ${colors.accent}; }
          50% { text-shadow: 0 0 30px ${colors.accent}, 0 0 60px ${colors.accent}; }
        }

        /* Code rain color */
        .code-column {
          color: ${colors.accent} !important;
        }

        /* Particles color */
        .particle, .hero-particle {
          background: ${colors.accent} !important;
        }
      `
    },

    applyTheme(themeName = null) {
      const theme = themeName || this.currentTheme
      const colors = this.customColors || DEFAULT_THEMES[theme] || DEFAULT_THEMES.matrix

      // Apply CSS variables
      const root = document.documentElement
      root.style.setProperty("--accent", colors.accent)
      root.style.setProperty("--accent-light", colors.accentLight || colors.accent)
      root.style.setProperty("--accent-dark", colors.accentDark || colors.accent)
      root.style.setProperty("--bg-primary", colors.bgPrimary)
      root.style.setProperty("--bg-secondary", colors.bgSecondary)
      root.style.setProperty("--bg-tertiary", colors.bgTertiary)
      root.style.setProperty("--text-primary", colors.textPrimary)
      root.style.setProperty("--text-secondary", colors.textSecondary)
      root.style.setProperty("--border-color", colors.borderColor)
      root.style.setProperty("--border-glow", colors.borderGlow || `${colors.accent}4d`)

      // Apply font size
      root.style.fontSize = `${this.fontSize}%`

      // Apply animations toggle
      if (!this.animationsEnabled) {
        root.classList.add("reduce-motion")
      } else {
        root.classList.remove("reduce-motion")
      }

      // Update body class for theme
      document.body.className = document.body.className.replace(/theme-[\w-]+/g, "").trim()
      document.body.classList.add(`theme-${theme}`)
      document.body.classList.add("scanlines")

      this.currentTheme = theme
      this.savePreferences()
      this.injectThemeStyles()

      // Show theme indicator
      this.showThemeIndicator(theme)

      // Dispatch theme change event
      window.dispatchEvent(
        new CustomEvent("themeChanged", {
          detail: { theme, colors },
        }),
      )
    },

    showThemeIndicator(theme) {
      let indicator = document.querySelector(".theme-indicator")
      if (!indicator) {
        indicator = document.createElement("div")
        indicator.className = "theme-indicator"
        document.body.appendChild(indicator)
      }

      indicator.textContent = `Theme: ${theme.replace("-", " ").toUpperCase()}`
      indicator.classList.add("visible")

      setTimeout(() => {
        indicator.classList.remove("visible")
      }, 2000)
    },

    setTheme(themeName) {
      if (DEFAULT_THEMES[themeName]) {
        this.customColors = null
        this.currentTheme = themeName
        this.applyTheme(themeName)
        return true
      }
      return false
    },

    setCustomColors(colors) {
      this.customColors = { ...DEFAULT_THEMES.matrix, ...colors }
      this.applyTheme()
    },

    setAnimations(enabled) {
      this.animationsEnabled = enabled
      this.applyTheme()
    },

    setFontSize(size) {
      this.fontSize = Math.max(80, Math.min(150, size))
      this.applyTheme()
    },

    setBorderStyle(style) {
      if (BORDER_STYLES.includes(style)) {
        this.borderStyle = style
        this.savePreferences()
      }
    },

    getAvailableThemes() {
      return Object.keys(DEFAULT_THEMES)
    },

    getCurrentColors() {
      return this.customColors || DEFAULT_THEMES[this.currentTheme] || DEFAULT_THEMES.matrix
    },

    resetToDefault() {
      this.currentTheme = "matrix"
      this.customColors = null
      this.animationsEnabled = true
      this.fontSize = 100
      this.borderStyle = "animated"

      Object.values(STORAGE_KEYS).forEach((key) => {
        try {
          localStorage.removeItem(key)
        } catch (e) {}
      })

      this.applyTheme()
    },

    setupGlobalListeners() {
      // Listen for theme change requests from other scripts
      window.addEventListener("requestThemeChange", (e) => {
        if (e.detail && e.detail.theme) {
          this.setTheme(e.detail.theme)
        } else if (e.detail && e.detail.colors) {
          this.setCustomColors(e.detail.colors)
        }
      })
    },
  }

  // Initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => ThemeManager.init())
  } else {
    ThemeManager.init()
  }

  // Expose globally
  window.ThemeManager = ThemeManager
})()
