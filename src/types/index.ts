import * as uuid from 'uuid';

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

export interface Size {
  width: number;
  height: number;
}

export enum TaskStatus {
  blocked = 'blocked',
  doable = 'doable',
  done = 'done',
}

export const newPlan = (id: string): Plan => (
  {
    id,
    tasks: {}
  }
);

export const newTask = (location: Point): Task => (
  {
    id: uuid.v4(),
    title: '',
    assignee: '',
    location,
    isDone: false,
    prerequisiteTaskIDs: []
  }
);

const gridSize = 50;

export const snapToGrid = (point: Point): Point => (
  {
    x: Math.round(point.x / gridSize) * gridSize,
    y: Math.round(point.y / gridSize) * gridSize,
  }
);

export const nonemptyPlanIDsInState = (state: StoreState): string[] =>
  Object.keys(state.plans)
    .filter(planID => {
      const plan = state.plans[planID];
      return plan && 0 < Object.keys(plan.tasks).length;
    })
    .sort();

export const tasksInPlan = (plan: Plan): Task[] =>
  definedElementsOfArray(
    Object.keys(plan.tasks).map(taskID => plan.tasks[taskID])
  );

export const prerequisitesForTaskInPlan = (task: Task, plan: Plan): Task[] =>
  definedElementsOfArray(
    task.prerequisiteTaskIDs.map(prerequisiteTaskID => plan.tasks[prerequisiteTaskID])
  );

export const prerequisitesOrderedForTask = (prerequisites: Task[], task: Task) =>
  [...prerequisites].sort((lhs, rhs) =>
    slopeFromTaskToPrerequisite(task, rhs) - slopeFromTaskToPrerequisite(task, lhs)
  );

const slopeFromTaskToPrerequisite = (task: Task, prerequisite: Task): number => {
  const p0 = task.location;
  const p1 = prerequisite.location;
  const vector = {
    x: p1.x - p0.x,
    y: p1.y - p0.y
  };
  const slope = vector.y / vector.x;
  return isFinite(slope) ? slope : 1000;
};

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
