const form = document.querySelector('#NewContactForm');
const inputs = document.querySelectorAll('.form-input');
const infoTemplate = document.querySelector('#contactTemplate').innerHTML;
const list = document.querySelector('#contactsList')
const intValidation = /^[0-9]+$/
const strValidation = /^[а-яА-Яa-zA-Z\s]+$/
const contactRow = '.contact-row'
const deleteButton = 'delete-btn'
const doneButton = 'done-btn'

form.addEventListener('submit', submitForm);
form.addEventListener('click', onContactListClick)

function submitForm(e) {
    e.preventDefault();

    const inputsInfo = getContact();

    if (!isValidContact(inputsInfo)) {
        alert('Form is invalid');
        return false;
    }

    addContact(inputsInfo);
    clearForm();
}

function onContactListClick(e) {
    if (e.target.classList.contains(deleteButton)) {
        const el = e.target.closest(contactRow);

        removeContact(el)
    }
    if (e.target.classList.contains(doneButton)) {
        const el = e.target.closest(contactRow);
        if (el.style.background !== 'green') {
            el.style.background = 'green'
        } else {
            el.style.background = 'initial'
        }
    }
}

function removeContact(el) {
    el.remove()
}

function getContact() {
    const inputsInfo = {}

    for (let input of inputs) {
        inputsInfo[input.name] = input.value;
    }

    return inputsInfo
}

function addContact(inputsInfo) {
    const contactHTML = infoTemplate
        .replace("{{name}}", inputsInfo.name)
        .replace("{{surname}}", inputsInfo.surname)
        .replace("{{phone}}", inputsInfo.phone);

    list.insertAdjacentHTML('beforeend', contactHTML);
}

function clearForm() {
    for (let input of inputs) {
        input.value = ''
    }
}

function isValidContact(contact) {
        return isName(contact.name)
        && isName(contact.surname)
        && isPhone(contact.phone);
}

function isName(value) {
    return strValidation.test(value);
}

function isPhone(value) {
    return intValidation.test(value);
}

addContact({
    name: 'Alex',
    surname: 'Vh',
    phone: 123
})
addContact({
    name: 'Alex2',
    surname: 'Vh',
    phone: 123
})
addContact({
    name: 'Alex3',
    surname: 'Vh',
    phone: 123
})
addContact({
    name: 'Alex4',
    surname: 'Vh',
    phone: 123
})