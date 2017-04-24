import {
    getCanvas, getHeight, getStyleHeight, getStyleWidth, getWidth, setHeight, setStyleWidth, getX, setX, getY, setY,
    setWidth, setCanvas, setStyleHeight
} from "./ViewSystem";
import { ViewData } from "./ViewData";
import { registerClass } from "../definition/typescript/decorator/registerClass";

@registerClass("View")
export class View {
    public static create() {
        var obj = new this();

        return obj;
    }

    get dom() {
        return getCanvas(ViewData);
    }
    set dom(dom:HTMLCanvasElement){
        setCanvas(dom).run();
    }

    get width() {
        return getWidth(this.dom);
    }
    set width(width: number) {
        setWidth(width, this.dom).run();
    }

    get height() {
        return getHeight(this.dom);
    }
    set height(height: number) {
        setHeight(height, this.dom).run();
    }

    get styleWidth() {
        return getStyleWidth(this.dom);
    }
    set styleWidth(styleWidth: string) {
        setStyleWidth(styleWidth, this.dom).run();
    }

    get styleHeight() {
        return getStyleHeight(this.dom);
    }
    set styleHeight(styleHeight: string) {
        setStyleHeight(styleHeight, this.dom).run();
    }

    get x() {
        return getX(this.dom);
    }
    set x(x: number) {
        setX(x, this.dom).run();
    }

    get y() {
        return getY(this.dom);
    }
    set y(y: number) {
        setY(y, this.dom).run();
    }
}

