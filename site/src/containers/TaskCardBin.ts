import TaskCardBin from '../components/TaskCardBin'
import * as actions from '../actions/index'
import { StoreState } from '../types/index'
import { connect, Dispatch } from 'react-redux'

const mapStateToProps = ({ currentPlanID }: StoreState) => ({
    currentPlanID,
})

const mapDispatchToProps = (dispatch: Dispatch<actions.Action>) => ({
    removeTask: (taskID: string) => {
        dispatch(actions.removeTask(taskID))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskCardBin)
