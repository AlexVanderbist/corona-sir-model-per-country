declare module "ode-rk4" {
    type Integrator = {
        steps: (steps: number) => self.Integrator;
        y: Array<number>;
    };

    export default rk4 = (y0: Array<number>, f: Function, day0: number, step: number) => this.Integrator;
}
