// packages.js
import { getUser, getPackages, getReviews, getDestinations, createUser, saveReview, deleteUser } from './connection.js'

const formInsert = document.querySelector('.formInsert') // Selects the form
const formRev = document.querySelector('.formRev') // Selects the form
const btnSend = document.querySelector('.btnSend')
const btnRev = document.querySelector('.btnRev')
// const cardsDestiny = document.querySelector('#cardsDest').content

let currentUser = {}
let revs = []
let packages = []
let destinations = []

document.addEventListener('DOMContentLoaded', async(e) => {
    revs = await getReviews() 
    packages = await getPackages() 
    destinations = await getDestinations() 
    console.log(destinations)
    fillDestinationCards()
})

const fillDestinationCards = () => {
    const cardElements = document.querySelectorAll('.card-dest'); // Obtener todas las tarjetas

    destinations.forEach((destination, index) => {
        const card = cardElements[index]; // Obtener la tarjeta correspondiente
        if (card) {
            // Rellenar la tarjeta con los datos del destino
            const cardTitle = card.querySelector('.card-title');
            const cardText = card.querySelector('.card-text');

            cardTitle.textContent = destination.name; // Establecer el título del destino
            cardText.textContent = destination.description; // Establecer la descripción del destino
        }
    });
}


formInsert.addEventListener('input', () => {
    if (!formInsert.email.value || !formInsert.name.value || !formInsert.password.value || !formInsert.place.value || !formInsert.username.value ) {
        btnSend.disabled = true
    } else {
        btnSend.disabled = false
    }
})

formRev.addEventListener('input', () => {
    if (!formRev.pack.value || !formRev.review.value || !formRev.stars.value) {
        btnRev.disabled = true
    } else {
        btnRev.disabled = false
    }
})

btnSend.addEventListener('click', async() => {
    console.log("ButtonSend clicked");
    await insertUser()
    //window.location.reload()
})

btnRev.addEventListener('click', async() => {
    console.log("ButtonRev clicked");
    await insertReview()
    //window.location.reload()
})

// const printDetailsDestiny = () => {
    // destinations.forEach(destination => {
    //     if (destination.name === 'Jupiter') {
    //         cardsDestiny.querySelector('.jupiter').textContent = destination.description
    //     } else if (destination.name === 'Moon') {
    //         cardsDestiny.querySelector('.moon').textContent = destination.description
    //     } else if (destination.name === 'Mars') {
    //         cardsDestiny.querySelector('.mars').textContent = destination.description
    //     } else if (destination.name === 'Mercury') {
    //         cardsDestiny.querySelector('.mercury').textContent = destination.description
    //     } else if (destination.name === 'Neptune') {
    //         cardsDestiny.querySelector('.neptune').textContent = destination.description
    //     } else if (destination.name === 'Saturn'){
    //         cardsDestiny.querySelector('.saturn').textContent = destination.description
    //     } else if (destination.name === 'Uranus') {
    //         cardsDestiny.querySelector('.uranus').textContent = destination.description
    //     } else if (destination.name === 'Venus') {
    //         cardsDestiny.querySelector('.venus').textContent = destination.description
    //     }
    // })    
//}

// printDetailsDestiny()

const insertUser = async () => {
        const newUser = {
            email: formInsert.email.value,
            name: formInsert.name.value,
            password: formInsert.password.value,
            place: formInsert.place.value,
            randnum: Math.floor(Math.random() * 4),
            user: formInsert.username.value
        }
        
        await createUser(newUser)
        currentUser = await getUser(newUser)
        formInsert.reset()
        btnSend.disabled = true
        return
}

const login = async () => {
    const user = {
        email: formLogin.email.value, // Definir form login
        password: formLogin.password.value // definir form login
    }
    
    currentUser = await getUser(user)
}

const insertReview = async () => {
    const review = {
        email: currentUser.email,
        package: formRev.pack.value,
        review: formRev.review.value,
        stars: formRev.stars.value
    }
    
    await saveReview(review)
    formRev.reset()
    return
}

