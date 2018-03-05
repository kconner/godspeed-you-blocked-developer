import { Action } from '../actions'
import { StoreState, Plan, Task, newPlan, newTask, snapToGrid } from '../types/index'
import {
  SET_CURRENT_PLAN_ID,
  ADD_TASK,
  REMOVE_TASK,
  SET_TASK_TITLE,
  SET_TASK_ASSIGNEE,
  SET_TASK_LOCATION,
  SET_TASK_DONE,
  ADD_PREREQUISITE_TASK,
  REMOVE_PREREQUISITE_TASK
} from '../constants/index'

export default (state: StoreState, action: Action): StoreState => {
  switch (action.type) {
    case SET_CURRENT_PLAN_ID:
      return { ...state, currentPlanID: action.planID }
    case ADD_TASK:
    case REMOVE_TASK:
    case SET_TASK_TITLE:
    case SET_TASK_ASSIGNEE:
    case SET_TASK_LOCATION:
    case SET_TASK_DONE:
    case ADD_PREREQUISITE_TASK:
    case REMOVE_PREREQUISITE_TASK:
      const { currentPlanID, plans } = state
      if (currentPlanID.length <= 0) {
        return state
      }

      let plan = plans[currentPlanID]
      if (!plan) {
        plan = newPlan(currentPlanID)
      }

      return {
        ...state,
        plans: {
          ...plans,
          [currentPlanID]: reducePlan(plan, action)
        }
      }
    default:
      return state
  }
}

const reducePlan = (plan: Plan, action: Action): Plan => {
  switch (action.type) {
    case ADD_TASK: {
      const { location } = action
      const { tasks } = plan

      const snappedLocation = snapToGrid(location)
      const task = newTask(snappedLocation)

      return {
        ...plan,
        tasks: {
          ...tasks,
          [task.id]: task
        }
      }
    }
    case REMOVE_TASK: {
      const { taskID } = action
      const { tasks } = plan

      const prunedTasks: { [id: string]: Task | undefined } = {}
      window.console.log('one')
      for (const existingTaskID in tasks) {
        // Omit the identified task from the plan
        if (existingTaskID === taskID) {
          continue
        }

        const existingTask = tasks[existingTaskID]
        if (!existingTask) {
          continue
        }

        // Omit the identified task from other tasks' prerequisites
        const prunedPrerequisiteTaskIDs = existingTask.prerequisiteTaskIDs.filter(id => id !== taskID)

        prunedTasks[existingTaskID] = {
          ...existingTask,
          prerequisiteTaskIDs: prunedPrerequisiteTaskIDs
        }
      }

      return {
        ...plan,
        tasks: prunedTasks
      }
    }
    case SET_TASK_TITLE:
    case SET_TASK_ASSIGNEE:
    case SET_TASK_LOCATION:
    case SET_TASK_DONE:
    case ADD_PREREQUISITE_TASK:
    case REMOVE_PREREQUISITE_TASK: {
      const { taskID } = action
      const { tasks } = plan
      const task = tasks[taskID]
      if (!task) {
        return plan
      }

      return {
        ...plan,
        tasks: {
          ...tasks,
          [taskID]: reduceTask(task, action)
        }
      }
    }
    default:
      return plan
  }
}

const reduceTask = (task: Task, action: Action): Task => {
  switch (action.type) {
    case SET_TASK_TITLE:
      const { title } = action
      return { ...task, title }
    case SET_TASK_ASSIGNEE:
      const { assignee } = action
      return { ...task, assignee }
    case SET_TASK_LOCATION:
      const { location } = action
      const snappedLocation = snapToGrid(location)
      return { ...task, location: snappedLocation }
    case SET_TASK_DONE:
      const { isDone } = action
      return { ...task, isDone }
    case ADD_PREREQUISITE_TASK:
      {
        const { prerequisiteTaskID } = action
        if (prerequisiteTaskID === task.id
          || 0 <= task.prerequisiteTaskIDs.indexOf(prerequisiteTaskID)) {
          return task
        }

        return {
          ...task,
          prerequisiteTaskIDs: [...task.prerequisiteTaskIDs, prerequisiteTaskID]
        }
      }
    case REMOVE_PREREQUISITE_TASK:
      {
        const { prerequisiteTaskID } = action
        if (task.prerequisiteTaskIDs.indexOf(prerequisiteTaskID) < 0) {
          return task
        }

        return {
          ...task,
          prerequisiteTaskIDs: task.prerequisiteTaskIDs.filter(id => id !== prerequisiteTaskID)
        }
      }
    default:
      return task
  }
}
