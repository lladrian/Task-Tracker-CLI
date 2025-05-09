# CLI Task Tracker

A simple command-line task tracker app built using Node.js that uses a JSON file as a file-based database.

## Features

- Add, Update, and Delete tasks
- Mark a task as in progress or done
- List all tasks
- List all tasks that are done
- List all tasks that are not done
- List all tasks that are in progress

## Installation

1. Make sure you have [Node.js](https://nodejs.org) installed.

2. Clone or download this project.

3. To run use this command : "node cli_task_tracker.js list"
  - Usage: node cli_task_tracker.js <command> [options]
  - Commands:
      -  add <Description> Add a new item
      -  delete <ID>       Delete item by ID 
      -  update <ID>       Update item by ID
      -  mark-done         Update item by ID with status "done"
      -  mark-todo         Update item by ID with status "todo"
      -  mark-in-progress  Update item by ID with status "in-progress"
      -  list todo         List items by filtering the status "todo"
      -  list done         List items by filtering the status "done"
      -  list in-progress  List items by filtering the status "in-progress"
      -  list              List all items
      -  help              Show this help message

4. https://roadmap.sh/projects/task-tracker
