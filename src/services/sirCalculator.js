import rk4 from 'ode-rk4';
import countryPopulations from "../data/country-population";

function valuesOnDay(y0, f, days, step) {
    let day0 = 1;
    let integrator = rk4(y0, f, day0, step);

    integrator = integrator.steps(days);

    return integrator.y;
}

export function calculateBeta(gamma, infectedAfterDelta, daysDelta, population, initialInfected = 1) {
    const I0 = initialInfected / population; // initial number of infected
    let beta;

    for (beta = 0.01; beta < 2.0; beta += 0.01) {
        let sir = (dydt, [susceptible, infected, recovered], time) => {
            dydt[0] = -beta * susceptible * infected;
            dydt[1] = beta * susceptible * infected - gamma * infected;
            dydt[2] = gamma * infected;
        };

        let [susceptible, infected, recovered] = valuesOnDay([1.0 - I0, I0, 0.0], sir, daysDelta, 1);

        if (population * (infected + recovered) >= infectedAfterDelta) {
            break
        }
    }

    return beta;
}

export function calculateLocationStats({history, latest, country}) {
    const recoveryRate = 1/14;

    const daysSinceFirstInfection = Object.entries(history).filter(([day, confirmed]) => confirmed > 0).length;

    const population = countryPopulations.find(c => c.country === country)?.population;

    const beta = calculateBeta(recoveryRate, latest, daysSinceFirstInfection, population);

    return { recoveryRate, daysSinceFirstInfection, population, beta, confirmed: latest };
}
