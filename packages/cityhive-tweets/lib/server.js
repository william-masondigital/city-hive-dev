Meteor.methods({
  'getTweets'() {

    const Twit = new TwitMaker({
      consumer_key: Telescope.settings.get('TwitterConsumerKey'),
      consumer_secret: Telescope.settings.get('TwitterConsumerSecretKey'),
      access_token: Telescope.settings.get('TwitterAccessToken'),
      access_token_secret: Telescope.settings.get('TwitterAccessTokenSecret')
    });

    const getTweets = Meteor.wrapAsync(Twit.get, Twit);

    return getTweets('statuses/user_timeline', {
      screen_name: Telescope.settings.get('TwitterUser'),
      count: 1
    });

  }
});
