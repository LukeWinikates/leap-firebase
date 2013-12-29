require('./libs/ZeroClipboard.min');
ZeroClipboard.setDefaults( { moviePath: '/swf/zeroclipboard.swf' } );
App = Ember.Application.create();
App.ENV = {
  FIREBASE_URL: 'https://ember-leap.firebaseio.com/'
};
require('./libs/foundation.min');
require('./libs/leap');
require('./libs/uuid');
require('./libs/emberfire-latest');
require('./routes');
require('./frame_sources');
require('./controllers');
require('./views');
