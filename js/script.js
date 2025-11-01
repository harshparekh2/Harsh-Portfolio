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
  const certificateCards = document.querySelectorAll(".certificate-card")
  const timelineItems = document.querySelectorAll(".timeline-item")
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

  // Also run when page fully loads
  window.addEventListener("load", () => {
    // Re-initialize skill bars if needed
    if (progressBars.length > 0) {
      progressBars.forEach((bar) => {
        bar.style.width = "0%"
      })
    }
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
          } else if (entry.target.classList.contains("certificate-card")) {
            animateCertificateCard(entry.target)
          } else if (entry.target.classList.contains("timeline-item")) {
            animateTimelineItem(entry.target)
          } else if (entry.target.querySelector(".stat-number")) {
            animateCounter(entry.target.querySelector(".stat-number"))
          }
        }
      })
    }, observerOptions)

    // Observe elements for animation
    document.querySelectorAll(".skill-card, .project-card, .certificate-card, .timeline-item, .about-content, .contact-form, .stat-item").forEach((el) => {
      el.classList.add("animate-on-scroll")
      observer.observe(el)
    })
  }

  // Initialize skill progress bars
  function initializeSkillBars() {
    // Reset all bars to 0 first
    progressBars.forEach((bar) => {
      bar.style.width = "0%"
    })

    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBar = entry.target
            const width = progressBar.getAttribute("data-width")

            // Add animating class
            progressBar.classList.add("animating")
            
            // Force reflow to ensure reset is applied
            void progressBar.offsetWidth
            
            // Animate to target width
            setTimeout(() => {
              progressBar.style.transition = "width 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              progressBar.style.width = width + "%"
            }, 100)

            skillObserver.unobserve(progressBar)
          }
        })
      },
      { threshold: 0.2, rootMargin: "0px" },
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

  // Animate certificate cards
  function animateCertificateCard(card) {
    const delay = Array.from(certificateCards).indexOf(card) * 100
    setTimeout(() => {
      card.style.transform = "translateY(0)"
      card.style.opacity = "1"
    }, delay)
  }

  // Animate timeline items
  function animateTimelineItem(item) {
    const delay = Array.from(timelineItems).indexOf(item) * 150
    setTimeout(() => {
      item.style.transform = "translateY(0)"
      item.style.opacity = "1"
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
      // Send real data to Formspark
      await fetch("https://submit-form.com/OQZty5swh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.querySelector('[name="name"]').value,
          email: contactForm.querySelector('[name="email"]').value,
          subject: contactForm.querySelector('[name="subject"]').value,
          message: contactForm.querySelector('[name="message"]').value,
        }),
      })
    
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

    const texts = ["Hi, I'm an AI/ML Engineer", "Hi, I'm a Data Scientist", "Hi, I'm a Tech Enthusiast"]

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

    // Generate a sphere of points
    const POINTS = []
    const COUNT_LAT = 26
    const COUNT_LON = 48

    function buildPoints() {
      POINTS.length = 0
      const radius = Math.min(width, height) * 0.32
      for (let i = 0; i <= COUNT_LAT; i++) {
        const theta = (i * Math.PI) / COUNT_LAT // 0..PI
        for (let j = 0; j < COUNT_LON; j++) {
          const phi = (j * 2 * Math.PI) / COUNT_LON // 0..2PI
          const x = radius * Math.sin(theta) * Math.cos(phi)
          const y = radius * Math.cos(theta)
          const z = radius * Math.sin(theta) * Math.sin(phi)
          POINTS.push({ x, y, z })
        }
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = hero.clientWidth
      height = hero.clientHeight
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

      const baseRotY = t * 0.0015 + mx * 0.0008
      const baseRotX = t * 0.001 + my * 0.001

      // Draw faint starfield
      ctx.save()
      ctx.globalAlpha = 0.25
      for (let s = 0; s < 60; s++) {
        const x = (s * 73 + t * 0.03) % width
        const y = (s * 131 + t * 0.05) % height
        ctx.fillStyle = "rgba(255,255,255,0.12)"
        ctx.fillRect(x, y, 2, 2)
      }
      ctx.restore()

      // Render sphere points and subtle connecting arcs
      for (let i = 0; i < POINTS.length; i++) {
        const p = project(POINTS[i], baseRotX, baseRotY)
        const alpha = Math.max(0, Math.min(0.85, (p.scale - 0.7) * 1.2))
        ctx.fillStyle = `rgba(14,165,233, ${alpha})` // cyan-500 dots
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(1, 2 * p.scale), 0, Math.PI * 2)
        ctx.fill()

        // draw short trailing line for depth
        if (i % 13 === 0) {
          ctx.strokeStyle = `rgba(37,99,235, ${alpha * 0.5})` // blue-600
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x - 6 * p.scale, p.y - 4 * p.scale)
          ctx.stroke()
        }
      }

      t += reduceMotion ? 0 : 16
      if (!reduceMotion) requestAnimationFrame(draw)
    }

    function onMouseMove(e) {
      const rect = hero.getBoundingClientRect()
      mx = e.clientX - rect.left - rect.width / 2
      my = e.clientY - rect.top - rect.height / 2
    }

    window.addEventListener("resize", resize)
    hero.addEventListener("mousemove", onMouseMove)
    resize()
    if (!reduceMotion) requestAnimationFrame(draw)
  }

  function initializeTilt() {
    const cards = document.querySelectorAll(".skill-card, .project-card, .certificate-card")
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
