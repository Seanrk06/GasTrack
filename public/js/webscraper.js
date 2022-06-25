const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the page we want to scrape - need to take user input
const city = "santa-barbara";
const state = "california";
// const url = `https://www.gasbuddy.com/gasprices/${state}/${city}`;
// const url = "https://www.gasbuddy.com/gasprices/california/santa-barbara";

// Async function which scrapes the data
async function scrapeGasPriceData(city, state) {
  const url = `https://www.gasbuddy.com/gasprices/${state}/${city}`;
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the items in gas station list
    const listItems = $(
      ".panel__panel___3Q2zW.panel__white___19KTz.colors__bgWhite___1stjL.panel__bordered___1Xe-S.panel__rounded___2etNE.GenericStationListItem-module__station___1O4vF"
    );
    // Stores data for all gas stations in city/state
    const gasStations = [];

    listItems.each((idx, el) => {
      // Object holding data for each gas station
      const gasStation = { name: "", price: 0, address: "" };

      gasStation.name = $(el)
        .children(".GenericStationListItem-module__stationListItem___3Jmn4")
        .children(
          ".StationDisplay-module__mainInfoColumn___1ZBwz.StationDisplay-module__column___3h4Wf"
        )
        .children("h3")
        .children("a")
        .text();
      gasStation.price = $(el)
        .children(".GenericStationListItem-module__stationListItem___3Jmn4")
        .children(
          ".GenericStationListItem-module__priceColumn___UmzZ7.GenericStationListItem-module__column___2Yqh-"
        )
        .children(".StationDisplayPrice-module__priceContainer___J6Ibm")
        .children("span")
        .text();

      gasStation.address = $(el)
        .children(".GenericStationListItem-module__stationListItem___3Jmn4")
        .children(
          ".StationDisplay-module__mainInfoColumn___1ZBwz.StationDisplay-module__column___3h4Wf"
        )
        .children(".StationDisplay-module__address___2_c7v")
        .text();

      gasStations.push(gasStation);
    });
    // Logs countries array to the console
    console.dir(gasStations);
    // Write countries array in countries.json file
    fs.writeFile(
      "../.././data/gasStations.json",
      JSON.stringify(gasStations, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Successfully written data to file");
      }
    );
  } catch (err) {
    console.error(err);
  }
}
// Invoke the above function
scrapeGasPriceData(city, state);
