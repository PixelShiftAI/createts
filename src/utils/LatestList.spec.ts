import { LatestList } from './LatestList';

test('should limit the size', () => {
  const list = new LatestList<number>(3);
  list.add(0).add(1).add(2).add(3);
  expect(list.capacity).toEqual(3);
  expect(list.elements).toEqual([1, 2, 3]);
});
