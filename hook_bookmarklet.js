(function() {
  var addEvent = function(obj, evType, fn) {
    if (obj.addEventListener) {
      obj.addEventListener(evType, fn, true);
      return true;
    } else if (obj.attachEvent) {
      return obj.attachEvent("on" + evType, fn);
    } else {
      return false;
    }
  };

  var loadBookmarklet = function() {
    var js = document.createElement("script");
    js.type = "text/javascript";
    js.src = 'bookmarklet.js';
    document.body.appendChild(js);
  };

  addEvent(document, 'keydown', function(e) {
    e = window.event || e;
    if (e.keyCode === 84 && !e.ctrlKey && !e.shiftKey && !e.altKey /* T */) {
      e.preventDefault();
      e.stopPropagation();

      loadBookmarklet();
    }
  });
}());
