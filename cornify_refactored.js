var cornify = (function() {
  var cornify_count = 0,
      cornyWords = ['Happy','Sparkly','Glittery','Fun','Magical','Lovely','Cute','Charming','Amazing','Wonderful'],
      cornify_url = 'http://www.cornify.com/'
      createElement = function(options) {
        var style = $.extend({}, options, {
              position: 'fixed',
              zIndex: 10,
              outline: 0,
            }),
            div = $("<div></div>").css(style).cornify().click(function() {
              api.add();
            }),
            useDefaultImage = !!options.useDefaultImage,
            imageUrl = createImageUrl(useDefaultImage),
            image = $("<img/>", {
              src: imageUrl
            });

        return div.append(image);
      },
      createImageUrl = function(useDefaultImage) {
        var submitTime = useDefaultImage ? 0 : new Date().getTime(),
            queryString = "?r=" + submitTime + "&url=" + document.location.href;
        return cornify_url + "getacorn.php" + queryString;
      },
      calculateTop = function() {
        var height = $(window).height(),
            multiplier = Math.random() * .75;
        return Math.round(height*multiplier) + "px";
      },
      calculateLeft = function() {
        return Math.round(Math.random()*90) + "%";
      },
      specialBehavior = {
        '15': function(options) {
            var win = $(window),
                height = win.height(),
                width = win.width(),
                randomPosition = function(value) {
                  return Math.round((value-530)/2) + "px";
                },
                newOptions = $.extend({}, options, {
                  top: randomPosition(height),
                  left: randomPosition(width),
                  zIndex: 1000,
                  useDefaultImage: true
                });
            return newOptions;
          },
        '5': function(options) {
          api.replaceHeaders();
          return options;
        }
      }
      api = {
        add: function() {
          var options = {
            top: calculateTop(),
            left: calculateLeft()
          },
          behavior = specialBehavior.hasOwnProperty(cornify_count) ? specialBehavior[cornify_count] : undefined
          options = behavior ? behavior(options) : options,
          element = createElement(options);

          cornify_count += 1;
          $("body").append(element);
        },
        getCornyWord: function() {
          var random = Math.random(),
              randomRawValue = random * cornyWords.length,
              randomIndex = Math.floor(randomRawValue);
          return cornyWords[randomIndex];
        },
        replaceHeaders: function() {
          var hc = 6,
              tagName;

          while(hc >= 1) {
              tagName = 'h' + hc;
              $(tagName).each(function() {
                var element = $(this)
                    cornyWord = api.getCornyWord(),
                    innerHtml = element.html();

                element.html(cornyWord + ' ' + innerHtml);
              });
              hc-=1;
          }
        },
      };

      return api;
}())

var cornami = {
    input:"",
    pattern:"38384040373937396665",
    clear:setTimeout('cornami.clear_input()',5000),
    load: function() {
        window.document.onkeydown = function(e) {
            if (cornami.input == cornami.pattern) {
                cornify_add();
                clearTimeout(cornami.clear);
                return;
            }
            else {
                cornami.input += e ? e.keyCode : event.keyCode;
                if (cornami.input == cornami.pattern) cornify_add();
                clearTimeout(cornami.clear);
                cornami.clear = setTimeout("cornami.clear_input()", 5000);
            }
        }
    },
    clear_input: function() {
        cornami.input="";
        clearTimeout(cornami.clear);
    }
}
cornami.load();

