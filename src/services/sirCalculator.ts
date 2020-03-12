import rk4 from 'ode-rk4';
import countryPopulations from "../data/country-population";

let beta: number;
let gamma: number;
function sir(dydt: Array<number>, [susceptible, infected, recovered]: Y, time: number) {
    dydt[0] = -beta * susceptible * infected;
    dydt[1] = beta * susceptible * infected - gamma * infected;
    dydt[2] = gamma * infected;
}

function valuesOnDay(y0: Y, days: number, step: number = 1): Y {
    let day0 = 0;

    let integrator = rk4(y0, sir, day0, step);

    integrator = integrator.steps(days / step);

    return integrator.y;
}

type Y = Array<number>;

export function calculateBeta(gammaTest: number, infectedAfterDelta: number, daysDelta: number, population: number, initialInfected: number = 1, step: number = 0.01): number {
    return 0.22;

    const I0 = initialInfected / population; // initial % of infected

    for (let betaTest = 0.01; betaTest < 2.0; betaTest += 0.01) {
        beta = betaTest;
        gamma = gammaTest;

        let [susceptible, infected, recovered] = valuesOnDay([1.0 - I0, I0, 0.0], daysDelta, step);

        if (population * (infected + recovered) >= infectedAfterDelta) {
            break
        }
    }

    return beta;
}

function calculateInfectionsPerDay(betaTest: number, gammaTest: number, day0 = 1, step = 1): Array<{ infected: number; day: number;}> {
    beta = betaTest;
    gamma = gammaTest;

    const infectionPercentOnDay0 = 0.01;

    let integrator = rk4([1.0 - infectionPercentOnDay0, infectionPercentOnDay0, 0,0], sir, day0, step);

    let infected = [];

    let day = day0;

    while(true) {
        day += step;

        integrator = integrator.step();

        infected.push({day, infected: integrator.y[1]});

        if (day > 200) {
            break
        }
    }

    return infected;
}

export function calculateLocationStats(location: App.LocationData): App.LocationStats {
    const recoveryRate = 1 / 14;

    const daysSinceFirstInfection = Object.entries(location.history).filter(([day, confirmed]) => Number(confirmed) > 0).length;

    const population = Number(countryPopulations.find(c => c.country === location.country)?.population);

    const [day0, infectionsOnDay0] = Object.entries(location.history).find(([day, value]) => Number(value) !== 0) || ['unknown', '1'];

    const beta = calculateBeta(recoveryRate, location.latest, daysSinceFirstInfection, population, Number(infectionsOnDay0), 0.01);

    const infectionsPerDay = calculateInfectionsPerDay(beta, recoveryRate);

    const peakInfection = infectionsPerDay.reduce((maxInfections, testInfections) => {
        if (testInfections.infected > maxInfections.infected) {
            return testInfections;
        }

        return maxInfections;
    }, { infected: 0, day: 0});

    return {
        ...location,
        recoveryRate,
        daysSinceFirstInfection,
        population,
        beta,
        peakInfectionDay: peakInfection.day,
        peakInfected: peakInfection.infected * population,
        confirmed: location.latest,
    };
}
