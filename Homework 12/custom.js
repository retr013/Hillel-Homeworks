const button = document.querySelector('button');
const nameInput = document.querySelector('[name="name"]');
const snameInput = document.querySelector('[name="sname"]');
const phoneInput = document.querySelector('[name="phone"]');
const container = document.querySelector('.commentsContainer');
const strValidation = /^[а-яА-Яa-zA-Z\s]+$/
const intValidation = /^[0-9]+$/

button.addEventListener('click', () => {
    if (!intValidation.test(phoneInput.value)) {
        return alert('Invalid phone number')
    }
    if (!strValidation.test(nameInput.value)) {
        return alert('Invalid name')
    }
    if (!strValidation.test(snameInput.value)) {
        return alert('Invalid surname')
    }

    let message = `${nameInput.value}, ${snameInput.value}, ${phoneInput.value}`;
    let h3 = document.createElement('h3');
    h3.innerText = message;

    container.append(h3)
});
