import reduce from './index';
import { StoreState } from '../types/index'
import { setGroup } from '../actions/index';

const stateFixture: StoreState = {
  group: 'initial group',
  currentPlanID: 'plan id',
  plans: {}
};

it('does not modify the original state when setting the group', () => {
  const initialState = { ...stateFixture };
  const finalState = reduce(initialState, setGroup('final group'));
  expect(finalState).not.toBe(initialState);
});

it('sets the group', () => {
  expect(
    reduce(
      stateFixture,
      setGroup('final group')
    )
  ).toEqual({ ...stateFixture, group: 'final group' });
});
