import { fatal } from "../log/Log";

export let createIdentityMatrix4 = () => {
  return new Float32Array([
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
  ]);
}

export let invert = (resultFloat32Arr, mat) => {
  var a00 = mat[0];
  var a01 = mat[1];
  var a02 = mat[2];
  var a03 = mat[3];
  var a10 = mat[4];
  var a11 = mat[5];
  var a12 = mat[6];
  var a13 = mat[7];
  var a20 = mat[8];
  var a21 = mat[9];
  var a22 = mat[10];
  var a23 = mat[11];
  var a30 = mat[12];
  var a31 = mat[13];
  var a32 = mat[14];
  var a33 = mat[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  var match = det;
  if (match === 0) {
    fatal("det shouldn\'t be 0.");
  }
  det = 1.0 / det;
  resultFloat32Arr[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  resultFloat32Arr[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  resultFloat32Arr[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  resultFloat32Arr[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  resultFloat32Arr[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  resultFloat32Arr[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  resultFloat32Arr[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  resultFloat32Arr[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  resultFloat32Arr[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  resultFloat32Arr[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  resultFloat32Arr[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  resultFloat32Arr[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  resultFloat32Arr[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  resultFloat32Arr[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  resultFloat32Arr[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  resultFloat32Arr[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

  return resultFloat32Arr;
}