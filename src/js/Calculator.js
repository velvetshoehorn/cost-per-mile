export default class Calculator {
    static getCpm(specs, settings) {
        // Things that make this impossible
        if (!specs || !settings || !specs.vehiclePrice) {
            return null;
        }

        const milesRemaining = Calculator.getMilesRemaining(
            settings.lifeMiles,
            specs.odometer
        );
        const cityGasExpense = Calculator.getFuelExpense(
            milesRemaining * (settings.cityDrivingPercentage / 100),
            specs.cityMpg,
            settings.gasPrice
        );
        const hwyGasExpense = Calculator.getFuelExpense(
            milesRemaining * ((100 - settings.cityDrivingPercentage) / 100),
            specs.hwyMpg,
            settings.gasPrice
        );
        const cpm =
            (specs.vehiclePrice + cityGasExpense + hwyGasExpense) /
            milesRemaining;

        return cpm;
    }

    static getFuelExpense(miles, mpg, gasPrice) {
        return this.getGallonsUsed(miles, mpg) * gasPrice;
    }

    static getGallonsUsed(miles, mpg) {
        return miles / mpg;
    }

    static getMilesRemaining(lifeMiles, odometer) {
        return Math.max(lifeMiles - odometer, 0);
    }
}
