App = Ember.Application.create();
App.ENV = {
  FIREBASE_URL: 'https://ember-leap.firebaseio.com/'
};
require('./libs/leap');
require('./libs/uuid');
require('./libs/emberfire-latest');
require('./routes');
require('./frame_sources');
require('./controllers');
require('./views');
