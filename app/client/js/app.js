App = Ember.Application.create();
App.ENV = {
  FIREBASE_URL: 'https://ember-leap.firebaseio.com/'
}
require('./libs/leap')
require('./libs/uuid')
require('./routes');
require('./controllers');
require('./views');
