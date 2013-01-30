
/* !
 * parallel_detect
 * async series each
 *
 * @copyright 2013 Enrico Marino
 * @license MIT
 */

/*
 * Expose `parallel_detect`
 */

module.exports = parallel_detect;

/*
 * parallel_detect
 * Detect items of 'array' that pass 'iterator' in parallel
 * and call 'callback' when done
 *
 * @param {Array} array array
 * @param {Function} iterator iterator
 * @param {Function} callback callback
 * @api public
 */

function parallel_detect(array, iterator, callback) {
  var completed = 0;
  var len = array.length; 
  var i;

  function complete(err, result) {
    if (err) {
      callback(err);
      callback = function () {};
      return;
    }
    if (result) {
      callback(err, result);
      callback = function () {};
      return;
    }
    completed += 1;
    if (completed === len) {
      callback(err, result);
      return;
    }
  }

  for (i = 0; i < len; i += 1) {
    iterator(array[i], complete);
  }
}
