"use strict";

var _CSSTokenizer = require("./CSSTokenizer");

test('should tokenize the value', function () {
  expect(new _CSSTokenizer.CSSTokenizer().tokenize('')).toEqual([]);
  expect(new _CSSTokenizer.CSSTokenizer().tokenize('  ')).toEqual([]);
  expect(new _CSSTokenizer.CSSTokenizer().tokenize('abc')).toEqual(['abc']);
  expect(new _CSSTokenizer.CSSTokenizer().tokenize(' abc')).toEqual(['abc']);
  expect(new _CSSTokenizer.CSSTokenizer().tokenize(' abc  ')).toEqual(['abc']);
  expect(new _CSSTokenizer.CSSTokenizer().tokenize('a')).toEqual(['a']);
  expect(new _CSSTokenizer.CSSTokenizer().tokenize('test()')).toEqual(['test()']);
  expect(new _CSSTokenizer.CSSTokenizer().tokenize('abc def')).toEqual(['abc', 'def']);
  expect(new _CSSTokenizer.CSSTokenizer().tokenize('ab cd ef ')).toEqual(['ab', 'cd', 'ef']);
  expect(new _CSSTokenizer.CSSTokenizer().tokenize('abc test(1, 2,  3 )')).toEqual(['abc', 'test(1, 2,  3 )']);
  expect(new _CSSTokenizer.CSSTokenizer().tokenize('abc "def"')).toEqual(['abc', 'def']);
  expect(new _CSSTokenizer.CSSTokenizer().tokenize("ab 'cd' ef ")).toEqual(['ab', 'cd', 'ef']);
  expect(new _CSSTokenizer.CSSTokenizer().tokenize('"abc test(1, 2,  3 )"')).toEqual(['abc test(1, 2,  3 )']);
  expect(new _CSSTokenizer.CSSTokenizer().tokenize('abc "test(1, 2,  3 )"')).toEqual(['abc', 'test(1, 2,  3 )']);
  expect(new _CSSTokenizer.CSSTokenizer().tokenize('abc "test(1, 2,  3 )')).toEqual(['abc', 'test(1, 2,  3 )']);
});