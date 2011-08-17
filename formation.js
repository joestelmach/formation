!function(context) {

  var css = 
    '.formation.flow .left {' +
      'display: inline-block;' +
      '*display: inline;' +
      'zoom: 1;' +
      'vertical-align:top;' +
    '}' +

    '.formation.flow .right {' +
      'float: right;' +
      'zoom: 1;' +
    '}' +

    '.formation span.clear {' +
      'clear:both;' +
      'display:block;' +
    '}'; 

  var styleNode = $.el.style({type : 'text/css'});
  if(!!(window.attachEvent && !window.opera)) {
    styleNode.styleSheet.cssText = css;
  } 
  else {
    styleNode.appendChild(document.createTextNode(css));
  }
  document.getElementsByTagName('head')[0].appendChild(styleNode);

  var formation = {

    stack : function() {

      var options = {
        padding : '10px',
        className : 'formation stack'
      };

      var el = $.el.div();

      for(var i=0; i<arguments.length; i++) {
        var arg = arguments[i];

        // if the argument is a dom node, we append it
        if(arg.nodeType === 1) {
          var isLast = i === arguments.length - 1;
          arg.style.marginBottom = isLast ? '0' : options.padding;
          el.appendChild(arg);
          $.el.span({className: 'clear'}).appendTo(el);
        }

        // if the argument is a plain old object, and it's in the 
        // first slot, we process the object as options
        else if(i === 0 && typeof(arg) === 'object') {
          processOptions(options, arg, el);
        }
      }

      el.className = options.className;
      return el;
    },

    flow : function() {
      var options = {
        padding : '10px',
        className : 'formation flow'
      };

      var el = $.el.div();
      var args = arguments;

      // process any formation options or element attributes
      var firstArg = args[0];
      if(!!firstArg && firstArg.nodeType !== 1 && typeof(firstArg) === 'object') {
        processOptions(options, firstArg, el);
        args = Array.prototype.slice.call(args, 1);
      }

      // determine the spring index 
      var i, springIndex = -1;
      for(i=0; i<args.length; i++) {
        if(args[i] === 'spring') {
          springIndex = i;
          break;
        }
      }

      // add children after the spring from right to left
      var leftLimit = springIndex < 0 ? args.length : springIndex;
      var child;
      for(i=args.length-1; i>leftLimit; i--) {
        child = args[i];
        child.className += ' right';
        if(i === args.length - 1) el.className += ' last';
        if(i === 0) child.className += ' first';
        child.style.marginLeft = options.padding;

        !!previousChild && !!previousChild.nextChild ?
          el.insertBefore(child, previousChild.nextChild) :
          el.appendChild(child);

        var previousChild = child;
      }

      // add children before the spring from left to right
      for(i=0; i<leftLimit; i++) {
        child = args[i];

        // set class name
        child.className += ' left';
        if(i === 0) child.className += ' first';
        if(i === leftLimit - 1) child.className += ' last';

        // set style attributes
        if(i !== leftLimit - 1) child.style.marginRight = options.padding;

        el.appendChild(child);
      }
      
      $.el.span({className : 'clear'}).appendTo(el);

      el.className = options.className;
      return el;
    }
  };

  var processOptions = function(existing, given, el) {
    for(var key in given) {
      // any key corresponding to a formation option will be copied over 
      if(existing[key] !== undefined) {
        existing[key] = given[key];
      }

      // other keys will be considered element attributes
      else {
        console.log(key);
        el.setAttribute(key, given[key]);
      }
    }
  };

  // If we're in a CommonJS environment, we export our formation methods
  if(typeof module !== 'undefined' && module.exports) {
    module.exports = formation;
  } 

  // otherwise, we attach them to the top level $.formation namespace
  else {
    var dollar = context['$'] || {};
    dollar.el = dollar.el || {};
    for(var key in formation) {
      dollar.el[key] = formation[key];
    }
    context['$'] = dollar;
  }

}(this);

