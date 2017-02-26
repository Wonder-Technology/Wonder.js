import { Camera } from "./Camera";
export declare class PerspectiveCamera extends Camera {
    static create(): PerspectiveCamera;
    private _fovy;
    fovy: number;
    private _aspect;
    aspect: number;
    zoomIn(speed: number, min?: number): void;
    zoomOut(speed: number, max?: number): void;
    protected updateProjectionMatrix(): void;
}
