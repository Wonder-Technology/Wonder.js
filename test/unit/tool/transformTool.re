open TransformType;

let isTransform (transform: transform) => {
  open Jest;
  open Expect;
  open! Expect.Operators;
  expect transform >= 0;
};