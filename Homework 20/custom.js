const infoInput = document.querySelector('#infoInput');
const findButton = document.querySelector('#submitButton');
const infoTemplate = document.querySelector('#contactTemplate').innerHTML;
const userInfoDiv = document.querySelector('.userInfoDiv')
const gitRequest = "https://api.github.com/users/"

findButton.addEventListener('click', onFindButtonClick);

function onFindButtonClick(e) {
    e.preventDefault();

    if (!infoInput.value) {
        return alert('Empty input')
    }
    const userName = infoInput.value;
    const url = getUserUrl(userName);
    getGitUser(url)
        .then((info) => {
            htmlInsertion(info)
            return info
        })

    clearForm();
}

function getUserUrl(userName) {
    return gitRequest + userName;
}

function getGitUser(request) {
    return fetch(request)
        // .then((data) => data.json())
        .then((data) => {
            if (data.ok) {
                return data.json()
            }
            if (data.status >= 500) {
                throw new Error('Server error')
            }
            if (data.status >= 400) {
                throw new Error('User not found')
            }
        })
}

function htmlInsertion(info) {
    const infoHtml = infoTemplate
        .replace("{{img}}", info.avatar_url)
        .replace("{{repos}}", `Repos: ${info.public_repos}`)
        .replace("{{followers}}", `Followers: ${info.followers}`)
        .replace("{{following}}", `Following ${info.following}`);
    userInfoDiv.insertAdjacentHTML('afterbegin', infoHtml);
}

function clearForm() {
    infoInput.value = ''
}