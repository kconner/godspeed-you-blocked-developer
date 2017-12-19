import * as React from 'react';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';

export interface Props {
  state: StoreState;
}

function component({ state }: Props) {
  return (
    <div>
      <hr />
      <h1>Redux State</h1>
      <ul>
        {
          Object.keys(state).map(key => (
            <li>{key}: {state[key].toString()}</li>
          ))
        }
      </ul>
      <h2>Current Plan</h2>
      <ul>
        <li>{state.plans[state.currentPlanID] ? 'found' : ''}</li>
      </ul>
    </div>
  );
}

const mapStateToProps = (state: StoreState) => ({
  state
});

export default connect(mapStateToProps, undefined)(component);
