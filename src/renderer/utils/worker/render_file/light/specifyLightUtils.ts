export const getColorDataSize = () => 3;

export const getDirtyDataSize = () => 1;

export const isDirty = (value) => value === 0;

export const cleanDirty = (index: number, isDirtys: Uint8Array) => {
    isDirtys[index] = 1;
}

