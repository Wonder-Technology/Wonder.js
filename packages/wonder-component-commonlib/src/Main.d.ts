import { usedComponentData } from "wonder-core/src/data/RegisterComponentType.gen";
import { nullable } from "wonder-commonlib-ts/src/nullable"
import { transform } from "../../wonder-component-type-transform";
import { geometry } from "../../wonder-component-type-geometry";
import { perspectiveCameraProjection } from "../../wonder-component-type-perspectivecameraprojection";
import { basicCameraView } from "../../wonder-component-type-basiccameraview";
import { directionLight } from "../../wonder-component-type-directionlight";

export function lookAt(data: usedComponentData, transform: transform, target: [number, number, number], up?: [number, number, number]): usedComponentData

export function computeTangents(vertices: Float32Array, texCoords: Float32Array, normals: Float32Array, indices: Uint32Array): Float32Array

export function createTriangleGeometry(data: usedComponentData): [usedComponentData, geometry]

export function createSphereGeometry(data: usedComponentData): [usedComponentData, geometry]

export function createPlaneGeometry(data: usedComponentData): [usedComponentData, geometry]

export function updatePerspectiveCameraProjection(data: usedComponentData, isDebug: boolean, cameraProjection: perspectiveCameraProjection, canvasSize: [number, number]): usedComponentData

export function getViewWorldToCameraMatrix(basicCameraViewData: usedComponentData, transformState: usedComponentData, cameraView: basicCameraView): Float32Array

export function getActiveCameraView(data: usedComponentData, isDebug: boolean): nullable<basicCameraView>

export function getDirection(directionLightData: usedComponentData, transformData: usedComponentData, light: directionLight): nullable<[number, number, number]>