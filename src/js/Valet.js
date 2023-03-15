/**
 * Valet is responsible for parking (saving) and retrieving
 * cars from local storage. This allows some semblance of
 * persistance without having to deal with all the hassles
 * of setting up a database, user accounts, etc.
 */
const storageKey = "cpmList";

export default class Valet {
    static parkVehicles(list) {
        const stringList = JSON.stringify(list);

        if (window.localStorage) {
            window.localStorage.setItem(storageKey, stringList);
        } else if (window.sessionStorage) {
            window.sessionStorage.setItem(storageKey, stringList);
        }
    }

    static getVehicles() {
        if (window.localStorage) {
            const stored = window.localStorage.getItem(storageKey);
            if (stored) {
                return JSON.parse(stored);
            }
        } else if (window.sessionStorage) {
            const stored = window.sessionStorage.getItem(storageKey);
            if (stored) {
                return JSON.parse(stored);
            }
        }
        return [];
    }
}
