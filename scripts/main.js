/**
 * Main Application Script
 * Handles product loading, filtering, search, countdown, and dark mode
 */

// ===================================
// Global State
// ===================================
let products = [];
let filteredProducts = [];
let currentCategory = 'all';
let searchQuery = '';

// ===================================
// DOM Elements
// ===================================
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const filtersContainer = document.getElementById('filters');
const noResults = document.getElementById('noResults');
const themeToggle = document.getElementById('themeToggle');
const siteTitle = document.getElementById('siteTitle');
const siteSubtitle = document.getElementById('siteSubtitle');
const footerMessage = document.getElementById('footerMessage');
const socialLinks = document.getElementById('socialLinks');

// Countdown elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');

// ===================================
// Initialize Application
// ===================================
async function init() {
    try {
        // Load configuration
        const config = await loadConfig();

        // Set site content
        setSiteContent(config);

        // Store products
        products = config.products;
        filteredProducts = products;

        // Build filters
        buildFilters();

        // Render products
        renderProducts();

        // Start countdown
        updateCountdown();
        setInterval(updateCountdown, 1000);

        // Initialize theme
        initTheme();

        // Setup event listeners
        setupEventListeners();

    } catch (error) {
        console.error('Error initializing application:', error);
        showError();
    }
}

// ===================================
// Configuration Loading
// ===================================
async function loadConfig() {
    const response = await fetch('config.json');
    if (!response.ok) {
        throw new Error('Failed to load configuration');
    }
    return await response.json();
}

function setSiteContent(config) {
    if (config.siteTitle) {
        siteTitle.textContent = config.siteTitle;
    }

    if (config.siteSubtitle) {
        siteSubtitle.textContent = config.siteSubtitle;
    }

    if (config.footerMessage) {
        footerMessage.textContent = config.footerMessage;
    }

    // Add social links if configured
    if (config.socialLinks) {
        addSocialLinks(config.socialLinks);
    }
}

function addSocialLinks(links) {
    const socialHTML = [];

    if (links.instagram) {
        socialHTML.push(`
            <a href="${links.instagram}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
            </a>
        `);
    }

    if (links.facebook) {
        socialHTML.push(`
            <a href="${links.facebook}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
            </a>
        `);
    }

    if (links.twitter) {
        socialHTML.push(`
            <a href="${links.twitter}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
            </a>
        `);
    }

    if (socialHTML.length > 0) {
        socialLinks.innerHTML = socialHTML.join('');
    }
}

// ===================================
// Filters
// ===================================
function buildFilters() {
    // Add event listener to "Tous" button
    const allButton = filtersContainer.querySelector('[data-category="all"]');
    if (allButton) {
        allButton.addEventListener('click', () => filterByCategory('all'));
    }

    // Get unique categories
    const categories = [...new Set(products.map(p => p.category))];

    // Add category filter buttons
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.dataset.category = category.toLowerCase();
        button.textContent = category;
        button.addEventListener('click', () => filterByCategory(category.toLowerCase()));
        filtersContainer.appendChild(button);
    });
}

function filterByCategory(category) {
    currentCategory = category;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });

    applyFilters();
}

// ===================================
// Search
// ===================================
function handleSearch(query) {
    searchQuery = query.toLowerCase().trim();
    applyFilters();
}

// ===================================
// Apply Filters & Search
// ===================================
function applyFilters() {
    filteredProducts = products.filter(product => {
        // Category filter
        const matchesCategory = currentCategory === 'all' ||
                               product.category.toLowerCase() === currentCategory;

        // Search filter
        const matchesSearch = searchQuery === '' ||
                             product.name.toLowerCase().includes(searchQuery) ||
                             product.description.toLowerCase().includes(searchQuery) ||
                             product.category.toLowerCase().includes(searchQuery);

        return matchesCategory && matchesSearch;
    });

    renderProducts();
}

// ===================================
// Render Products
// ===================================
function renderProducts() {
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    productsGrid.innerHTML = filteredProducts.map(product => {
        const priorityClass = product.priority ? product.priority.toLowerCase().replace(/\s+/g, '-') : '';
        return `
        <article class="product-card">
            ${product.priority ? `<span class="priority-badge ${priorityClass}">${product.priority}</span>` : ''}
            <div class="product-image">
                ${product.image
                    ? `<img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'product-image-placeholder\\'>${getCategoryEmoji(product.category)}</div>'">`
                    : `<div class="product-image-placeholder">${getCategoryEmoji(product.category)}</div>`
                }
            </div>
            <div class="product-content">
                <div class="product-category">${product.category}</div>
                <h2 class="product-name">${product.name}</h2>
                ${product.description ? `<p class="product-description">${product.description}</p>` : ''}
                <div class="product-footer">
                    <span class="product-price">${product.price}</span>
                    <a href="${product.url}" class="product-link" target="_blank" rel="noopener noreferrer">
                        Voir
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    `}).join('');

    // Trigger animation for new cards
    animateCards();
}

function getCategoryEmoji(category) {
    const emojis = {
        'Mode': '👔',
        'Parfum': '🎁',
        'Déco': '🏠',
        'Culture': '📚',
        'Tech': '💻',
        'Sport': '⚽',
        'Cuisine': '🍳'
    };
    return emojis[category] || '🎁';
}

function animateCards() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = '';
        }, 10);
    });
}

// ===================================
// Countdown to Christmas
// ===================================
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let christmas = new Date(currentYear, 11, 25); // December 25

    // If Christmas has passed this year, count to next year
    if (now > christmas) {
        christmas = new Date(currentYear + 1, 11, 25);
    }

    const difference = christmas - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    daysElement.textContent = days;
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
}

// ===================================
// Dark Mode
// ===================================
function initTheme() {
    // Dark mode only
    document.documentElement.setAttribute('data-theme', 'dark');
}

function toggleTheme() {
    // Disabled - dark mode only
}

// ===================================
// Event Listeners
// ===================================
function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Clear search with Escape
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.value = '';
            handleSearch('');
        }
    });
}

// ===================================
// Error Handling
// ===================================
function showError() {
    productsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
            <p style="font-size: 1.25rem; color: var(--color-text-secondary);">
                Une erreur s'est produite lors du chargement des produits.
            </p>
            <button onclick="location.reload()" style="
                margin-top: 1rem;
                padding: 0.75rem 1.5rem;
                background: var(--color-primary);
                color: white;
                border-radius: var(--radius-lg);
                font-weight: 500;
            ">
                Réessayer
            </button>
        </div>
    `;
}

// ===================================
// Intersection Observer for Lazy Loading
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    // Observe will be applied when images are rendered
}

// ===================================
// Initialize on DOM Load
// ===================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
