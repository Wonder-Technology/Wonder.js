
uint convertBufferTwoDIndexToOneDIndex(uint twoDIndexX, uint twoDIndexY,
                                       uint bufferSizeX) {
  return twoDIndexY * bufferSizeX + twoDIndexX;
}