#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Path to the JSON file acting as a database
const dbFilePath = path.resolve(__dirname, 'db.json');

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

function printUsage() {
  console.log('Usage: node cli_task_tracker.js <command> [options]');
  console.log('Commands:');
  console.log('  add <item>       Add a new item');
  console.log('  list             List all items');
  console.log('  delete <index>   Delete item by index');
  console.log('  help             Show this help message');
}

// Helper function to load data from the JSON file
function loadData() {
  try {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // If file doesn't exist or is empty, return empty array
    if (err.code === 'ENOENT') {
      return [];
    } else {
      console.error('Error reading database file:', err.message);
      process.exit(1);
    }
  }
}

// Helper function to save data to the JSON file
function saveData(data) {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing database file:', err.message);
    process.exit(1);
  }
}

function getFormattedDate() {
    const now = new Date();
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(now.getDate()).padStart(2, '0');
  
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

function list_by_status(status) {
    const data = loadData();
    const task = data.find(t => t.status == status);
    // Convert the result to an array to get the length
    const taskArray = task ? [task] : []; // If task is found, wrap it in an array; otherwise, use an empty array

    if(status == "") {
        return JSON.stringify(data, null, 2);
    }

    if (taskArray.length === 0) {
        return JSON.stringify(taskArray, null, 2);
    } 

    return JSON.stringify(task, null, 2);
  }



switch (command) {
  case 'add': {
    const description = args.slice(1).join(' ');
    const data = loadData();

    if (!description) {
      console.log('Please provide an description to add.');
      process.exit(1);
    }

    const newTask = {
        id: data.length + 1, // Simple ID generation
        description,
        status : 'in-progress',
        createdAt: getFormattedDate(),
        updatedAt: getFormattedDate()
    };

    data.push(newTask);
    saveData(data);

    console.log(`Added item: "${description}"`);
    break;
  }

  case 'update': {
    const id = parseInt(args[1], 10);
    const description = args.slice(2).join(' ');
    const data = loadData();
    const task = data.find(t => t.id === id);

    if (!task) {
      console.log(`Task with ID ${id} not found.`);
      process.exit(1);
    }

    task.description = description;
    task.updatedAt = getFormattedDate();

    saveData(data);
    console.log(`Updated item: "${JSON.stringify(task, null, 2)}"`);
    break;
  }

  case 'delete': {
    const id = parseInt(args[1], 10);
    const data = loadData();
    const itemIndex = data.findIndex(i => i.id === parseInt(id));

    if (isNaN(id)) {
      console.log('Please provide a valid ID to delete.');
      process.exit(1);
    }

    if (itemIndex === -1) {
        console.log('ID not found.');
        process.exit(1);
    }
 
    const removed = data.splice(itemIndex, 1);
    saveData(data);

    console.log(`Deleted item: "${JSON.stringify(removed[0], null, 2)}"`);
    break;
  }

  case 'mark-done': {
    const id = parseInt(args[1], 10);
    const data = loadData();
    const task = data.find(t => t.id === id);

    if (!task) {
      console.log(`Task with ID ${id} not found.`);
      process.exit(1);
    }

    task.status = "done";

    saveData(data);
    console.log(`Updated item: "${JSON.stringify(task, null, 2)}"`);
    break;
  }

  case 'mark-todo': {
    const id = parseInt(args[1], 10);
    const data = loadData();
    const task = data.find(t => t.id === id);

    if (!task) {
      console.log(`Task with ID ${id} not found.`);
      process.exit(1);
    }

    task.status = "todo";

    saveData(data);
    console.log(`Updated item: "${JSON.stringify(task, null, 2)}"`);
    break;
  }

  case 'mark-in-progress': {
    const id = parseInt(args[1], 10);
    const data = loadData();
    const task = data.find(t => t.id === id);

    if (!task) {
      console.log(`Task with ID ${id} not found.`);
      process.exit(1);
    }

    task.status = "in-progress";

    saveData(data);
    console.log(`Updated item: "${JSON.stringify(task, null, 2)}"`);
    break;
  }

  case 'list': {
    const status_command = args.slice(1).join(' ');

    if(status_command == "done") {
        console.log(list_by_status(status_command));
    } else if(status_command == "todo") {
        console.log(list_by_status(status_command));
    } else if(status_command == "in-progress") {
        console.log(list_by_status(status_command));
    } else if(status_command == "") {
        console.log(list_by_status(status_command));
    } else {
        console.log(`Unknown command: ${status_command}`);
    }

    break;
  }

  case 'help':
  case undefined: {
    printUsage();
    break;
  }

  default: {
    console.log(`Unknown command: ${command}`);
    printUsage();
    process.exit(1);
  }
}

