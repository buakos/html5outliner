(function() {
  /*____BEGIN_OPTIONS____*/
  var numbering = 0001, linkColor = '', clickOutside = false, showDetails = false, highlighting = true, closeOnEsc = true, hotkey = true;
  /*_____END_OPTIONS_____*/

  /*_____BEGIN_CSS_____*/
  var CSSRules = [
    // CSS reset (except: text-rendering, link color)
    // directional properties should not be reset, but no browser implements
    // the abstractions of the CSS3 writing mode module
    // and not setting direction:ltr breaks the layout...
    "#h5o-outside,#h5o-outside *{\
			background-color:transparent;\
			border:none;\
			border-radius:0;\
			bottom:auto;\
			box-shadow:none;\
			box-sizing:content-box;\
			clear:none;\
			" + (linkColor ? "color:" + linkColor + ";" : "") + "\
			cursor:auto;\
			direction:ltr;\
			float:none;\
			font-family:sans-serif;\
			font-size:small;\
			font-stretch:normal;\
			font-style:normal;\
			font-variant:normal;\
			font-weight:normal;\
			height:auto;\
			left:auto;\
			letter-spacing:normal;\
			line-height:normal;\
			margin:0;\
			opacity:1;\
			outline:none;\
			overflow:visible;\
			padding:0;\
			position:static;\
			right:auto;\
			text-align:left;\
			text-decoration:none;\
			text-indent:0;\
			text-overflow:clip;\
			text-shadow:none;\
			text-transform:none;\
			top:auto;\
			vertical-align:baseline;\
			visibility:visible;\
			white-space:normal;\
			width:auto;\
			word-break:normal;\
			word-spacing:normal;\
			word-wrap:normal;\
			zoom:normal;\
		}",
    "#h5o-inside *:not([href]){\
			color:black;\
		}",
    "#h5o-outside{\
			background-color:transparent;\
			box-sizing:border-box;\
			-moz-box-sizing:border-box;\
			display:block;\
			height:100%;\
			padding:10px;\
			pointer-events:none;\
			position:fixed;\
			right:0px;\
			top:0px;\
			max-width:500px;\
			z-index:2147483647;\
		}",
    "#h5o-inside{\
			background-color:white;\
			border:2px solid black;\
			box-sizing:border-box;\
			-moz-box-sizing:border-box;\
			display:block;\
			max-width:100%;\
			max-height:100%;\
			opacity:.9;\
			overflow-x:auto;\
			overflow-y:scroll;\
			padding:10px;\
			pointer-events:auto;\
			position:relative;\
		}",
    "#h5o-inside ol{\
			counter-reset:li;\
			display:block;\
			margin:0;\
			padding:0;\
		}",
    "#h5o-inside li{\
			counter-increment:li;\
			display:list-item;\
			list-style-type:none;\
			margin-left:" + (numbering === 2 ? "2em" : "1.5em") + ";\
			position:relative;\
		}",
    "#h5o-inside a{\
			display:inline;\
			cursor: pointer;\
		}",
    "#h5o-inside a:hover{\
			text-decoration:underline;\
		}",
    "#h5o-inside li.h5o-notitle>a{\
			font-style:italic;\
		}",
    "#h5o-inside li span.marker{\
			display: inline-block;\
			width: 14px;\
			height: 12px;\
		}",
    "#h5o-inside span.marker.shown{\
			background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAAXNSR0IArs4c6QAAAAlwS\
FlzAAALEgAACxIB0t1+/AAAAT1JREFUKM+N0s1KAnEUxuHf/MdRh0lTKCiiDwqZok0X0KZtm4hw76KuoaAbKCi6gYKCaivhBUjlFbSIXJVl+ZGZpuYMOk0L\
s7LUevcP5/CeA20SjqVsPRS19VDUpkNEO3R8nmUlqNMt4ic6OssyHfDjUpWuUPqODk+zTAV85EybSrlOJvVC4rbYGYZjKfsgmkGf8JEx3kinqgghobpkxkY\
1NEWgyI0ZA14nW3sXOADWdq8Izo9zXajxcF/BshqdlCtguFonzQz1ADQgQMmweM5VMc36JwQwb0otMCnEF9xYnmQnkqSvX0NRBIZZQ0gSqirj0Zy43TKOj1\
U9XufvcrYjSXr9Kk95AySwaxaF/Gv3Vpt48+QOzetGdggS8Ufi+3PSn3dcnB2UVheGKearIMv/f4AmXl8aIXGZ7grfAcFBea0lYCecAAAAAElFTkSuQmCC);\
			background-repeat: no-repeat;\
		}"
  ];
  if (numbering > 0)
    CSSRules.push("#h5o-inside li::before{\
			content:" + (numbering === 2 ? "counters(li,\".\")" : "counter(li)") + "\".\";\
			display:block;\
			left:-10.5em;\
			position:absolute;\
			text-align:right;\
			width:10em;\
		}");
  else
    CSSRules.push("#h5o-inside>ol>li{margin-left:0;}");
  /*_____END_CSS_____*/

  var main = function() {

    // DD1 */ var runId = Math.floor(Math.random() * 1000);
    // DD1 */ console.log(runId, 'started');

    var toDispose = [];

    // This must be global so that event listener can be removed when clicking on bookmarklet again
    if (!window.h5o_sdWoNJpsAgQGAaf) {
      window.h5o_sdWoNJpsAgQGAaf = function() {
        document.body.removeChild(document.getElementById("h5o-outside"));
        for (var i = 0; i < toDispose.length; i++) {
          toDispose[i].dispose();
        }
        toDispose = null;
        window.h5o_sdWoNJpsAgQGAaf = null;
        // DD1 */ console.log(runId, 'h5o_sdWoNJpsAgQGAaf completed');
      };
      // DD1 */ console.log(runId, 'h5o_sdWoNJpsAgQGAaf set');
    }

    var close = function() {
      // DD1 */ console.log(runId, 'closing');
      if (window.h5o_sdWoNJpsAgQGAaf) {
        window.h5o_sdWoNJpsAgQGAaf();
        // DD1 */ console.log(runId, 'closed');
      }
    };

    if (document.getElementById("h5o-outside")) {
      close();
      return;
    }

    var toc = document.createElement("div");
    toc.id = "h5o-outside";

    // Stylesheet
    var style = document.createElement("style");
    toc.appendChild(style);
    document.body.appendChild(toc);

    for (var i = 0; i < CSSRules.length; i++) {
      try {
        style.sheet.insertRule(CSSRules[i].replace(/;(?!base64)/g, " !important;"), i);
      } catch (e) {
      }
    }

    var inside = document.createElement("div");
    inside.id = "h5o-inside";

    if (clickOutside) {
      toDispose.push((function() {
        inside.addEventListener("click", function(event) {
          event.stopPropagation();
        }, false);
        document.addEventListener("click", close, false);
        // DD1 */ console.log(runId, 'clickOutside hooked');
        return {
          dispose: function() {
            document.removeEventListener("click", close, false);
            // DD1 */ console.log(runId, 'clickOutside disposed');
          }
        };
      })());
    }

    if (closeOnEsc) {
      toDispose.push((function() {
        var hook = function(e) {
          if (e.keyCode === 27) {
            close();
          }
        };
        document.addEventListener("keyup", hook, true);
        // DD1 */ console.log(runId, 'closeOnEsc hooked');
        return {
          dispose: function() {
            document.removeEventListener('keyup', hook, true);
            // DD1 */ console.log(runId, 'closeOnEsc disposed');
          }
        };
      })());
    }

    var tocItems = [];

    // Create outline
    HTMLOutline(document.body);
    if (!document.body.sectionList)
      return; // HTML4 frameset documents
    inside.appendChild(printOutline(document.body.sectionList));
    toc.appendChild(inside);


    function printOutline(outline) {
      var ol = document.createElement("ol");
      for (var i = 0; i < outline.length; i++) {
        ol.appendChild(printSection(outline[i]));
      }
      return ol;
    }

    function printSection(section) {
      var li = document.createElement("li");
      var title = document.createElement("a");
      li.appendChild(title);

      if (section.heading === null || /^[ \r\n\t]*$/.test(section.heading.text)) {
        li.className = "h5o-notitle";
        switch (section.associatedNodes[0].nodeName.toLowerCase()) {
          case "body":
            title.textContent = "Document";
            break;
          case "article":
            title.textContent = "Article";
            break;
          case "aside":
            title.textContent = "Aside";
            break;
          case "nav":
            title.textContent = "Navigation";
            break;
          case "section":
            title.textContent = "Section";
            break;
          default:
            title.textContent = "Empty title";
        }
      } else
        title.textContent = section.heading.text;

      var node = section.associatedNodes[0];
      if (node.sectionType !== 1 && node.sectionType !== 2)
        node = section.heading;
      title.href = "#" + node.id;

      title.addEventListener("click", function(event) {
        event.preventDefault();
        node.scrollIntoView();
      }, false);

      if (showDetails) {
        var details = "";
        if (section.associatedNodes[0].sectionType)
          details += "<" + section.associatedNodes[0].nodeName.toLowerCase() + ">, ";
        if (section.heading)
          details += "rank:−" + (-section.heading.rank) + ", depth:" + section.heading.depth + ", ";
        details += "#nodes:" + section.associatedNodes.length;
        title.title = details;
      }

      li.appendChild(document.createTextNode('\u00a0'));  // NO-BREAK SPACE (&nbsp;)
      var marker = document.createElement('span');
      marker.className = 'marker';
      li.appendChild(marker);

      tocItems.push({node: node, li: li, marker: marker});
      li.appendChild(printOutline(section.childSections));
      return li;
    }

    // Section class
    function Section() {
      this.parentSection = null;
      this.childSections = [];
      this.firstChild = null;
      this.lastChild = null;
      this.appendChild = function(section) {
        section.parentSection = this;
        this.childSections.push(section);
        if (this.firstChild === null)
          this.firstChild = section;
        this.lastChild = section;
      };

      this.heading = null; // heading element associated with the section, if any

      this.associatedNodes = []; // DOM nodes associated with the section
    }

    // Main function
    function HTMLOutline(root) {

      var innerTextShim = (function() {
        var sel = null;
        var savedSelection = null;

        var getInnerText = function(e) {
          var text = e.innerText;
          if (text) {
            return text;
          }

          // innerText not present: try to emulate it with Selection.toString().
          if (sel === null) {
            sel = window.getSelection();
          }
          if (savedSelection === null) {
            // current selection not saved yet, saving it
            savedSelection = [];
            for (var i = 0; i < sel.rangeCount; i++) {
              savedSelection.push(sel.getRangeAt(i));
            }
          }
          sel.selectAllChildren(e);
          text = sel.toString();

          return text;
        };

        var dispose = function() {
          if (savedSelection !== null) {
            // Restore the original selection (if any)
            sel.removeAllRanges();
            for (var i = 0; i < savedSelection.length; i++) {
              sel.addRange(savedSelection[i]);
            }
            savedSelection.length = 0;
          }
        };

        return {
          getInnerText: getInnerText,
          dispose: dispose
        };
      })();

      // BEGIN OUTLINE ALGORITHM
      // STEP 1
      var currentOutlinee = null; // element whose outline is being created
      // STEP 2
      var currentSection = null; // current section

      // STEP 3
      // Minimal stack object
      var stack = {"lastIndex": -1};
      stack.isEmpty = function() {
        return stack.lastIndex === -1;
      };
      stack.push = function(e) {
        stack[++stack.lastIndex] = e;
        stack.top = e;
      };
      stack.pop = function() {
        var e = stack.top;
        delete stack[stack.lastIndex--];
        stack.top = stack[stack.lastIndex];
        return e;
      };

      // STEP 4 (minus DOM walk which is at the end)
      function enter(node) {
        if (isElement(node)) {
          if (!stack.isEmpty() && (isHeadingElement(stack.top) || isHidden(stack.top))) {
            // Do nothing
          } else if (isHidden(node)) {
            stack.push(node);
          } else if (isSectioningContentElement(node) || isSectioningRootElement(node)) {
            // if(currentOutlinee !== null && currentSection.heading === null) {
            // Create implied heading
            // }
            if (currentOutlinee !== null)
              stack.push(currentOutlinee);
            currentOutlinee = node;
            currentSection = new Section();
            associateNodeWithSection(currentOutlinee, currentSection);
            currentOutlinee.appendSection(currentSection);
          } else if (currentOutlinee === null) {
            // Do nothing
          } else if (isHeadingElement(node)) {
            if (currentSection.heading === null)
              currentSection.heading = node;
            else if (currentOutlinee.lastSection.heading === null || node.rank >= currentOutlinee.lastSection.heading.rank) {
              currentSection = new Section();
              currentSection.heading = node;
              currentOutlinee.appendSection(currentSection);
            } else {
              var candidateSection = currentSection;
              do {
                if (node.rank < candidateSection.heading.rank) {
                  currentSection = new Section();
                  currentSection.heading = node;
                  candidateSection.appendChild(currentSection);
                  break;
                }
                var newCandidate = candidateSection.parentSection;
                candidateSection = newCandidate;
              } while (true);
            }
            stack.push(node);
          } // else {
          // Do nothing
          // }
        }
      }

      function exit(node) {
        if (isElement(node)) {
          if (!stack.isEmpty() && node === stack.top)
            stack.pop();
          else if (!stack.isEmpty() && (isHeadingElement(stack.top) || isHidden(stack.top))) {
            // Do nothing
          } else if (!stack.isEmpty() && isSectioningContentElement(node)) {
            // if(currentSection.heading === null) {
            // Create implied heading
            // }
            currentOutlinee = stack.pop();
            currentSection = currentOutlinee.lastSection;
            for (var i = 0; i < node.sectionList.length; i++) {
              currentSection.appendChild(node.sectionList[i]);
            }
          } else if (!stack.isEmpty() && isSectioningRootElement(node)) {
            // if(currentSection.heading === null) {
            // Create implied heading
            // }
            currentOutlinee = stack.pop();
            currentSection = currentOutlinee.lastSection;
            while (currentSection.childSections.length > 0) {
              currentSection = currentSection.lastChild;
            }
          } else if (isSectioningContentElement(node) || isSectioningRootElement(node)) {
            // if(currentSection.heading === null) {
            // Create implied heading
            // }
            // The algorith says to end the walk here, but that's assuming root is a sectioning element
            // Instead we reset the algorithm for subsequent top-level sectioning elements
            currentOutlinee = null;
            currentSection = null;
          } // else {
          // Do nothing
          // }
        }
        if (node.associatedSection === null && currentSection !== null)
          associateNodeWithSection(node, currentSection);
      }

      // STEP 5
      // The heading associated to node is node.associatedSection.heading, if any
      // END OUTLINE ALGORITHM

      // Now we must make the necessary definitions for the above to make sense
      function associateNodeWithSection(node, section) {
        section.associatedNodes.push(node);
        node.associatedSection = section;
      }

      function isElement(node) {
        return node.nodeType === 1;
      }

      function isHidden(node) {
        return node.hidden;
      }

      function isSectioningContentElement(node) {
        return node.sectionType === 1;
      }

      function isSectioningRootElement(node) {
        return node.sectionType === 2;
      }

      function isHeadingElement(node) {
        return node.rank !== undefined;
      }

      function extend(node) {
        if (node.nodeType === 1) {
          switch (node.nodeName.toLowerCase()) {
            case "blockquote":
            case "body":
            case "details":
            case "fieldset":
            case "figure":
            case "td":
              extendSectioningRootElement(node);
              break;
            case "article":
            case "aside":
            case "nav":
            case "section":
              extendSectioningContentElement(node);
              break;
            case "h1":
            case "h2":
            case "h3":
            case "h4":
            case "h5":
            case "h6":
              extendHeadingElement(node);
              break;
            case "hgroup":
              extendHeadingGroupElement(node);
              break;
            default:
              extendNode(node);
          }
        } else
          extendNode(node);
      }

      function extendNode(node) {
        node.associatedSection = null;
      }

      function extendSectioningElement(node) {
        extendNode(node);
        node.sectionList = [];
        node.firstSection = null;
        node.lastSection = null;

        node.appendSection = function(section) {
          this.sectionList.push(section);
          if (this.firstSection === null)
            this.firstSection = section;
          this.lastSection = section;
        };
      }

      function extendSectioningContentElement(node) {
        extendSectioningElement(node);
        node.sectionType = 1;
      }

      function extendSectioningRootElement(node) {
        extendSectioningElement(node);
        node.sectionType = 2;
      }

      function extendHeadingContentElement(node) {
        extendNode(node);
        Object.defineProperty(node, "depth", {"get": function() {
            var section = node.associatedSection;
            var depth = 1;
            if (section !== null) {
              for (var e = section.parentSection; e !== null; e = e.parentSection) {
                depth++;
              }
            }
            return depth;
          }, "configurable": true, "enumerable": true});
      }

      function extendHeadingElement(node) {
        extendHeadingContentElement(node);
        node.rank = -parseInt(node.nodeName.charAt(1));
        node.text = innerTextShim.getInnerText(node);
      }

      function extendHeadingGroupElement(node) {
        extendHeadingContentElement(node);

        for (var i = 1; i <= 6; i++) {
          var h = node.getElementsByTagName("h" + i);
          if (h.length > 0) {
            node.rank = -i;
            node.text = innerTextShim.getInnerText(h[0]);
            break;
          }
        }

        if (node.rank === undefined) {
          node.rank = -1;
          node.text = "";
        }
      }

      // Walk the DOM subtree of root
      var node = root;
      start: while (node) {
        extend(node);
        enter(node);
        if (node.firstChild) {
          node = node.firstChild;
          continue start;
        }
        while (node) {
          exit(node);
          if (node === root)
            break start;
          if (node.nextSibling) {
            node = node.nextSibling;
            continue start;
          }
          node = node.parentNode;
        }
      }

      innerTextShim.dispose();
    }

    if (highlighting) {
      toDispose.push((function() {
        var initialRun = true;

        var getOffsetTop = function(e) {
          var top = 0;
          for (; e && e !== inside; e = e.offsetParent) {
            top += e.offsetTop;
          }
          return top;
        };

        var scrollIntoViewIfNeeded = function(ti) {
          var offset = 40;

          var top = ti.top;
          var bottom = ti.bottom;

          if (initialRun) {
            // At first run we position the element into the middle
            var diff = top - inside.clientHeight / 2 + (bottom - top) / 2;
            inside.scrollTop += diff;
          } else {
            if (top < inside.scrollTop + offset) {
              inside.scrollTop = top - offset;
            } else if (bottom > inside.scrollTop + inside.clientHeight - offset) {
              inside.scrollTop = bottom - inside.clientHeight + offset;
            }
          }
        };

        var current = null;

        var highlightCurrent = function() {
          var tis = tocItems;
          if (!tis || tis.length <= 0) {
            return;
          }

          var newCurrent = null;
          var lastNegative = null;

          var viewportMiddle = window.innerHeight / 2 - 10;

          // We assume that the nodes in the tocItems are in ascending order.
          // The current item is either:
          //  - the first one in the top half of the viewport, or (if not present)
          //  - the last one above it (ie. with negative coordinates)

          // We loop twice from start, into negative and positive direction
          var start = current !== null ? current : Math.floor(tis.length / 2);

          // DD2 */ console.log('highlighting', {current: current, start: start, viewportMiddle: viewportMiddle});

          // First loop, until the first negative position
          for (var i = start; i >= 0; i--) {
            var pos = tis[i].node.getBoundingClientRect().top;
            if (pos < 0) {
              lastNegative = i;
              break;
            } else if (pos >= 0 && pos <= viewportMiddle) {
              newCurrent = i;
            }
          }

          // DD2 */ console.log('after loop #1', {newCurrent: newCurrent, lastNegative: lastNegative});

          // Second loop (if needed), until the first hit or beyond the middle
          if (newCurrent === null) {
            for (var i = start; i < tis.length; i++) {
              var pos = tis[i].node.getBoundingClientRect().top;
              if (pos < 0) {
                lastNegative = i;
              } else if (pos >= 0 && pos <= viewportMiddle) {
                newCurrent = i;
                break;
              } else if (pos > viewportMiddle) {
                break;
              }
            }
          }

          // DD2 */ console.log('after loop #2', {newCurrent: newCurrent, lastNegative: lastNegative});

          if (newCurrent === null) {
            newCurrent = lastNegative;
          }

          // DD2 */ console.log('highlighted', {index: newCurrent, rect: newCurrent !== null ? tis[newCurrent].node.getBoundingClientRect() : null});

          if (newCurrent !== current) {
            if (current !== null) {
              tis[current].marker.className = 'marker';   // Simple approach for performance
            }
            current = newCurrent;
            if (current !== null) {
              tis[current].marker.className = 'marker shown';   // Simple approach for performance
              scrollIntoViewIfNeeded(tis[current]);
            }
          }
        };

        // We precompute and store the top and bottom coordinates
        // Although zooming and (potential) rewrapping invalidate these coordinates,
        // but rewrapping should never occur, and after zooming the TOC can be manually reinvoked.
        // The speed-up for the optimization shall outweigh the inaccuracy due to zooming.
        (function() {
          var tis = tocItems;
          if (!tis || tis.length <= 0) {
            return;
          }
          for (var i = 0; i < tis.length; i++) {
            var ti = tis[i];
            // The top comes from the li, the bottom from the marker.
            var top = getOffsetTop(ti.li);
            var bottom = top + ti.marker.offsetTop + ti.marker.offsetHeight;  // The marker is the offsetChild of the li.            
            ti.top = top;
            ti.bottom = bottom;
          }
        })();

        highlightCurrent();
        initialRun = false;

        document.addEventListener('scroll', highlightCurrent, false);
        // DD1 */ console.log(runId, 'highlighter hooked');

        return {
          dispose: function() {
            document.removeEventListener('scroll', highlightCurrent, false);
            // DD1 */ console.log(runId, 'highlighter disposed');
          }
        };
      })());
    }
  };

  // global variable to store the previously hooked instance (if any)
  if (window.h5o_of2wUqMdTcBZEq) {
    // already registered to a hotkey, run the previous instance
    // DD1 */ console.log('previous instance called');
    window.h5o_of2wUqMdTcBZEq();
    return;
  }

  if (hotkey) {
    // register hotkey and store the main function into the global variable
    (function() {
      var code = typeof hotkey === 'number' ? hotkey : 5199; // default: Ctrl-Alt-O
      var keyCode = code & 1023;
      var ctrlKey = (code & 1024) !== 0;
      var shiftKey = (code & 2048) !== 0;
      var altKey = (code & 4096) !== 0;

      var hook = function(e) {
        e = window.event || e;
        if (e.keyCode === keyCode && e.ctrlKey === ctrlKey && e.shiftKey === shiftKey && e.altKey === altKey) {
          e.preventDefault();
          e.stopPropagation();
          // DD1 */ console.log('hotkey pressed');
          main();
        }
      };
      document.addEventListener("keydown", hook, true);
      // DD1 */ console.log('global hotkey hooked');
    })();
    window.h5o_of2wUqMdTcBZEq = main;
  }

  // run the routine once
  main();
})();

