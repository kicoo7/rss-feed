/**
 * Created by krsterajchevski on 5/2/17.
 */
const express = require('express');
const path = require('path');
const FeedParser = require('feedparser');
const request = require('request'); // for fetching the feed
const cors = require('cors');
const lodash = require('lodash');

/**
 * RSS LINKS
 */
const BBC_WORLD = 'http://feeds.bbci.co.uk/news/world/rss.xml';
const REUTERS_WORLD = 'http://feeds.reuters.com/Reuters/worldNews';
const TECH_CRUNCH = 'http://feeds.feedburner.com/TechCrunch/';
const YAHOO = 'http://news.yahoo.com/rss/';
const FOX_SPORTS = 'https://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU';

const sources = [
  BBC_WORLD,
  REUTERS_WORLD,
  TECH_CRUNCH,
  YAHOO,
  FOX_SPORTS,
];

const app = express();

app.use(cors());

/**
 * Returns the RSS feed data from the given souce
 * @param source
 * @returns {Promise}
 */
function getDatafromSource(source) {
  return new Promise((resolve, reject) => {
    const rssRequest = request(source);
    const feedparser = new FeedParser([]);

    const data = [];
    rssRequest.on('error', (error) => {
      // handle any request errors
      console.log(error);
      reject(error);
    });

    rssRequest.on('response', (response) => {
      if (response.statusCode !== 200) {
        console.log('Error');
        reject('Error');
      } else {
        response.pipe(feedparser);
      }
    });

    feedparser.on('error', (error) => {
      console.log(error);
      reject(error);
      // always handle errors
    });

    feedparser.on('readable', () => {
      // This is where the action is!
      // `this` is `feedparser`, which is a stream
      const meta = feedparser.meta;
      let item;

      while (item = feedparser.read()) {
        let photo = '';
        if (item.image && item.image.url) {
          photo = item.image.url;
        } else if (item.enclosures[0] && item.enclosures[0].url) {
          photo = item.enclosures[0].url;
        } else if (meta.image && meta.image.url) {
          photo = meta.image.url;
        }

        data.push({
          from: meta.title,
          title: item.title,
          description: item.description.replace(/<(?:.|\n)*?>/gm, ''),
          date: new Date(item.date),
          link: item.link,
          photo,
          categories: item.categories,
        });
      }
    });

    feedparser.on('end', () => {
      resolve(data);
    });
  });
}


app.get('/feed', (req, res) => {
  const tasks = [];
  for (let i = 0; i < sources.length; i += 1) {
    tasks.push(getDatafromSource(sources[i]));
  }
  Promise.all(tasks).then((results) => {
    let returnData = [];
    for (let i = 0; i < results.length; i += 1) {
      returnData = returnData.concat(results[i]);
    }
    //TODO better way to sort!
    res.status(200).json(lodash.sortBy(returnData, ['date']).reverse());
  });
});

//TODO save data to DB

app.use(express.static('dist'));
app.use(express.static('static'));

//Serve files if NODE_ENV is set to production
if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}


const port = 8000;

app.listen(port, () => {
  console.log(`Environment set to ${process.env.NODE_ENV}`);
  console.log(`RSS feed server is  listening on port ${port}`);
});

