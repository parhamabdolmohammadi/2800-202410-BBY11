
const content = document.querySelector('.history-content')
const active_orders = document.querySelector('#active-orders')
const past_orders = document.querySelector('#past-orders')
const orders_btn = document.querySelectorAll('.orders-btn');
const active_orders_number = document.querySelector('#active-orders-number')
const past_orders_number = document.querySelector('#past-orders-number')
const nothing = document.querySelector('.nothing')
const activeOrders = []
const pastOrders = []

function setActive(element) {
    orders_btn.forEach(order_btn => {
        order_btn.classList.remove('highlighted');
    });
    element.classList.add('highlighted');
}

active_orders.addEventListener('click', () => {
    setActive(active_orders)
    generateCards(activeOrders, historyUrl)

})

past_orders.addEventListener('click', () => {
    setActive(past_orders)
    generateCards(pastOrders, historyUrl)
})

//{data.name.trim().replace(/\s+/g, '')}.png

function generateCards(orders, historyUrl) {
    content.innerHTML = ''
    if (orders.length == 0) {
        content.appendChild(nothing)
    }

    orders.forEach((each) => {
        console.log(each);
        const card = document.createElement('div')
        card.classList.add('card')

        // this image will be placed at the left side of the card
        let backUrl
        historyUrl.forEach(url => {
            if (each.service == url.name) {
                backUrl = url.background
            }
        })
        //  backUrl = each.service.trim().replace(/\s+/g, '') + '.png'
        const img = document.createElement('img')
        img.src = backUrl

        card.appendChild(img)

        // this is right side of card
        const detail = document.createElement('div')
        detail.classList.add('detail')

        fillDetail(each, detail)

        card.appendChild(detail)
        content.appendChild(card)
    })
}

function fillDetail(each, detail) {
    const serviceName = document.createElement('div')
    serviceName.textContent = each.service;
    serviceName.classList.add('serviceName')
    const arrow = document.createElement('div')
    arrow.innerHTML = '&#9660;'
    arrow.classList.add('arrow')

    arrow.addEventListener('click', () => {
        const card = arrow.parentNode.parentNode
        card.classList.toggle('expand');

        if (card.classList.contains('expand')) {
            arrow.innerHTML = '&#9650;'
            expand(each, detail)
        } else {
            arrow.innerHTML = '&#9660;'
            detail.querySelector('.expandInfo').remove()
        }
        setTimeout(() => {


        }, 300);
    });
    detail.appendChild(serviceName)
    detail.appendChild(arrow)

    const date = document.createElement('div')
    date.textContent = new Date(each.timestamp).toLocaleString('en-US', { timeZone: 'America/Vancouver' })
    date.classList.add('date')
    detail.appendChild(date)

    const total = document.createElement('div')
    total.textContent = '$' + each.total
    total.classList.add('total')
    detail.appendChild(total)

    // return detail

}
console.log(historyUrl);

document.addEventListener('DOMContentLoaded', () => {
    active_orders.click()
    sortHistory(history) // active orders and past orders are filled 
    // console.log(history);
    generateCards(activeOrders, historyUrl)

})

function sortHistory(history) {

    history.forEach(each => {
        // const currentDate = new Date()
        // const eachTimeStamp = new Date(each.timestamp)

        // // 1 hour is default duration of service. After storing duration of service in database, I can modify the logic accordingly 
        // let expiryHour = eachTimeStamp.getHours() + 1;
        // let expiryMinutes = eachTimeStamp.getMinutes();

        // if (expiryHour > currentDate.getHours()) {
        //     activeOrders.push(each);
        // } else if (expiryHour == currentDate.getHours() && expiryMinutes >= currentDate.getMinutes()) {
        //     activeOrders.push(each);
        // }
        // else {
        //     pastOrders.push(each);
        // }
        const currentDate = new Date();
        const eachTimeStamp = new Date(each.timestamp);

        // Set the expiry time to 1 hour after each.timestamp
        eachTimeStamp.setHours(eachTimeStamp.getHours() + 1);

        // Compare eachTimeStamp with currentDate
        if (eachTimeStamp.getTime() > currentDate.getTime()) {
            activeOrders.push(each);
        } else {
            pastOrders.push(each);
        }
    })
    fillNumber()

}

function fillNumber() {
    active_orders_number.textContent = activeOrders.length
    past_orders_number.textContent = pastOrders.length
}

function expand(each, detail) {
    const expandInfo = document.createElement('div')
    expandInfo.classList.add('expandInfo')

    const trackingId = document.createElement('div')
    const paymentType = document.createElement('div')
    const customerId = document.createElement('div')

    trackingId.textContent = 'Tracking ID: ' + each._id
    paymentType.textContent = 'Payment Type: ' + each.paymentType
    customerId.textContent = 'Customer ID: ' + each.customerId

    expandInfo.appendChild(trackingId)
    expandInfo.appendChild(paymentType)
    expandInfo.appendChild(customerId)

    detail.appendChild(expandInfo)

}