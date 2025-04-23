import Form from "./form";
import CardMover from "./dnd"

document.querySelectorAll('.colon').forEach(element => new Form(element)
)
window.addEventListener('beforeunload', () => {
    const cardContainers = document.querySelectorAll('.card-container')
    const cardsData = []
    cardContainers.forEach(e => {
        let ar = []
        e.querySelectorAll('.card').forEach(el => {
            ar.push(el.textContent)
        })
        cardsData.push(ar)
    })
    localStorage.setItem('cardsData', JSON.stringify(cardsData))
})

document.addEventListener('DOMContentLoaded', () => {
    let json = localStorage.getItem('cardsData')
    let cardsData 
    try {
        cardsData = JSON.parse(json)
    }
    catch {
        console.log(Error);
    }
    if(cardsData) {
        const cardContainers = document.querySelectorAll('.card-container')
        let i = 0
        cardContainers.forEach(e => {
            cardsData[i].forEach(el => {
                const card = document.createElement('div')
                card.classList.add('card')
                card.textContent = el
                e.append(card)
                const cardMover = new CardMover(card)
                card.addEventListener('mouseenter', () => {
                const del = document.createElement('div')
                del.classList.add('del')
                card.append(del)
                del.addEventListener('click', (e) => {
                    e.stopPropagation()
                    card.remove()})
                    })
                card.addEventListener('mouseleave', () => {
                    card.querySelector('.del').remove()
                    })
                card.addEventListener('mousedown', cardMover.moveCard)
                    
            })
            i++
        })
    }
})