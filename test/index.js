var assert = require('assert');

describe('First Test', () => {
  it('true has to be true', () => {
    assert.equal(true, true);
  });

  it('array[0] will give you the first element of an array', () =>{
    var myArray = ['foo', 'bar', 'baz'];
    assert.equal(myArray[0], 'foo');
  });

  it('Last index of myArray is baz', () =>{
    var myArray = ['foo', 'bar', 'baz'];

    assert.equal(myArray[myArray.length - 1], 'baz');
  });
});
