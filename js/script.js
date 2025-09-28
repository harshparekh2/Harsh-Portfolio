// AI/ML Portfolio JavaScript
;(() => {
  // DOM elements
  const navbar = document.getElementById("mainNav")
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
  const sections = document.querySelectorAll("section[id]")
  const progressBars = document.querySelectorAll(".progress-bar")
  const statNumbers = document.querySelectorAll(".stat-number")
  const skillCards = document.querySelectorAll(".skill-card")
  const projectCards = document.querySelectorAll(".project-card")
  const contactForm = document.getElementById("contactForm")
  const canvas = document.getElementById("hero-canvas")

  // Initialize everything when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    initializeNavigation()
    initializeAnimations()
    initializeSkillBars()
    initializeCounters()
    initializeContactForm()
    initializeScrollAnimations()
    initializeTypingEffect()
    initializeHero3D()
    initializeTilt()
  })

  // Navigation functionality
  function initializeNavigation() {
    // Smooth scrolling for navigation links
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      })
    })

    // Navbar background on scroll
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled")
      } else {
        navbar.classList.remove("navbar-scrolled")
      }

      // Update active navigation link
      updateActiveNavLink()
    })

    // Mobile menu close on link click
    const navbarToggler = document.querySelector(".navbar-toggler")
    const navbarCollapse = document.querySelector(".navbar-collapse")

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click()
        }
      })
    })
  }

  // Update active navigation link based on scroll position
  function updateActiveNavLink() {
    let current = ""
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }

  // Initialize scroll animations
  function initializeScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")

          // Trigger specific animations based on element
          if (entry.target.classList.contains("skill-card")) {
            animateSkillCard(entry.target)
          } else if (entry.target.classList.contains("project-card")) {
            animateProjectCard(entry.target)
          } else if (entry.target.querySelector(".stat-number")) {
            animateCounter(entry.target.querySelector(".stat-number"))
          }
        }
      })
    }, observerOptions)

    // Observe elements for animation
    document.querySelectorAll(".skill-card, .project-card, .about-content, .contact-form, .stat-item").forEach((el) => {
      el.classList.add("animate-on-scroll")
      observer.observe(el)
    })
  }

  // Initialize skill progress bars
  function initializeSkillBars() {
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBar = entry.target
            const width = progressBar.getAttribute("data-width")

            setTimeout(() => {
              progressBar.style.width = width + "%"
            }, 200)

            skillObserver.unobserve(progressBar)
          }
        })
      },
      { threshold: 0.5 },
    )

    progressBars.forEach((bar) => {
      skillObserver.observe(bar)
    })
  }

  // Initialize counters
  function initializeCounters() {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target)
            counterObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.7 },
    )

    statNumbers.forEach((counter) => {
      counterObserver.observe(counter)
    })
  }

  // Animate counter numbers
  function animateCounter(element) {
    const target = Number.parseInt(element.getAttribute("data-count"))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      element.textContent = Math.floor(current)

      if (current >= target) {
        element.textContent = target
        clearInterval(timer)
      }
    }, 16)
  }

  // Animate skill cards
  function animateSkillCard(card) {
    const delay = Array.from(skillCards).indexOf(card) * 100
    setTimeout(() => {
      card.style.transform = "translateY(0)"
      card.style.opacity = "1"
    }, delay)
  }

  // Animate project cards
  function animateProjectCard(card) {
    const delay = Array.from(projectCards).indexOf(card) * 150
    setTimeout(() => {
      card.style.transform = "translateY(0)"
      card.style.opacity = "1"
    }, delay)
  }

  // Initialize contact form
  function initializeContactForm() {
    if (!contactForm) return

    contactForm.addEventListener("submit", handleFormSubmit)

    // Real-time validation
    const inputs = contactForm.querySelectorAll("input, textarea")
    inputs.forEach((input) => {
      input.addEventListener("blur", () => validateField(input))
      input.addEventListener("input", () => clearFieldError(input))
    })
  }

  // Handle form submission
  async function handleFormSubmit(e) {
    e.preventDefault()

    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const btnText = submitBtn.querySelector(".btn-text")
    const btnLoader = submitBtn.querySelector(".btn-loader")

    // Validate all fields
    const isValid = validateForm()
    if (!isValid) return

    // Show loading state
    submitBtn.classList.add("loading")
    btnText.style.display = "none"
    btnLoader.classList.remove("d-none")
    submitBtn.disabled = true

    try {
      // Simulate form submission (replace with actual API call)
      await simulateFormSubmission()
      showSuccess("Message sent successfully! I'll get back to you soon.")
      contactForm.reset()
    } catch (error) {
      showError("Failed to send message. Please try again later.")
    } finally {
      // Hide loading state
      submitBtn.classList.remove("loading")
      btnText.style.display = "inline"
      btnLoader.classList.add("d-none")
      submitBtn.disabled = false
    }
  }

  // Validate entire form
  function validateForm() {
    const inputs = contactForm.querySelectorAll("input, textarea")
    let isValid = true

    inputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false
      }
    })

    return isValid
  }

  // Validate individual field
  function validateField(field) {
    const value = field.value.trim()
    const fieldName = field.getAttribute("name")
    let isValid = true
    let errorMessage = ""

    // Clear previous errors
    clearFieldError(field)

    // Required field check
    if (!value) {
      errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`
      isValid = false
    } else {
      // Specific validation based on field type
      switch (fieldName) {
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) {
            errorMessage = "Please enter a valid email address."
            isValid = false
          }
          break
        case "name":
          if (value.length < 2) {
            errorMessage = "Name must be at least 2 characters long."
            isValid = false
          }
          break
        case "subject":
          if (value.length < 5) {
            errorMessage = "Subject must be at least 5 characters long."
            isValid = false
          }
          break
        case "message":
          if (value.length < 10) {
            errorMessage = "Message must be at least 10 characters long."
            isValid = false
          }
          break
      }
    }

    if (!isValid) {
      showFieldError(field, errorMessage)
    }

    return isValid
  }

  // Show field error
  function showFieldError(field, message) {
    field.classList.add("is-invalid")
    const errorDiv = field.parentNode.querySelector(".form-error")
    if (errorDiv) {
      errorDiv.textContent = message
      errorDiv.style.display = "block"
    }
  }

  // Clear field error
  function clearFieldError(field) {
    field.classList.remove("is-invalid")
    const errorDiv = field.parentNode.querySelector(".form-error")
    if (errorDiv) {
      errorDiv.style.display = "none"
    }
  }

  // Show success message
  function showSuccess(message) {
    const successDiv = document.createElement("div")
    successDiv.className = "form-success"
    successDiv.textContent = message
    contactForm.parentNode.insertBefore(successDiv, contactForm)

    setTimeout(() => {
      successDiv.remove()
    }, 5000)
  }

  // Show error message
  function showError(message) {
    const errorDiv = document.createElement("div")
    errorDiv.className = "form-error-message"
    errorDiv.textContent = message
    contactForm.parentNode.insertBefore(errorDiv, contactForm)

    setTimeout(() => {
      errorDiv.remove()
    }, 5000)
  }

  // Simulate form submission (replace with actual API call)
  function simulateFormSubmission() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success (90% of the time)
        if (Math.random() > 0.1) {
          resolve()
        } else {
          reject(new Error("Submission failed"))
        }
      }, 2000)
    })
  }

  // Initialize typing effect for hero title
  function initializeTypingEffect() {
    const typingElement = document.querySelector(".typing-text")
    if (!typingElement) return

    const texts = ["Hi, I'm Future AI/ML Engineer", "Hi, I'm a Data Scientist", "Hi, I'm a Tech Enthusiast"]

    let textIndex = 0
    let charIndex = 0
    let isDeleting = false
    let isWaiting = false

    function typeText() {
      const currentText = texts[textIndex]

      if (isWaiting) {
        setTimeout(() => {
          isWaiting = false
          isDeleting = true
          typeText()
        }, 2000)
        return
      }

      if (isDeleting) {
        charIndex--
        typingElement.textContent = currentText.substring(0, charIndex)

        if (charIndex === 0) {
          isDeleting = false
          textIndex = (textIndex + 1) % texts.length
        }
      } else {
        charIndex++
        typingElement.textContent = currentText.substring(0, charIndex)

        if (charIndex === currentText.length) {
          isWaiting = true
        }
      }

      const typingSpeed = isDeleting ? 50 : 100
      setTimeout(typeText, typingSpeed)
    }

    // Start typing effect
    setTimeout(typeText, 1000)
  }

  // Initialize general animations
  function initializeAnimations() {
    // Add entrance animations to elements
    setTimeout(() => {
      document.querySelectorAll(".hero-content").forEach((el) => {
        el.classList.add("fade-in-up")
      })
    }, 500)

    // Parallax effect for hero section
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const hero = document.querySelector(".hero-section")
      if (hero) {
        const rate = scrolled * -0.5
        hero.style.transform = `translateY(${rate}px)`
      }
    })

    // Floating elements animation
    animateFloatingElements()
  }

  // Animate floating elements
  function animateFloatingElements() {
    const floatingElements = document.querySelectorAll(".floating-element")

    floatingElements.forEach((element, index) => {
      // Set random initial positions
      const randomDelay = Math.random() * 2
      const randomDuration = 4 + Math.random() * 4

      element.style.animationDelay = `${randomDelay}s`
      element.style.animationDuration = `${randomDuration}s`

      // Add mouseover effects
      element.addEventListener("mouseenter", function () {
        this.style.animationPlayState = "paused"
        this.style.transform = "scale(1.2)"
      })

      element.addEventListener("mouseleave", function () {
        this.style.animationPlayState = "running"
        this.style.transform = "scale(1)"
      })
    })
  }

  function initializeHero3D() {
    const hero = document.querySelector(".hero-section")
    if (!hero || !canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    let width, height, dpr
    let t = 0
    let mx = 0,
      my = 0
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Optimized: Reduced points for better performance
    const POINTS = []
    const COUNT_LAT = 15  // Reduced from 30
    const COUNT_LON = 30  // Reduced from 60

    function buildPoints() {
      POINTS.length = 0
      const radius = Math.min(width, height) * 0.3  // Slightly smaller
      for (let i = 0; i <= COUNT_LAT; i++) {
        const theta = (i * Math.PI) / COUNT_LAT
        for (let j = 0; j < COUNT_LON; j++) {
          const phi = (j * 2 * Math.PI) / COUNT_LON
          const x = radius * Math.sin(theta) * Math.cos(phi)
          const y = radius * Math.cos(theta)
          const z = radius * Math.sin(theta) * Math.sin(phi)
          POINTS.push({ x, y, z })
        }
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildPoints()
    }

    function project(p, rotX, rotY) {
      // Rotation matrices (Y then X)
      const cosY = Math.cos(rotY),
        sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX),
        sinX = Math.sin(rotX)

      const x = p.x * cosY - p.z * sinY
      let z = p.x * sinY + p.z * cosY
      const y = p.y * cosX - z * sinX
      z = p.y * sinX + z * cosX

      const perspective = 600 // camera distance
      const scale = perspective / (perspective + z)
      return {
        x: width / 2 + x * scale,
        y: height / 2 + y * scale,
        scale,
        z,
      }
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      const baseRotY = t * 0.001 + mx * 0.0005  // Slower rotation
      const baseRotX = t * 0.0008 + my * 0.0005

      // Enhanced starfield with different sizes
      ctx.save()
      ctx.globalAlpha = 0.6
      for (let s = 0; s < 50; s++) {  // Increased stars
        const x = (s * 73 + t * 0.02) % width
        const y = (s * 131 + t * 0.03) % height
        const size = Math.random() * 2 + 0.5
        const alpha = 0.3 + Math.random() * 0.4
        ctx.fillStyle = `rgba(14, 165, 233, ${alpha})`
        ctx.fillRect(x, y, size, size)
      }
      ctx.restore()

      // Add shooting stars
      for (let i = 0; i < 3; i++) {
        const starX = (t * 0.1 + i * 200) % (width + 100)
        const starY = (i * 150 + Math.sin(t * 0.005 + i) * 50) % height
        const alpha = Math.max(0, 1 - (starX / width))
        
        if (alpha > 0.1) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(starX, starY)
          ctx.lineTo(starX - 20, starY - 5)
          ctx.stroke()
          
          // Star head
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.beginPath()
          ctx.arc(starX, starY, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Simplified sphere rendering (keeping earth intact)
      for (let i = 0; i < POINTS.length; i++) {
        const p = project(POINTS[i], baseRotX, baseRotY)
        const alpha = Math.max(0, Math.min(0.8, (p.scale - 0.5) * 2))
        
        if (alpha > 0.1) {  // Only draw visible points
          ctx.fillStyle = `rgba(14, 165, 233, ${alpha})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, Math.max(1, 2 * p.scale), 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Enhanced floating particles with different patterns
      for (let i = 0; i < 12; i++) {  // More particles
        const angle = (t * 0.0008 + i * 0.4) % (Math.PI * 2)
        const radius = 60 + Math.sin(t * 0.001 + i) * 40
        const x = width / 2 + Math.cos(angle) * radius
        const y = height / 2 + Math.sin(angle) * radius
        const alpha = 0.2 + Math.sin(t * 0.002 + i) * 0.3
        
        ctx.fillStyle = `rgba(14, 165, 233, ${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Add orbital rings around the earth
      for (let ring = 0; ring < 2; ring++) {
        const ringRadius = 80 + ring * 30
        const ringAlpha = 0.1 + ring * 0.05
        const ringSpeed = 0.0005 + ring * 0.0003
        
        ctx.strokeStyle = `rgba(14, 165, 233, ${ringAlpha})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(width / 2, height / 2, ringRadius, 0, Math.PI * 2)
        ctx.stroke()
        
        // Add dots on the rings
        for (let dot = 0; dot < 8; dot++) {
          const dotAngle = (t * ringSpeed + dot * Math.PI / 4) % (Math.PI * 2)
          const dotX = width / 2 + Math.cos(dotAngle) * ringRadius
          const dotY = height / 2 + Math.sin(dotAngle) * ringRadius
          
          ctx.fillStyle = `rgba(14, 165, 233, ${ringAlpha * 2})`
          ctx.beginPath()
          ctx.arc(dotX, dotY, 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // NEW: Tech/AI animations in empty space
      
      // Floating tech icons (binary code, circuits, etc.)
      for (let i = 0; i < 8; i++) {
        const iconX = (i * 150 + t * 0.05) % (width + 50)
        const iconY = (i * 100 + Math.sin(t * 0.003 + i) * 30) % height
        const alpha = 0.3 + Math.sin(t * 0.002 + i) * 0.2
        
        // Draw binary code patterns
        ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`
        for (let bit = 0; bit < 4; bit++) {
          const bitX = iconX + bit * 8
          const bitY = iconY + Math.sin(t * 0.01 + bit) * 2
          ctx.fillRect(bitX, bitY, 4, 4)
        }
      }

      // Data streams flowing across screen
      for (let stream = 0; stream < 4; stream++) {
        const streamY = (stream * 150 + t * 0.08) % height
        const streamAlpha = 0.4 + Math.sin(t * 0.004 + stream) * 0.3
        
        ctx.strokeStyle = `rgba(14, 165, 233, ${streamAlpha})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, streamY)
        
        for (let x = 0; x < width; x += 20) {
          const y = streamY + Math.sin(t * 0.01 + x * 0.01) * 10
          ctx.lineTo(x, y)
        }
        ctx.stroke()
        
        // Add data packets
        for (let packet = 0; packet < 3; packet++) {
          const packetX = (t * 0.1 + packet * 200) % width
          const packetY = streamY + Math.sin(t * 0.01 + packetX * 0.01) * 10
          
          ctx.fillStyle = `rgba(6, 182, 212, ${streamAlpha})`
          ctx.beginPath()
          ctx.arc(packetX, packetY, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // AI neural network connections
      for (let node = 0; node < 6; node++) {
        const nodeX = 100 + (node % 3) * 200
        const nodeY = 100 + Math.floor(node / 3) * 150
        const nodeAlpha = 0.5 + Math.sin(t * 0.003 + node) * 0.3
        
        // Draw node
        ctx.fillStyle = `rgba(14, 165, 233, ${nodeAlpha})`
        ctx.beginPath()
        ctx.arc(nodeX, nodeY, 3, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw connections to other nodes
        for (let otherNode = 0; otherNode < 6; otherNode++) {
          if (otherNode !== node) {
            const otherX = 100 + (otherNode % 3) * 200
            const otherY = 100 + Math.floor(otherNode / 3) * 150
            
            ctx.strokeStyle = `rgba(6, 182, 212, ${nodeAlpha * 0.3})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(nodeX, nodeY)
            ctx.lineTo(otherX, otherY)
            ctx.stroke()
          }
        }
      }

      // Floating code snippets
      for (let code = 0; code < 5; code++) {
        const codeX = (t * 0.03 + code * 250) % (width + 100)
        const codeY = (code * 120 + Math.sin(t * 0.005 + code) * 40) % height
        const codeAlpha = 0.2 + Math.sin(t * 0.002 + code) * 0.2
        
        ctx.fillStyle = `rgba(255, 255, 255, ${codeAlpha})`
        ctx.font = '12px monospace'
        ctx.fillText('</>', codeX, codeY)
      }

      // Circuit board patterns
      for (let circuit = 0; circuit < 3; circuit++) {
        const circuitX = (circuit * 300 + t * 0.02) % (width + 100)
        const circuitY = (circuit * 200 + Math.cos(t * 0.004 + circuit) * 50) % height
        const circuitAlpha = 0.3 + Math.sin(t * 0.003 + circuit) * 0.2
        
        // Draw circuit lines
        ctx.strokeStyle = `rgba(6, 182, 212, ${circuitAlpha})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(circuitX, circuitY)
        ctx.lineTo(circuitX + 30, circuitY)
        ctx.lineTo(circuitX + 30, circuitY + 20)
        ctx.lineTo(circuitX + 50, circuitY + 20)
        ctx.stroke()
        
        // Circuit nodes
        ctx.fillStyle = `rgba(14, 165, 233, ${circuitAlpha})`
        ctx.beginPath()
        ctx.arc(circuitX + 30, circuitY, 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(circuitX + 30, circuitY + 20, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      // NEW: Digital Snake Animation
      const snakeLength = 15
      const snakeHeadX = (t * 0.08) % (width + 50)
      const snakeHeadY = height / 2 + Math.sin(t * 0.005) * 100
      
      ctx.strokeStyle = `rgba(6, 182, 212, 0.8)`
      ctx.lineWidth = 3
      ctx.beginPath()
      
      for (let segment = 0; segment < snakeLength; segment++) {
        const segmentX = snakeHeadX - segment * 8
        const segmentY = snakeHeadY + Math.sin(t * 0.01 + segment * 0.5) * 5
        
        if (segment === 0) {
          ctx.moveTo(segmentX, segmentY)
        } else {
          ctx.lineTo(segmentX, segmentY)
        }
      }
      ctx.stroke()
      
      // Snake head
      ctx.fillStyle = `rgba(14, 165, 233, 0.9)`
      ctx.beginPath()
      ctx.arc(snakeHeadX, snakeHeadY, 4, 0, Math.PI * 2)
      ctx.fill()

      // Floating Digital Clouds
      for (let cloud = 0; cloud < 4; cloud++) {
        const cloudX = (cloud * 250 + t * 0.03) % (width + 100)
        const cloudY = (cloud * 120 + Math.sin(t * 0.004 + cloud) * 60) % height
        const cloudAlpha = 0.2 + Math.sin(t * 0.002 + cloud) * 0.15
        
        // Draw cloud shape with tech elements
        ctx.fillStyle = `rgba(14, 165, 233, ${cloudAlpha})`
        ctx.beginPath()
        
        // Main cloud body
        ctx.arc(cloudX, cloudY, 20, 0, Math.PI * 2)
        ctx.arc(cloudX + 15, cloudY, 15, 0, Math.PI * 2)
        ctx.arc(cloudX + 25, cloudY, 18, 0, Math.PI * 2)
        ctx.arc(cloudX + 35, cloudY, 12, 0, Math.PI * 2)
        ctx.arc(cloudX - 10, cloudY, 14, 0, Math.PI * 2)
        ctx.fill()
        
        // Add tech dots on cloud
        for (let dot = 0; dot < 3; dot++) {
          const dotX = cloudX + (dot - 1) * 12
          const dotY = cloudY + Math.sin(t * 0.01 + dot) * 3
          ctx.fillStyle = `rgba(6, 182, 212, ${cloudAlpha * 1.5})`
          ctx.beginPath()
          ctx.arc(dotX, dotY, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Floating Tech Icons
      const techIcons = ['⚡', '🔧', '💻', '🌐', '📡', '🔬']
      for (let icon = 0; icon < techIcons.length; icon++) {
        const iconX = (icon * 180 + t * 0.04) % (width + 50)
        const iconY = (icon * 140 + Math.cos(t * 0.006 + icon) * 80) % height
        const iconAlpha = 0.4 + Math.sin(t * 0.003 + icon) * 0.3
        
        ctx.fillStyle = `rgba(14, 165, 233, ${iconAlpha})`
        ctx.font = '20px Arial'
        ctx.fillText(techIcons[icon], iconX, iconY)
      }

      // Floating Matrix-style Rain
      for (let col = 0; col < 8; col++) {
        const colX = (col * 120 + t * 0.05) % width
        const colAlpha = 0.3 + Math.sin(t * 0.002 + col) * 0.2
        
        ctx.fillStyle = `rgba(6, 182, 212, ${colAlpha})`
        ctx.font = '14px monospace'
        
        for (let row = 0; row < 3; row++) {
          const rowY = (t * 0.1 + row * 40) % height
          const char = String.fromCharCode(65 + Math.floor(Math.random() * 26))
          ctx.fillText(char, colX, rowY)
        }
      }

      // Floating Geometric Shapes
      for (let shape = 0; shape < 6; shape++) {
        const shapeX = (shape * 160 + t * 0.02) % (width + 50)
        const shapeY = (shape * 110 + Math.sin(t * 0.005 + shape) * 70) % height
        const shapeAlpha = 0.25 + Math.sin(t * 0.003 + shape) * 0.2
        const shapeSize = 8 + Math.sin(t * 0.01 + shape) * 3
        
        ctx.fillStyle = `rgba(14, 165, 233, ${shapeAlpha})`
        ctx.beginPath()
        
        // Draw different shapes
        if (shape % 3 === 0) {
          // Triangle
          ctx.moveTo(shapeX, shapeY - shapeSize)
          ctx.lineTo(shapeX - shapeSize, shapeY + shapeSize)
          ctx.lineTo(shapeX + shapeSize, shapeY + shapeSize)
          ctx.closePath()
        } else if (shape % 3 === 1) {
          // Diamond
          ctx.moveTo(shapeX, shapeY - shapeSize)
          ctx.lineTo(shapeX + shapeSize, shapeY)
          ctx.lineTo(shapeX, shapeY + shapeSize)
          ctx.lineTo(shapeX - shapeSize, shapeY)
          ctx.closePath()
        } else {
          // Hexagon
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3
            const x = shapeX + Math.cos(angle) * shapeSize
            const y = shapeY + Math.sin(angle) * shapeSize
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
        }
        ctx.fill()
      }

      t += reduceMotion ? 0 : 16
      if (!reduceMotion) requestAnimationFrame(draw)
    }

    function onMouseMove(e) {
      mx = e.clientX - width / 2
      my = e.clientY - height / 2
    }

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMouseMove)
    resize()
    if (!reduceMotion) requestAnimationFrame(draw)
  }

  function initializeTilt() {
    const cards = document.querySelectorAll(".skill-card, .project-card")
    if (!cards.length) return

    cards.forEach((card) => {
      card.classList.add("tilt")
      // add shine layer
      const shine = document.createElement("div")
      shine.className = "tilt-shine"
      card.style.position = "relative"
      card.appendChild(shine)

      const bounds = () => card.getBoundingClientRect()

      function handleMove(e) {
        const b = bounds()
        const px = (e.clientX - b.left) / b.width
        const py = (e.clientY - b.top) / b.height
        const maxTilt = 10 // degrees
        const tiltX = (py - 0.5) * -2 * maxTilt
        const tiltY = (px - 0.5) * 2 * maxTilt

        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(0)`
        card.style.boxShadow = `0 20px 40px rgba(0,0,0,0.15)`
        shine.style.setProperty("--mx", `${px * 100}%`)
        shine.style.setProperty("--my", `${py * 100}%`)
      }

      function handleEnter() {
        card.classList.add("is-hover")
      }
      function handleLeave() {
        card.classList.remove("is-hover")
        card.style.transform = "translateZ(0)"
        card.style.boxShadow = ""
      }

      card.addEventListener("mousemove", handleMove)
      card.addEventListener("mouseenter", handleEnter)
      card.addEventListener("mouseleave", handleLeave)
    })
  }

  // Utility functions
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  function throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  // Performance optimized scroll handler
  const optimizedScrollHandler = throttle(() => {
    updateActiveNavLink()
  }, 100)

  window.addEventListener("scroll", optimizedScrollHandler)

  // Resize handler for responsive animations
  window.addEventListener(
    "resize",
    debounce(() => {
      // Recalculate animations on resize
      initializeScrollAnimations()
    }, 250),
  )

  // Preload images and assets
  function preloadAssets() {
    // Preload any images or assets here
    const assets = [
      // Add any image URLs here
    ]

    assets.forEach((asset) => {
      const img = new Image()
      img.src = asset
    })
  }

  // Initialize preloading
  preloadAssets()

  // Export functions for potential external use
  window.portfolioJS = {
    updateActiveNavLink,
    validateForm,
    animateCounter,
    showSuccess,
    showError,
  }
})()

// Service Worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Uncomment to register service worker
    // navigator.serviceWorker.register('/sw.js');
  })
}

// Add smooth reveal animation for page load
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Trigger initial animations
  setTimeout(() => {
    const heroElements = document.querySelectorAll(".hero-content > *")
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      }, index * 200)
    })
  }, 300)
})

// Handle reduced motion preference
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // Disable animations for users who prefer reduced motion
  document.documentElement.style.setProperty("--animation-duration", "0s")
  document.documentElement.style.setProperty("--transition-duration", "0s")
}

// Console easter egg
console.log(`🚀 Welcome to my AI/ML Portfolio!
📧 Contact: your.email@example.com
💼 LinkedIn: linkedin.com/in/yourprofile
🐙 GitHub: github.com/yourusername

Built with ❤️ using HTML, CSS, JavaScript & Bootstrap`)
