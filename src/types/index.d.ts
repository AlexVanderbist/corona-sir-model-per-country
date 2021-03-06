namespace App {
    type LocationData = {
        id: string;
        country: string;
        country_code: string;
        province: string;
        history: {
            [key: string]: string
        };
        latest: number;
    };

    type LocationStats = LocationData & {
        recoveryRate: number;
        daysSinceFirst100Infected: number;
        population: number;
        beta: number;
        confirmed: number;
        population: number;
        peakInfectionDay: number;
        peakInfected: number;
        rNaught: number;
    }
}
