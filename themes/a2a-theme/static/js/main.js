// Agent Directory - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeMobileMenu();
    initializeNavigation();
    initializeSearch();
    initializeCopyButtons();
    initializeLazyLoading();
    initializeTooltips();
    initializeAnimations();
    initializeTheme();
    initializeDocsCopyButtons();
    initializeTabs();
    initializeLanguageTabs();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('show');
            
            if (isOpen) {
                mobileMenu.classList.remove('show');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
            } else {
                mobileMenu.classList.add('show');
                mobileMenuBtn.querySelector('i').className = 'fas fa-times';
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('show');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        });
    }
}

// Navigation scroll effects
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class when scrolled down
        if (currentScrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttle scroll events for performance
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
            setTimeout(() => { ticking = false; }, 10);
        }
    }
    
    window.addEventListener('scroll', onScroll);
    updateNavbar(); // Initial call
}

// Initialize animations and intersection observer
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate in
    document.querySelectorAll('.agent-card, .stat, .section-title').forEach(el => {
        observer.observe(el);
    });
}

// Theme functionality (for future dark mode support)
function initializeTheme() {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = savedTheme || systemTheme;
    
    // Apply theme
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
        }
    });
}

// Tooltip functionality
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        let tooltip;
        
        element.addEventListener('mouseenter', function() {
            tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            tooltip.style.cssText = `
                position: absolute;
                z-index: 1000;
                background: var(--gray-900);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                white-space: nowrap;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.2s;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            `;
            
            document.body.appendChild(tooltip);
            
            // Position tooltip
            const rect = this.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
            let top = rect.top - tooltipRect.height - 8;
            
            // Adjust if tooltip would go off screen
            if (left < 8) left = 8;
            if (left + tooltipRect.width > window.innerWidth - 8) {
                left = window.innerWidth - tooltipRect.width - 8;
            }
            if (top < 8) {
                top = rect.bottom + 8;
            }
            
            tooltip.style.left = left + 'px';
            tooltip.style.top = top + 'px';
            
            // Fade in
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
        });
        
        element.addEventListener('mouseleave', function() {
            if (tooltip) {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    if (tooltip && tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 200);
            }
        });
    });
}

// Copy functionality
function initializeCopyButtons() {
    document.querySelectorAll('.copy-code-btn').forEach(button => {
        button.addEventListener('click', async function() {
            const codeBlock = this.closest('.code-block')?.querySelector('code') || 
                             this.parentElement.nextElementSibling?.querySelector('code');
            
            if (!codeBlock) return;
            
            try {
                await navigator.clipboard.writeText(codeBlock.textContent);
                
                // Visual feedback
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                this.classList.add('bg-green-500', 'text-white');
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.classList.remove('bg-green-500', 'text-white');
                }, 2000);
                
            } catch (err) {
                console.error('Failed to copy text: ', err);
                
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = codeBlock.textContent;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                // Visual feedback
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                }, 2000);
            }
        });
    });
}

// Add copy functionality to documentation code blocks
function initializeDocsCopyButtons() {
    document.querySelectorAll('.docs-content .highlight').forEach(codeBlock => {
        // Add click handler to the ::after pseudo-element
        codeBlock.addEventListener('click', async function(e) {
            // Check if click is in the top-right area where the copy button is
            const rect = this.getBoundingClientRect();
            const isInCopyArea = e.clientX > rect.right - 80 && e.clientY < rect.top + 40;
            
            if (isInCopyArea) {
                const code = this.querySelector('code');
                if (code) {
                    try {
                        await navigator.clipboard.writeText(code.textContent);
                        
                        // Visual feedback
                        this.style.setProperty('--copy-text', '"Copied!"');
                        setTimeout(() => {
                            this.style.removeProperty('--copy-text');
                        }, 2000);
                        
                        // Show toast if available
                        if (typeof showToast === 'function') {
                            showToast('Code copied to clipboard!', 'success');
                        }
                        
                    } catch (err) {
                        console.error('Failed to copy code:', err);
                    }
                }
            }
        });
        
        // Add cursor pointer style when hovering over copy area
        codeBlock.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const isInCopyArea = e.clientX > rect.right - 80 && e.clientY < rect.top + 40;
            
            if (isInCopyArea) {
                this.style.cursor = 'pointer';
            } else {
                this.style.cursor = 'default';
            }
        });
    });
}

