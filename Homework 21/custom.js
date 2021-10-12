const SELECTOR = Object.freeze({
    FORM: '#NewContactForm',
    INPUT: '.form-input',
    TEMPLATE: '#contactTemplate',
    LIST: '#contactsList',
    CONTACT_ROW: '.contact-row',
    DELETE_BTN: 'delete-btn',
    DONE_BTN: 'done-btn'
})

const form = document.querySelector(SELECTOR.FORM);
const input = document.querySelector(SELECTOR.INPUT);
const infoTemplate = document.querySelector(SELECTOR.TEMPLATE).innerHTML;
const list = document.querySelector(SELECTOR.LIST);
const contactRow = SELECTOR.CONTACT_ROW;
const deleteButton = SELECTOR.DELETE_BTN;
const doneButton = SELECTOR.DONE_BTN;

form.addEventListener('submit', onSubmitForm);
list.addEventListener('click', onContactListClick);

function init() {
    TodoAPI.getList()
        .then((todoList) => addTodoList(todoList))
        .catch((error) => {
            alert(error.message)
        })
}

init();

function onSubmitForm(e) {
    e.preventDefault();

    const inputsInfo = input.value;

    if (!inputsInfo) {
        alert('Form is invalid');
        return false;
    }

    getTodoHTML2(inputsInfo);
    clearForm();
}

function onContactListClick(e) {
    if (e.target.classList.contains(deleteButton)) {
        const el = e.target.closest(contactRow);

        return removeContact(el);
    }
    if (e.target.classList.contains(doneButton)) {
        const el = e.target.closest(contactRow);
        giveColor(el)
    }
}

function giveColor(el) {
    if (el.style.background !== 'green') {
        el.style.background = 'green'
    } else {
        el.style.background = 'initial'
    }
}

function removeContact(el) {
    return TodoAPI.delete(+el.dataset.id).then(() => {
        TodoAPI.getList()
            .then((el) => addTodoList(el))
            .catch((error) => alert(error.message));
    })
}

function addTodoList(todolist) {
    const html = todolist.map(todo => getTodoHTML(todo)).join('')

    list.innerHTML = html;
}

function getTodoHTML(todo) {
    return infoTemplate
        .replace('{{message}}', todo.title)
        .replace('{{todoId}}', todo.id)
}

function getTodoHTML2(todo) {
    const html = infoTemplate.replace('{{message}}', todo);

    list.insertAdjacentHTML('beforeend', html);
}

function clearForm() {
        input.value = ''
}
