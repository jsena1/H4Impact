require('dotenv').config()
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const { TwoBttnsApi } = require("@2bttns/sdk");

const cors = require("cors");
app.use(cors());

//TODO: map keys to values
const twobttns = new TwoBttnsApi({
    //clt27wap00008a8cua8kio7si
    //  appId: process.env.TWOBTTNS_APP_ID,

  appId: process.env.TWOBTTNS_APP_ID,
  secret: process.env.TWOBTTNS_APPSECRET,
  url: process.env.TWOBTTNS_CONSOLE
});


app.get('/generate-game-url', async (req, res) => {
    try {
      const url = twobttns.generatePlayUrl({
        //clt27wap00008a8cua8kio7si
        //gameId: "engineering-interest-game",

        gameId: "clt27wap00008a8cua8kio7si",
        playerId: "client-player",
        numItems: ALL,
        callbackUrl: "http://localhost:3002/profile",
      });
      res.send({ gameUrl: url });
    } catch (error) {
      console.error('Error generating game URL:', error);
      res.status(500).send('Error generating game URL');
    }
  });
  
// explicitly serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

// Generate game URL
app.get('/generate-game-url', async (req, res) => {
    try {
      const url = twobttns.generatePlayUrl({
        gameId: "clt27wap00008a8cua8kio7si",
        playerId: "client-player",
        numItems: ALL,
        callbackUrl: "http://localhost:3002/profile",
      });
      res.send({ gameUrl: url });
    } catch (error) {
      console.error('Error generating game URL:', error);
      res.status(500).send('Error generating game URL');
    }
  });
  
  // Retrieve scores
  app.get('/scores', async (req, res) => {
    const { player_id } = req.query
    try {
      const { data } = await twobttns.callApi("/games/getPlayerScores", "get", {
        player_id: player_id,
        game_id: "hobbies-ranker"
      });
      res.send({
        data
      })
    } catch (error) {
      // Handle error
    }
  });

  // Provides ranked results, we would take the top one from here
  const { data } = await twobttns.callApi("/game-objects/ranked", "get", {
    playerId: "client-player", //Make dynamic with a ${string}
    inputTarg: "id-of-input-tag", 
    outputTag: "id-of-input-tag"
    });  

    // Anticipated example output 
    // {
    //     "scores": [
    //       {
    //         "gameObject": {
    //           "id": "string",
    //           "name": "string"  Ex: gameDev, softwareDev
    //         },
    //         "score": 1
    //       }
    //     ]
    //   }


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
