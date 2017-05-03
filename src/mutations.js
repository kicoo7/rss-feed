/**
 * Created by krsterajchevski on 5/2/17.
 */
export default{

  setFeed(state, payload) {
    const feed = payload;
    state.feed.splice(0, state.feed.length);
    feed[0].isInverted = false;
    state.feed.push(payload[0]);

    for (let i = 1; i < feed.length; i += 1) {
      if (feed[i].from !== feed[i - 1].from) {
        feed[i].isInverted = !feed[i - 1].isInverted;
      } else {
        feed[i].isInverted = feed[i - 1].isInverted;
      }
      state.feed.push(feed[i]);
    }
  }
  ,

}
;
