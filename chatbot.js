/**
 * ONIONVULN CHATBOT - Cybersecurity Assistant
 * Simple Q&A chatbot with preset cybersecurity topics
 * Compatible with all browsers and devices
 */

;(() => {
  // ============================================
  // Cybersecurity Knowledge Base
  // ============================================

  const knowledgeBase = {
    // Greetings
    greetings: {
      patterns: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening", "howdy", "yo"],
      responses: [
        "Hello! I'm the onionvuln security assistant. How can I help you with cybersecurity today?",
        "Hey there! Ready to discuss cybersecurity topics. What would you like to know?",
        "Greetings! I'm here to help with security questions. Fire away!",
      ],
    },

    // About onionvuln
    about: {
      patterns: [
        "who is onionvuln",
        "about onionvuln",
        "what is onionvuln",
        "who are you",
        "tell me about yourself",
        "onionvuln",
      ],
      responses: [
        "onionvuln is a security researcher and developer specializing in vulnerability research and open-source security tools. The name reflects the layered approach to security analysis - like peeling back an onion to reveal what's underneath.",
        "onionvuln focuses on making the digital world more secure through vulnerability research, security tool development, and knowledge sharing with the community.",
      ],
    },

    // SQL Injection
    sqlInjection: {
      patterns: ["sql injection", "sqli", "sql attack", "database injection", "sql vulnerability"],
      responses: [
        "SQL Injection (SQLi) is a code injection technique that exploits security vulnerabilities in an application's database layer.\n\n**Prevention:**\n• Use parameterized queries/prepared statements\n• Implement input validation\n• Use stored procedures\n• Apply least privilege principle to database accounts\n• Use WAF (Web Application Firewall)\n\nExample of vulnerable code:\n`SELECT * FROM users WHERE id = ' + userInput`\n\nSecure version:\n`SELECT * FROM users WHERE id = ?`",
      ],
    },

    // XSS
    xss: {
      patterns: ["xss", "cross site scripting", "cross-site scripting", "script injection", "xss attack"],
      responses: [
        "Cross-Site Scripting (XSS) allows attackers to inject malicious scripts into web pages viewed by other users.\n\n**Types:**\n• Stored XSS - Script saved on server\n• Reflected XSS - Script in URL/request\n• DOM-based XSS - Client-side vulnerability\n\n**Prevention:**\n• Encode output (HTML entities)\n• Validate and sanitize input\n• Use Content Security Policy (CSP)\n• Use HTTPOnly cookies\n• Implement proper CORS headers",
      ],
    },

    // CSRF
    csrf: {
      patterns: ["csrf", "cross site request forgery", "xsrf", "session riding", "csrf attack"],
      responses: [
        "Cross-Site Request Forgery (CSRF) tricks authenticated users into executing unwanted actions.\n\n**How it works:**\nAttacker creates a malicious page that sends requests to a target site where the victim is authenticated.\n\n**Prevention:**\n• Use CSRF tokens (unique per session/request)\n• Verify Origin/Referer headers\n• Use SameSite cookie attribute\n• Require re-authentication for sensitive actions\n• Implement proper CORS policies",
      ],
    },

    // Password Security
    passwords: {
      patterns: ["password", "password security", "strong password", "password hashing", "password best practices"],
      responses: [
        "Password Security Best Practices:\n\n**For Users:**\n• Use 12+ characters with mixed types\n• Use unique passwords per account\n• Enable 2FA/MFA wherever possible\n• Use a password manager\n\n**For Developers:**\n• Hash with bcrypt, scrypt, or Argon2\n• Never store plaintext passwords\n• Implement account lockout policies\n• Use secure password reset flows\n• Salt passwords before hashing\n\nNever use: MD5, SHA1, or unsalted hashes for passwords.",
      ],
    },

    // Phishing
    phishing: {
      patterns: ["phishing", "phishing attack", "spear phishing", "social engineering email", "fake email"],
      responses: [
        "Phishing is a social engineering attack using fraudulent communications to steal sensitive data.\n\n**Types:**\n• Email phishing - Mass fraudulent emails\n• Spear phishing - Targeted attacks\n• Whaling - Executive-targeted attacks\n• Smishing - SMS-based phishing\n• Vishing - Voice/phone phishing\n\n**Red Flags:**\n• Urgent/threatening language\n• Suspicious sender addresses\n• Generic greetings\n• Requests for sensitive info\n• Suspicious links/attachments\n\n**Protection:** Verify sender, hover before clicking, use email security tools.",
      ],
    },

    // Encryption
    encryption: {
      patterns: ["encryption", "encrypt", "aes", "rsa", "cryptography", "data encryption"],
      responses: [
        "Encryption converts data into unreadable ciphertext using cryptographic algorithms.\n\n**Types:**\n• Symmetric (AES, ChaCha20) - Same key for encrypt/decrypt\n• Asymmetric (RSA, ECC) - Public/private key pairs\n\n**Best Practices:**\n• Use AES-256 for symmetric encryption\n• Use RSA-2048+ or ECC for asymmetric\n• Never roll your own crypto\n• Use TLS 1.3 for data in transit\n• Encrypt sensitive data at rest\n• Properly manage encryption keys",
      ],
    },

    // VPN
    vpn: {
      patterns: ["vpn", "virtual private network", "vpn security", "vpn protocol"],
      responses: [
        "A VPN (Virtual Private Network) creates an encrypted tunnel for your internet traffic.\n\n**Security Benefits:**\n• Encrypts data in transit\n• Masks your IP address\n• Bypasses geo-restrictions\n• Protects on public WiFi\n\n**Protocols (Best to Worst):**\n• WireGuard - Modern, fast, secure\n• OpenVPN - Proven, flexible\n• IKEv2 - Good for mobile\n• L2TP/IPSec - Acceptable\n• PPTP - Avoid (insecure)\n\n**Note:** VPNs don't make you anonymous or protect against all threats.",
      ],
    },

    // Firewall
    firewall: {
      patterns: ["firewall", "firewall rules", "waf", "network firewall", "web application firewall"],
      responses: [
        "Firewalls monitor and control incoming/outgoing network traffic based on security rules.\n\n**Types:**\n• Packet filtering - Basic IP/port rules\n• Stateful inspection - Tracks connections\n• Application layer (WAF) - HTTP/HTTPS filtering\n• Next-gen (NGFW) - Deep packet inspection + IPS\n\n**Best Practices:**\n• Default deny policy\n• Whitelist only needed ports\n• Regular rule audits\n• Log all denied traffic\n• Segment networks\n• Keep firmware updated",
      ],
    },

    // Malware
    malware: {
      patterns: ["malware", "virus", "trojan", "ransomware", "spyware", "worm", "malicious software"],
      responses: [
        "Malware is malicious software designed to damage, disrupt, or gain unauthorized access.\n\n**Types:**\n• Virus - Self-replicating, needs host\n• Worm - Self-propagating over networks\n• Trojan - Disguised as legitimate software\n• Ransomware - Encrypts files for ransom\n• Spyware - Covert data collection\n• Rootkit - Hides deep in system\n\n**Protection:**\n• Keep software updated\n• Use reputable antivirus\n• Don't open suspicious attachments\n• Download from official sources\n• Regular backups (3-2-1 rule)\n• Principle of least privilege",
      ],
    },

    // Two-Factor Authentication
    twofa: {
      patterns: ["2fa", "two factor", "two-factor", "mfa", "multi factor", "authenticator", "otp"],
      responses: [
        "Two-Factor Authentication (2FA/MFA) adds an extra layer of security beyond passwords.\n\n**Methods (Most to Least Secure):**\n• Hardware keys (YubiKey, FIDO2)\n• Authenticator apps (TOTP)\n• Push notifications\n• SMS codes (vulnerable to SIM swap)\n\n**Implementation Tips:**\n• Prefer TOTP over SMS\n• Store backup codes securely\n• Use hardware keys for high-value accounts\n• Educate users on phishing-resistant methods\n\nRecommended apps: Authy, Google Authenticator, Microsoft Authenticator",
      ],
    },

    // Penetration Testing
    pentest: {
      patterns: ["penetration testing", "pentest", "pen test", "ethical hacking", "security testing", "red team"],
      responses: [
        "Penetration Testing simulates real-world attacks to identify security vulnerabilities.\n\n**Phases:**\n1. Reconnaissance - Gather information\n2. Scanning - Identify entry points\n3. Gaining Access - Exploit vulnerabilities\n4. Maintaining Access - Test persistence\n5. Analysis & Reporting\n\n**Types:**\n• Black box - No prior knowledge\n• White box - Full access/documentation\n• Gray box - Partial knowledge\n\n**Popular Tools:**\nBurp Suite, Metasploit, Nmap, OWASP ZAP, Nuclei, SQLMap\n\n**Always get written authorization before testing!**",
      ],
    },

    // OWASP Top 10
    owasp: {
      patterns: ["owasp", "owasp top 10", "top 10 vulnerabilities", "web security risks"],
      responses: [
        "OWASP Top 10 (2021) - Critical Web Application Security Risks:\n\n1. **A01 Broken Access Control** - Unauthorized actions\n2. **A02 Cryptographic Failures** - Weak encryption\n3. **A03 Injection** - SQL, NoSQL, OS injection\n4. **A04 Insecure Design** - Missing security controls\n5. **A05 Security Misconfiguration** - Default configs\n6. **A06 Vulnerable Components** - Outdated dependencies\n7. **A07 Auth Failures** - Broken authentication\n8. **A08 Data Integrity Failures** - Insecure CI/CD\n9. **A09 Logging Failures** - Missing audit trails\n10. **A10 SSRF** - Server-Side Request Forgery\n\nVisit owasp.org for detailed guides.",
      ],
    },

    // Network Security
    network: {
      patterns: ["network security", "network protection", "secure network", "network hardening"],
      responses: [
        "Network Security protects infrastructure from unauthorized access and attacks.\n\n**Key Measures:**\n• Network segmentation (VLANs)\n• Zero Trust Architecture\n• Intrusion Detection/Prevention (IDS/IPS)\n• Regular vulnerability scanning\n• Secure DNS (DoH/DoT)\n• Network Access Control (NAC)\n\n**Protocols:**\n• Use TLS 1.3 for encryption\n• Disable legacy protocols (SSLv3, TLS 1.0/1.1)\n• Implement 802.1X for authentication\n• Use SNMPv3 for network management\n\n**Monitoring:** Log analysis, SIEM, flow analysis",
      ],
    },

    // Secure Coding
    secureCoding: {
      patterns: ["secure coding", "secure code", "secure development", "sdlc", "code security", "devsecops"],
      responses: [
        "Secure Coding practices help prevent vulnerabilities at the source.\n\n**Principles:**\n• Input validation & sanitization\n• Output encoding\n• Parameterized queries\n• Least privilege principle\n• Defense in depth\n• Fail securely\n\n**SDLC Integration:**\n• Threat modeling in design\n• Code reviews & SAST\n• Dependency scanning (SCA)\n• DAST in staging\n• Security training for devs\n\n**Tools:**\nSonarQube, Snyk, Semgrep, Checkmarx, Dependabot",
      ],
    },

    // Bug Bounty
    bugBounty: {
      patterns: ["bug bounty", "bug bounty program", "responsible disclosure", "vulnerability disclosure"],
      responses: [
        "Bug Bounty programs reward security researchers for finding vulnerabilities.\n\n**Getting Started:**\n• Learn web security fundamentals\n• Practice on CTF platforms\n• Read disclosed reports on HackerOne\n• Start with wide-scope programs\n• Focus on impact, not quantity\n\n**Platforms:**\n• HackerOne\n• Bugcrowd\n• Intigriti\n• Synack\n\n**Tips:**\n• Always read program rules\n• Stay in scope\n• Write clear, reproducible reports\n• Be patient and professional\n• Keep learning from others",
      ],
    },

    // Privacy
    privacy: {
      patterns: ["privacy", "online privacy", "data privacy", "personal data", "privacy protection"],
      responses: [
        "Online Privacy Protection measures help safeguard your personal data.\n\n**Browser:**\n• Use privacy-focused browsers (Firefox, Brave)\n• Enable tracking protection\n• Use uBlock Origin + Privacy Badger\n• Clear cookies regularly\n\n**Communication:**\n• Use E2E encrypted messaging (Signal)\n• Use encrypted email (ProtonMail)\n• Avoid sharing sensitive data\n\n**General:**\n• Review app permissions\n• Use privacy-respecting services\n• Opt out of data collection\n• Use separate emails for different purposes\n• Check haveibeenpwned.com regularly",
      ],
    },

    // API Security
    apiSecurity: {
      patterns: ["api security", "rest api security", "api vulnerability", "api protection", "api authentication"],
      responses: [
        "API Security protects interfaces from attacks and data exposure.\n\n**Common Vulnerabilities:**\n• Broken Authentication\n• Broken Object Level Authorization (BOLA)\n• Excessive Data Exposure\n• Lack of Rate Limiting\n• Mass Assignment\n\n**Best Practices:**\n• Use OAuth 2.0 / JWT properly\n• Implement rate limiting\n• Validate all inputs\n• Use HTTPS only\n• Version your APIs\n• Log and monitor API usage\n• Don't expose sensitive data in responses\n\nRefer to OWASP API Security Top 10 for comprehensive guidance.",
      ],
    },

    // Incident Response
    incidentResponse: {
      patterns: ["incident response", "security incident", "breach response", "ir plan", "security breach"],
      responses: [
        "Incident Response is the organized approach to handling security breaches.\n\n**Phases:**\n1. **Preparation** - Plans, tools, training\n2. **Identification** - Detect & analyze\n3. **Containment** - Limit damage\n4. **Eradication** - Remove threat\n5. **Recovery** - Restore operations\n6. **Lessons Learned** - Improve processes\n\n**Key Actions:**\n• Document everything\n• Preserve evidence\n• Communicate with stakeholders\n• Follow legal requirements\n• Update defenses post-incident\n\nHave an IR plan BEFORE you need it!",
      ],
    },

    // Default/Fallback
    fallback: {
      responses: [
        "I'm not sure I have specific information on that topic. Try asking about:\n\n• SQL Injection\n• XSS & CSRF\n• Password Security\n• Encryption\n• Phishing\n• Malware\n• VPN & Firewalls\n• 2FA/MFA\n• Penetration Testing\n• OWASP Top 10\n• Secure Coding\n• API Security\n\nOr check out the resources at owasp.org for comprehensive security guides.",
        "I don't have detailed info on that specific topic, but I can help with common cybersecurity questions. What would you like to know about web security, network protection, or vulnerability research?",
      ],
    },

    // Thanks
    thanks: {
      patterns: ["thank", "thanks", "thank you", "thx", "appreciate", "helpful"],
      responses: [
        "You're welcome! Stay secure out there. Feel free to ask if you have more security questions!",
        "Glad I could help! Remember: security is a continuous process, not a destination.",
        "Anytime! Keep learning and stay vigilant. Cybersecurity is everyone's responsibility.",
      ],
    },

    // Goodbye
    goodbye: {
      patterns: ["bye", "goodbye", "see you", "later", "exit", "quit"],
      responses: [
        "Goodbye! Stay safe and secure. Remember to keep your systems updated!",
        "See you later! Keep those firewalls up and passwords strong!",
        "Take care! Remember: think before you click. 🔐",
      ],
    },

    // Help
    help: {
      patterns: ["help", "commands", "what can you do", "options", "menu"],
      responses: [
        "I can help you with various cybersecurity topics:\n\n**Attacks & Vulnerabilities:**\n• SQL Injection, XSS, CSRF\n• Phishing, Malware\n• OWASP Top 10\n\n**Defense & Protection:**\n• Password Security, 2FA\n• Encryption, VPN, Firewalls\n• Secure Coding\n• API Security\n\n**Professional:**\n• Penetration Testing\n• Bug Bounty\n• Incident Response\n\nJust type your question or pick from the suggestions below!",
      ],
    },
  }

  // Quick suggestion topics
  const quickSuggestions = ["SQL Injection", "XSS Attack", "Password Tips", "OWASP Top 10", "Phishing", "2FA Setup"]

  // ============================================
  // Chatbot HTML Template
  // ============================================

  function createChatbotHTML() {
    const chatbotHTML = `
      <button class="chatbot-toggle" id="chatbot-toggle" aria-label="Open chat assistant">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3c5.5 0 10 3.58 10 8s-4.5 8-10 8c-1.24 0-2.43-.18-3.53-.5C5.55 21 2 21 2 21c2.33-2.33 2.7-3.9 2.75-4.5C3.05 15.07 2 13.13 2 11c0-4.42 4.5-8 10-8zm0 2c-4.42 0-8 2.69-8 6 0 1.66.83 3.19 2.23 4.34l.6.5-.03.73c-.04.92-.27 1.81-.66 2.63.9-.17 1.88-.53 2.83-1.1l.49-.3.56.14c.91.23 1.88.36 2.98.36 4.42 0 8-2.69 8-6s-3.58-6-8-6z"/>
        </svg>
      </button>
      
      <div class="chatbot-container" id="chatbot-container">
        <div class="chatbot-header">
          <div class="chatbot-avatar">🛡</div>
          <div class="chatbot-info">
            <h4>Security Assistant</h4>
            <p>Online</p>
          </div>
          <button class="chatbot-close" id="chatbot-close" aria-label="Close chat">×</button>
        </div>
        
        <div class="chatbot-messages" id="chatbot-messages">
          <div class="chat-message bot">
            Welcome! I'm the onionvuln security assistant. Ask me anything about cybersecurity - from SQL injection to secure coding practices. How can I help you today?
          </div>
        </div>
        
        <div class="chatbot-suggestions" id="chatbot-suggestions">
          ${quickSuggestions.map((s) => `<button class="suggestion-btn" data-query="${s}">${s}</button>`).join("")}
        </div>
        
        <div class="chatbot-input-area">
          <input type="text" class="chatbot-input" id="chatbot-input" placeholder="Type your security question..." autocomplete="off">
          <button class="chatbot-send" id="chatbot-send" aria-label="Send message">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    `

    const chatbotWrapper = document.createElement("div")
    chatbotWrapper.id = "chatbot-wrapper"
    chatbotWrapper.innerHTML = chatbotHTML
    document.body.appendChild(chatbotWrapper)
  }

  // ============================================
  // Message Processing
  // ============================================

  function findBestMatch(input) {
    const normalizedInput = input.toLowerCase().trim()

    // Check each category
    for (const category in knowledgeBase) {
      if (category === "fallback") continue

      const data = knowledgeBase[category]
      if (data.patterns) {
        for (const pattern of data.patterns) {
          if (normalizedInput.includes(pattern)) {
            return data.responses[Math.floor(Math.random() * data.responses.length)]
          }
        }
      }
    }

    // Return fallback
    return knowledgeBase.fallback.responses[Math.floor(Math.random() * knowledgeBase.fallback.responses.length)]
  }

  function formatMessage(text) {
    // Convert markdown-style formatting to HTML
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/\n/g, "<br>")
  }

  // ============================================
  // Chat Functions
  // ============================================

  function addMessage(text, isUser) {
    const messagesContainer = document.getElementById("chatbot-messages")
    const messageDiv = document.createElement("div")
    messageDiv.className = `chat-message ${isUser ? "user" : "bot"}`
    messageDiv.innerHTML = isUser ? text : formatMessage(text)
    messagesContainer.appendChild(messageDiv)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }

  function showTypingIndicator() {
    const messagesContainer = document.getElementById("chatbot-messages")
    const typingDiv = document.createElement("div")
    typingDiv.className = "typing-indicator"
    typingDiv.id = "typing-indicator"
    typingDiv.innerHTML = "<span></span><span></span><span></span>"
    messagesContainer.appendChild(typingDiv)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }

  function hideTypingIndicator() {
    const indicator = document.getElementById("typing-indicator")
    if (indicator) indicator.remove()
  }

  function processMessage(message) {
    if (!message.trim()) return

    // Add user message
    addMessage(message, true)

    // Show typing indicator
    showTypingIndicator()

    // Disable input while processing
    const input = document.getElementById("chatbot-input")
    const sendBtn = document.getElementById("chatbot-send")
    input.disabled = true
    sendBtn.disabled = true

    // Simulate thinking time
    const delay = Math.random() * 500 + 500

    setTimeout(() => {
      hideTypingIndicator()

      // Get and display response
      const response = findBestMatch(message)
      addMessage(response, false)

      // Re-enable input
      input.disabled = false
      sendBtn.disabled = false
      input.focus()
    }, delay)
  }

  // ============================================
  // Event Handlers
  // ============================================

  function initializeChatbot() {
    createChatbotHTML()

    const toggle = document.getElementById("chatbot-toggle")
    const container = document.getElementById("chatbot-container")
    const closeBtn = document.getElementById("chatbot-close")
    const input = document.getElementById("chatbot-input")
    const sendBtn = document.getElementById("chatbot-send")
    const suggestions = document.getElementById("chatbot-suggestions")

    // Toggle chatbot
    toggle.addEventListener("click", () => {
      container.classList.toggle("active")
      toggle.classList.toggle("active")
      if (container.classList.contains("active")) {
        input.focus()
      }
    })

    // Close button
    closeBtn.addEventListener("click", () => {
      container.classList.remove("active")
      toggle.classList.remove("active")
    })

    // Send message on button click
    sendBtn.addEventListener("click", () => {
      processMessage(input.value)
      input.value = ""
    })

    // Send message on Enter key
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        processMessage(input.value)
        input.value = ""
      }
    })

    // Quick suggestion buttons
    suggestions.addEventListener("click", (e) => {
      if (e.target.classList.contains("suggestion-btn")) {
        const query = e.target.getAttribute("data-query")
        processMessage(query)
      }
    })

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && container.classList.contains("active")) {
        container.classList.remove("active")
        toggle.classList.remove("active")
      }
    })

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (container.classList.contains("active") && !container.contains(e.target) && !toggle.contains(e.target)) {
        container.classList.remove("active")
        toggle.classList.remove("active")
      }
    })
  }

  // ============================================
  // Initialize on DOM Ready
  // ============================================

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeChatbot)
  } else {
    initializeChatbot()
  }
})()
