var originalImages = [];
var allImages = [];

$(window).load(function() {
  var nx = 5;
  var ny = 4;

  var margin = 10;
  var xmid = parseInt(nx / 2);
  var ymid = parseInt(ny / 2);

  var mainImage = $(".gallery img:first-child");
  var imagesWidth = mainImage.width() / nx;
  var imagesHeight = mainImage.height() / ny;

  var miPositions = mainImage.position();
  var divLeft = miPositions.left;
  var divTop = miPositions.top;

  $(".gallery img").hide();
  $.each($(".gallery img"), function(index, value) {
    var thisImage = $(value);
    allImages.push(breakApart(thisImage));
  });

  returnBack(allImages[2]);

  function copyImage() {

  }

  function breakApart(image) {
    var j = [];

    for (y = 0; y < ny; y++) {
      for (x = 0; x < nx; x++) {
        var gotImage = image.clone().removeAttr('id');
        gotImage.attr('style', 'position:relative');
        gotImage.css('left', (-(imagesWidth * x))+'px').css('top', (-(imagesHeight * y))+'px');

        var div = $('<div style="position:absolute; overflow:hidden">');
        div.css('width', imagesWidth+'px').css('height', imagesHeight+'px');
        div.css('left', (divLeft + (imagesWidth * x))+'px').css('top', (divTop + (imagesHeight * y))+'px');

        div.css('left', (divLeft + (imagesWidth * x) - (margin * (xmid - x))));
        div.css('top', (divTop + (imagesHeight * y) - (margin * (ymid - y))));

        div.append(gotImage);

        j.push(div);
      }
    }

    return j;
  }

  function returnBack(images) {
    for (i = 0; i < images.length; i++) {
      $("body").append(images[i]);
    }
  }
});