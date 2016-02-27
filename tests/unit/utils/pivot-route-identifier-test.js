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

test('identifies the last common node', function(assert) {
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
  assert.equal(infoHandler.handler.routeName, 'photos.caption');
});

test('can deal with more old handlers than new handlers', function(assert) {
  let oldHandlers = [
    mockInfoHandler('photos'),
    mockInfoHandler('photos.caption'),
    mockInfoHandler('photos.caption.new')
  ];
  let newHandlers = [
    mockInfoHandler('photos'),
    mockInfoHandler('photos.caption'),
  ];

  let infoHandler = pivotRouteIdentifier(oldHandlers, newHandlers);
  assert.equal(infoHandler.handler.routeName, 'photos.caption');
});

test('can deal with more new handlers than old handlers', function(assert) {
  let oldHandlers = [
    mockInfoHandler('photos'),
    mockInfoHandler('photos.caption'),
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

test('can deal with the no handlers', function(assert) {
  assert.throws(function() {
    pivotRouteIdentifier([], []);
  });
});
