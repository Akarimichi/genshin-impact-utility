// Return data from local storage with index
export const getLocalStorage = (index: string, type: 'json' | null = null) => {

    let localStorageAchv: any = localStorage.getItem(index);

    switch (type) {
    case 'json':

        localStorageAchv = JSON.parse(localStorageAchv);
        localStorageAchv = (localStorageAchv ? localStorageAchv : []);

        break;
    }

    return localStorageAchv;

};

// Set data in local storage
export const setLocalStorage = (index: string, value: any, type: 'json' | null = null) => {

    switch (type) {
    case 'json':

        value = JSON.stringify(value);

        break;
    }

    localStorage.setItem(index, value);

};

