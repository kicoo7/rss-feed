/**
 * Created by krsterajchevski on 5/2/17.
 */
import axios from 'axios';

export default{

  /*
   Get nearby channels for user
   */
  getFeedFromServer({ commit }) {
    axios.get('http://localhost:3000/feed').then((response) => {
      const feed = response.data || [];
      commit('setFeed', feed);
      return feed;
    }).catch((error) => {
      console.log(error);
    });
  },

};
