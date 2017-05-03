/**
 * Created by krsterajchevski on 5/2/17.
 */
export default{

  setFeed(state, payload) {
    state.feed.splice(0, state.feed.length);
    payload[0].isInverted = false;
    state.feed.push(payload[0]);

    for (let i = 1; i < payload.length; i += 1) {
      if (payload[i].from !== payload[i - 1].from) {
        payload[i].isInverted = !payload[i - 1].isInverted;
      } else {
        payload[i].isInverted = payload[i - 1].isInverted;
      }
      state.feed.push(payload[i]);
    }
  }
  ,

}
;
