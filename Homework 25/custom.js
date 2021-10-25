const DELETE_NOTE_SELECTOR = '.delete-note';
const EDIT_NOTE = '.edit-note';
const NOTE = '.noteDiv';
const TEMPLATE = '#noteTemplate';
const LIST = '#notesContainer';
const ADD_NOTE = '#addNoteBtn';
const MODAL_SELECTOR = "#noteModal";
const EDIT_NOTE_SPAN = '.edit-note-span';

const EMPTY_NOTE = {
    description: '',
    id: ''
};
let notesList = []

const $form = $(`${MODAL_SELECTOR} form`)[0];
const $modal = $(MODAL_SELECTOR).dialog({
    autoOpen: false,
    height: 400,
    width: 350,
    modal: true,
    buttons: {
        Save: () => {
            const note = getModalNote();
            if (note.id) {
                updateNote(note.id, note);
            } else {
                createNote(note);
            }
            closeModal();
        },
        Cancel: closeModal,
    },
    close: closeModal,
});


const noteTemplate = $(TEMPLATE).html();
const $noteListEl = $(LIST)
    .on('click', DELETE_NOTE_SELECTOR, onDeleteClick)
    .on('focusout', EDIT_NOTE, onListFocusout)
    .on('click', EDIT_NOTE_SPAN, onEditButtonClick)

$(ADD_NOTE).on('click', onAddNoteBtnClick);

init()

function onAddNoteBtnClick() {
    openModal(EMPTY_NOTE)
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

function onEditButtonClick(e) {
    const $element = $(this);
    const id = getElementIndex($element);
    const note = notesList.find((item) => +item.id === id);

    openModal(note);
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
    const note = notesList.find((el) => el.id === id);
    Object.keys(changes).forEach((key) => (note[key] = changes[key]));
    stickerAPI.update(id, note);
    updateUI(note)
}

function deleteNote(id) {
    notesList = notesList.filter((el) => el.id != id);

    deleteNoteElement(id);
    stickerAPI.delete(id);
}

function deleteNoteElement(id) {
    const $element = getNoteElementById(id);

    $element && $element.remove();
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

function openModal(note) {
    setModalNote(note)
    $modal.dialog('open');
}

function closeModal() {
    $modal.dialog('close');
    $form.reset();
}

function setModalNote(note) {
    $form.id.value = note.id;
    if (!$form.id.value) {
        $form.id = note.id
    }
    $form.description.value = note.description;
}

function getModalNote() {
    return {
        id: $form.id.value ? $form.id.value : $form.id,
        description: $form.description.value,
    };
}

function updateUI(note) {
    const $currentNote = getNoteElementById(note.id);

    $currentNote.find(EDIT_NOTE)[0].textContent = note.description;
}
