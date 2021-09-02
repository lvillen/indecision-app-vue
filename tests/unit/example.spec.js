describe('Example Component', () => {
  test('Should be more than 10', () => {
    //Arrange
    let value = 9;

    //Act
    value += 2;

    //Assert
    expect(value).toBeGreaterThan(10);
  });
});