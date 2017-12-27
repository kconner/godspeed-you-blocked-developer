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
    - [ ] Use drag and drop to create them
        - I will need handles on Task cards to drag from and to
        - Drag from the first task's right side (output) to the second task's right side (input)
        - Outgoing arrows all spring from the right center where the handle is
        - Incoming arrows (prerequisites) are arranged top to bottom on the left edge
            - Order is established based on the Y coordinate of prerequisites, with X breaking ties
            - X might need to break ties in opposite directions above / below center, so if you make a square… just trust me
    - [ ] Destroy them somehow
        - I will need click targets for deleting dependencies
        - Or maybe I can reuse drag handles if I'm clever
        - Since you create by dragging left to right, you can destroy by dragging right to left
        - That is, each prerequisite arrowhead pointing into the left side of a task card is also the drag handle used to either relocate it (drop on another card) or delete it (drop in the background)
        - OK. So that means I can make prerequisites' arrows in SVG, drawn in the background, and the only things I need in the DOM otherwise are the outgoing handle for creating and the incoming handle for redirecting / deleting
- [ ] Store state in browser local storage
