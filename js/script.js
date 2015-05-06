// gallery object used to be called from the event handlers within the galleryCtrl
// anonymous function below
var gallery = {
  setWidth: function() {
    // This iterates through the figure tags and changes the width property
    // of the images when invoked, which happens to be upon user trigger.
    var imgSize = $("#galleryOuter > #galleryWrap > figure.backgd");  //document.querySelectorAll('#galleryOuter > #galleryWrap > figure.backgd');
    var size = $("#galleryOuter").width();  //document.getElementById('galleryOuter').offsetWidth;

    for (var i = 0; i < imgSize.length; i++) {
      $(imgSize[i]).css("width", size + "px");  // vanilla js //imgSize[i].style.width = '' + size + 'px';
    }
  },
  next: function(){
    var size = $('#galleryOuter').width();
    var slides = $('.backgd');

    for (var i = 0; i < slides.length; i++) {
      console.log(slides[i]);
      slides.css("transform", "translateX(-" + size*i + "px)");
      }
    },
  previous: function(){
    // this will take the window width and use that number to decrement the
    // property of the translate style on the gallery figure elements
    var size = $('#galleryOuter').width();
    var slides = $('.backgd');

    for (var i = 0; i < slides.length; i++) {
      slides.css("transform", "translateX(0px)");
    }
    // loop through dotnav anchor elements, remove active class from all elements and
    // then set index to the next
  }
};

// self-invoked function returns access to the event handlers when the page loads
var triggers = function() {
  var leftPaddle = $('#left a');
  var rightPaddle = $('#right a');

  leftPaddle.on('click', function(e) {
    gallery.setWidth();
    gallery.previous();
  });

  rightPaddle.on('click', function(e) {
    gallery.setWidth();
    gallery.next();
  });
}();

$(function(){
  var dotnav = $(".dotnavwrap a");

  // changes classes when user interacts with the dotnav anchor tag
  dotnav.on("click", function(e) {
    dotnav.removeClass("active");
    $(this).addClass("active");
    // jump to slide
  });
}());


gallery.setWidth();
