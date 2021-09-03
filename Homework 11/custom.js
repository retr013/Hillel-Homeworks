const button = document.querySelector('button');
const input = document.querySelector('[name="myInput"]');
const container = document.querySelector('.commentsContainer')

button.addEventListener('click', () => {
    let message = input.value
    let h3 = document.createElement('h3')
    h3.innerText = input.value
    if (message) {
        container.append(h3)
    }
});
