export const computeRadius = (color: Array<number>, constant: number, linear: number, quadratic: number) => {
    var lightMax = Math.max(color[0], color[1], color[2]);

    return (-linear + Math.sqrt(linear ** 2 - 4 * quadratic * (constant - (256.0 / 5.0) * lightMax)))
        / (2 * quadratic);
}


