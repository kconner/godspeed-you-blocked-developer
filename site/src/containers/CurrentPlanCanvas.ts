import Canvas from '../components/Canvas'
import * as actions from '../actions/index'
import { StoreState } from '../types/index'
import { connect, Dispatch } from 'react-redux'
import { Point } from '../types'

const mapStateToProps = ({ plans, currentPlanID }: StoreState) => ({
  plan: plans[currentPlanID]
})

const mapDispatchToProps = (dispatch: Dispatch<actions.Action>) => ({
  // Can I accomplish this with some partial appliation pattern?
  addTask: (location: Point) => {
    dispatch(actions.addTask(location))
  },
  setTaskTitle: (taskID: string, value: string) => {
    dispatch(actions.setTaskTitle(taskID, value))
  },
  setTaskAssignee: (taskID: string, value: string) => {
    dispatch(actions.setTaskAssignee(taskID, value))
  },
  setTaskLocation: (taskID: string, value: Point) => {
    dispatch(actions.setTaskLocation(taskID, value))
  },
  setTaskDone: (taskID: string, value: boolean) => {
    dispatch(actions.setTaskDone(taskID, value))
  },
  addPrerequisiteTask: (prerequisiteTaskID: string, taskID: string) => {
    dispatch(actions.addPrerequisiteTask(prerequisiteTaskID, taskID))
  },
  removePrerequisiteTask: (prerequisiteTaskID: string, taskID: string) => {
    dispatch(actions.removePrerequisiteTask(prerequisiteTaskID, taskID))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
