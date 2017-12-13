import { enthusiasm } from './index';
import { incrementEnthusiasm, decrementEnthusiasm } from '../actions/index';

it('does not modify the original state when incrementing', () => {
  const initialState = { languageName: "Some language", enthusiasmLevel: 0 };
  const finalState = enthusiasm(initialState, incrementEnthusiasm());
  expect(finalState).not.toBe(initialState);
});

it('does not modify the original state when decrementing', () => {
  const initialState = { languageName: "Some language", enthusiasmLevel: 0 };
  const finalState = enthusiasm(initialState, decrementEnthusiasm());
  expect(finalState).not.toBe(initialState);
});

it('increments', () => {
  expect(
    enthusiasm(
      { languageName: "Some language", enthusiasmLevel: 0 },
      incrementEnthusiasm()
    )
  ).toEqual({ languageName: "Some language", enthusiasmLevel: 1 });
});

it('decrements when greater than one', () => {
  expect(
    enthusiasm(
      { languageName: "Some language", enthusiasmLevel: 2 },
      decrementEnthusiasm()
    )
  ).toEqual({ languageName: "Some language", enthusiasmLevel: 1 });
});

it('decrements when one', () => {
  expect(
    enthusiasm(
      { languageName: "Some language", enthusiasmLevel: 1 },
      decrementEnthusiasm()
    )
  ).toEqual({ languageName: "Some language", enthusiasmLevel: 0 });
});

it('decrements only to zero', () => {
  expect(
    enthusiasm(
      { languageName: "Some language", enthusiasmLevel: 0.5 },
      decrementEnthusiasm()
    )
  ).toEqual({ languageName: "Some language", enthusiasmLevel: 0 });
});

it('does not decrement past zero', () => {
  expect(
    enthusiasm(
      { languageName: "Some language", enthusiasmLevel: 0 },
      decrementEnthusiasm()
    )
  ).toEqual({ languageName: "Some language", enthusiasmLevel: 0 });
});

it('does not decrement past zero', () => {
  expect(
    enthusiasm(
      { languageName: "Some language", enthusiasmLevel: 0 },
      decrementEnthusiasm()
    )
  ).toEqual({ languageName: "Some language", enthusiasmLevel: 0 });
});
