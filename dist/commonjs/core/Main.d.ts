import { MainConfigData } from "../definition/type/mainType";
export declare class Main {
    static isTest: boolean;
    private static _configState;
    static setConfig(configState: MainConfigData): typeof Main;
    static init(): typeof Main;
}
export declare const initAllData: () => void;
