class Tabs {
    #rootEl

    constructor(rootEl) {
        this.#rootEl = rootEl;

        const tabsItems = this.#rootEl.children;

        for (let element of tabsItems) {
            element.classList.add('tabs-item');

            element.children[0].classList.add('tabs-header');
            element.children[1].classList.add('tabs-content');
        }
    }
}

const tabsEl = document.querySelector('#tabs');
new Tabs(tabsEl);
