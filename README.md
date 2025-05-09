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
  - Usage: node cli_task_tracker.js [commands] [options]
  - Commands:
     - **add <Description>**           Add a new item with the specified description.
      - **delete [ID]**                Delete the item with the specified ID.
      - **update [ID]**                Update the item with the specified ID.
      - **mark-done [ID]**             Mark the item with the specified ID as "done".
      - **mark-todo [ID]**             Mark the item with the specified ID as "todo".
      - **mark-in-progress [ID]**      Mark the item with the specified ID as "in-progress".
      - **list todo**                  List items that are filtered by the status "todo".
      - **list done**                  List items that are filtered by the status "done".
      - **list in-progress**           List items that are filtered by the status "in-progress".
      - **list**                       List all items.
      - **help**                       Show this help message.


4. https://roadmap.sh/projects/task-tracker