// Search functionality for agents page
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const capabilitiesFilter = document.getElementById('capabilities-filter');
    const sortSelect = document.getElementById('sort-select');
    const agentsGrid = document.getElementById('agents-grid');
    const noResults = document.getElementById('no-results');
    const agentCount = document.getElementById('agent-count');
    
    if (!searchInput || !agentsGrid) return;
    
    let debounceTimer;
    
    function debounce(func, delay) {
        return function(...args) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    function filterAndSortAgents() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const categoryValue = categoryFilter?.value || '';
        const capabilityValue = capabilitiesFilter?.value || '';
        const sortValue = sortSelect?.value || 'name';
        
        const allCards = Array.from(agentsGrid.querySelectorAll('.agent-card'));
        let visibleCards = [];
        
        // Filter cards
        allCards.forEach(card => {
            const name = card.dataset.name || '';
            const tags = card.dataset.tags || '';
            const capabilities = card.dataset.capabilities || '';
            const description = card.querySelector('.agent-description')?.textContent.toLowerCase() || '';
            
            let matches = true;
            
            // Search term filter
            if (searchTerm) {
                matches = matches && (
                    name.includes(searchTerm) ||
                    tags.includes(searchTerm) ||
                    description.includes(searchTerm)
                );
            }
            
            // Category filter
            if (categoryValue) {
                matches = matches && tags.includes(categoryValue);
            }
            
            // Capability filter
            if (capabilityValue) {
                matches = matches && capabilities.includes(capabilityValue);
            }
            
            if (matches) {
                card.style.display = '';
                visibleCards.push(card);
            } else {
                card.style.display = 'none';
            }
        });
        
        // Sort visible cards
        visibleCards.sort((a, b) => {
            switch (sortValue) {
                case 'name':
                    return (a.dataset.name || '').localeCompare(b.dataset.name || '');
                case 'version':
                    return (b.dataset.version || '').localeCompare(a.dataset.version || '');
                case 'skills':
                    return parseInt(b.dataset.skills || '0') - parseInt(a.dataset.skills || '0');
                default:
                    return 0;
            }
        });
        
        // Reorder DOM elements
        visibleCards.forEach(card => agentsGrid.appendChild(card));
        
        // Update count and show/hide no results
        if (agentCount) {
            agentCount.textContent = visibleCards.length;
        }
        
        if (noResults) {
            if (visibleCards.length === 0) {
                noResults.classList.remove('hidden');
            } else {
                noResults.classList.add('hidden');
            }
        }
        
        // Add stagger animation to visible cards
        visibleCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 50}ms`;
            card.classList.add('animate-fade-in');
        });
    }
    
    // Event listeners with debouncing
    const debouncedFilter = debounce(filterAndSortAgents, 300);
    
    searchInput.addEventListener('input', debouncedFilter);
    categoryFilter?.addEventListener('change', filterAndSortAgents);
    capabilitiesFilter?.addEventListener('change', filterAndSortAgents);
    sortSelect?.addEventListener('change', filterAndSortAgents);
    
    // Keyboard navigation for search
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchInput.blur();
            filterAndSortAgents();
        }
    });
}

// Lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Tab functionality for agent detail pages
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
            
            // Track tab change
            if (typeof trackEvent === 'function') {
                trackEvent('Agent Detail', 'Tab Change', targetTab);
            }
        });
    });
}

// Language tab functionality for integration examples
function initializeLanguageTabs() {
    const langTabs = document.querySelectorAll('.lang-tab');
    const codeExamples = document.querySelectorAll('.code-example');
    
    if (langTabs.length === 0) return;
    
    langTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetLang = this.dataset.lang;
            
            // Remove active class from all language tabs and examples
            langTabs.forEach(t => t.classList.remove('active'));
            codeExamples.forEach(example => example.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding example
            this.classList.add('active');
            const targetExample = document.getElementById(targetLang);
            if (targetExample) {
                targetExample.classList.add('active');
            }
            
            // Track language change
            if (typeof trackEvent === 'function') {
                trackEvent('Agent Detail', 'Language Change', targetLang);
            }
        });
    });
}

// Copy code functionality for agent detail pages
function copyCode(button) {
    const codeBlock = button.parentElement.querySelector('code');
    if (!codeBlock) return;
    
    copyToClipboard(codeBlock.textContent).then(() => {
        // Visual feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('copied');
        }, 2000);
        
        showToast('Code copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy code', 'error');
    });
}

// Download agent configuration
function downloadConfig(agentSlug) {
    // This would typically fetch the agent data and create a download
    const link = document.createElement('a');
    link.href = `/agents/${agentSlug}.json`;
    link.download = `${agentSlug}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    trackEvent('Agent Detail', 'Download Config', agentSlug);
}

// Copy agent configuration to clipboard
function copyConfig(agentSlug) {
    fetch(`/agents/${agentSlug}.json`)
        .then(response => response.text())
        .then(text => {
            return copyToClipboard(text);
        })
        .then(() => {
            showToast('Configuration copied to clipboard!', 'success');
            trackEvent('Agent Detail', 'Copy Config', agentSlug);
        })
        .catch(() => {
            showToast('Failed to copy configuration', 'error');
        });
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Toast notification system
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} fixed top-4 right-4 bg-white border rounded-lg p-4 shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    
    const icon = getToastIcon(type);
    toast.innerHTML = `
        <div class="flex items-center">
            <div class="mr-3">${icon}</div>
            <div class="text-sm font-medium text-gray-900">${message}</div>
            <button class="ml-4 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    }, duration);
}

function getToastIcon(type) {
    const icons = {
        success: '<i class="fas fa-check-circle text-green-500"></i>',
        error: '<i class="fas fa-exclamation-circle text-red-500"></i>',
        warning: '<i class="fas fa-exclamation-triangle text-yellow-500"></i>',
        info: '<i class="fas fa-info-circle text-blue-500"></i>'
    };
    return icons[type] || icons.info;
}

// Analytics tracking (placeholder)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    console.log(`Analytics: ${category} - ${action} - ${label}`);
}

// Export functions for global access
window.A2A = {
    showToast,
    trackEvent,
    copyToClipboard,
    performSearch
};

// Copy agent URL functionality
function copyAgentUrl(url) {
    copyToClipboard(url).then(() => {
        showToast('Agent URL copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy URL', 'error');
    });
}

// Make copyAgentUrl globally available
window.copyAgentUrl = copyAgentUrl;

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
function initializePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                
                if (loadTime > 3000) {
                    console.warn('Page load time is slow:', loadTime + 'ms');
                }
            }, 0);
        });
    }
}

// Initialize performance monitoring
initializePerformance();

// Copy to clipboard utility function
function copyToClipboard(text) {
    return navigator.clipboard.writeText(text).then(() => {
        // Show a temporary tooltip or feedback
        const tooltip = document.createElement('div');
        tooltip.className = 'clipboard-tooltip';
        tooltip.innerText = 'Copied!';
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.classList.add('fade-out');
        }, 100);
        
        setTimeout(() => {
            document.body.removeChild(tooltip);
        }, 600);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
