$(document).ready(function() {
    /*------------------------------------------------------
    adds active class to the nav element where the scroll position is currently at
    ------------------------------------------------------*/
    $(window).scroll(function() {
      //get current sroll position
      var scrollPosition = $(window).scrollTop();
      //get the position of the containers
      var one = $("#one").offset().top,
          two = $("#two").offset().top,
          three = $("#three").offset().top,
          four = $("#four").offset().top,
          five = $("#five").offset().top,
          six = $("#six").offset().top,
          seven = $("#seven").offset().top,
          eight = $("#eight").offset().top,
          nine = $("#nine").offset().top,
          ten = $("#ten").offset().top;
      var nav1 = $("#nav1"),
          nav2 = $("#nav2"),
          nav3 = $("#nav3"),
          nav4 = $("#nav4"),
          nav5 = $("#nav5"),
          nav6 = $("#nav6"),
          nav7 = $("#nav7"),
          nav8 = $("#nav8"),
          nav9 = $("#nav9"),
          nav10 = $("#nav10");
      //if the scroll position is the same as the position of the container specified, add the "active" class to the corresponding nav element
      if (scrollPosition >= one) {
        nav1.siblings().removeClass("active");
        nav1.addClass("active");
      }
      if (scrollPosition >= two) {
        nav2.siblings().removeClass("active");
        nav2.addClass("active");
      }
      if (scrollPosition >= three) {
        nav3.siblings().removeClass("active");
        nav3.addClass("active");
      }
      if (scrollPosition >= four) {
        nav4.siblings().removeClass("active");
        nav4.addClass("active");
      }
      if (scrollPosition >= five) {
        nav5.siblings().removeClass("active");
        nav5.addClass("active");
      }
      if (scrollPosition >= six) {
        nav6.siblings().removeClass("active");
        nav6.addClass("active");
      }
      if (scrollPosition >= seven) {
        nav7.siblings().removeClass("active");
        nav7.addClass("active");
      }
      if (scrollPosition >= eight) {
        nav8.siblings().removeClass("active");
        nav8.addClass("active");
      }
      if (scrollPosition >= nine) {
        nav9.siblings().removeClass("active");
        nav9.addClass("active");
      }
      if (scrollPosition >= ten) {
        nav10.siblings().removeClass("active");
        nav10.addClass("active");
      }
    });
  /*--------------------------------------------------------
    //add active class to the clicked element
  --------------------------------------------------------*/
    $("a").click(function() {
      $(this).siblings().removeClass("active");
      $(this).addClass("active");
    });
    
  /*------------------------------------------------------
    smooth-scrolling; taken from https://css-tricks.com/snippets/jquery/smooth-scrolling/
  -------------------------------------------------------*/
    // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });
  });
  