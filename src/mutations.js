/**
 * Created by krsterajchevski on 5/2/17.
 */
export default{

  setFeed(state, payload) {
    state.feed.splice(0, state.feed.length);
    for (let i = 0; i < payload.length; i += 1) {
      state.feed.push(payload[i]);
    }
  },

};
