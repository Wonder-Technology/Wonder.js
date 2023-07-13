export let concat = (a, b) => {
    var c = new Uint32Array(a.length + b.length);

    c.set(a);
    c.set(b, a.length);

    return c;
}