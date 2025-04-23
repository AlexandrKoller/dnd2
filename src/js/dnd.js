export default class CardMover {
    constructor (card) {
        this.card = card
        this.cardContainer = card.closest('.card-container')
        this.ghostCard = this.card.cloneNode(true)
        this.ghostCard.classList.add('ghost', 'droppable')
        this.onMouseMove = this.onMouseMove.bind(this)
        this.moveCard = this.moveCard.bind(this)
        this.downCard = this.downCard.bind(this)
    }
    moveCard(event) {
        event.preventDefault()
        if (event.target != event.currentTarget) return
        this.card.style.cursor = 'grabbing'
        const nxtSibling = this.card.nextElementSibling
        const prElem = this.card.parentElement
        this.shiftX = event.clientX - this.card.getBoundingClientRect().left;
        this.shiftY = event.clientY - this.card.getBoundingClientRect().top;
        this.card.classList.add('dragble')
        document.body.append(this.card);
        if (nxtSibling) nxtSibling.before(this.ghostCard)
        if (!nxtSibling) prElem.append(this.ghostCard)
        this.card.style.left = event.pageX - this.shiftX + 'px';
        this.card.style.top = event.pageY - this.shiftY + 'px';  
        document.addEventListener('mousemove', this.onMouseMove)
        document.addEventListener('mouseup', this.downCard)
    }

    downCard (event) {
        document.removeEventListener('mousemove', this.onMouseMove)
        this.card.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        this.card.hidden = false;
        if (elemBelow.matches('.droppable')) {
            this.ghostCard.replaceWith(this.card)
            this.card.classList.remove('dragble')
            this.card.style.cursor = 'default'
        } else {
            if (elemBelow.classList.contains('colon')) {
                elemBelow.querySelector('.card-container').append(this.card)
                this.card.classList.remove('dragble')
                this.ghostCard.remove()
                this.card.style.cursor = 'default'
            } else {
                this.ghostCard.replaceWith(this.card)
                this.card.classList.remove('dragble')
                this.card.style.cursor = 'default'
                }
        }
        document.removeEventListener('mouseup', this.downCard)
    }

    onMouseMove(event) {
        this.card.style.left = event.pageX - this.shiftX + 'px';
        this.card.style.top = event.pageY - this.shiftY + 'px';   
        this.card.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        this.card.hidden = false;
        if (elemBelow.matches('.card')) {
        let card = elemBelow.closest('.card')
        let cardCenter = card.getBoundingClientRect().top + card.getBoundingClientRect().height / 2
        if (event.clientY > cardCenter) {
            card.after(this.ghostCard)
            } else card.before(this.ghostCard)
        }
        if (elemBelow.matches('.colon')) {
            elemBelow.querySelector('.card-container').append(this.ghostCard)
        } 
      }
}