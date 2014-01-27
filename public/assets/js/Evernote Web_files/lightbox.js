define(["jquery", "common", "i18n", "templates", "domReady!"],
    function($, common, i18n, templates) {
  var BORDER_SIZE = 12;
  var LANDSCAPE_MAX_WIDTH = 709;
  var LIGHTBOX_TEMPLATE =
      "<div id='lightbox-glass'></div>" +
      "<div id='lightbox-fake-border' class='{{theme}}'></div>" +
      "<div id='lightbox-holder' class='{{theme}}'>" +
        "<{{frame}} id='lightbox-frame'>" +
          "Oops, something went wrong... could you try using a different browser?" +
        "</{{frame}}>" +
        "<div id='lightbox-close' class='{{theme}}' title='{{closeIcon}}'></div>" +
      "</div>";
  var NORMAL_CLOSE_KEY = "NORMAL_CLOSE";
  var PORTRAIT_MAX_WIDTH = 479;
  var TABLET_MAX_WIDTH = 929;

  // Stores function arguments to be applied after loading i18n.
  var _deferredShow = null;

  // Temporary storage of the lightbox container for this context.
  var _lightboxContainer = null;

  /**
   * Default options, set if not overwritten by any field in the
   * "options" object passed in via showWithUrl or
   * showWithContent.
   */
  var DEFAULTS = {
    // Click outside to hide the lightbox.
    autoHide: true,

    // Resize height to fit content, upon showing.
    autoResize: true,

    // Open the lightbox with width dependent on current window size.
    autoWidth: false,

    // Enable the "X" button in the top-right.
    displayClose: false,

    // Enable hidding ESC to close the lightbox.
    escToClose: true,

    // Forces the lightbox height and width to 100% if the lightbox was shown
    // while the window had a width of a mobile device. If applied, this
    // property turns off autoResize.
    fullscreenIfSmall: false,

    // If the lightbox is fullscreen, slide it in from the bottom of the screen
    // instead of just showing it.
    openFromBottom: false,

    // If the lightbox is fullscreen, dismiss it to the bottom of the screen
    exitToBottom: true,

    // Default height (no effect if using autoResize).
    height: 600,

    // Load the content in the background, but do not show.
    hidden: false,

    // Diable background scrolling while lightbox is open.
    modal: true,

    // Default width. Not affected by autoResize.
    width: 480,

    // Default theme. Theme options are 'light', 'dark', and 'shaded'.
    theme: "dark",

    // Adds a green border to the top of the fullscreen ligthbox
    fullscreenBorder: true
  };

  /**
   * Adjust the height of the lightbox to fit the height of the div
   * or iframe content.
   *
   * Return: The calculated height of the content.
   */
  var autoResize = function() {
    if (!stayFullscreen()) {
      var height = isIframe() ? getLightboxFrame().contents().find("body").height() :
        getLightboxFrame().height();
      getLightboxHolder().height(height);
      getLightboxFakeBorder().height(height + BORDER_SIZE);
      opts("height", height);
      
      browserFix_positionFrame();
      browserFix_removeScrollbars();

      return height;
    }
  };

  /**
   * Determines a good width value for the lightbox depending
   * on the window's current width.
   *
   * Return: The calculated width.
   */
  var autoWidth = function() {
    var windowWidth = $(window).width();

    if (windowWidth <= PORTRAIT_MAX_WIDTH) {
      return 300;
    } else if (windowWidth <= LANDSCAPE_MAX_WIDTH) {
      return 375;
    } else if (windowWidth <= TABLET_MAX_WIDTH) {
      return 480;
    } else {
      return 480;
    }
  };

  /**
   * IE10 appears to have a bug related to `position: relative`, z-index, and images.
   * In certain permutations, img elements are stacked in front of elements whose
   * parents are relatively positioned, regardless of z-index. Note that if you try
   * to inspect the problem elements in IE10 using the F12 tools, the stacking
   * order rectifies itself.
   *
   * Using `position: static` or `display: inline` seems to resolve this issue.
   */
  var browserFix_ie10Container = function(lightboxContainer) {
    if (common.isIE10) {
      lightboxContainer.css("display", "inline");
    }
  };

  /**
   * Use javascript to center the lightbox in IE7. Uses negative
   * margins to center the image, based on the current height and width.
   */
  var browserFix_positionFrame = function() {
    if (common.isIE7) {
      common.centerElement(getLightboxHolder());
      common.centerElement(getLightboxFakeBorder());
    }
  };

  /**
   * An extra nudge to entice IE to remove its scrollbars for iframes.
   */
  var browserFix_removeScrollbars = function() {
    if (isIframe() && common.isIE) {
      getLightboxFrame().contents().find("body").attr("scroll", "no");
    }
  };

  /**
   * Hides the lightbox, and removes the frame and its contents.
   * Tries to call any set callback functions given a callback key.
   *
   * Param: callbackKey - A key used to lookup the callback function.
   */
  var exit = function(callbackKey) {
    // If there is no callback key, assign it a default key.
    if (typeof callbackKey !== "string") {
      callbackKey = NORMAL_CLOSE_KEY;
    }

    var lightboxContaner = getLightboxContainer();
    var callCloseCallback = function(key) {
      // Attempt to call the close callback function.
      var closeCallback = lightboxContaner[0].closeCallbacks[key];
      if (typeof closeCallback === "function") {
        closeCallback();
      }
    };

    // Hide the lightbox.
    lightboxContaner.removeClass("shown");
    if (opts("modal")) {
      toggleModal(false);
    }

    setupKeyHandler(false);

    getLightboxFrame().remove();

    // WEB-10608: The callback may open a new lightbox; remove the
    // lightbox frame before calling the callback.
    callCloseCallback(callbackKey);
  };

  /**
   * Closes the lightbox, possibly using a slide transistion
   */
  var close = function(callbackKey) {
    if(opts("exitToBottom") && stayFullscreen()) {
      var height = $( window ).height();
      getLightboxHolder().animate({"margin-top": height + "px", "opacity" : 0.2},
            320, function() {exit(callbackKey);});
      getLightboxGlass().animate({"opacity" : 0.0}, 220);
    } else {
      exit(callbackKey);
    }
  }

  /**
   * Create the root lightbox container div and setup its data
   * properties, if the container does not exist. append the container
   * to the body.
   *
   * Return: The wrapped lightbox container div.
   */
  var createContainer = function() {
    var lightboxContainer = $("#lightbox-container");
    if (!lightboxContainer.length) {
      // Create the container.
      lightboxContainer = $("<div id='lightbox-container'></div>");
      browserFix_ie10Container(lightboxContainer);
      $("body").append(lightboxContainer);

      // Store cross-iframe data in the container node.
      lightboxContainer[0].closeCallbacks = {};
      lightboxContainer[0].storage = {};
      lightboxContainer[0].opts = {};
    } else if (opts("hidden")) {
      // Lightbox exists; ensure it isn't shown.
      lightboxContainer.removeClass("shown");
    }

    return lightboxContainer;
  };

  /**
   * Create all necessary lightbox elements and add them to the DOM,
   * attaching them to the lightbox container.
   *
   * Param: item - The jQuery element or the src to display in the frame.
   */
  var createLightboxElements = function(item) {
    // Choose between div or iframe. Create via mustache.
    var divDisplay = item instanceof jQuery;
    var frameType = divDisplay ? "div" : "iframe";
    createContainer().html(templateToHtml(frameType));
    var lightboxFrame = $("#lightbox-frame");
    if (divDisplay) {
      // render lightbox with the contents of the jQuery object
      lightboxFrame.html(item);
    } else {
      // render lightbox with the contents of the item page
      if (common.isIE7 || common.isIE8) {
        /*
         * IE7-8 agressively cache embedded iframe content. We append a
         * random number paramater to bust this cache.
         */
        item = common.addUrlParameters(item, {
          ieIframeCacheBuster : Math.random()
        });
      }
      lightboxFrame.attr({
        src: item,
        scrolling: "no"
      });
      lightboxFrame.addClass("lightbox-iframe");
    }

    // Setup close handlers.
    if (opts("autoHide")) {
      getLightboxGlass().click(close);
    }
    var lightboxClose = getLightboxClose();
    lightboxClose.click(close);
    if (!opts("displayClose")) {
      lightboxClose.hide();
    }
  };

  /**
   * Return: The wrapped lightbox close icon element.
   */
  var getLightboxClose = function() {
    return $("#lightbox-close", getLightboxContainer());
  };

  /**
   * Gets the lightboxContainer, even if we're in an iframe's
   * context. Also, creates the container if it doesn't exist.
   *
   * Return: A jQuery-wrapped container div.
   */
  var getLightboxContainer = function() {
    if (!_lightboxContainer) {
      // Always use the parent's context. For the same element, the
      // iframe and top contexts will return a different node object.
      _lightboxContainer = window.parent.$("#lightbox-container");
      if (!_lightboxContainer.length) {
        _lightboxContainer = createContainer();
      }
    }

    return _lightboxContainer;
  };

  /**
   * Return: The wrapped lightbox frame element.
   */
  var getLightboxFrame = function() {
    return $("#lightbox-frame", getLightboxContainer());
  };

  /**
   * Return: The wrapped lightbox glass element.
   */
  var getLightboxGlass = function() {
    return $("#lightbox-glass", getLightboxContainer());
  };

  /**
   * Return: The wrapped lightbox holder element.
   */
  var getLightboxHolder = function() {
    return $("#lightbox-holder", getLightboxContainer());
  };

  /**
   * Return: The wrapped lightbox border element.
   */
  var getLightboxFakeBorder = function() {
    return $("#lightbox-fake-border", getLightboxContainer());
  };

  /**
   * Gets or sets options.
   *
   * Params:
   *   key - The key of the options to set or get. If not present,
   *         the whole options map is returned.
   *   value - The value of the options to set. If not present, then
   *           the option itself will be returned.
   * Return: The value of the provided key, or the entire map if no
   *         key is provided.
   */
  var opts = function(key, value) {
    var opts = getLightboxContainer()[0].opts;
    return !key ? opts : (value === undefined ? opts[key] : opts[key] = value);
  };

  /**
   * Initializes the options map from the defaults and provided options.
   *
   * Param: options - A map of options provided by the user.
   */
  var init = function(options) {
    options = (typeof options === "object") ? options : {};
    getLightboxContainer()[0].opts = $.extend({}, DEFAULTS, options);
  };

  /**
   * Return: True if the lightbox is displaying an iframe.
   */
  var isIframe = function() {
    return getLightboxFrame().is("iframe");
  };

  /**
   * Sets close handlers given a function and a key. If the same key
   * is passed to close(), then the provided function should be invoked.
   *
   * Params:
   *   fn - The function to invoke if called via close().
   *   key - The string that identifies this function. If not present,
   *         then the function is associated with the normal close
   *         handler with no parameters.
   */
  var onclose = function(fn, key) {
    if (typeof fn !== "function") {
      // Invalid parameters: do nothing.
      return;
    }

    // Bind the function to the given close callback key.
    if (typeof key !== "string") {
      key = NORMAL_CLOSE_KEY;
    }
    getLightboxContainer()[0].closeCallbacks[key] = fn;
  };

  /**
   * Shows the lightbox, showing it to the user. Performs an
   * autoResize() and other actions, depending on the set options.
   */
  var open = function() {
    // Set the proper height before showing.
    if (opts("autoResize")) {
      autoResize();
    }

    if (opts("modal")) {
      toggleModal(true);
    }

    // If iframe, autoResize on src change.
    if (isIframe() && opts("autoResize")) {
      getLightboxFrame().on("load.lightbox", autoResize);
    }

    // Allow closing via escape, but only if autoHide is enabled.
    setupKeyHandler(opts("escToClose") && opts("autoHide"));

    // Unhide the lightbox.
    getLightboxContainer().addClass("shown");
  };

  /**
   * Sets the height of the lightbox, overriding values set by
   * autoResize().
   *
   * Param: height - The height to set. If not provided, autoResize()
   *                 is called.
   */
  var setHeight = function(height) {
    if (!height && opts("autoResize")) {
      // Height was not provided: set via autoResize().
      autoResize();
    } else if (height) {
      opts("height", height);
      getLightboxHolder().height(height);
      getLightboxFakeBorder().height(height + BORDER_SIZE);

      browserFix_positionFrame();
      browserFix_removeScrollbars();
    }
  };

  /**
   * Handles the lightbox height and width initialization. Either sets the
   * height and width considering the autoWidth, height, and width options,
   * or if fullscreenIfSmall is set, can disable autoResize and stretch
   * the height and width to max, if the window is of a mobile size.
   */
  var setHeightAndWidth = function() {
    if (stayFullscreen()) {
      getLightboxHolder().addClass("fullscreen");

      if(opts("openFromBottom")) {
        var height = $( window ).height();
        getLightboxHolder().css("margin-top", height + "px");
      }

      // Stretch lightbox to fill screen.
      var fullScreenCss = {
        height: "100%",
        width: "100%"
      };
      getLightboxHolder().css(fullScreenCss);
      getLightboxHolder().css("overflow", "auto");
      getLightboxHolder().css("-webkit-overflow-scrolling", "touch");
      getLightboxFakeBorder().css(fullScreenCss);
      getLightboxFakeBorder().css("background", "none");

      // Adds a green border to the top of the lightbox
      if (opts("fullscreenBorder")) {
        getLightboxHolder().css("border-top", "solid 4px #5ab22c");
      }

      // Disable autoResize since the lightbox is maximized.
      opts("autoResize", false);

      browserFix_removeScrollbars();

      if(opts("openFromBottom")) {
        getLightboxHolder().animate({"margin-top": "0px"}, 400);
      }
    } else {
      // Set height and width, as normal.
      setHeight(opts("height"));
      setWidth(opts("autoWidth") ? autoWidth() : opts("width"));
    }
  };

  /**
   * Returns true if we're supposed to stay in full screen when small
   * and the screen is currently small
   */
  var stayFullscreen = function() {
    return opts("fullscreenIfSmall") && $(window).width() <= LANDSCAPE_MAX_WIDTH;
  };

  /**
   * Enables or disables key bindings. (For now, this function only
   * handles ESC).
   *
   * Param: enabled - Whether the ESC binding should be enabled.
   */
  var setupKeyHandler = function(enabled) {
    var KEY_ESC = 27;
    var keyHandler = function(event) {
      if (event.which === KEY_ESC) {
        close();
      }
    };

    var parentDoc = $(window.parent.document);
    var iframeDoc = isIframe() ? getLightboxFrame().contents() : $();

    // Remove lightbox key handlers from both document and iframe.
    $(parentDoc).off("keydown.lightbox");
    $(iframeDoc).off("keydown.lightbox");

    if (enabled) {
      // Add key handlers to both document and iframe.
      $(parentDoc).on("keydown.lightbox", keyHandler);
      $(iframeDoc).on("keydown.lightbox", keyHandler);
    }
  };

  /**
   * Sets the width of the iframe.
   *
   * Param: width - The new width of the iframe. If not provided,
   *                no width is set.
   */
  var setWidth = function(width) {
    if (width) {
      opts("width", width);
      getLightboxHolder().width(width);
      getLightboxFakeBorder().width(width + BORDER_SIZE);
    }
    browserFix_positionFrame();
  };

  /**
   * Helper function to use mustache to generate the lightbox
   * elements, depending on whether the content is a div or iframe.
   *
   * Param: frameType - A string representing the frame to display,
   *                    a div or an iframe.
   * Return: The generated html of the lightbox elements.
   */
  var templateToHtml = function(frameType) {
    var context = {
      frame: frameType,
      theme: opts("theme")
    };
    return templates.localizedLightbox(context, true);
  };

  /**
   * Adds or removes the overflow property on the parent's html
   * element, preventing the parent from scrolling.
   *
   * Param: modal - True to prevent scrolling; false to enable it.
   */
  var toggleModal = function(modal) {
    var htmlElement = window.parent.$("html");
    modal ? htmlElement.addClass("lightbox-modal")
        : htmlElement.removeClass("lightbox-modal");
  };

  common.loadCss("/redesign/global/css/lightbox.css");

  templates.addTemplate("lightbox", LIGHTBOX_TEMPLATE);

  i18n.done(function(intl) {
    var context = {
      closeIcon: intl.L("Close"),
      frame: "{{frame}}",
      theme: "{{theme}}"
    };
    templates.addTemplate("localizedLightbox", templates.lightbox(context, true));

    // Called if show command issued before template was localized.
    if (_deferredShow) {
      _deferredShow.fn.apply(this, _deferredShow.argv);
      _deferredShow = null;
    }
  });

  var me = {
    /**
     * Calculates the height of the div or iframe content in the
     * lightbox, and resize the lightbox border accordingly.
     */
    autoResizeHeight : autoResize,

    /**
     * Closes the lightbox, if it was open. If called by an iframe,
     * this function may try to close a lightbox in the parent document.
     * Optionally takes in a parameter "key", which causes the
     * a matching close callback to be called if it exists.
     */
    close : close,

    /**
     * Set a callback function to be called when the lightbox is closed.
     * Can be called by either the parent document or the child iframe.
     * Takes in a parameter of the callback "key"; only a callback matching
     * this key will be called. If no key is passed, a callback is
     * created for when the lightbox is closed without any parameters
     * (e.g. click X button, click outside lightbox).
     */
    onclose : onclose,

    /**
     * Sets the height; overrides the height set via autoResize().
     */
    setHeight : setHeight,

    /**
     * Sets the width; overrides the width set via autoWidth().
     */
    setWidth : setWidth,

    /**
     * Shows the lightbox with the given contents (e.g. it's a div).
     * For a list of options and their default values, please see
     * documentation for "DEFAULTS" near the top of the file.
     */
    showWithContent : function(content, options) {
      // Ensure template has been localized.
      if (!templates.localizedLightbox) {
        _deferredShow = {
          fn: arguments.callee,
          argv: arguments
        };
        return;
      }
      init(options);
      createLightboxElements($(content));

      setHeightAndWidth();

      if (!opts("hidden")) {
        open();
      }
    },

    /**
     * Shows a lightbox with an iframe, set to the given URL.
     * For a list of options and their default values, please see
     * documentation for "DEFAULTS" near the top of the file.
     */
    showWithUrl : function(url, options) {
      // Ensure template has been localized.
      if (!templates.localizedLightbox) {
        _deferredShow = {
          fn: arguments.callee,
          argv: arguments
        };
        return;
      }
      var openIfNotHidden = function() {
        getLightboxFrame().off("load.lightbox");
        if (!opts("hidden")) {
          open();
        }
      };
      init(options);
      createLightboxElements(url);

      setHeightAndWidth();

      opts("autoResize") ? getLightboxFrame().on("load.lightbox", openIfNotHidden)
          : openIfNotHidden();
    },

    /**
     * Exposes a cross-context map for storage. Accessible from any frame.
     */
    storage : getLightboxContainer()[0].storage
  };

  return me;
});
