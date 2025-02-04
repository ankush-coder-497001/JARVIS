const express  = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const { exec } = require('child_process');
const robot  = require('robotjs')
const bodyParser = require('body-parser');
const { GenerateContent } = require('./Ai');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
//routes

app.post('/generate', async (req,res)=>{
  const {text} = req.body;
  try {
    const result = await GenerateContent(text);
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
})


const platform = process.platform;

// Function to open an application
const openApp = (appName) => {
    let command;

    // Determine the command based on the platform
    if (platform === 'win32') {
        command = `start ${appName}`;
    } else if (platform === 'darwin') {
        command = `open -a "${appName}"`;
    } else if (platform === 'linux') {
        command = `${appName}`;
    } else {
        throw new Error('Unsupported platform!');
    }

    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(`Error: Unable to open "${appName}". Make sure it's installed and available.`);
                return;
            }
            resolve(`opening "${appName}"!`);
        });
    });
};

// Route to open an app
app.post('/open-app', async (req, res) => {
    const { appName } = req.body;

    if (!appName) {
        return res.status(400).json({ error: 'Application name is required.' });
    }

    try {
        const message = await openApp(appName);
        res.status(200).json({ message });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// // Route for pressing keys
// app.post('/key', (req, res) => {
//     const { command } = req.body;

//     switch (command.toLowerCase()) {
//         case "close":
//             robot.keyTap("f4", ["alt"]);
//             res.send("Closed the current window.");
//             break;

//         case "switch window":
//             robot.keyTap("tab", ["alt"]);
//             res.send("Switched to the next window.");
//             break;

//         case "restart system":
//         case "restart":
//             exec("shutdown -r -t 0", (err) => {
//                 if (err) res.status(500).send("Failed to restart system.");
//                 else res.send("Restarting system...");
//             });
//             break;

//         case "shutdown system":
//         case "shut down":
//             exec("shutdown -s -t 0", (err) => {
//                 if (err) res.status(500).send("Failed to shut down system.");
//                 else res.send("Shutting down system...");
//             });
//             break;

//         case "lock screen":
//             if (process.platform === "win32") {
//                 robot.keyTap("l", ["win"]);
//             } else {
//                 robot.keyTap("q", ["control", "command"]);
//             }
//             res.send("Locked the screen.");
//             break;

//         case "minimize all":
//             if (process.platform === "win32") {
//                 robot.keyTap("d", ["win"]);
//             } else {
//                 robot.keyTap("f11", ["command"]);
//             }
//             res.send("Minimized all windows.");
//             break;

//         case "volume up":
//             robot.keyTap("audio_vol_up");
//             res.send("Increased volume.");
//             break;

//         case "volume down":
//             robot.keyTap("audio_vol_down");
//             res.send("Decreased volume.");
//             break;

//         case "mute volume":
//         case "mute":
//             robot.keyTap("audio_mute");
//             res.send("Muted volume.");
//             break;

//         case "play or pause media":
//             robot.keyTap("audio_play");
//             res.send("Toggled play/pause for media.");
//             break;

//         case "next track":
//             robot.keyTap("audio_next");
//             res.send("Skipped to the next track.");
//             break;

//         case "previous track":
//             robot.keyTap("audio_prev");
//             res.send("Went back to the previous track.");
//             break;

//         case "copy text":
//             robot.keyTap("c", ["control"]);
//             res.send("Copied text.");
//             break;

//         case "paste text":
//             robot.keyTap("v", ["control"]);
//             res.send("Pasted text.");
//             break;

//         case "cut text":
//             robot.keyTap("x", ["control"]);
//             res.send("Cut text.");
//             break;

//         case "select all text":
//             robot.keyTap("a", ["control"]);
//             res.send("Selected all text.");
//             break;

//         case "find text":
//             robot.keyTap("f", ["control"]);
//             res.send("Opened the find text dialog.");
//             break;

//         default:
//             res.status(400).send("Command not recognized.");
//     }
// });


// Route for mouse actions
app.post('/mouse-action', (req, res) => {
    const { action , scrollAmount ,x , y } = req.body;

    try {
        switch (action.toLowerCase()) {
            case 'move':
                // Move mouse to specified (x, y) coordinates
                robot.moveMouse(x || 0, y || 0);
                break;
            case 'click':
                // Left mouse click
                robot.mouseClick();
                break;
            case 'right click':
                // Right mouse click
                robot.mouseClick('right');
                break;
            case 'up':
                // Scroll up
                robot.scrollMouse(0, scrollAmount || 100);
                break;
            case 'down':
                // Scroll down
                robot.scrollMouse(0, -(scrollAmount || 100));
                break;
            case 'drag':
                // Simulate mouse drag from current position to (x, y)
                const currentPos = robot.getMousePos();
                robot.mouseToggle('down');
                robot.moveMouseSmooth(x || currentPos.x, y || currentPos.y);
                robot.mouseToggle('up');
                break;
            default:
                return res.status(400).send({ message: 'Invalid mouse action' });
        }

        res.status(200).send({ message: `Performed mouse action: ${action}` });
    } catch (err) {
        res.status(500).send({ message: 'Error performing mouse action', error: err.message });
    }
});




const port = process.env.PORT || 5000
app.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
})

