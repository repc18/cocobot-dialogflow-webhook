const { WebhookClient, Card } = require("dialogflow-fulfillment");
const axios = require("axios");

async function getNewsIntent(agent) {
  try {
    const response = await axios.get(
      "https://covid-data-scrapper.herokuapp.com/news"
    );
    const data = response.data.data;
    agent.add("Sure, here is the latest news from CDC");
    for (const key in data) {
      console.log(`The key ${key} has value of ${data[key]}`);
      agent.add(
        new Card({
          title: key,
          buttonText: "Click to read the news",
          buttonUrl: data[key],
        })
      );
    }
  } catch (error) {
    console.error(error);
  }
}

async function getInfectedData(agent) {
  try {
    const response = await axios.get(
      "https://covid-data-scrapper.herokuapp.com/infected"
    );
    const data = response.data.data;
    agent.add("The current data we have is");
    for (const key in data) {
      console.log(`${key} : ${data[key]}`);
      agent.add(`${key} : ${data[key]}`);
    }
  } catch (error) {
    console.error(error);
  }
}

async function getLocalCase(agent) {
  try {
    const response = await axios.get(
      "https://covid-data-scrapper.herokuapp.com/city-data"
    );
    const data = response.data.data;
    agent.add("The current number of case in each city is");
    for (const city in data) {
      console.log(`${city} has ${data[city]} positive cases`);
      agent.add(`${city} has ${data[city]} positive cases`);
    }
  } catch (error) {
    console.error(error);
  }
}

exports.webhookHandler = (req, res) => {
  // get agent from request
  let agent = new WebhookClient({ request: req, response: res });

  // create intent map for handle intent
  let intentMap = new Map();

  // add intent map 2nd parameter pass function
  intentMap.set("Get News", getNewsIntent);
  intentMap.set("Get Infected", getInfectedData);
  intentMap.set("Get Local Data", getLocalCase);

  // now agent handle request and pass intent map
  agent.handleRequest(intentMap);
};
