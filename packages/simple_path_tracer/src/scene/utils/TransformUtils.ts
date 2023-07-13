export let convertDegToRad = (degArr) => {
    let deg_to_rad = Math.PI / 180;

    return degArr.map((deg) => deg * deg_to_rad);
};