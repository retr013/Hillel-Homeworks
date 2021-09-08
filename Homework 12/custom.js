const button = document.querySelector('button');
const name_input = document.querySelector('[name="name"]');
const sname_input = document.querySelector('[name="sname"]');
const phone_input = document.querySelector('[name="phone"]');
const container = document.querySelector('.commentsContainer');

button.addEventListener('click', () => {
    if (phone_input.value.match(/^[0-9]+$/) === null) {
        return alert('Invalid phone number')
    }
    if (!/^[а-яА-Яa-zA-Z\s]+$/.test(name_input.value)) {
        return alert('Invalid name')
    }
    if (!/^[а-яА-Яa-zA-Z\s]+$/.test(sname_input.value)) {
        return alert('Invalid surname')
    }
    let message = `${name_input.value}, ${sname_input.value}, ${phone_input.value}`;
    console.log(message);
    let h3 = document.createElement('h3');
    h3.innerText = message;
    if (message) {
        container.append(h3)
    }
});
