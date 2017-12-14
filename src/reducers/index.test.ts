import reduce from './index';
import { setGroup } from '../actions/index';

it('does not modify the original state when setting the group', () => {
  const initialState = { group: 'initial group' };
  const finalState = reduce(initialState, setGroup('final group'));
  expect(finalState).not.toBe(initialState);
});

it('sets the group', () => {
  expect(
    reduce(
      { group: 'initial group' },
      setGroup('final group')
    )
  ).toEqual({ group: 'final group' });
});
