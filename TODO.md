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
- [ ] Create a data model
    - [ ] Plan
        - [ ] id: string
        - [ ] tasks: [Task]
    - [ ] Task
        - [ ] id: string
        - [ ] title: string
        - [ ] assignee: string
        - [ ] location: x: number, y: number
        - [ ] isDone: boolean
        - [ ] prerequisiteTaskIDs: [Task.ID]
        - [ ] status(): blocked, doable, or done
- [ ] Build semantic markup components
    - …
- [ ] Style it
    - …
- [ ] Store state in browser local storage
