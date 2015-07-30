// gallery object used to be called from the event handlers within the galleryCtrl
// anonymous function below
var gallery = {
  setWidth: function() {
    // This iterates through the figure tags and changes the width property
    // of the images when invoked, which happens to be upon user trigger.
    var imgSize = $("#galleryOuter > #galleryWrap > figure.backgd");  //document.querySelectorAll('#galleryOuter > #galleryWrap > figure.backgd');
    var size = $("#galleryOuter").width();  //document.getElementById('galleryOuter').offsetWidth;

    // loop through the elements to assign a width value. jQuery could
    // use the each method to perform the same behavior
    for (var i = 0; i < imgSize.length; i++) {
      $(imgSize[i]).css("width", size + "px");  // vanilla js //imgSize[i].style.width = '' + size + 'px';
    }
  },
  next: function(){
    var size = $('#galleryOuter').width();
    var slides = $('.backgd');
    var dotnav = $(".dotnavwrap a");
    var one = $(".dotnavwrap a")[1];
    var two = $(".dotnavwrap a")[2];

      // 3 slide gallery, basic logic determines slide positions
      // conditional statement determines current transform values applied to the
      // .backgd elements. Logical or condition determines between no style
      // value applied and style applied for boolean determinations
      dotnav.removeClass("active");
      if (slides.css("transform") == "none" ||
          slides.css("transform") == "matrix(1, 0, 0, 1, 0, 0)") {
        slides.css("transform", "translateX(-" + size + "px)");
        one.classList.add("active");
      } else {
        // translate to farthest slide
        slides.css("transform", "translateX(-" + size*2 + "px)");
        two.classList.add("active");
      }
    },
  previous: function(){
    // this will take the window width and use that number to decrement the
    // property of the translate style on the gallery figure elements
    var size = $('#galleryOuter').width();
    var slides = $('.backgd');
    var dotnav = $(".dotnavwrap a");
    var zero = $(".dotnavwrap a")[0];
    var one = $(".dotnavwrap a")[1];

    dotnav.removeClass("active");
    // a reverse of the 3 slide gallery conditional from above, except
    // no 'or' statement required, as style has already been applied
    // by the time a user arrives at the far slide
    if (slides.css("transform") == "matrix(1, 0, 0, 1, -" + size*2 + ", 0)") {
      slides.css("transform", "translateX(-" + size + "px)");
      one.classList.add("active");
    } else {
      slides.css("transform", "translateX(0px)");
      zero.classList.add("active");
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
    // set the width of the gallery slide
    gallery.setWidth();
    // advance to the previous slide
    gallery.previous();
  });

  rightPaddle.on('click', function(e) {
    // set the width of the gallery slide
    gallery.setWidth();
    // advance to the next slide
    gallery.next();
  });
}();

$(function(){
  var dotnav = $(".dotnavwrap a");

  // changes classes when user interacts with the dotnav anchor tag
  dotnav.on("click", function() {
    var size = $('#galleryOuter').width();
    var slides = $('figure.backgd');
    var zero = $(".dotnavwrap a")[0];
    var one = $(".dotnavwrap a")[1];

    // change classes
    // remove active from full list of dotnav elements
    dotnav.removeClass("active");
    // get rid of jquery mobile's default invoked ui-link class
    dotnav.removeClass("ui-link");
    // add the class back onto the clicked dotnav element
    $(this).addClass("active");
    // switcher between the three dotnavs
    // conditional determines the class attribute for the first
    // two dotnav elements
    if (zero.getAttribute("class") == "active") {
      slides.css("transform", "translateX(0px)");
    } else if (one.getAttribute("class") == "active") {
      slides.css("transform", "translateX(-" + size + "px)");
    } else {
      slides.css("transform", "translateX(-" + size*2 + "px)");
    }
    // use the gallery.setWidth() method to re-establish window size if
    // user has changed orientation or size of the viewport
    gallery.setWidth();
  });
}());

gallery.setWidth();

$(document).ready(function() {
  var paddleDisplay = function() {
    var paddles = $("#galleryOuter > nav > ul");

    // show paddles
    if (paddles.css("display") == "none") {
      paddles.css("opacity", 1).fadeIn(400);
    }
    else {
      paddles.fadeTo(300, 0).hide(300);
    }
    // conditional to remove unavailable paddle;
  }

  var hero = $("section#hero");

    hero.on("mouseenter", function() {
      paddleDisplay();
    });
    hero.on("mouseleave", function() {
      paddleDisplay();
    });
});


// resize browser window in mobile devices to handle orientation changes
window.addEventListener("orientationchange", function() {
  gallery.setWidth();
});

// get rid of instantiated content from jquery mobile
$(function(){
  $("div.ui-loader").remove();
});

(function() {
  var swipe = $("figure.backgd");
  swipe.on("swiperight", function() {
    gallery.previous();
  });

  swipe.on("swipeleft", function() {
    gallery.next();
  });
})();
