class CardList {
    constructor(container) {
        this.container = container;
    }
    addCard(domCard) {
        this.container.appendChild(domCard);
    }
    render(cards) {
        cards.forEach(function (item) {
            this.addCard(item)
        }, this);
    }
}
