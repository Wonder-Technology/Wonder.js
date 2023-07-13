export type t = [number, number, number]

export let create = (x, y, z): t => [x, y, z];

export let min = ([v1x, v1y, v1z], [v2x, v2y, v2z]): t => {
    return [
        Math.min(v1x, v2x),
        Math.min(v1y, v2y),
        Math.min(v1z, v2z),
    ];
}

export let max = ([v1x, v1y, v1z], [v2x, v2y, v2z]): t => {
    return [
        Math.max(v1x, v2x),
        Math.max(v1y, v2y),
        Math.max(v1z, v2z),
    ];
}
