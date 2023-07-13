import { t as type_, create as createVector3, min as minVector3, max as maxVector3 } from "./Vector3"

export type t = {
    worldMin: type_,
    worldMax: type_
}

export let create = (worldMin: type_, worldMax: type_) => { return { worldMin, worldMax } };

export let setFromVertices = (vertices) => {
    let min = createVector3(0, 0, 0);
    let max = createVector3(0, 0, 0);

    for (let i = 0; i < vertices.length; i += 3) {
        let v = createVector3(vertices[i], vertices[i + 1], vertices[i + 2]);

        min = minVector3(min, v);
        max = maxVector3(max, v);
    }

    return create(min, max);
}

export let computeCenter = ({ worldMin, worldMax }: t) => {
    return createVector3(
        (worldMax[0] + worldMin[0]) / 2,
        (worldMax[1] + worldMin[1]) / 2,
        (worldMax[2] + worldMin[2]) / 2
    )
}