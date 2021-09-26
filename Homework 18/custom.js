class Tabs {
    #rootEl

    static ITEM_CLASS = 'tabs-item';
    static HEADER_CLASS = 'tabs-header';
    static CONTENT_CLASS = 'tabs-content';
    static CONTENT_REVEAL = 'content-reveal'
    static ON_TAB = 'on-tab'

    constructor(rootEl) {
        this.#rootEl = rootEl;
        this.bindStyles()
        this.bindEvents()
    }

    bindEvents() {
        this.#rootEl.addEventListener('click', this.onRootElClick.bind(this));
    }

    onRootElClick(e) {
        if (e.target.classList.contains(Tabs.HEADER_CLASS)) {
            const headerEl = e.target;
            const contentEl = this.findContent(headerEl)
            const openContent = this.findOpenContent();
            const openHeader = this.findOpenHeader();

            if (openContent && openContent !== contentEl) {
                this.closeContent(openContent)
                this.closeHeader(openHeader)
            }

            this.toggleContent(headerEl, contentEl)
        }
    }

    findOpenHeader() {
        return this.#rootEl.querySelector('.' + Tabs.ON_TAB)
    }

    findOpenContent() {
        return this.#rootEl.querySelector('.' + Tabs.CONTENT_REVEAL)
    }

    closeContent(el) {
        el.classList.remove(Tabs.CONTENT_REVEAL)
    }

    closeHeader(el) {
        el.classList.remove(Tabs.ON_TAB)
    }

    findContent(el) {
        const itemEl = el.closest('.' + Tabs.ITEM_CLASS);

        return itemEl.querySelector('.' + Tabs.CONTENT_CLASS);
    }

    toggleContent(el1, el2) {
        el1.classList.toggle(Tabs.ON_TAB);
        el2.classList.toggle(Tabs.CONTENT_REVEAL);
    }

    bindStyles() {
        const tabsItems = this.#rootEl.children;

        for (let element of tabsItems) {
            const [headerEl, contentEl] = element.children;

            element.classList.add(Tabs.ITEM_CLASS);
            headerEl.classList.add(Tabs.HEADER_CLASS);
            contentEl.classList.add(Tabs.CONTENT_CLASS);
        }
    }
}

const tabsEl = document.querySelector('#tabs');
new Tabs(tabsEl);
