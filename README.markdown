# HTMLOutliner.js

A Javascript implementation of the HTML [outline algorithm](http://www.whatwg.org/specs/web-apps/current-work/multipage/sections.html#outline).

This script provides the function

<pre>void <b>HTMLOutline</b>(Node <i>root</i>);</pre>

and defines a new object type `Section` implementing the concept of [HTML section](http://www.whatwg.org/specs/web-apps/current-work/multipage/sections.html#concept-section). A section has the following properties:

* `parentSection` is the parent section if any, `null` otherwise;
* `childSections` is the array of subsections;
* `heading` is the heading content element associated with the section if any, `null` otherwise;
* `associatedNodes` is the array of all DOM nodes that are associated with the section, in algorithm order (in particular, `associatedNodes[0]` is a sectioning element for explicit sections).

The function `HTMLOutline` adds several properties to the nodes in the DOM subtree of `root`:

* `associatedSection` is the section associated with a node if any, `null` otherwise;
* `sectionList` is the outline of a sectioning element, i.e., the list of its top-level sections;
* `text` is the [text](http://www.whatwg.org/specs/web-apps/current-work/multipage/sections.html#the-hgroup-element) of a heading content element;
* `rank` is the [rank](http://www.whatwg.org/specs/web-apps/current-work/multipage/sections.html#rank) of a heading content element;
* `depth` is the [outline depth](http://www.whatwg.org/specs/web-apps/current-work/multipage/sections.html#outline-depth) of a heading content element.

Added by buakos for the bookmarklet:

* live highlighting of the current item with an arrow icon (can be enabled/disabled by option `highlighting`);
* closing on Escape (can be enabled/disabled by option `closeOnEsc`);
* hotkey to open and close the TOC after the first run. Can be controlled by option `hotkey`:
  * if `true`, it uses the default Ctrl-Alt-O key (code 5199);
  * if a number, it defines the `keyCode` in the lower bits, the `ctrlKey` (1024), the `shiftKey` (2048) and the `altKey` (4096) in the upper ones;
  * if `false`, the hotkey is disabled.
