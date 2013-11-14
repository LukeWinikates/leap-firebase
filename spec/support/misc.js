// valid
// id
// timestamp
//fingers
//hands
//pointables

// hands still have a circular reference that is unserializable. Might be able to figure that out later.

deframe = function(o) {
  return _.omit(o, "frame", "fingers");
}

Z = _.map(A, function(a) {
  return {
    id: a.id,
    timestamp: a.timestamp,
    valid: a.valid,
    pointables: _.map(a.pointables, deframe),
    fingers: _.map(a.fingers, deframe),
  }
});


