const DELETE_NOTE_SELECTOR = '.delete-note';
const EDIT_NOTE = '.edit-note';
const NOTE = '.noteDiv';
const TEMPLATE = '#noteTemplate';
const LIST = '#notesContainer';
const ADD_NOTE = '#addNoteBtn';

const EMPTY_NOTE = {description: ''};
let notesList = []

const noteTemplate = $(TEMPLATE).html();
const $noteListEl = $(LIST)
    .on('click', DELETE_NOTE_SELECTOR, onDeleteClick)
    .on('focusout', EDIT_NOTE, onListFocusout)

$(ADD_NOTE).on('click', onAddNoteBtnClick);

init()

function onAddNoteBtnClick() {
    createNote(EMPTY_NOTE)
}

function onDeleteClick(e) {
    const $element = $(this).parent();

    $element.hide('slow', () => deleteNote(getElementIndex($element)));
}

function onListFocusout(e) {
    const $element = $(this);

    updateNote(getElementIndex($element), {
        description: $element.val(),
    });
}

function init() {
    getList();
}

function getList() {
    stickerAPI.getList()
        .then(setData)
        .then(renderList);
}

function setData(data) {
    return notesList = data;
}

function getNoteElementById(id) {
    return $noteListEl.find(`[data-id="${id}"]`);
}

function createNote(note) {
    stickerAPI.create(note)
        .then((note) => {
            notesList.push(note);
            renderNote(note);
        })
}

function updateNote(id, changes) {
    const note = notesList.find((el) => el.id == id);

    Object.keys(changes).forEach((key) => (note[key] = changes[key]));
    stickerAPI.update(id, note);
}

function deleteNote(id) {
    notesList = notesList.filter((el) => el.id != id);

    deleteNoteElement(id);
    stickerAPI.delete(id);
}

function deleteNoteElement(id) {
    const $element = getNoteElementById(id);
}

function renderList(notesList) {
    notesList.forEach(renderNote);
}

function renderNote(note) {
    const $noteElement = $(getNoteHtml(note));

    $noteListEl.append($noteElement);
}

function getNoteHtml(note) {
    return noteTemplate
        .replace('{{id}}', note.id)
        .replace('{{noteText}}', note.description);
}

function getElementIndex($el) {
    const $note = getNoteElementByChild($el);
    return $note && $note.data('id')
}

function getNoteElementByChild($child) {
    return $child.closest(NOTE)
}
