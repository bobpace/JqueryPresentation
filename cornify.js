//global variable
//global function
cornify_add = function() {
    cornify_count += 1;
    //CRITIQUE: does not follow single var pattern

    //NOTE: Look for things that are not going to change in between
    //calls to this cornify_add function, since its going to be pressed
    //so much, might as well not recreate all these constant values


    //PURPOSE: Create div with img child that src is set to random cornify image
    var cornify_url = 'http://www.cornify.com/',
        div = document.createElement('div');
    div.style.position = 'fixed';

    //PURPOSE: determine window height
    var numType = 'px';
    var heightRandom = Math.random()*.75;
    var windowHeight = 768;
    var windowWidth = 1024;
    //NOTE: height variable set here with 0 value
    var height = 0;
    var width = 0;
    var de = document.documentElement;
    //CRITIQUE: parens not necessary with typeof operator
    //CRITIQUE: should use === instead of ==
    if (typeof(window.innerHeight) == 'number') {
        windowHeight = window.innerHeight;
        windowWidth = window.innerWidth;
    } else if(de && de.clientHeight) {
        windowHeight = de.clientHeight;
        windowWidth = de.clientWidth;
    } else {
        numType = '%';
        //CRITIQUE: height will always be 0 here, why bother?  nothing can set
        //height in between it being initialized as 0 and this block of code
        height = Math.round( height*100 )+'%';
    }

    div.onclick = cornify_add;
    div.style.zIndex = 10;
    div.style.outline = 0;

    //PURPOSE: the 15th cornify click is special, it places a larger than
    //normal image dead center in the screen with maximum zindex
    //CRITIQUE: if else cluster fuck is never a good programming approach
    if( cornify_count==15 ) {
        div.style.top = Math.max( 0, Math.round( (windowHeight-530)/2 ) )  + 'px';
        div.style.left = Math.round( (windowWidth-530)/2 ) + 'px';
        div.style.zIndex = 1000;
    } else {
        //PURPOSE: normal clicks place an image randomly on the page somewhere
        if( numType=='px' ) div.style.top = Math.round( windowHeight*heightRandom ) + numType;
        //CRITIQUE: useless if/else block, will never get hit due to flawed logic above
        else div.style.top = height;
        div.style.left = Math.round( Math.random()*90 ) + '%';
    }

    //PURPOSE: create an image with proper query string parameters to get a unique image
    var img = document.createElement('img');
    var currentTime = new Date();
    var submitTime = currentTime.getTime();
    //PURPOSE: on the 15th special case click, always use the same default unicorn image
    if( cornify_count==15 ) submitTime = 0;
    img.setAttribute('src',cornify_url+'getacorn.php?r=' + submitTime + '&url='+document.location.href);
    var ease = "all .1s linear";
    //div.style['-webkit-transition'] = ease;
    //div.style.webkitTransition = ease;
    //PURPOSE: images will rotate randomly when mouse overed
    div.style.WebkitTransition = ease;
    div.style.WebkitTransform = "rotate(1deg) scale(1.01,1.01)";
    //div.style.MozTransition = "all .1s linear";
    div.style.transition = "all .1s linear";
    div.onmouseover = function() {
        var size = 1+Math.round(Math.random()*10)/100;
        var angle = Math.round(Math.random()*20-10);
        var result = "rotate("+angle+"deg) scale("+size+","+size+")";
        this.style.transform = result;
        //this.style['-webkit-transform'] = result;
        //this.style.webkitTransform = result;
        this.style.WebkitTransform = result;
        //this.style.MozTransform = result;
        //alert(this + ' | ' + result);
    }
    div.onmouseout = function() {
        var size = .9+Math.round(Math.random()*10)/100;
        var angle = Math.round(Math.random()*6-3);
        var result = "rotate("+angle+"deg) scale("+size+","+size+")";
        this.style.transform = result;  
        //this.style['-webkit-transform'] = result;
        //this.style.webkitTransform = result;
        this.style.WebkitTransform = result;
        //this.style.MozTransform = result;
    }
    //PURPOSE: Append newly created div with img child to body
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(div);
    div.appendChild(img);

    // Add stylesheet.
    //PURPOSE: on 5th click, appends a stylesheet containing rules
    //to turn all header tags (h1-h6), all anchor tags within header tags,
    //and all anchor tags the color pink
    if (cornify_count == 5) {
        var cssExisting = document.getElementById('__cornify_css');
        if (!cssExisting) {
            var head = document.getElementsByTagName("head")[0];
            var css = document.createElement('link');
            css.id = '__cornify_css';
            css.type = 'text/css';
            css.rel = 'stylesheet';
            css.href = 'http://www.cornify.com/css/cornify.css';
            css.media = 'screen';
            head.appendChild(css);
        }
        //PURPOSE: puts a random corny word in front of each of the header tags contents
        cornify_replace();
    }
}

cornify_replace = function() {
    // Replace text.
    var hc = 6;
    var hs;
    var h;
    var k;
    var words = ['Happy','Sparkly','Glittery','Fun','Magical','Lovely','Cute','Charming','Amazing','Wonderful'];
    while(hc >= 1) {
        hs = document.getElementsByTagName('h' + hc);
        for (k = 0; k < hs.length; k++) {
            h = hs[k];
            h.innerHTML = words[Math.floor(Math.random()*words.length)] + ' ' + h.innerHTML;
        }
        hc-=1;
    }
}

//PURPOSE: up up down down left right left right b a konami code to enter super
//unicorn power mode, each key press after entering the code will create a new
//image

/*
 * Adapted from http://www.snaptortoise.com/konami-js/
 */
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
