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

    const rNaught = Math.pow(location.latest, 1/(daysSinceFirstInfection-1));

    const beta = rNaught * gamma;

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
        rNaught,
        peakInfectionDay: peakInfection.day,
        peakInfected: peakInfection.infected * population,
        confirmed: location.latest,
    };
}
