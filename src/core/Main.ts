import { getIsTest, init, MainConfigData, setConfig, setIsTest } from "./MainSystem";
import { CompileConfig } from "../config/CompileConfig";
import { MainData } from "./MainData";

export class Main {
    static get isTest() {
        return getIsTest(MainData);
    }
    static set isTest(isTest: boolean) {
        setIsTest(MainData, isTest).run();
    }

    public static setConfig(configData: MainConfigData) {
        setConfig(CompileConfig.closeContractTest, configData).run();

        return this;
    }

    public static init() {
        init().run();

        return this;
    }
}
