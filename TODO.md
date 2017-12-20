# Features

- Specify a Plan name
- Create a set of Tasks for the given Plan
- Specify a Title and Assignee for a given Task
- Specify a Location for a given Task: x, y
- Specify a Status for a given Task: blocked, doable, done
- Specify prerequisite Tasks for a given Task
- Drag to rearrange Tasks

# Roadmap

- [x] Set up a React / Redux app
- [x] Create a data model
    - [x] Plan
        - [x] id: string
        - [x] tasks: [Task]
    - [x] Task
        - [x] id: string
        - [x] title: string
        - [x] assignee: string
        - [x] location: x: number, y: number
        - [x] isDone: boolean
        - [x] prerequisiteTaskIDs: [Task.ID]
        - [x] status(): blocked, doable, or done
- [x] Build semantic markup components
    - [x] Canvas contains many TaskCards
    - [x] TaskCard represents a Task
    - [x] TextField
    - [x] Checkbox
- [x] Style it
- [ ] Prerequisites
    - [ ] Represent them visually
    - [ ] Use drag and drop to create them
    - [ ] Destroy them somehow
- [ ] Store state in browser local storage
