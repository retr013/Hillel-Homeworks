const SELECTOR = Object.freeze({
    TEMPLATE: '#songTemplate',
    TEMPLATE_COVER: '#coverTemplate',
    LIST: '#albumsList',
    LIST_COVER: '#coverList',
    LOADING: '#loading',
    LOADINGR: '#loadingR',
    HIDDEN: 'hidden',
    ALBUM_ROW: '.album-row'
})

const infoTemplate = document.querySelector(SELECTOR.TEMPLATE).innerHTML;
const coverTemplate = document.querySelector(SELECTOR.TEMPLATE_COVER).innerHTML;
const list = document.querySelector(SELECTOR.LIST);
const listCover = document.querySelector(SELECTOR.LIST_COVER);
const loading = document.querySelector(SELECTOR.LOADING);
const loadingR = document.querySelector(SELECTOR.LOADINGR);
const coversURL = 'https://jsonplaceholder.typicode.com/photos?albumId={{id}}'
const albumsURL = 'https://jsonplaceholder.typicode.com/albums'

list.addEventListener('click', onAlbumListClick);

function init() {
    toggleLoading();

    getList()
        .then((albumList) => {
            addAlbumList(albumList);
            return albumList
        })
        .then(getFirstId)
        .then(getCovers)
        .catch((error) => {
            alert(error.message)
        })
        .finally(() => toggleLoading());
}

init();

function getList() {
    return fetch(albumsURL)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            throw new Error('Cannot access list')
        })
        .then((data) => data);
}

function onAlbumListClick(e) {
    const id = e.target.closest(SELECTOR.ALBUM_ROW).dataset.id;
    toggleLoadingCover();
    getCovers(id)
}

function getCovers(id) {
    return fetch(coversURL.replace('{{id}}', id))
        .then((data) => data.json())
        .then((result) => addACoverList(result))
        .finally(toggleLoadingCover())
}

function addACoverList(coverList) {
    const html = coverList.map(todo => getCoverHTML(todo)).join('')
    listCover.innerHTML = html;
}

function getCoverHTML(cover) {
    return coverTemplate
        .replace('{{coverTitle}}', cover.title)
        .replace('{{coverId}}', cover.id)
        .replace('{{coverId}}', cover.id)
        .replace('{{coverUrl}}', cover.url)
}

function addAlbumList(albumsList) {
    const html = albumsList.map(todo => getAlbumHTML(todo)).join('')
    list.innerHTML = html;
}

function toggleLoading() {
    loading.classList.toggle(SELECTOR.HIDDEN);
}

function toggleLoadingCover() {
    loadingR.classList.toggle(SELECTOR.HIDDEN);
}

function getAlbumHTML(album) {
    return infoTemplate
        .replace('{{songTitle}}', album.title)
        .replace('{{songId}}', album.id)
        .replace('{{songId}}', album.id)
}

function getFirstId(list) {
    return list?.[0]?.id ?? null
}