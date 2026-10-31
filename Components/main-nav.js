class MainNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="border-b border-gray-100 pt-6 md:pt-8 pb-4 mb-10 md:mb-16 relative">
        <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center min-h-[40px]">
            <!-- Brand Logo / Name -->
            <a
              href="index.html"
              class="text-base md:text-lg font-bold tracking-normal text-black hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded transition-colors"
            >
              Leon Hayes
            </a>

            <!-- Desktop Navigation Links (Mono Styled) -->
            <nav
              class="hidden md:flex space-x-8 text-xs md:text-sm font-mono items-center"
              aria-label="Main Navigation"
            >
              <a href="ux.html" class="nav-link text-gray-600 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded transition-colors py-1">
                UX
              </a>
              <a href="lab.html" class="nav-link text-gray-600 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded transition-colors py-1">
                Lab
              </a>
              <a href="about.html" class="nav-link text-gray-600 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded transition-colors py-1">
                About
              </a>
            </nav>

            <!-- Accessible Mobile Menu Toggle Button -->
            <button
              id="component-menu-toggle"
              type="button"
              class="md:hidden p-2 text-black hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded transition-colors"
              aria-expanded="false"
              aria-controls="component-mobile-menu"
              aria-label="Toggle navigation menu"
            >
              <!-- Hamburger Icon -->
              <svg
                id="icon-open"
                class="w-6 h-6"
                style="display: block;"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="false"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!-- Close Icon -->
              <svg
                id="icon-close"
                class="w-6 h-6"
                style="display: none;"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Mobile Navigation Overlay Drawer -->
          <nav
            id="component-mobile-menu"
            class="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-md pt-4 pb-6 px-4 sm:px-6 flex-col space-y-4 text-sm font-mono z-50"
            style="display: none;"
            aria-label="Mobile Navigation"
          >
            <a href="ux.html" class="nav-link text-gray-600 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded transition-colors py-1">
              UX
            </a>
            <a href="lab.html" class="nav-link text-gray-600 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded transition-colors py-1">
              Lab
            </a>
            <a href="about.html" class="nav-link text-gray-600 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded transition-colors py-1">
              About
            </a>
          </nav>
        </div>
      </header>
    `;

    this.initActiveLinks();
    this.initInteractiveMenu();
  }

  initInteractiveMenu() {
    const btn = this.querySelector('#component-menu-toggle');
    const menu = this.querySelector('#component-mobile-menu');
    const openIcon = this.querySelector('#icon-open');
    const closeIcon = this.querySelector('#icon-close');

    if (!btn || !menu) return;

    const toggleMenu = (open) => {
      const shouldOpen = open !== undefined ? open : menu.style.display !== 'flex';

      menu.style.display = shouldOpen ? 'flex' : 'none';
      openIcon.style.display = shouldOpen ? 'none' : 'block';
      closeIcon.style.display = shouldOpen ? 'block' : 'none';

      openIcon.setAttribute('aria-hidden', String(shouldOpen));
      closeIcon.setAttribute('aria-hidden', String(!shouldOpen));
      btn.setAttribute('aria-expanded', String(shouldOpen));
    };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Keyboard Accessibility: Escape key closes menu
    this.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.style.display === 'flex') {
        toggleMenu(false);
        btn.focus();
      }
    });

    // Close menu when clicking anywhere outside
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target) && menu.style.display === 'flex') {
        toggleMenu(false);
      }
    });
  }

  initActiveLinks() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = this.querySelectorAll('.nav-link');

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (
        (currentPage === 'ux.html' && href === 'ux.html') ||
        (href === currentPage)
      ) {
        link.classList.remove('text-gray-600');
        link.classList.add('text-black', 'font-bold', 'underline', 'underline-offset-4');
        link.setAttribute('aria-current', 'page');
      }
    });
  }
}

customElements.define('main-nav', MainNav);
