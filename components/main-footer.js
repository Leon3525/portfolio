class MainFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="mt-24 pt-8 border-t border-gray-200 text-xs md:text-sm flex justify-between items-center">
        <p>&copy; 2026 Leon Hayes. All rights reserved.</p>
        <a
          href="#"
          class="border border-black px-3 py-1 font-medium hover:bg-black hover:text-white transition-all focus-ring-accent"
        >
          Back to Top &uarr;
        </a>
      </footer>
    `;
  }
}

customElements.define("main-footer", MainFooter);
