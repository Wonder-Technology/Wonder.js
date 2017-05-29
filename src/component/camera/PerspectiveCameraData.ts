export class PerspectiveCameraData {
    public static fovyMap: FovyMap = null;
    public static aspectMap: AspectMap = null;
}

export type FovyMap = {
    [cameraControllerIndex: number]: number
}

export type AspectMap = {
    [cameraControllerIndex: number]: number
}
