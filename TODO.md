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
- [ ] Prerequisite tasks
    - [x] Research and prototype a little
    - [x] Represent them visually with SVG paths
    - [x] Create them by dragging out from the right edge of a card
    - [x] Modify them by dragging back from the left edge of a card
    - [ ] Destroy them by dragging to the background
    - [ ] Improve the appearance of multiple incoming arrows
        - Incoming arrows (prerequisites) are arranged top to bottom on the left edge
        - Order is established based on the Y coordinate of prerequisites, with X breaking ties
        - X might need to break ties in opposite directions above / below center, so if you make a square… just trust me
- [ ] Store state in browser local storage
