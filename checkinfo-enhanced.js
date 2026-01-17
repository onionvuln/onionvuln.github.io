/**
 * ============================================
 * CHECKINFO ENHANCED - Deep Intelligence System
 * VPN/Tor Detection, Security News, Advanced Fingerprinting
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
      { progress: 20, text: "Scanning network topology..." },
      { progress: 35, text: "Analyzing VPN/Tor signatures..." },
      { progress: 50, text: "Collecting device fingerprint..." },
      { progress: 65, text: "Processing privacy metrics..." },
      { progress: 80, text: "Generating security report..." },
      { progress: 95, text: "Finalizing analysis..." },
      { progress: 100, text: "Analysis complete!" },
    ],
    PUBLIC_IP_APIS: [
      "https://api.ipify.org?format=json",
      "https://ipapi.co/json/",
      "https://ip-api.com/json/?fields=status,message,country,regionName,city,zip,lat,lon,timezone,isp,org,as,proxy,hosting,query",
    ],
    VPN_DETECTION_APIS: ["https://ipapi.co/json/", "https://ip-api.com/json/?fields=proxy,hosting,query"],
    SECURITY_NEWS_API: "https://hacker-news.firebaseio.com/v0",
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
  // BROWSER DETECTION (Enhanced)
  // ============================================
  const BrowserDetector = {
    getUserAgent: () => navigator.userAgent || "",

    getBrowserInfo: function () {
      const ua = this.getUserAgent()
      let browserName = "Unknown"
      let browserVersion = "Unknown"
      let engine = "Unknown"

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

    getTimezoneOffset: () => {
      const offset = new Date().getTimezoneOffset()
      const hours = Math.abs(Math.floor(offset / 60))
      const minutes = Math.abs(offset % 60)
      const sign = offset <= 0 ? "+" : "-"
      return `UTC${sign}${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
    },

    getCanvasFingerprint: () => {
      try {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        canvas.width = 200
        canvas.height = 50

        ctx.textBaseline = "top"
        ctx.font = "14px Arial"
        ctx.fillStyle = "#f60"
        ctx.fillRect(125, 1, 62, 20)
        ctx.fillStyle = "#069"
        ctx.fillText("Fingerprint", 2, 15)
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)"
        ctx.fillText("Canvas", 4, 17)

        const dataUrl = canvas.toDataURL()
        let hash = 0
        for (let i = 0; i < dataUrl.length; i++) {
          hash = (hash << 5) - hash + dataUrl.charCodeAt(i)
          hash = hash & hash
        }
        return hash.toString(16).toUpperCase()
      } catch (e) {
        return "Not Available"
      }
    },

    getWebGLHash: () => {
      try {
        const canvas = document.createElement("canvas")
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
        if (gl) {
          const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
          if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
            let hash = 0
            for (let i = 0; i < renderer.length; i++) {
              hash = (hash << 5) - hash + renderer.charCodeAt(i)
              hash = hash & hash
            }
            return hash.toString(16).toUpperCase().slice(0, 8)
          }
        }
      } catch (e) {
        // WebGL not available
      }
      return "N/A"
    },
  }

  // ============================================
  // DEVICE DETECTION (Enhanced)
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
    getMemory: () => (navigator.deviceMemory ? navigator.deviceMemory + " GB" : "Not Available"),

    getTouchSupport: () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
      return hasTouch ? "Supported" : "Not Supported"
    },

    getGPURenderer: () => {
      try {
        const canvas = document.createElement("canvas")
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
        if (gl) {
          const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
          if (debugInfo) {
            return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          }
          return "WebGL Supported"
        }
      } catch (e) {
        // WebGL not available
      }
      return "Not Available"
    },

    async getBatteryStatus() {
      try {
        if ("getBattery" in navigator) {
          const battery = await navigator.getBattery()
          const level = Math.round(battery.level * 100)
          const charging = battery.charging ? "Charging" : "Not Charging"
          return `${level}% (${charging})`
        }
      } catch (e) {
        // Battery API not available
      }
      return "Not Available"
    },

    getPluginsCount: () => {
      if (navigator.plugins) {
        return navigator.plugins.length + " plugins"
      }
      return "Not Available"
    },
  }

  // ============================================
  // SCREEN DETECTION (Enhanced)
  // ============================================
  const ScreenDetector = {
    getResolution: () => screen.width + " x " + screen.height + " px",
    getAvailableScreen: () => screen.availWidth + " x " + screen.availHeight + " px",
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

    getColorGamut: () => {
      if (window.matchMedia) {
        if (window.matchMedia("(color-gamut: rec2020)").matches) return "Rec. 2020"
        if (window.matchMedia("(color-gamut: p3)").matches) return "Display P3"
        if (window.matchMedia("(color-gamut: srgb)").matches) return "sRGB"
      }
      return "Unknown"
    },
  }

  // ============================================
  // VPN/TOR DETECTION
  // ============================================
  const PrivacyDetector = {
    vpnIndicators: [],
    torIndicators: [],
    proxyIndicators: [],
    detectionResults: {},

    async detectVPN(ipData) {
      const indicators = []

      // Check hosting/datacenter
      if (ipData.hosting === true) {
        indicators.push("Datacenter IP detected")
      }

      // Check proxy flag
      if (ipData.proxy === true) {
        indicators.push("Proxy/VPN flag detected")
      }

      // Check known VPN ASNs
      const vpnASNs = ["AS9009", "AS60068", "AS212238", "AS136787", "AS141995"]
      if (ipData.as && vpnASNs.some((asn) => ipData.as.includes(asn))) {
        indicators.push("Known VPN provider ASN")
      }

      // Check ISP name for VPN keywords
      const vpnKeywords = ["vpn", "private", "express", "nord", "proton", "surfshark", "mullvad", "cyberghost"]
      const ispLower = (ipData.isp || "").toLowerCase()
      const orgLower = (ipData.org || "").toLowerCase()
      if (vpnKeywords.some((kw) => ispLower.includes(kw) || orgLower.includes(kw))) {
        indicators.push("VPN provider in ISP/Org name")
      }

      this.vpnIndicators = indicators
      return indicators.length > 0
    },

    async detectTor(ipData) {
      const indicators = []

      // Check for Tor exit node characteristics
      const torKeywords = ["tor", "exit", "relay"]
      const ispLower = (ipData.isp || "").toLowerCase()
      const orgLower = (ipData.org || "").toLowerCase()

      if (torKeywords.some((kw) => ispLower.includes(kw) || orgLower.includes(kw))) {
        indicators.push("Tor network identifier in ISP")
      }

      // Additional Tor detection via timing analysis simulation
      // In production, you'd check against Tor exit node lists

      this.torIndicators = indicators
      return indicators.length > 0
    },

    async detectProxy(ipData) {
      const indicators = []

      if (ipData.proxy === true) {
        indicators.push("Proxy detected by API")
      }

      // Check for proxy headers (simulated - real check would be server-side)
      if (ipData.hosting && !ipData.proxy) {
        indicators.push("Possible transparent proxy")
      }

      this.proxyIndicators = indicators
      return indicators.length > 0
    },

    async detectWebRTCLeak() {
      return new Promise((resolve) => {
        try {
          const rtc = new RTCPeerConnection({ iceServers: [] })
          const localIPs = []

          rtc.createDataChannel("")

          rtc.onicecandidate = (e) => {
            if (!e.candidate) {
              rtc.close()
              resolve(localIPs)
              return
            }

            const parts = e.candidate.candidate.split(" ")
            const ip = parts[4]

            if (ip && !localIPs.includes(ip)) {
              // Filter out IPv6 link-local and mDNS
              if (!ip.includes(":") && !ip.endsWith(".local")) {
                localIPs.push(ip)
              }
            }
          }

          rtc.createOffer().then((offer) => rtc.setLocalDescription(offer))

          // Timeout fallback
          setTimeout(() => {
            rtc.close()
            resolve(localIPs)
          }, 3000)
        } catch (e) {
          resolve([])
        }
      })
    },

    calculatePrivacyScore() {
      let score = 100

      // Deduct for privacy issues
      if (this.vpnIndicators.length === 0) score -= 30 // No VPN
      if (this.detectionResults.webrtcLeak?.length > 0) score -= 20 // WebRTC leak
      if (BrowserDetector.getDoNotTrack() !== "Enabled") score -= 10 // DNT off
      if (BrowserDetector.getCookiesEnabled() === "Enabled") score -= 5 // Cookies enabled

      // Add for privacy measures
      if (this.vpnIndicators.length > 0) score = Math.min(100, score + 20)
      if (this.torIndicators.length > 0) score = Math.min(100, score + 30)

      return Math.max(0, Math.min(100, score))
    },
  }

  // ============================================
  // NETWORK DETECTION (Enhanced)
  // ============================================
  const NetworkDetector = {
    getConnectionType: () => {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      if (connection) {
        return connection.effectiveType ? connection.effectiveType.toUpperCase() : "Unknown"
      }
      return "Not Available"
    },

    getDownlinkSpeed: () => {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      if (connection && connection.downlink) {
        return connection.downlink + " Mbps"
      }
      return "Not Available"
    },

    getNetworkRTT: () => {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      if (connection && connection.rtt) {
        return connection.rtt + " ms"
      }
      return "Not Available"
    },

    async fetchIPInfo() {
      let ipData = {
        ip: "Not Available",
        ipv6: "Not Available",
        location: "Not Available",
        isp: "Not Available",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        proxy: false,
        hosting: false,
        as: "",
        org: "",
      }

      // Try multiple APIs
      try {
        const response = await fetch("https://ip-api.com/json/?fields=66846719")
        if (response.ok) {
          const data = await response.json()
          ipData = {
            ip: data.query || "Not Available",
            ipv6: "Not Available",
            location: [data.city, data.regionName, data.country].filter(Boolean).join(", ") || "Unknown",
            isp: data.isp || "Unknown",
            timezone: data.timezone || ipData.timezone,
            proxy: data.proxy || false,
            hosting: data.hosting || false,
            as: data.as || "",
            org: data.org || "",
          }
        }
      } catch (e) {
        // Primary failed, try backup
        try {
          const response = await fetch("https://ipapi.co/json/")
          if (response.ok) {
            const data = await response.json()
            ipData = {
              ip: data.ip || "Not Available",
              ipv6: data.version === "IPv6" ? data.ip : "Not Available",
              location: [data.city, data.region, data.country_name].filter(Boolean).join(", ") || "Unknown",
              isp: data.org || "Unknown",
              timezone: data.timezone || ipData.timezone,
              proxy: false,
              hosting: false,
              as: data.asn ? `AS${data.asn}` : "",
              org: data.org || "",
            }
          }
        } catch (e2) {
          // All APIs failed
        }
      }

      return ipData
    },
  }

  // ============================================
  // SECURITY NEWS FETCHER
  // ============================================
  const SecurityNewsFetcher = {
    async fetchHackerNews() {
      try {
        // Fetch top stories from Hacker News
        const response = await fetch(`${CONFIG.SECURITY_NEWS_API}/topstories.json`)
        if (!response.ok) throw new Error("Failed to fetch")

        const storyIds = await response.json()
        const topIds = storyIds.slice(0, 6)

        const stories = await Promise.all(
          topIds.map(async (id) => {
            const storyResponse = await fetch(`${CONFIG.SECURITY_NEWS_API}/item/${id}.json`)
            return storyResponse.json()
          }),
        )

        return stories.filter((s) => s && s.title)
      } catch (e) {
        return this.getFallbackNews()
      }
    },

    getFallbackNews() {
      return [
        {
          title: "Critical Zero-Day Vulnerability Discovered in Popular Framework",
          url: "#",
          time: Date.now() / 1000 - 3600,
          score: 542,
        },
        {
          title: "New Ransomware Variant Targeting Enterprise Networks",
          url: "#",
          time: Date.now() / 1000 - 7200,
          score: 389,
        },
        {
          title: "Major Data Breach Exposes Millions of User Records",
          url: "#",
          time: Date.now() / 1000 - 10800,
          score: 721,
        },
        {
          title: "Security Researchers Uncover Advanced APT Campaign",
          url: "#",
          time: Date.now() / 1000 - 14400,
          score: 456,
        },
        {
          title: "New Phishing Technique Bypasses Multi-Factor Authentication",
          url: "#",
          time: Date.now() / 1000 - 18000,
          score: 312,
        },
        {
          title: "Critical CVE Published for Widely-Used Open Source Library",
          url: "#",
          time: Date.now() / 1000 - 21600,
          score: 678,
        },
      ]
    },

    formatTimeAgo(timestamp) {
      const seconds = Math.floor(Date.now() / 1000 - timestamp)
      if (seconds < 60) return "just now"
      if (seconds < 3600) return Math.floor(seconds / 60) + " min ago"
      if (seconds < 86400) return Math.floor(seconds / 3600) + " hours ago"
      return Math.floor(seconds / 86400) + " days ago"
    },

    renderNews(stories) {
      const container = document.getElementById("security-news")
      if (!container) return

      container.innerHTML = stories
        .map(
          (story) => `
        <div class="news-card">
          <div class="news-card-header">
            <span class="news-score">${story.score || 0} pts</span>
            <span class="news-time">${this.formatTimeAgo(story.time)}</span>
          </div>
          <h3 class="news-card-title">
            <a href="${story.url || "#"}" target="_blank" rel="noopener noreferrer">${story.title}</a>
          </h3>
          <div class="news-card-footer">
            <span class="news-source">Hacker News</span>
          </div>
        </div>
      `,
        )
        .join("")
    },
  }

  // ============================================
  // ADVANCED FINGERPRINTING
  // ============================================
  const AdvancedFingerprinting = {
    async getAudioFingerprint() {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const analyser = audioContext.createAnalyser()
        const gainNode = audioContext.createGain()

        oscillator.type = "triangle"
        oscillator.frequency.value = 10000

        gainNode.gain.value = 0

        oscillator.connect(analyser)
        analyser.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.start(0)

        const data = new Float32Array(analyser.frequencyBinCount)
        analyser.getFloatFrequencyData(data)

        oscillator.stop()
        audioContext.close()

        let hash = 0
        for (let i = 0; i < data.length; i++) {
          if (data[i] !== Number.NEGATIVE_INFINITY) {
            hash += Math.abs(data[i])
          }
        }
        return hash.toFixed(0)
      } catch (e) {
        return "Not Available"
      }
    },

    detectFonts() {
      const testFonts = [
        "Arial",
        "Verdana",
        "Times New Roman",
        "Courier New",
        "Georgia",
        "Palatino",
        "Garamond",
        "Comic Sans MS",
        "Impact",
        "Monaco",
        "Roboto",
        "Open Sans",
        "Segoe UI",
        "Helvetica",
      ]

      const detectedFonts = []
      const testString = "mmmmmmmmmmlli"
      const testSize = "72px"

      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      const baseFont = "monospace"
      ctx.font = testSize + " " + baseFont
      const baseWidth = ctx.measureText(testString).width

      for (const font of testFonts) {
        ctx.font = testSize + " '" + font + "', " + baseFont
        const width = ctx.measureText(testString).width
        if (width !== baseWidth) {
          detectedFonts.push(font)
        }
      }

      return detectedFonts.length > 0 ? detectedFonts.slice(0, 5).join(", ") + "..." : "Default fonts only"
    },
  }

  // ============================================
  // FEATURE DETECTION (Enhanced)
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
      { name: "WebXR", test: () => "xr" in navigator },
      { name: "Crypto", test: () => !!window.crypto?.subtle },
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
  // AI DESIGN ENGINE
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
      privacyScore: 0,
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
        privacyScore: PrivacyDetector.calculatePrivacyScore(),
      }

      return this.userProfile
    },

    generateRecommendation: function () {
      const profile = this.userProfile
      let recommendedTheme = "forest-green"
      let animationLevel = "Full"
      let reason = ""

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

      if (profile.deviceType === "Mobile") {
        animationLevel = profile.prefersReducedMotion ? "Minimal" : "Reduced"
      } else {
        animationLevel = profile.prefersReducedMotion ? "Minimal" : "Full"
      }

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
              ? "Rich animations for immersive experience"
              : animationLevel === "Reduced"
                ? "Optimized for mobile performance"
                : "Minimal motion for accessibility",
          colors: null,
        },
        {
          icon: "🔒",
          title: "Privacy Status",
          description: `Privacy score: ${this.userProfile.privacyScore}/100. ${this.userProfile.privacyScore >= 70 ? "Good privacy measures detected" : "Consider using a VPN for better privacy"}`,
          colors: null,
        },
      ]
    },

    applyTheme: (themeName) => {
      document.body.classList.add("theme-transitioning")
      document.body.setAttribute("data-theme", themeName)

      try {
        localStorage.setItem("onionvuln-theme", themeName)
      } catch (e) {
        // localStorage not available
      }

      setTimeout(() => {
        document.body.classList.remove("theme-transitioning")
      }, 500)
    },
  }

  // ============================================
  // UI CONTROLLER
  // ============================================
  const UIController = {
    async init() {
      this.populateBrowserInfo()
      this.populateDeviceInfo()
      this.populateScreenInfo()
      await this.fetchNetworkInfo()
      await this.runPrivacyDetection()
      await this.populateTechDetails()
      await this.fetchSecurityNews()
      this.setupEventListeners()
      this.startAIAnalysis()
    },

    populateBrowserInfo() {
      const browser = BrowserDetector.getBrowserInfo()
      safeSet("browser-name", browser.name)
      safeSet("browser-version", browser.version)
      safeSet("browser-engine", browser.engine)
      safeSet("cookies-enabled", BrowserDetector.getCookiesEnabled())
      safeSet("dnt-status", BrowserDetector.getDoNotTrack())
      safeSet("browser-language", BrowserDetector.getLanguage())
      safeSet("tz-offset", BrowserDetector.getTimezoneOffset())
      safeSet("canvas-fp", BrowserDetector.getCanvasFingerprint())
      safeSet("webgl-hash", BrowserDetector.getWebGLHash())
    },

    async populateDeviceInfo() {
      const os = DeviceDetector.getOS()
      safeSet("device-type", DeviceDetector.getDeviceType())
      safeSet("os-name", os.name)
      safeSet("os-version", os.version)
      safeSet("device-platform", DeviceDetector.getPlatform())
      safeSet("cpu-cores", DeviceDetector.getCPUCores())
      safeSet("device-memory", DeviceDetector.getMemory())
      safeSet("gpu-renderer", DeviceDetector.getGPURenderer())
      safeSet("touch-support", DeviceDetector.getTouchSupport())
      safeSet("plugins-count", DeviceDetector.getPluginsCount())

      const battery = await DeviceDetector.getBatteryStatus()
      safeSet("battery-status", battery)
    },

    populateScreenInfo() {
      safeSet("screen-resolution", ScreenDetector.getResolution())
      safeSet("available-screen", ScreenDetector.getAvailableScreen())
      safeSet("viewport-size", ScreenDetector.getViewport())
      safeSet("color-depth", ScreenDetector.getColorDepth())
      safeSet("pixel-ratio", ScreenDetector.getPixelRatio())
      safeSet("screen-orientation", ScreenDetector.getOrientation())
      safeSet("hdr-support", ScreenDetector.getHDRSupport())
      safeSet("color-gamut", ScreenDetector.getColorGamut())

      window.addEventListener("resize", () => {
        safeSet("viewport-size", ScreenDetector.getViewport())
        safeSet("screen-orientation", ScreenDetector.getOrientation())
      })
    },

    async fetchNetworkInfo() {
      safeSet("connection-type", NetworkDetector.getConnectionType())
      safeSet("downlink-speed", NetworkDetector.getDownlinkSpeed())
      safeSet("network-rtt", NetworkDetector.getNetworkRTT())

      const ipInfo = await NetworkDetector.fetchIPInfo()
      safeSet("ip-address", ipInfo.ip)
      safeSet("ip-v6", ipInfo.ipv6)
      safeSet("ip-location", ipInfo.location)
      safeSet("ip-isp", ipInfo.isp)
      safeSet("ip-timezone", ipInfo.timezone)

      return ipInfo
    },

    async runPrivacyDetection() {
      const alertMessage = document.getElementById("alert-message")
      const alertStatus = document.getElementById("alert-status")

      if (alertMessage) alertMessage.textContent = "Analyzing privacy configuration..."

      const ipInfo = await NetworkDetector.fetchIPInfo()

      // Run detection
      const hasVPN = await PrivacyDetector.detectVPN(ipInfo)
      const hasTor = await PrivacyDetector.detectTor(ipInfo)
      const hasProxy = await PrivacyDetector.detectProxy(ipInfo)
      const webrtcIPs = await PrivacyDetector.detectWebRTCLeak()

      PrivacyDetector.detectionResults = {
        vpn: hasVPN,
        tor: hasTor,
        proxy: hasProxy,
        webrtcLeak: webrtcIPs,
      }

      // Update UI
      const vpnStatus = document.getElementById("vpn-status")
      const torStatus = document.getElementById("tor-status")
      const proxyStatus = document.getElementById("proxy-status")
      const realIpStatus = document.getElementById("real-ip-status")

      if (vpnStatus) {
        vpnStatus.textContent = hasVPN ? "VPN Detected" : "No VPN Detected"
        vpnStatus.className = "detection-value " + (hasVPN ? "status-active" : "status-warning")
      }

      if (torStatus) {
        torStatus.textContent = hasTor ? "Tor Detected" : "Not Using Tor"
        torStatus.className = "detection-value " + (hasTor ? "status-active" : "")
      }

      if (proxyStatus) {
        proxyStatus.textContent = hasProxy ? "Proxy Detected" : "No Proxy"
        proxyStatus.className = "detection-value " + (hasProxy ? "status-active" : "")
      }

      // Real IP analysis
      if (realIpStatus) {
        if (webrtcIPs.length > 0 && webrtcIPs[0] !== ipInfo.ip) {
          realIpStatus.textContent = "Possible: " + webrtcIPs[0]
          safeSet("real-ip", webrtcIPs[0])
          realIpStatus.className = "detection-value status-warning"
        } else {
          realIpStatus.textContent = "Matches Public IP"
          safeSet("real-ip", ipInfo.ip)
          realIpStatus.className = "detection-value status-active"
        }
      }

      // Update WebRTC leak in tech details
      safeSet("webrtc-leak", webrtcIPs.length > 0 ? webrtcIPs.join(", ") : "No leak detected")

      // Update indicators
      this.updateIndicator("vpn-indicator", hasVPN ? "active" : "warning")
      this.updateIndicator("tor-indicator", hasTor ? "active" : "neutral")
      this.updateIndicator("proxy-indicator", hasProxy ? "active" : "neutral")
      this.updateIndicator("realip-indicator", webrtcIPs.length === 0 ? "active" : "warning")

      // Update alert banner
      if (alertMessage) {
        if (hasVPN || hasTor) {
          alertMessage.textContent = "Privacy protection active - Your connection appears to be secured"
        } else {
          alertMessage.textContent = "Direct connection detected - Consider using a VPN for enhanced privacy"
        }
      }

      if (alertStatus) {
        const badge = alertStatus.querySelector(".status-badge")
        if (badge) {
          badge.classList.remove("scanning")
          if (hasVPN || hasTor) {
            badge.textContent = "Protected"
            badge.classList.add("protected")
          } else {
            badge.textContent = "Exposed"
            badge.classList.add("exposed")
          }
        }
      }

      // Add detection details
      this.renderDetectionDetails()
    },

    updateIndicator(elementId, status) {
      const el = document.getElementById(elementId)
      if (el) {
        el.className = "detection-indicator " + status
      }
    },

    renderDetectionDetails() {
      const container = document.getElementById("detection-details")
      if (!container) return

      const allIndicators = [
        ...PrivacyDetector.vpnIndicators.map((i) => ({ type: "VPN", text: i })),
        ...PrivacyDetector.torIndicators.map((i) => ({ type: "Tor", text: i })),
        ...PrivacyDetector.proxyIndicators.map((i) => ({ type: "Proxy", text: i })),
      ]

      if (allIndicators.length === 0) {
        container.innerHTML = `<p class="no-indicators">No privacy tools detected. Your real IP may be visible to websites.</p>`
        return
      }

      container.innerHTML = `
        <h4>Detection Indicators</h4>
        <ul class="indicator-list">
          ${allIndicators.map((i) => `<li><span class="indicator-type">${i.type}:</span> ${i.text}</li>`).join("")}
        </ul>
      `
    },

    async populateTechDetails() {
      safeSet("user-agent", navigator.userAgent)
      safeSet("webgl-renderer", DeviceDetector.getGPURenderer())
      safeSet("media-types", MediaDetector.getSupportedTypes())

      const audioFP = await AdvancedFingerprinting.getAudioFingerprint()
      safeSet("audio-fingerprint", audioFP)

      const fonts = AdvancedFingerprinting.detectFonts()
      safeSet("fonts-detected", fonts)

      // Populate feature grid
      const featureGrid = document.getElementById("feature-grid")
      if (featureGrid) {
        const features = FeatureDetector.detectAll()
        featureGrid.innerHTML = features
          .map(
            (f) => `
          <div class="feature-item ${f.supported ? "supported" : "unsupported"}">
            <span>${f.supported ? "✓" : "✗"}</span>
            <span>${f.name}</span>
          </div>
        `,
          )
          .join("")
      }
    },

    async fetchSecurityNews() {
      const stories = await SecurityNewsFetcher.fetchHackerNews()
      SecurityNewsFetcher.renderNews(stories)
    },

    setupEventListeners() {
      // Tech details toggle
      const techToggle = document.getElementById("tech-toggle")
      const techContent = document.getElementById("tech-content")

      if (techToggle && techContent) {
        techToggle.addEventListener("click", () => {
          techToggle.classList.toggle("active")
          techContent.classList.toggle("hidden")
        })
      }

      // Theme buttons
      const applyThemeBtn = document.getElementById("apply-theme-btn")
      const skipThemeBtn = document.getElementById("skip-theme-btn")

      if (applyThemeBtn) {
        applyThemeBtn.addEventListener("click", () => {
          const recommendation = AIDesignEngine.generateRecommendation()
          AIDesignEngine.applyTheme(recommendation.theme)
        })
      }

      if (skipThemeBtn) {
        skipThemeBtn.addEventListener("click", () => {
          const aiPanel = document.getElementById("ai-suggestions")
          if (aiPanel) aiPanel.classList.add("hidden")
        })
      }
    },

    startAIAnalysis() {
      const progressFill = document.getElementById("progress-fill")
      const progressText = document.getElementById("progress-text")
      const aiStatus = document.getElementById("ai-learning-status")
      let stepIndex = 0

      const runStep = () => {
        if (stepIndex >= CONFIG.LEARNING_STEPS.length) {
          this.completeAIAnalysis()
          return
        }

        const step = CONFIG.LEARNING_STEPS[stepIndex]
        if (progressFill) progressFill.style.width = step.progress + "%"
        if (progressText) progressText.textContent = step.text
        if (aiStatus) aiStatus.textContent = step.text

        stepIndex++
        setTimeout(runStep, 400)
      }

      setTimeout(runStep, 500)
    },

    completeAIAnalysis() {
      const learningProgress = document.getElementById("learning-progress")
      const aiAnalysis = document.getElementById("ai-analysis")
      const aiSuggestions = document.getElementById("ai-suggestions")
      const suggestionCards = document.getElementById("suggestion-cards")

      AIDesignEngine.analyzeUser()
      const recommendation = AIDesignEngine.generateRecommendation()

      // Update metrics
      safeSet("device-score", recommendation.deviceScore)
      safeSet("color-preference", recommendation.themeData.name)
      safeSet("animation-level", recommendation.animationLevel)
      safeSet("privacy-score", PrivacyDetector.calculatePrivacyScore() + "/100")

      // Show analysis
      if (learningProgress) learningProgress.classList.add("hidden")
      if (aiAnalysis) aiAnalysis.classList.remove("hidden")

      // Render suggestions
      if (suggestionCards) {
        suggestionCards.innerHTML = recommendation.suggestions
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
                ${s.colors.map((c) => `<div class="color-swatch" style="background:${c}" title="${c}"></div>`).join("")}
              </div>
            `
                : ""
            }
          </div>
        `,
          )
          .join("")
      }

      // Show suggestions after delay
      setTimeout(() => {
        if (aiSuggestions) aiSuggestions.classList.remove("hidden")
      }, 500)
    },
  }

  // ============================================
  // INITIALIZATION
  // ============================================
  document.addEventListener("DOMContentLoaded", () => {
    // Load saved theme
    try {
      const savedTheme = localStorage.getItem("onionvuln-theme")
      if (savedTheme) {
        document.body.setAttribute("data-theme", savedTheme)
      }
    } catch (e) {
      // localStorage not available
    }

    UIController.init()
  })
})()
