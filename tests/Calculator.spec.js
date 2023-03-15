import Calculator from "@js/Calculator.js";

describe("Calculator", () => {
    describe("getCpm()", () => {
        function getSettings(overrides = {}) {
            return {
                lifeMiles: 200000,
                gasPrice: 4.0,
                cityDrivingPercentage: 50,
                ...overrides,
            };
        }

        function getVehicleSpecs(overrides = {}) {
            return {
                cityMpg: 25,
                hwyMpg: 50,
                odometer: 0,
                vehiclePrice: 20000,
                ...overrides,
            };
        }

        it("is accurate to penny", () => {
            // Arrange
            const scenarios = [
                {
                    specs: getVehicleSpecs(),
                    settings: getSettings(),
                    cpm: 0.22,
                },
                {
                    specs: getVehicleSpecs({ odometer: 100000 }),
                    settings: getSettings({ cityDrivingPercentage: 100 }),
                    cpm: 0.36,
                },
            ];

            scenarios.forEach((scenario) => {
                // Act
                const result = Calculator.getCpm(
                    scenario.specs,
                    scenario.settings
                );

                // Assert
                expect(result).toBeCloseTo(scenario.cpm, 2);
            });
        });

        it("is null when no specs provided", () => {
            // Act
            const result = Calculator.getCpm(null, getSettings());

            // Assert
            expect(result).toBeNull();
        });

        it("is null when no price provided", () => {
            // Arrange
            const specs = getVehicleSpecs({ vehiclePrice: null });

            // Act
            const result = Calculator.getCpm(specs, getSettings());

            // Assert
            expect(result).toBeNull();
        });

        it("is null when no settings provided", () => {
            // Act
            const result = Calculator.getCpm(getVehicleSpecs());

            // Assert
            expect(result).toBeNull();
        });
    });

    describe("getFuelExpense(miles, mpg, fuelGallonPrice)", () => {
        it("is accurate to the penny", () => {
            // Arrange
            const scenarios = [
                { miles: 100, mpg: 10, gasPrice: 4, fuelExpense: 40 },
                {
                    miles: 100000,
                    mpg: 33,
                    gasPrice: 4,
                    fuelExpense: 12121.21,
                },
            ];

            scenarios.forEach((scenario) => {
                // Act
                const result = Calculator.getFuelExpense(
                    scenario.miles,
                    scenario.mpg,
                    scenario.gasPrice
                );

                // Assert
                expect(result).toBeCloseTo(scenario.fuelExpense, 2);
            });
        });
    });

    describe("getMilesRemaining()", () => {
        const lifeMiles = 200000;

        it("is life miles when zero miles on odometer", () => {
            // Arrange
            const odometer = 0;

            // Act
            const result = Calculator.getMilesRemaining(lifeMiles, odometer);

            // Assert
            expect(result).toEqual(lifeMiles);
        });

        it("is zero when odometer exceeds life miles", () => {
            // Act
            const result = Calculator.getMilesRemaining(lifeMiles, 200001);

            // Assert
            expect(result).toEqual(0);
        });
    });

    describe("getGallonsUsed(miles, mpg)", () => {
        it("is accurate to 1/1000th of a gallon", () => {
            // Arrange
            const scenarios = [
                { miles: 100, mpg: 25, gallons: 4 },
                { miles: 500, mpg: 50, gallons: 10 },
                { miles: 100000, mpg: 35, gallons: 2857.143 },
            ];

            scenarios.forEach((scenario) => {
                // Act
                const result = Calculator.getGallonsUsed(
                    scenario.miles,
                    scenario.mpg
                );

                // Assert
                expect(result).toBeCloseTo(scenario.gallons, 3);
            });
        });

        // Typical of an "all city" or "all highway" scenario
        it("is zero when miles is zero", () => {
            // Act
            const result = Calculator.getGallonsUsed(0, 35);

            // Assert
            expect(result).toEqual(0);
        });
    });
});
