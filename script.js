// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Animate language items when they come into view
const languageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const languageItems = entry.target.querySelectorAll(".language-item")
        languageItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "translateY(0)"
          }, index * 100)
        })
      }
    })
  },
  { threshold: 0.3 },
)

// Observe the languages section
const languagesSection = document.querySelector("#languages")
if (languagesSection) {
  languageObserver.observe(languagesSection)

  // Set initial state for language items
  const languageItems = languagesSection.querySelectorAll(".language-item")
  languageItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(20px)"
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  })
}

// Add active class to navigation items on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-menu a")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Add fade-in animation for project cards and cert cards
const cards = document.querySelectorAll(".project-item, .cert-item")
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  { threshold: 0.1 },
)

cards.forEach((card) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(20px)"
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  cardObserver.observe(card)
})

// Add GitHub avatar loading functionality
document.addEventListener("DOMContentLoaded", () => {
  const githubAvatar = document.getElementById("github-avatar")
  if (githubAvatar) {
    // Load the actual GitHub avatar
    const githubUsername = "pwnjester"
    githubAvatar.src = `https://github.com/${githubUsername}.png`

    // Fallback if GitHub image fails to load
    githubAvatar.onerror = function () {
      this.src = "/placeholder.svg?height=200&width=200"
    }
  }
})
