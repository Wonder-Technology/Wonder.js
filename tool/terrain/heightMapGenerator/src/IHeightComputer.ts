export interface IHeightComputer{
    generateHeightData(width:number, height:number, iterationCount:number, smoothLevel:number):Array<number>;
}
