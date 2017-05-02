/**
 * Created by krsterajchevski on 5/2/17.
 */
import axios from 'axios';

const FEED_URL = 'http://localhost:3000/feed';

export default{

  /*
   Get nearby channels for user
   */
  getFeedFromServer({ commit }) {
    axios.get(FEED_URL).then((response) => {
      const feed = response.data || [];
      commit('setFeed', feed);
      return feed;
    }).catch((error) => {
      console.log(error);
    });
  },

};
