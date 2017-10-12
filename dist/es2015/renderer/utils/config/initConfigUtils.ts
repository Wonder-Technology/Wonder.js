import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";

export const getIsTest = (InitConfigDataFromSystem: any) => {
    return InitConfigDataFromSystem.isTest;
}

export const setIsTest = (isTest: boolean, InitConfigDataFromSystem: any) => {
    return IO.of(() => {
        InitConfigDataFromSystem.isTest = isTest;
    });
}
