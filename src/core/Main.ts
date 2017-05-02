import { getIsTest, init, MainConfigData, setConfig, setIsTest, setLibIsTest } from "./MainSystem";
import { CompileConfig } from "../config/CompileConfig";
import { Map } from "immutable";
import { DirectorData } from "./DirectorData";
import { getState, setState } from "./DirectorSystem";

export class Main {
    static get isTest() {
        return getIsTest(DirectorData.state);
    }
    static set isTest(isTest: boolean) {
        setState(setIsTest(isTest, getState(DirectorData)), DirectorData).run();

        setLibIsTest(isTest).run();
    }

    private static _configState: Map<any, any> = null;

    public static setConfig(configState: MainConfigData) {
        this._configState = setConfig(CompileConfig.closeContractTest, configState).run();

        setState(getState(DirectorData).set("Main", this._configState.get("Main")), DirectorData).run();

        return this;
    }

    public static init() {
        setState(init(getState(DirectorData), this._configState.get("config")).run(), DirectorData).run();

        return this;
    }
}
