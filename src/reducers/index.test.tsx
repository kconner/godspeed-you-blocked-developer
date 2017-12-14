import reduce from './index';
import { incrementEnthusiasm, decrementEnthusiasm } from '../actions/index';

it('does not modify the original state when incrementing', () => {
  const initialState = { group: "Some group", languageName: "Some language", enthusiasmLevel: 0 };
  const finalState = reduce(initialState, incrementEnthusiasm());
  expect(finalState).not.toBe(initialState);
});

it('does not modify the original state when decrementing', () => {
  const initialState = { group: "Some group", languageName: "Some language", enthusiasmLevel: 0 };
  const finalState = reduce(initialState, decrementEnthusiasm());
  expect(finalState).not.toBe(initialState);
});

it('increments', () => {
  expect(
    reduce(
      { group: "Some group", languageName: "Some language", enthusiasmLevel: 0 },
      incrementEnthusiasm()
    )
  ).toEqual({ group: "Some group", languageName: "Some language", enthusiasmLevel: 1 });
});

it('decrements when greater than one', () => {
  expect(
    reduce(
      { group: "Some group", languageName: "Some language", enthusiasmLevel: 2 },
      decrementEnthusiasm()
    )
  ).toEqual({ group: "Some group", languageName: "Some language", enthusiasmLevel: 1 });
});

it('decrements when one', () => {
  expect(
    reduce(
      { group: "Some group", languageName: "Some language", enthusiasmLevel: 1 },
      decrementEnthusiasm()
    )
  ).toEqual({ group: "Some group", languageName: "Some language", enthusiasmLevel: 0 });
});

it('decrements only to zero', () => {
  expect(
    reduce(
      { group: "Some group", languageName: "Some language", enthusiasmLevel: 0.5 },
      decrementEnthusiasm()
    )
  ).toEqual({ group: "Some group", languageName: "Some language", enthusiasmLevel: 0 });
});

it('does not decrement past zero', () => {
  expect(
    reduce(
      { group: "Some group", languageName: "Some language", enthusiasmLevel: 0 },
      decrementEnthusiasm()
    )
  ).toEqual({ group: "Some group", languageName: "Some language", enthusiasmLevel: 0 });
});

it('does not decrement past zero', () => {
  expect(
    reduce(
      { group: "Some group", languageName: "Some language", enthusiasmLevel: 0 },
      decrementEnthusiasm()
    )
  ).toEqual({ group: "Some group", languageName: "Some language", enthusiasmLevel: 0 });
});
