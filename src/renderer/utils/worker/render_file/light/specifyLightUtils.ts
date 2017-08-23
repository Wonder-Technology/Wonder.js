export var getColorDataSize = () => 3;

export var getDirtyDataSize = () => 1;

export var isDirty = (value) => value === 0;

export var cleanDirty = (index: number, isDirtys: Uint8Array) => {
    isDirtys[index] = 1;
}

