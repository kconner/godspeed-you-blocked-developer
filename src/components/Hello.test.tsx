import * as React from 'react';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Hello from './Hello';

enzyme.configure({ adapter: new Adapter() });

it('renders the correct text when no enthusiasm level is given', () => {
  const hello = enzyme.shallow(<Hello name="Daniel" />);
  expect(hello.find('.greeting').text()).toEqual('Hello Daniel!');
});

it('renders the correct text with an explicit enthusiasm of 1', () => {
  const hello = enzyme.shallow(<Hello name="Daniel" enthusiasmLevel={1} />);
  expect(hello.find('.greeting').text()).toEqual('Hello Daniel!');
});

it('renders the correct text with an explicit enthusiasm of 5', () => {
  const hello = enzyme.shallow(<Hello name="Daniel" enthusiasmLevel={5} />);
  expect(hello.find('.greeting').text()).toEqual('Hello Daniel!!!!!');
});

it('throws when the enthusiasm level is 0', () => {
  expect(() => {
    enzyme.shallow(<Hello name="Daniel" enthusiasmLevel={0} />);
  }).toThrow();
});

it('throws when the enthusiasm level is -1', () => {
  expect(() => {
    enzyme.shallow(<Hello name="Daniel" enthusiasmLevel={-1} />);
  }).toThrow();
});

it('fires onIncrement when the increment button is clicked', () => {
  const callback = jest.fn();
  const hello = enzyme.shallow(<Hello name="Daniel" onIncrement={callback} />);
  hello.find('button').first().simulate('click')
  expect(callback).toHaveBeenCalled()
});

it('fires onDecrement when the decrement button is clicked', () => {
  const callback = jest.fn();
  const hello = enzyme.shallow(<Hello name="Daniel" onDecrement={callback} />);
  hello.find('button').at(1).simulate('click')
  expect(callback).toHaveBeenCalled()
});
