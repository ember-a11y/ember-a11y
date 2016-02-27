import pivotRouteIdentifier from '../../../utils/pivot-route-identifier';
import { module, test } from 'qunit';

module('Unit | Utility | pivot route identifier');

let mockInfoHandler = function(routeName) {
  return {
    handler: {
      routeName
    }
  };
};

test('navigating to another subroute', function(assert) {
  let oldHandlers = [
    mockInfoHandler('photos'),
    mockInfoHandler('photos.caption'),
    mockInfoHandler('photos.caption.new')
  ];
  let newHandlers = [
    mockInfoHandler('photos'),
    mockInfoHandler('photos.caption'),
    mockInfoHandler('photos.caption.edit')
  ];

  let infoHandler = pivotRouteIdentifier(oldHandlers, newHandlers);
  assert.equal(infoHandler.handler.routeName, 'photos.caption.edit');
});

test('can deal with the same handlers', function(assert) {
  let oldHandlers = [
    mockInfoHandler('photos'),
    mockInfoHandler('photos.caption'),
  ];

  let infoHandler = pivotRouteIdentifier(oldHandlers, oldHandlers);
  assert.equal(infoHandler.handler.routeName, 'photos.caption');
});

test('deals with undefined oldHandlers', function(assert) {
  let newHandlers = [
    mockInfoHandler('photos'),
    mockInfoHandler('photos.caption'),
    mockInfoHandler('photos.caption.edit')
  ];

  let infoHandler = pivotRouteIdentifier(undefined, newHandlers);
  assert.equal(infoHandler.handler.routeName, 'photos');
});

test('can deal with the no handlers', function(assert) {
  assert.throws(function() {
    pivotRouteIdentifier([], []);
  });
});

test('navigating to a subroute', function(assert) {
  let oldHandlers = [
    mockInfoHandler('photos'),
  ];

  let newHandlers = [
    mockInfoHandler('photos'),
    mockInfoHandler('photos.caption'),
  ];

  let infoHandler = pivotRouteIdentifier(oldHandlers, newHandlers);
  assert.equal(infoHandler.handler.routeName, 'photos.caption');
});

test('navigating to a parent route', function(assert) {
  let oldHandlers = [
    mockInfoHandler('photos'),
    mockInfoHandler('photos.caption'),
  ];

  let newHandlers = [
    mockInfoHandler('photos'),
  ];

  let infoHandler = pivotRouteIdentifier(oldHandlers, newHandlers);
  assert.equal(infoHandler.handler.routeName, 'photos');
});

test('navigating two steps back and one step forward', function(assert) {
  let oldHandlers = [
    mockInfoHandler('photos'),
    mockInfoHandler('photos.caption'),
    mockInfoHandler('photos.caption.edit'),
  ];

  let newHandlers = [
    mockInfoHandler('photos.surprise'),
  ];

  let infoHandler = pivotRouteIdentifier(oldHandlers, newHandlers);
  assert.equal(infoHandler.handler.routeName, 'photos.surprise');
});

test('index to other route', function(assert) {
  let oldHandlers = [
    mockInfoHandler('index'),
  ];

  let newHandlers = [
    mockInfoHandler('photos'),
    mockInfoHandler('photos.caption'),
  ];

  let infoHandler = pivotRouteIdentifier(oldHandlers, newHandlers);
  assert.equal(infoHandler.handler.routeName, 'photos');
});
