class TodoAPI {
    static TOKEN = 'e148c90229c863f781e87e32c41207b11ec37b96e84aee0a085cf9be1d8c67a4';
    static URL = 'https://gorest.co.in/public/v1/todos';
    static USER_ID = 504;

    static request(uri, method, data) {
        return fetch(`${this.URL}${uri}`, {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${this.TOKEN}`,
            },
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    static getList() {
        return this.request(`?user_id=${this.USER_ID}`, 'GET')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                throw new Error('Can not fetch todo list from API');
            })
            .then((data) => data.data);
    }

    static delete(id) {
        return this.request(`/${id}`, 'DELETE')
            .then((res) => {
                if (!res.ok || res.status !== 204) {
                    throw new Error('Can not execute delete todo request on API');
                }
            });
    }

    static update(id, data) {
        return this.request(`/${id}`, 'PUT', { ...data, user_id: this.USER_ID })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return res.json().then((data) => {
                    throw new Error(
                        'Can not completed todo list from API' +
                        JSON.stringify(data.data, null, 4)
                    );
                });
            });
    }

    static create(data) {
        return this.request('', 'POST', {...data, user_id: this.USER_ID,})
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return res.json().then((data) => {
                    throw new Error(
                        'Can not create todo on API:' +
                        JSON.stringify(data.data, null, 4))
                })
            });
    }
}