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

    fillDestinationCards()
    // Agregar eventos de clic a las tarjetas de destino
    const destinationCards = document.querySelectorAll('.card-dest');
    destinationCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            // Manejar el clic en la tarjeta
            handleCardClick(destinations[index]);
        });
    });

    fillExperienceCards()
    const packageCards = document.querySelectorAll('.card-pack');
    packageCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            // Manejar el clic en la tarjeta
            handlePackClick(packages[index]);
        });
    });
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

const fillExperienceCards = () => {
    const cardExp = document.querySelectorAll('.card-pack'); // Obtener todas las tarjetas

    packages.forEach((packag, index) => {
        const card = cardExp[index]; // Obtener la tarjeta correspondiente
        if (card) {
            // Rellenar la tarjeta con los datos del destino
            const cardTitle = card.querySelector('.card-title');
            const cardText = card.querySelector('.card-text');

            cardTitle.textContent = packag.name; // Establecer el título del destino
            cardText.textContent = packag.description; // Establecer la descripción del destino
        }
    });
}

const handleCardClick = (destination) => {
    // Obtener el modal y sus elementos
    const modal = document.querySelector('#exampleModal');
    const modalTitle = modal.querySelector('.modal-title');

    // Rellenar el contenido del modal con los datos del destino
    modalTitle.textContent = destination.name;
    const templateContent = document.getElementById('infoDestiny').innerHTML;

    // Inserta el contenido del template en el modal
    document.querySelector('.modal-body').innerHTML = templateContent;
    let image = '';
    if (destination.name === 'Jupiter') {
        image = 'Jupiter-E/2.webp';
    } else if (destination.name === 'Moon') {
        image = 'Luna-M/Parkour_Lunar.jpg'
    } else if (destination.name === 'Mars') {
        image = 'Marte-I/fotomonte2.jpg'
    } else if (destination.name === 'Mercury') {
        image = 'Mercurio-I/FOTOS/foto3.jpg'
    } else if (destination.name === 'Neptune') {
        image = 'Neptuno-M/OIG.jfif'
    } else if (destination.name === 'Saturn'){
        image = 'Saturno-E/image1.jpg'
    } else if (destination.name === 'Uranus') {
        image = 'Urano-M/diamantes.jfif'
    } else if (destination.name === 'Venus') {
        image = 'Venus-I/03.jpg'
    }
    document.getElementById('destiny-img').setAttribute('src', `./images/Destinations/${image}`)

    const list = destination.itinerary.split('; ');
    const ul = document.createElement('ul');
    list.forEach((element) => {
        const li = document.createElement('li');
        li.textContent = element; // Establecer el contenido del elemento de lista
        ul.appendChild(li); // Agregar el elemento de lista a la lista no ordenada
    });

    document.getElementById('itinerary-dest').appendChild(ul);
    document.querySelector('.experience-dest').textContent = destination.experience
    document.querySelector('.cautions-dest').textContent = destination.cautions
    document.querySelector('.limitants-dest').textContent = destination.limitants
    document.querySelector('.recommends-dest').textContent = destination.recommendations
    // Mostrar el modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
}

const handlePackClick = (pack) => {
    // Obtener el modal y sus elementos
    const modal = document.querySelector('#exampleModal2');
    const modalTitle = modal.querySelector('.modal-title');

    // Rellenar el contenido del modal con los datos del destino
    modalTitle.textContent = pack.name;
    const templateContent = document.getElementById('infoPack').innerHTML;

    // Inserta el contenido del template en el modal
    document.querySelector('.modal-body').innerHTML = templateContent;
    let image = '';
    if (pack.name === 'Friends') {
        image = 'Amigos/Amigos_Mercurio.jfif';
    } else if (pack.name === 'Lovers') {
        image = 'Enamorados/cena_Luna.jfif';
    } else if (pack.name === 'X-treme') {
        image = 'Extremo/p4.jpg'
    } else if (pack.name === 'Familiar') {
        image = 'Familiar/uranus.jfif'
    } else if (pack.name === 'Around the Solar System in 12 days') {
        image = 'SS/ooo.jfif'
    } 
    document.getElementById('pack-img').setAttribute('src', `./images/Packages/${image}`)

    const list = pack.itinerary.split('; ');
    const ul = document.createElement('ul');
    list.forEach((element) => {
        const li = document.createElement('li');
        li.textContent = element; // Establecer el contenido del elemento de lista
        ul.appendChild(li); // Agregar el elemento de lista a la lista no ordenada
    });

    document.getElementById('itinerary-pack').appendChild(ul);
    document.querySelector('.experience-pack').textContent = pack.experience
    document.querySelector('.cautions-pack').textContent = pack.cautions
    document.querySelector('.limitants-pack').textContent = pack.limitants
    document.querySelector('.recommends-pack').textContent = pack.recommendations
    // Mostrar el modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
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
    await insertUser()
    //window.location.reload()
})

btnRev.addEventListener('click', async() => {
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

