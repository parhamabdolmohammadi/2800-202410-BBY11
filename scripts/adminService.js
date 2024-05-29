const content_container = document.querySelector('.content-container');
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close-button');
const modalName = document.getElementById('modal-name');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');
let modalId;

document.addEventListener('DOMContentLoaded', () => {
    createCards(services)
})


function createCards(services) {

    services.forEach((service, index) => {
        const serviceCard = document.createElement('div')
        serviceCard.classList.add('serviceCard')

        const serviceName = document.createElement('div')
        serviceName.classList.add('serviceName')

        const serviceDes = document.createElement('div')
        serviceDes.classList.add('serviceDes')

        const servicePrice = document.createElement('div')
        servicePrice.classList.add('servicePrice')


        serviceName.textContent = service.name
        serviceDes.textContent = service.description
        servicePrice.textContent = service.price

        serviceCard.addEventListener('click', () => {
            // console.log('this is index' + index);
            openModal(service, index);
        })

        serviceCard.appendChild(serviceName)
        serviceCard.appendChild(serviceDes)
        serviceCard.appendChild(servicePrice)

        content_container.appendChild(serviceCard)
    })
}



let currentServiceIndex = null;

function openModal(service, index) {
    modal.style.display = 'block';
    modalName.textContent = document.querySelector('.serviceName').textContent  
    modalDescription.textContent = document.querySelector('.serviceDes').textContent  
    modalPrice.textContent = document.querySelector('.servicePrice').textContent  
    currentServiceIndex = index;
    modalId = service._id
    // console.log(modalId);
        // console.log(currentServiceIndex);
}

function closeModal() {
    modal.style.display = 'none';
}

closeButton.addEventListener('click', closeModal);
cancelButton.addEventListener('click', closeModal);

saveButton.addEventListener('click', () => {
    if (currentServiceIndex !== null) {
        const updatedService = {
            name: modalName.textContent,
            description: modalDescription.textContent,
            price: modalPrice.textContent
        };
        // console.log(currentServiceIndex);
        // services[currentServiceIndex] = updatedService;
        updateServiceCard(currentServiceIndex, updatedService);
        closeModal();

        fetch('/update', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ modalId, updatedService }),
        })
    }
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// instead of re-creating all the cards, change the portion
function updateServiceCard(index, updatedService) {

    const card = content_container.children[index];

    console.log(card);
    card.querySelector('.serviceName').textContent = updatedService.name;
    card.querySelector('.serviceDes').textContent = updatedService.description;
    card.querySelector('.servicePrice').textContent = updatedService.price;
}