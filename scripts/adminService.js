const content_container = document.querySelector('.content-container');
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close-button');

const modalName = document.getElementById('modal-name');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');

const createService = document.querySelector('.create-service')
const deleteService = document.querySelector('.delete-service')

const createContainer = document.querySelector('.create-container')
const cancelButtonForCreate = document.getElementById('cancel-button-create')
const createButton = document.getElementById('create-button')

const createdPopUp = document.querySelector('#created')
const deleteButton = document.querySelector('.delete-service')
const invalid = document.querySelector('#invalid')

const deletedPopUp = document.querySelector('#deleted')
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
    modalName.textContent = document.querySelectorAll('.serviceName')[index].textContent
    modalDescription.textContent = document.querySelectorAll('.serviceDes')[index].textContent
    modalPrice.textContent = document.querySelectorAll('.servicePrice')[index].textContent
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

createService.addEventListener('mouseenter', function () {
    this.textContent = 'Create';
    this.classList.add('expand')
});

createService.addEventListener('mouseleave', function () {
    this.textContent = '+';
    this.classList.remove('expand')
});

deleteService.addEventListener('mouseenter', function () {
    this.textContent = 'Delete';
    this.classList.add('expand')
});

deleteService.addEventListener('mouseleave', function () {
    this.textContent = '-';
    this.classList.remove('expand')
});


function openCreateForm() {
    createContainer.style.display = 'block'
}

function closeCreateForm() {
    createContainer.style.display = 'none'
}

createService.addEventListener('click', () => {
    openCreateForm()
})

cancelButtonForCreate.addEventListener('click', () => {
    closeCreateForm()
})

createButton.addEventListener('click', () => {
    closeCreateForm()
    const name = document.getElementById('name').value
    const description = document.getElementById('description').value
    const price = document.getElementById('price').value
    const imageFile = document.getElementById('image')

    const image = imageFile.files[0]

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image); // Append the file object itself

    fetch('/create', {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (response.status === 400) {
                invalid.style.display = 'block';
                setTimeout(() => {
                    invalid.style.display = 'none';
                }, 1500);
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            } else if (response.status === 200) {
                return response.json();
            } else {

                throw new Error('Unexpected response from server');
            }
        })
        .then(data => {
            // console.log(data.message);
            if (data.message === 'Entry created successfully.') {
                // Handle success
                closeCreateForm();
                createdPopUp.style.display = 'block';
                setTimeout(() => {
                    createdPopUp.style.display = 'none';
                }, 1500);
                setTimeout(() => {
                    location.reload()
                }, 1000);

            } else {
                // Handle other messages
                // Example: display an error message to the user
                console.error('Unexpected message from server:', data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle network errors or other unexpected errors
        });


})

deleteButton.addEventListener('click', () => {
    closeCreateForm()
})

let deleteButtonClicked = false;

deleteService.addEventListener('click', () => {
    if (!deleteButtonClicked) {
        const cards = document.querySelectorAll('.serviceCard');
        cards.forEach((card) => {
            const deleteButtonForEntry = document.createElement('div');
            deleteButtonForEntry.classList.add('deleteButtonForEntry')
            deleteButtonForEntry.textContent = 'Delete'
            deleteButtonForEntry.addEventListener('click', () => {
                // console.log('clicked');
                const previousCard = deleteButtonForEntry.previousElementSibling;
                // console.log(previousCard);
                // console.log(previousCard.querySelector('.serviceName').textContent);
                const cardName = previousCard.querySelector('.serviceName').textContent
                fetch('/delete', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ cardName }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.message);
                        deletedPopUp.style.display = 'block';
                        setTimeout(() => {
                            deletedPopUp.style.display = 'none';
                        }, 1500);
                        setTimeout(() => {
                            location.reload()
                        }, 1000);
                    })
            })
            card.insertAdjacentElement('afterend', deleteButtonForEntry);
            deleteButtonClicked = true;
        });
    } else {
        document.querySelectorAll('.deleteButtonForEntry').forEach(button => {
            button.remove()
        })
        deleteButtonClicked = false;
    }

})