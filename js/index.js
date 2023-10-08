// packages.js
import { getUser, getPackages, getReviews, getDestinations, createUser, saveReview, deleteUser } from './connection.js'

const formInsert = document.querySelector('.formInsert') // Selects the form
const formRev = document.querySelector('.formRev') // Selects the form
const btnSend = document.querySelector('.btnSend')
const btnRev = document.querySelector('.btnRev')

let currentUser = {}
let revs = []
let packages = []
let destinations = []

document.addEventListener('DOMContentLoaded', async(e) => {
    // revs = await getReviews() -> esta linea se carga al dar click en un paquete, debe filtrarse por "package"
    // packages = await getPackages() -> esta linea se carga al dar click en "paquetes"
    // destinations = await getDestinations() //-> esta linea se carga al dar click en "destinos"
})

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

