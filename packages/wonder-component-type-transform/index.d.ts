export const componentName: string

export const dataName: {
    parent: number,
    children: number,
    localPosition: number,
    localRotation: number,
    localScale: number,
    position: number,
    rotation: number,
    scale: number,
    localEulerAngles: number,
    eulerAngles: number,
    normalMatrix: number,
    localToWorldMatrix: number,
}

// export type dataNameType = number

type transform = number

export type parent = transform

export type children = Array<transform>

export type localPosition = [number, number, number];

export type position = [number, number, number];

export type localRotation = [number, number, number, number];

export type rotation = [number, number, number, number];

export type localScale = [number, number, number];

export type scale = [number, number, number];

export type localEulerAngles = [number, number, number];

export type eulerAngles = [number, number, number];

export type localToWorldMatrix = Float32Array

export type normalMatrix = Float32Array
