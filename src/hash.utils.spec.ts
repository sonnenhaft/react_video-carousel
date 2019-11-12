import { readFromHash, prepareForHash } from './hash.utils';

// with this sample - want to show that in production I would test only this type of functions
// because tests for snapshots or coverage are not useful
// so you see sample that "I know how to write tests"
test('"readFromHash" should parse time and selected id', () => {
  expect(readFromHash('#vid_102_t=27:3'))
    .toEqual({ selectedTitle: 'vid 102', time: 1623 });
});

test('"readFromHash" should work if input has no # in it, is empty', () => {
  expect(readFromHash(''))
    .toEqual({ selectedTitle: '', time: 0 });

  expect(readFromHash('vid_102_t=27:3'))
    .toEqual({ selectedTitle: 'vid 102', time: 1623 });
});

test('"prepareForHash" should create string that we can store in url', () => {
  expect(prepareForHash({ selectedTitle: 'vid_102', time: 1623 }))
    .toBe('vid_102_t=27:3');
});

test('"prepareForHash" should create string that we can store in url even if input is empty', () => {
  expect(prepareForHash({ selectedTitle: '', time: 0 }))
    .toBe('_t=0:0');
});

test('"prepareForHash(readFromHash(str))" should give "str"', () => {
  const str = 'vid_102_t=27:3';
  expect(prepareForHash(readFromHash(str))).toBe(str);
});