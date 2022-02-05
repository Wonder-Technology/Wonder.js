let componentName = "PBRMaterial"

// @genType
// type dataName =
//   | @as(0) DiffuseColor
//   | @as(1) Specular

type dataName = {diffuseColor: int, specular: int}

// let \"DataName" = {
//   // let dataName = {
//   "DiffuseColor": 0,
//   "Specular": 1,
// }
let dataName = {
  diffuseColor: 0,
  specular: 1,
}

type dataNameType = int

type diffuseColor = (float, float, float)

type specular = float

type pbrMaterial = int