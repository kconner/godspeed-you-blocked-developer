import Select from '../components/Select'
import * as actions from '../actions/index'
import { StoreState, nonemptyPlanIDsInState } from '../types/index'
import { connect, Dispatch } from 'react-redux'

const mapStateToProps = (state: StoreState) => ({
  optionValues: nonemptyPlanIDsInState(state),
  value: state.currentPlanID
})

const mapDispatchToProps = (dispatch: Dispatch<actions.Action>) => ({
  onChangeValue: (value: string) => {
    dispatch(actions.setCurrentPlanID(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Select)
