export interface StoreState {
  currentPlanID: string;
  plans: {
    [id: string]: Plan | undefined
  };
}

export interface Plan {
  id: string;
  tasks: {
    [id: string]: Task | undefined
  };
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  location: Point;
  isDone: boolean;
  prerequisiteTaskIDs: string[];
}

export interface Point {
  x: number;
  y: number;
}

export enum TaskStatus {
  blocked = 'blocked',
  doable = 'doable',
  done = 'done',
}

export const tasksInPlan = (plan: Plan): Task[] =>
  definedElementsOfArray(
    Object.keys(plan.tasks).map(taskID => plan.tasks[taskID])
  );

export const prerequisitesForTaskInPlan = (task: Task, plan: Plan): Task[] =>
  definedElementsOfArray(
    task.prerequisiteTaskIDs.map(prerequisiteTaskID => plan.tasks[prerequisiteTaskID])
  );

export const statusForTaskInPlan = (task: Task, plan: Plan): TaskStatus =>
  task.isDone
    ? TaskStatus.done
    : prerequisitesForTaskInPlan(task, plan).every(prerequisite => prerequisite.isDone)
      ? TaskStatus.doable
      : TaskStatus.blocked;

// Helpers

const definedElementsOfArray = <T>(array: (T | undefined)[]): T[] =>
  array.reduce(
    (definedElements, element) => {
      if (element) {
        definedElements.push(element);
      }
      return definedElements;
    },
    [] as T[]
  );
