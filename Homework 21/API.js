class TodoAPI {
    static TOKEN = 'e148c90229c863f781e87e32c41207b11ec37b96e84aee0a085cf9be1d8c67a4';
    static URL = 'https://gorest.co.in/public/v1/todos';
    static HEADERS = {
        'Accept': 'application/json',
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${this.TOKEN}`,
    };

    static getList() {
        return fetch(this.URL)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                throw new Error('Cannot access list')
            })
            .then((data) => data.data);
    }

    static delete(id) {
        return fetch(`${this.URL}/${id}`, {
            method: 'DELETE',
            headers: this.HEADERS,
        })
            .then((res) => {
                if (res.status !== 204 || !res.ok) {
                    throw new Error("Deletion was not successful")
                }
            });
    }
}