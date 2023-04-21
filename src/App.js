import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Content from "./components/Content";

// For whatever reason this is here now
// Returns random color
function getRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
}

// Initialize and set variables
let effectiveKeyword = "keyword";
let currentRollAmount = 0;
let neededRerollRepeats = 1;

// Set up tmi.js
const tmi = require("react-tmi");
const twclient = new tmi.Client({
  options: { debug: false },
  channels: [],
});

// Connect to twitch chat
twclient.connect();

// Base app functions
function App() {
  // Constant states used for react
  const [streamername, setStreamer] = useState([]);
  const [eligibleUsers, setUsers] = useState([]);
  const [chatMessages, setChat] = useState([]);
  const [picked, setPicked] = useState([]);

  // Handle when user changes the keyword
  const setKeyword = (keyword) => {
    setUsers([]);
    setPicked([]);
    effectiveKeyword = keyword.keyword.toLowerCase();
  };

  // Handle detecting users who have said the keyword
  const addDetectedUser = (username, isSub) => {
    if (!eligibleUsers.some((user) => user["username"] === username)) {
      // set random id
      let id = Math.floor(Math.random() * 10000000000) + 1;

      // UNUSED FOR NOW, DON'T MIND THIS
      // if random id already exist, randomize a new one
      // for (let i = 0; i < 69; i++) {
      //   if (eligibleUsers.some((user) => user.id === id)) {
      //     id = Math.floor(Math.random() * 10000000000) + 1;
      //   }
      // }

      // construct new user object
      const newUser = { id, username, isSub };
      // set user object into eligibleUsers array
      setUsers([...eligibleUsers, newUser]);
    }
  };

  // Handle adding chat to state
  const addChatToScreen = (username, message, isSub) => {
    const id = Math.floor(Math.random() * 1000000000000) + 1;
    const brightness = false;
    const color = getRandomColor();
    const newChat = { id, username, message, color, brightness, isSub };
    if (chatMessages.length >= 30) {
      chatMessages.shift();
    }
    setChat([...chatMessages, newChat]);
  };

  // Handle deleting selected rolled user
  const deleteUser = (id) => {
    setUsers(eligibleUsers.filter((user) => user.id !== id));
  };

  // Handle when messages happen, run functions with inputs
  useEffect(() => {
    // On message do stuff
    twclient.on("message", (channel, tags, message, self) => {
      if (self) return;

      let isSub = false;
      if (tags.badges) {
        isSub = "subscriber" in tags.badges || "founder" in tags.badges;
      }

      addChatToScreen(tags.username, message, isSub);

      let messageLower = message.toLowerCase();
      if (messageLower.includes(effectiveKeyword.toLowerCase())) {
        addDetectedUser(tags.username, isSub);
      }

      twclient.removeAllListeners(["message"]);
      return;
    });
  });

  // Returns an array of things
  function getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len) {
      alert("Try again.");
      return;
    }
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  // Handle what happens when user rolls
  const onRoll = (setAmount) => {
    // Initialize variables
    let subsInRoll = [];
    let plebsInRoll = [];
    let finalRollers = [];
    let plebamount = 0;
    let subamount = 0;

    // Separates subscribers and "plebs" into their own arrays for ultra convoluted sub luck system (tm)
    subsInRoll = eligibleUsers.filter((user) => user.isSub !== false);
    plebsInRoll = eligibleUsers.filter((user) => user.isSub !== true);

    // Set amount of users currently rolled
    currentRollAmount = setAmount.amount;

    // Check if there are enough eligible users to be picked
    if (eligibleUsers.length >= currentRollAmount) {
      for (let i = 0; i < setAmount.amount; i++) {
        let randomint = Math.random() * 100 * (0.4 * setAmount.luckamount);
        if (randomint < 50) {
          plebamount++;
        } else {
          subamount++;
        }
      }

      // Set total amount of users
      let totalamount = plebamount + subamount;

      // Check if there are enough eligible subscribers for the amount needed, add "plebs" to compensate and vice versa
      if (subsInRoll.length < subamount) {
        subamount = subsInRoll.length;
        totalamount = plebamount + subamount;
        plebamount = +Math.abs(setAmount.amount - totalamount);
      } else if (plebsInRoll.length < plebamount) {
        plebamount = plebsInRoll.length;
        totalamount = plebamount + subamount;
        subamount = +Math.abs(setAmount.amount - totalamount);
      }

      // Set finalRollers variable
      finalRollers = getRandom(plebsInRoll, plebamount).flat().concat(getRandom(subsInRoll, subamount).flat()).flat();

      // Only override picked if there are enough eligible users to be picked from
      if (finalRollers.length === setAmount.amount) {
        setPicked([]);
        setPicked(finalRollers);
      }
    } else {
      alert("Not enough eligible users.");
    }
  };

  // Handle what happens when user rerolls a specified ID in a hyper convoluted way
  const onReroll = (id) => {
    // Filter out picked who are null (for some reason)
    const filteredPicked = picked.filter((usr) => usr !== null);

    // Make another array without currently picked using filter
    const eligibleUsersWithoutCurrents = eligibleUsers.filter(function (el) {
      return picked.indexOf(el) < 0;
    });

    // Set reroll amounts (does not work as intended, may be fixed at a later date)
    if (currentRollAmount > filteredPicked.length) {
      neededRerollRepeats = +Math.abs(filteredPicked.length - currentRollAmount);
    }

    // Reroll people as needed
    for (let i = 0; i < neededRerollRepeats; i++) {
      if (eligibleUsers.length >= picked.length + 1) {
        let newPicked = filteredPicked
          .filter((user) => user.id !== id)
          .flat()
          .concat(getRandom(eligibleUsersWithoutCurrents, 1).flat())
          .flat();
        newPicked = [...new Set(newPicked)];

        // Extra filtering just in case to avoid spamming erros
        newPicked = newPicked.filter(function (el) {
          return el !== null && typeof el === "object" && el !== undefined;
        });

        // Set picked
        setPicked(newPicked);

        // Remove the rerolled person from eligible users
        setUsers(eligibleUsers.filter((user) => user.id !== id));
      } else {
        alert("Not enough eligible users.");
      }
    }
  };

  // Handle what happens when user submits a streamer
  const onChangeStreamer = (streamer) => {
    if (!(streamername[0] === [streamer.streamer][0])) {
      setStreamer([streamer.streamer]);
      //console.log(twclient.getChannels().length);
      if (twclient.getChannels().length > 0) {
        twclient.part(twclient.getChannels()[0]);
      }
      setChat([]);
      setUsers([]);
      setPicked([]);
      twclient.join("#" + [streamer.streamer]);
    }
  };

  return (
    <>
      <Container fluid="md" className="container">
        <Header onRoll={onRoll} kwChange={effectiveKeyword} smChange={streamername} />
        <Content
          eligibleUsers={eligibleUsers}
          chatMessages={chatMessages}
          setKeyword={setKeyword}
          onDelete={deleteUser}
          picked={picked}
          onChangeStreamer={onChangeStreamer}
          onReroll={onReroll}
        />

        <div className="footer">
          &copy;artyknots 2021<br></br>whats a twitch?
        </div>
      </Container>
    </>
  );
}

export default App;
