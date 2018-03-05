import reduce from './index'
import { StoreState } from '../types/index'
import { setCurrentPlanID } from '../actions/index'

const stateFixture: StoreState = {
  currentPlanID: 'initial plan ID',
  plans: {}
}

it('does not modify the original state when setting the current plan ID', () => {
  const initialState = { ...stateFixture }
  const finalState = reduce(initialState, setCurrentPlanID('final plan ID'))
  expect(finalState).not.toBe(initialState)
})

it('sets the current plan ID', () => {
  expect(
    reduce(
      stateFixture,
      setCurrentPlanID('final plan ID')
    )
  ).toEqual({ ...stateFixture, currentPlanID: 'final plan ID' })
})
