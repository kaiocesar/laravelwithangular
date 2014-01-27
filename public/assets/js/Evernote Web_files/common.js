define("common", [ "jquery", "domReady!" ], function($) {
      var DOUBLE_SUBMIT_BLOCK_KEY = 'blockDoubleSubmit_submitPressed';

      // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
      if (!String.prototype.trim) {
        String.prototype.trim = function () {
          return this.replace(/^\s+|\s+$/g,'');
        };
      }

      // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
      if (!Object.keys) {
        Object.keys = (function () {
          
          var hasOwnProperty = Object.prototype.hasOwnProperty,
              hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
              dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
              ],
              dontEnumsLength = dontEnums.length;

          return function (obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
              throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
              if (hasOwnProperty.call(obj, prop)) {
                result.push(prop);
              }
            }

            if (hasDontEnumBug) {
              for (i = 0; i < dontEnumsLength; i++) {
                if (hasOwnProperty.call(obj, dontEnums[i])) {
                  result.push(dontEnums[i]);
                }
              }
            }
            return result;
          };
        }());
      }

      // Official shim from
      // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map
      // Production steps of ECMA-262, Edition 5, 15.4.4.19
      // Reference: http://es5.github.com/#x15.4.4.19
      if (!Array.prototype.map) {
        Array.prototype.map = function(callback, thisArg) {
          var T, A, k;
          if (this == null) {
            throw new TypeError(" this is null or not defined");
          }
          var O = Object(this);
          var len = O.length >>> 0;
          if ({}.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
          }
          if (thisArg) {
            T = thisArg;
          }
          A = new Array(len);
          k = 0;
          while (k < len) {
            var kValue, mappedValue;
            if (k in O) {
              kValue = O[k];
              mappedValue = callback.call(T, kValue, k, O);
              A[k] = mappedValue;
            }
            k++;
          }
          return A;
        };
      }

      // Shim from
      // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/reduce
      if (!Array.prototype.reduce) {
        Array.prototype.reduce = function reduce(accumulator) {
          if (this === null || this === undefined)
            throw new TypeError("Object is null or undefined");
          var i = 0, l = this.length >> 0, curr;

          if (typeof accumulator !== "function") // ES5 : "If
            // IsCallable(callbackfn) is
            // false, throw a TypeError
            // exception."
            throw new TypeError("First argument is not callable");
          if (arguments.length < 2) {
            if (l === 0)
              throw new TypeError("Array length is 0 and no second argument");
            curr = this[0];
            i = 1; // start accumulating at the second element
          } else
            curr = arguments[1];
          while (i < l) {
            if (i in this)
              curr = accumulator.call(undefined, curr, this[i], i, this);
            ++i;
          }
          return curr;
        };
      }

      if (!Array.prototype.filter) {
        Array.prototype.filter = function filter(f) {
          return Array.prototype.reduce(function(prev, cur) {
            if (f(cur))
              prev.push(cur);
            return prev;
          }, new Array());
        };
      }

   // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
   // Production steps of ECMA-262, Edition 5, 15.4.4.18
   // Reference: http://es5.github.com/#x15.4.4.18
   if (!Array.prototype.forEach) {

     Array.prototype.forEach = function forEach(callback, thisArg) {
       
       var T, k;

       if (this == null) {
         throw new TypeError("this is null or not defined");
       }

       var kValue,
           // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
           O = Object(this),

           // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
           // 3. Let len be ToUint32(lenValue).
           len = O.length >>> 0; // Hack to convert O.length to a UInt32

       // 4. If IsCallable(callback) is false, throw a TypeError exception.
       // See: http://es5.github.com/#x9.11
       if ({}.toString.call(callback) !== "[object Function]") {
         throw new TypeError(callback + " is not a function");
       }

       // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
       if (arguments.length >= 2) {
         T = thisArg;
       }

       // 6. Let k be 0
       k = 0;

       // 7. Repeat, while k < len
       while (k < len) {

         // a. Let Pk be ToString(k).
         //   This is implicit for LHS operands of the in operator
         // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
         //   This step can be combined with c
         // c. If kPresent is true, then
         if (k in O) {

           // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
           kValue = O[k];

           // ii. Call the Call internal method of callback with T as the this value and
           // argument list containing kValue, k, and O.
           callback.call(T, kValue, k, O);
         }
         // d. Increase k by 1.
         k++;
       }
       // 8. return undefined
     };
   }

   // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
   // Production steps of ECMA-262, Edition 5, 15.4.4.18

    if (!Array.prototype.every) {
      Array.prototype.every = function(fun /*, thisp */) {
        
        var t, len, i, thisp;
         if (this == null) {
          throw new TypeError();
       }
        t = Object(this);
        len = t.length >>> 0;
        if (typeof fun !== 'function') {
          throw new TypeError();
        }
         thisp = arguments[1];
        for (i = 0; i < len; i++) {
          if (i in t && !fun.call(thisp, t[i], i, t)) {
            return false;
          }
        }
         return true;
      };
    }

  // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
  // Production steps of ECMA-262, 5th edition
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement , fromIndex) {
      var i,
      pivot = (fromIndex) ? fromIndex : 0,
      length;

      if (!this) {
        throw new TypeError();
      }

      length = this.length;

      if (length === 0 || pivot >= length) {
        return -1;
      }

      if (pivot < 0) {
        pivot = length - Math.abs(pivot);
      }

      for (i = pivot; i < length; i++) {
        if (this[i] === searchElement) {
          return i;
        }
      }
      return -1;
    };
  }

    //From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
    if (!Function.prototype.bind) {
      Function.prototype.bind = function(oThis) {
        if (typeof this !== "function") {
          // closest thing possible to the ECMAScript 5 internal IsCallable function
          throw new TypeError(
              "Function.prototype.bind - what is trying to be bound is not callable");
        }
        var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function() {
        }, fBound = function() {
          return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
              aArgs.concat(Array.prototype.slice.call(arguments)));
        };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
      };
    }

      var me = {};
      me.FADE_SPEED = 300;

      /*
       * Calls hook function when the user clicks *outside* of the given object.
       *
       * jObj: jQuery object or string hook: the function to call when clicks
       * happen partners: an optional list of elements clicks on which should
       * not invoke the hook
       */
      me.addClickOut = function(jObj, hook, partners) {
        jObj = $(jObj);

        function isTarget(event, jObj) {
          return $(event.target).parents().andSelf().is(jObj);
        }

        /* Global document click handler */
        $(document).click(function(event) {
          if (isTarget(event, jObj) || !jObj.is(":visible")) {
            return;
          } else if (partners != null) {
            var matched = false;

            $(partners).each(function() {
              if (isTarget(event, $(this))) {
                matched = true;
                return false;
              }
            });

            if (matched) {
              return;
            }
          }

          hook();
        });
      };

      var addErrorClearer = function(on, errmsg) {
        var deerrored = false;
        var deErrorHandler = function(e) {
          //Don't clear errors on pressing enter
          if (deerrored === false && e.which != 13) {
            on.removeClass("error");
            errmsg.fadeOut(me.FADE_SPEED, function() {
              if (window.parent && window.parent.feedbackErrorRemoveCallback) {
                window.parent.feedbackErrorRemoveCallback();
              } else if (window.feedbackErrorRemoveCallback) {
                window.feedbackErrorRemoveCallback();
              }
            });
            deerrored = true;
          }
        };
        if (on.is("select") || on.is(":checkbox")) {
          on.bind("change", deErrorHandler);
        } else {
          on.bind("keyup", deErrorHandler);
        }
      };

      /*
       * Clear error messages when a user starts typing into a field. In
       * particular, this removes the class "error" from the field (added by
       * stripes), and fades out the next direct sibling element with the class
       * .error-status.
       *
       * jObj: jQuery object or string
       * errmsg: optional error message field - if not provided, one if found
       */
      me.addErrorClearer = function(jObj, errmsg) {
        jObj = $(jObj);
        
        if (typeof errmsg === 'undefined') {
          errmsg = jObj.nextAll(".error-status").first();
        }
        addErrorClearer(jObj, errmsg);
      };

      /*
       * Clear error messages below the given field field. Also removes the
       * class "error" from the given field.
       *
       * onField: the input field with the associated error errorDiv: the error
       * div below onField containing the error messages
       */
      me.clearError = function(onField, errorDiv) {
        var $onField = $(onField);
        var $errorDiv = $(errorDiv);
        $onField.removeClass('error');
        var errors = $errorDiv.children(".error-status");
        errors.remove();
      };

      /*
       * Adds an error message below a given field. Also adds the class "error"
       * to the given field.
       *
       * onField: the input containing erroneous input
       *
       * errorDiv: the error div below onField that should receive the error
       * message
       *
       * message: the text of the error to add
       *
       * append: If a truthy value is provided and the errorDiv already contains
       * an error message, the new message will be appended instead of
       * overwriting the old message
       */
      me.setError = function(onField, errorDiv, message, append) {
        var $onField = $(onField);
        var $errorDiv = $(errorDiv);
        var $errors = $errorDiv.children(".error-status");
        if ($errors.size() > 0) {
          if (append) {
            $errors.html($errors.html() + "\n" + message);
          } else {
            $errors.html(message);
          }
        } else {
          $errorDiv.html("<div class=\"error-status\">" + message + "</div>");
        }
        $onField.addClass('error');
        $errors.show();
      };

      /*
       * Stop an event (such as submit or click) from happening multiple times
       */
      var blockDoubleEvent = function(jObj, eventName) {
        jObj = $(jObj);
        jObj.on(eventName, function() {
          if ($(this).data(DOUBLE_SUBMIT_BLOCK_KEY)) {
            return false;
          }
          $(this).data(DOUBLE_SUBMIT_BLOCK_KEY, true);
        });
      };

      /*
       * Unblock an event (such as submit or click) from happening multiple
       * times
       */
      var unblockDoubleEvent = function(jObj, eventName) {
        jObj = $(jObj);
        jObj.off(eventName);
      };
      
      /*
       * Block against submitting a form twice with two successive clicks
       * formObj: form DOM object or jQuery object
       */
      me.blockDoubleSubmit = function(formObj) {
        blockDoubleEvent(formObj, 'submit.blockDoubleSubmit');
      };

      /*
       * unblock against submitting a form twice with two successive clicks
       * formObj: form DOM object or jQuery object
       */
      me.unblockDoubleSubmit = function(formObj) {
        unblockDoubleEvent(formObj, 'submit.blockDoubleSubmit');
      };
      
      /*
       * reset double-submit block on the form
       */
      me.resetBlockDoubleSubmit = function(formObj) {
        $(formObj).data(DOUBLE_SUBMIT_BLOCK_KEY, false);
      }

      /*
       * Block against clicking a link twice
       */
      me.blockDoubleClick = function(jObj) {
        blockDoubleEvent(jObj, 'click.blockDoubleClick');
      };

      /*
       * Block against clicking a link twice
       */
      me.unblockDoubleClick = function(jObj) {
        unblockDoubleEvent(jObj, 'click.blockDoubleClick');
      };

      /*
       * Center element on the screen via absolute positioning
       *
       * jObj: jQuery object or string keepCentered: true/false for whether we
       * should register a resize handler
       */
      me.center = function(jObj, keepCentered) {
        jObj = $(jObj);

        if (keepCentered == null) {
          keepCentered = false;
        }

        if (keepCentered) {
          $(window).resize(function() {
            me.center(jObj, false);
          });
        }

        jObj.css("position", "absolute");
        jObj.css("left", (($(window).width() - jObj.outerWidth()) / 2)
            + $(window).scrollLeft() + "px");

        /* We change behaviour when we run out of space */
        if (jObj.height() >= $(window).height()) {
          jObj.css("top", "0px");
          /* A necessary hack to ensure scrolling is possible */
          $("body").css("min-height", jObj.height() + "px");
        } else {
          jObj.css("top", (($(window).height() - jObj.outerHeight()) / 2)
              + $(window).scrollTop() + "px");
        }

        return jObj;
      };

      me.loadCss = function(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
      };

      me.addPlaceholderText = function(textArea, msg, ignoreBlurReplace) {

        // Adapted from
        // http://robertnyman.com/2010/06/17/adding-html5-placeholder-attribute-support-through-progressive-enhancement/

        // Detect support for HTML placeholder attribute
        var fakeInput = document.createElement("input"), placeHolderSupport = ("placeholder" in fakeInput);

        if (placeHolderSupport) {
          textArea.attr("placeholder", msg);
        } else if (!textArea.is(":focus")) {
          // Fallback implementation for browsers that don't support placeholder
          // natively
          // This tends not to work if the area already has focus,
          // so we don't apply it in those cases
          var clearValue = function() {
            if (me.isIE && textArea.attr("type") === "password") {
              var $pass = $("#passwordInputDummy");
              if ($pass.length) {
                $pass.remove();
                textArea.show();
                textArea.focus();
              }
            } else if (textArea.val() === msg) {
              textArea.val("");
            }
          };
          var setValue = function() {
            if (textArea.val().length === 0) {
              if (me.isIE && textArea.attr("type") === "password") {
                textArea.after("<input id='passwordInputDummy' class='text' type='text'></input>");
                textArea.hide();
                var $pass = $("#passwordInputDummy");
                $pass.attr("class", textArea.attr("class"));
                $pass.bind("focus",function() {clearValue();});
                $pass.val(msg);
                $pass.addClass("placeholder-input");
              } else {
                textArea.val(msg);
                textArea.addClass("placeholder-input");
              }
            }
          };

          setValue();

          if(!(me.isIE && textArea.attr("type")==="password")) {
            textArea.bind("focus", function() {
              textArea.removeClass("placeholder-input");
              clearValue();
            });
          }

          if (!ignoreBlurReplace) {
            textArea.bind("blur", setValue);
          }

          // Clear the placeholder text on form submit
          textArea.parents("form").bind("submit", function() {
            clearValue();
          });

          // Clear on reload to prevent the browser from storing the placeholder
          // for autocomplete
          $(window).bind("unload", function() {
            clearValue();
          });
        }
      };

      // (IE8 bug) force a DOM re-evaluation and redraw
      me.forceContainerRefresh = function(container) {
        container.each(function() {
          this.className = this.className;
        });
      };

      var escapeMap = {
        "&" : "&amp;",
        "<" : "&lt;",
        ">" : "&gt;",
        '"' : '&quot;',
        "'" : '&#39;'
      };

      me.escapeHTML = function(string) {
        return String(string).replace(/&(?!\w+;)|[<>"']/g, function(s) {
          return escapeMap[s] || s;
        });
      };

      me.disableSelectOptions = function(selectElem) {
        selectElem = $(selectElem);
        var selectDom = selectElem.get(0);
        $('option[disabled]', selectElem).css({
          'color' : '#cccccc'
        });
        selectElem.change(function() {
          if (this.selectedIndex == -1) {
            do {
              this.selectedIndex++;
              if (this.selectedIndex == this.options.length) {
                this.selectedIndex = 0;
                return;
              }
            } while (this.options[this.selectedIndex].disabled);
          }
          if (this.options[this.selectedIndex].disabled) {
            if (this.options.length == 0) {
              this.selectedIndex = -1;
            } else {
              this.selectedIndex--;
            }
            $(this).trigger('change');
          }
        });
        if (selectDom.selectedIndex >= 0
            && selectDom.options[selectDom.selectedIndex].disabled) {
          selectDom.onchange();
        }
      };

      /**
       * Inserts an error div below the given input with field error styling,
       * and sets it to be cleared when text is changed in onField. The caller
       * may optionally provide an errorDiv to insert the error into.
       */
      me.errorField = function(onField, message, errorDiv, append) {
        if (typeof append === 'undefined') {
          append = true;
        }
        onField = $(onField);
        if (!errorDiv) {
          if (typeof onField.next().attr('error-field') !== 'undefined') {
            errorDiv = onField.next();
          } else {
            errorDiv = $('<div error-field></div>').insertAfter(onField);
          }
        }

        me.setError(onField, errorDiv, message, append);
        addErrorClearer(onField, errorDiv.children());
      };

      /**
       * Clear the content of all error fields on the page.
       */
      me.clearErrorFields = function() {
        $("input").removeClass("error")
        $("[error-field]").children(".error-status").remove();
      };

      try {
        // detect IE
        me.isIE7 = $('html.ie7').length
            || $('html.ie7', window.parent.document).length;
        me.isIE8 = $('html.ie8').length
            || $('html.ie8', window.parent.document).length;
        me.isIE9 = $('html.ie9').length
            || $('html.ie9', window.parent.document).length;
        me.isIE = me.isIE7 || me.isIE8 || me.isIE9;

        // Note: `isIE` does not check for IE 10, currently. Hopefully there is
        // no
        // need to.
        me.isIE10 = $('html.ie10').length
            || $('html.ie10', window.parent.document).length;
      } catch (err) {
        // Accessing window.parent.document from within an iframe can fail in
        // Firefox
      }

      // detect iPad
      me.isIPad = navigator.userAgent.indexOf('iPad') != -1;

      /*
       * Javascript workaround to center an element for browsers where `margin:
       * auto` does not work (e.g. IE7).
       */
      me.centerElement = function(element) {
        element = $(element);
        element.css({
          top : '50%',
          left : '50%',
          'margin-top' : element.height() / -2,
          'margin-left' : element.width() / -2
        });
      };

      /*
       * Resizes an element's string content for multi line text overflow
       * Specify a height and the function will trim the content word by word so
       * that its height will fit into this and leave an ellipsis.
       *
       * @param elem the element you would like to shrink the content of @param
       * height the height to which you would like to shrink the content @param
       * selector optional param for specifying an internal element that should
       * be trimmed (if encompassing element has a max height that should be
       * followed instead)
       */
      me.multilineOverflow = function(elem, height, selector) {
        var initial = selector ? $(elem).find(selector).text() : $(elem).text();
        if (!initial) {
          return;
        }
        var failSafe = initial.length;
        while (elem.scrollHeight > height) {
          if (failSafe <= 0) {
            if (selector) {
              $(elem).find(selector).text(initial);
            } else {
              $(elem).text(initial);
            }
            return;
          }
          var content = selector ? $(elem).find(selector).text() : $(elem)
              .text();
          content = content.substring(0, content.lastIndexOf(" "));
          if (selector) {
            $(elem).find(selector).text(content + "...");
          } else {
            $(elem).text(content + "...");
          }
          failSafe--;
        }
      };

      /*
       * Add the url parameters specified in params to the passed url, and
       * return the updated url. params can be anything accepted by $.param
       * http://api.jquery.com/jQuery.param/
       */
      me.addUrlParameters = function(url, params) {
        /*
         * If there is already an existing query string, add the parameters,
         * otherwise create the query string with the passed parameters
         */
        var queryString = url.indexOf('?') == -1 ? '?' : '&';
        queryString += $.param(params);
        return url + queryString;
      };
      
      return me;
    });
