// Check boiler plate jQuery plugin from:
// http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/

(function($) {

  $.panels = function(element, options) {
    var defaults = {
      rows: 5,
      cols: 5,
      margin: 10,
      someCallback: function() {}
    }

    var panel = this;
    panel.settings = {};

    var $container = $(element), $images = $(element).children('img'), element = element;
    var rowMid, colMid, brokenWidth, brokenHeight, posLeft, posTop;

    panel.init = function() {
      panel.settings = $.extend({}, defaults, options);

      var thisImage = get_first();

      rowMid = parseInt(panel.settings.rows / 2);
      colMid = parseInt(panel.settings.cols / 2);

      brokenWidth = thisImage.width() / panel.settings.rows;
      brokenHeight = thisImage.height() / panel.settings.cols;

      posLeft = thisImage.position().left;
      posTop = thisImage.position().top;

      x = break_apart(thisImage);
      return_back(x);

      $images.hide();

      panel.next();
    }

    var get_first = function() {
      return $container.children('img').filter(':first');
    }

    var break_apart = function(image) {
      var j = [];

      for (y = 0; y < panel.settings.cols; y++) {
        for (x = 0; x < panel.settings.rows; x++) {
          var gotImage = image.clone();
          gotImage.attr('style', 'position:relative');
          gotImage.css('left', (-(brokenWidth * x))+'px').css('top', (-(brokenHeight * y))+'px');

          var div = $('<div style="position:absolute; overflow:hidden">');
          div.css('width', brokenWidth+'px').css('height', brokenHeight+'px');
          div.css('left', (posLeft + (brokenWidth * x))+'px').css('top', (posTop + (brokenHeight * y))+'px');

          div.css('left', (posLeft + (brokenWidth * x) - (panel.settings.margin * (rowMid - x))));
          div.css('top', (posTop + (brokenHeight * y) - (panel.settings.margin * (colMid - y))));

          div.append(gotImage);

          j.push(div);
        }
      }

      return j;
    }

    var return_back = function(images) {
      for (i = 0; i < images.length; i++) {
        $("body").append(images[i]);
      }
    }

    panel.play = function() {
      console.log('play');
    }
    panel.next = function() {
      console.log('next');
    }
    panel.previous = function() {
      console.log('previous');
    }

    // Here we go!
    panel.init();
  }

  $.fn.panels = function(options) {
    return this.each(function() {
      if (undefined == $(this).data('panels')) {
        var panel = new $.panels(this, options);

        $(this).data('panels', panel);
      }
    });
  }

})(jQuery);

$(window).load(function() {
  $(".gallery").panels({rows:7, cols:4, margin:15});
});


// var originalImages = [];
// var allImages = [];
// 
// $(window).load(function() {
//   var nx = 5;
//   var ny = 2;
// 
//   var margin = 10;
//   var xmid = parseInt(nx / 2);
//   var ymid = parseInt(ny / 2);
// 
//   var mainImage = $(".gallery img:first-child");
//   var imagesWidth = mainImage.width() / nx;
//   var imagesHeight = mainImage.height() / ny;
// 
//   var miPositions = mainImage.position();
//   var divLeft = miPositions.left;
//   var divTop = miPositions.top;
// 
//   $(".gallery img").hide();
//   $.each($(".gallery img"), function(index, value) {
//     var thisImage = $(value);
//     allImages.push(breakApart(thisImage));
//   });
// 
//   returnBack(allImages[0]);
// 
//   function copyImage() {
// 
//   }
// 
//   function breakApart(image) {
//     var j = [];
// 
//     for (y = 0; y < ny; y++) {
//       for (x = 0; x < nx; x++) {
//         var gotImage = image.clone().removeAttr('id');
//         gotImage.attr('style', 'position:relative');
//         gotImage.css('left', (-(imagesWidth * x))+'px').css('top', (-(imagesHeight * y))+'px');
// 
//         var div = $('<div style="position:absolute; overflow:hidden">');
//         div.css('width', imagesWidth+'px').css('height', imagesHeight+'px');
//         div.css('left', (divLeft + (imagesWidth * x))+'px').css('top', (divTop + (imagesHeight * y))+'px');
// 
//         div.css('left', (divLeft + (imagesWidth * x) - (margin * (xmid - x))));
//         div.css('top', (divTop + (imagesHeight * y) - (margin * (ymid - y))));
// 
//         div.append(gotImage);
// 
//         j.push(div);
//       }
//     }
// 
//     return j;
//   }
// 
//   function returnBack(images) {
//     for (i = 0; i < images.length; i++) {
//       $("body").append(images[i]);
//     }
//   }
// });