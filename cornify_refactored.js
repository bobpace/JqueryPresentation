var cornify = (function() {
  var cornify_count = 0,
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
          //TODO: add functionality to change headers
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
          $("body").append(element); }
      };

      return api;
}())

cornify_replace = function() {
    // Replace text.
    var hc = 6,
        hs, h, k;

    while(hc >= 1) {
        //TODO: change this to use JQuery
        hs = document.getElementsByTagName('h' + hc);
        for (k = 0; k < hs.length; k++) {
            h = hs[k];
            h.innerHTML = cornyWordGenerator.getWord() + ' ' + h.innerHTML;
        }
        hc-=1;
    }
}

cornyWordGenerator = (function() {
  var words = ['Happy','Sparkly','Glittery','Fun','Magical','Lovely','Cute','Charming','Amazing','Wonderful'],
      length = words.length;
  return {
    getWord: function(){
      var random = Math.random(),
          randomRawValue = random * length,
          randomIndex = Math.floor(randomRawValue);
      return words[randomIndex];
    }
  };
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

