import Valet from "@js/Valet.js";

describe("Valet", () => {
    const storageKey = "cpmList";
    const vehicleList = [{ a: 1, b: true }];
    const vehicleListString = '[{"a":1,"b":true}]';
    const localStorageHandle = window.localStorage;
    const sessionStorageHandle = window.sessionStorage;

    describe("parkVehicles(list)", () => {
        let localStorageSetSpy;
        let sessionStorageSetSpy;

        beforeEach(() => {
            // Spy on APIs
            localStorageSetSpy = jest.spyOn(
                Object.getPrototypeOf(window.localStorage),
                "setItem"
            );
            sessionStorageSetSpy = jest.spyOn(
                Object.getPrototypeOf(window.sessionStorage),
                "setItem"
            );
        });

        afterEach(() => {
            window.localStorage = localStorageHandle;
            window.sessionStorage = sessionStorageHandle;
        });

        it("saves list as string in local storage", () => {
            // Arrange
            delete window.sessionStorage;

            // Act
            Valet.parkVehicles(vehicleList);

            // Assert
            expect(localStorageSetSpy).toHaveBeenCalledTimes(1);
            expect(localStorageSetSpy).toHaveBeenCalledWith(
                storageKey,
                vehicleListString
            );
        });

        it("saves to session storage when local storage not available", () => {
            // Arrange
            delete window.localStorage;

            // Act
            Valet.parkVehicles(vehicleList);

            // Assert
            expect(sessionStorageSetSpy).toHaveBeenCalledTimes(1);
            expect(sessionStorageSetSpy).toHaveBeenCalledWith(
                storageKey,
                vehicleListString
            );
        });

        it("uses no storage if not available", () => {
            // Arrange
            delete window.localStorage;
            delete window.sessionStorage;

            // Act
            Valet.parkVehicles(storageKey, vehicleList);

            // Assert
            expect(localStorageSetSpy).not.toHaveBeenCalled();
            expect(sessionStorageSetSpy).not.toHaveBeenCalled();
        });
    });

    describe("getVehicles()", () => {
        let localStorageGetSpy;
        let sessionStorageGetSpy;

        beforeEach(() => {
            localStorageGetSpy = jest
                .spyOn(Object.getPrototypeOf(window.localStorage), "getItem")
                .mockReturnValue(vehicleListString);
            sessionStorageGetSpy = jest
                .spyOn(Object.getPrototypeOf(window.sessionStorage), "getItem")
                .mockReturnValue(vehicleListString);
        });

        afterEach(() => {
            window.localStorage = localStorageHandle;
            window.sessionStorage = sessionStorageHandle;
        });

        describe("with local storage", () => {
            it("retrieves list from local storage with proper key", () => {
                // Act
                Valet.getVehicles();

                // Assert
                expect(localStorageGetSpy).toHaveBeenCalledWith(storageKey);
            });

            it("returns list from local storage when list exists", () => {
                // Act
                const result = Valet.getVehicles();

                // Assert
                expect(result).toMatchObject(vehicleList);
            });

            it("returns empty list when no list in local storage", () => {
                // Arrange
                localStorageGetSpy.mockReturnValue(null);

                // Act
                const result = Valet.getVehicles();

                // Assert
                expect(result).toEqual([]);
            });
        });

        describe("with session storage (no local a available)", () => {
            it("retrieves list from session storage with proper key", () => {
                // Act
                Valet.getVehicles();

                // Assert
                expect(sessionStorageGetSpy).toHaveBeenCalledWith(storageKey);
            });

            it("returns list from session storage when list exists", () => {
                // Arrange
                delete window.localStorage;

                // Act
                const result = Valet.getVehicles();

                // Assert
                expect(result).toMatchObject(vehicleList);
            });

            it("returns empty list when no list in session storage", () => {
                // Arrange
                delete window.localStorage;
                sessionStorageGetSpy.mockReturnValue(null);

                // Act
                const result = Valet.getVehicles();

                // Assert
                expect(result).toEqual([]);
            });
        });

        it("returns empty array when no storage available", () => {
            // Arrange
            delete window.localStorage;
            delete window.sessionStorage;

            // Act
            const result = Valet.getVehicles();

            // Assert
            expect(result).toEqual([]);
        });
    });
});
