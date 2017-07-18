export class ShaderData {
    public static index: number = null;
    public static count: number = null;

    public static shaderLibWholeNameMap: ShaderLibWholeNameMap = null;
}

export type ShaderLibWholeNameMap = {
    [shaderLibWholeName: string]: number
}
