const SELECTOR = Object.freeze({
    FORM: '#NewContactForm',
    INPUT: '.form-input',
    TEMPLATE: '#contactTemplate',
    LIST: '#contactsList',
    CONTACT_ROW: '.contact-row',
    DELETE_BTN: 'delete-btn',
    DONE_BTN: 'done-btn',
    LOADING: '#loading',
    HIDDEN: 'hidden',
})

const form = document.querySelector(SELECTOR.FORM);
const input = document.querySelectorAll(SELECTOR.INPUT);
const infoTemplate = document.querySelector(SELECTOR.TEMPLATE).innerHTML;
const list = document.querySelector(SELECTOR.LIST);
const contactRow = SELECTOR.CONTACT_ROW;
const deleteButton = SELECTOR.DELETE_BTN;
const doneButton = SELECTOR.DONE_BTN;
const loading = document.querySelector(SELECTOR.LOADING);

form.addEventListener('submit', onSubmitForm);
list.addEventListener('click', onContactListClick);

function init() {
    toggleLoading();

    TodoAPI.getList()
        .then((todoList) => addTodoList(todoList))
        .catch((error) => {
            alert(error.message)
        })
        .finally(() => toggleLoading());
}

init();

function onSubmitForm(e) {
    e.preventDefault();

    const todo = getTodo();
    if (!isTodoValid(todo)) {
        alert('Form is invalid');
        return false;
    }
    addTodo(todo);
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
        .replace('{{title}}', todo.title)
        .replace('{{message}}', todo.article)
        .replace('{{todoId}}', todo.id)
        .replace('{{todoId}}', todo.id)

}

function clearForm() {
    for (let i of input) {
        i.value = '';
    }
}

function getTodo() {
    return {
        title: input[0].value,
        article: input[1].value,
        status: 'pending',
    };
}

function isTodoValid(todo) {
    return todo && todo.title;
}

function addTodo(todo) {
    toggleLoading();

    TodoAPI.create(todo)
        .then(() => TodoAPI.getList())
        .then(addTodoList)
        .catch(handleError)
        .finally(() => toggleLoading())
}

function handleError(e) {
    error.textContent = e.message;

    setTimeout(() => error.textContent = '', 5000);
}

function toggleLoading() {
    loading.classList.toggle(SELECTOR.HIDDEN);
}