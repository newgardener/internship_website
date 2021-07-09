$ = jQuery.noConflict();

$(document).ready(function () {
  $(".menu-toggle").click(function () {
    $("body").toggleClass("open_menu");
    $(".site-header-menu").toggleClass("toggled-on");
  });

  $(".overlay").click(function () {
    $("body").removeClass("open_menu");
    $(".site-header-menu").removeClass("toggled-on");
  });

  var header_h = $("#masthead").outerHeight();

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= header_h) {
      $("#masthead").addClass("narrow");
    } else {
      $("#masthead").removeClass("narrow");
    }
  });

  var popup_h = $(".pop_up_msg").outerHeight();
  if ($(document).has(".pop_up_msg")) {
    $("#masthead").css({ top: popup_h });
    // $("body")
    //   .not(".home")
    //   .css({ "padding-top": header_h + popup_h });
  }

  $(".zigzag_row").each(function (i) {
    var highestBox3 = 0;
    $(this)
      .children("div")
      .each(function (index, element) {
        if ($(element).outerHeight() > highestBox3) {
          highestBox3 = $(element).outerHeight();
        }
      });
    //alert(highestBox3);
    $(this).children("div:last-child").height(highestBox3);
    $(this).parent().parent().children(".zigzag_image").height(highestBox3);
  });

  $('.tabber_sec a[href*="#"]').on("click", function (e) {
    e.preventDefault();

    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      500,
      "linear"
    );
  });

  $(".pop_up_msg").click(function () {
    $(this).addClass("popup_hide");
    $("#masthead").css({ top: 0 });
    $("body").not(".home").css({ "padding-top": header_h });
    $("#site-header-menu").css({ "padding-top": 10 });
  });

  jQuery(".mobiles").addClass("intros");

  var P_ad = 600;
  jQuery(".mobiles span").each(function () {
    jQuery(this).css({ "transition-delay": P_ad + "ms" });
    P_ad = P_ad + 200;
  });

  var P_ads = 400;
  jQuery(".face_identification_items .icon,.face_identification_items h4").each(
    function () {
      jQuery(this).css({ "transition-delay": P_ads + "ms" });
      P_ads = P_ads + 100;
    }
  );

  var P_adss = 1000;
  jQuery(".dashed_circle span").each(function () {
    jQuery(this).css({ "transition-delay": P_adss + "ms" });
    P_adss = P_adss + 400;
  });

  var P_adsss = 500;
  jQuery(".mobile3d .mobile_3d .image_wrapper").each(function () {
    jQuery(this).css({ "transition-delay": P_adsss + "ms" });
    P_adsss = P_adsss + 100;
  });

  var P_adssss = 400;
  jQuery(".Facial_authentication .imsi .image_wrapper").each(function () {
    jQuery(this).css({ "transition-delay": P_adssss + "ms" });
    P_adssss = P_adssss + 500;
  });

  var P_adsssss = 400;
  jQuery(".always_open .form_wrapper form > div > div").each(function () {
    jQuery(this).css({ "transition-delay": P_adsssss + "ms" });
    P_adsssss = P_adsssss + 200;
  });

  var P_adssssss = 600;
  jQuery(".nff_identification_wrapper > div").each(function () {
    jQuery(this).css({ "transition-delay": P_adssssss + "ms" });
    P_adssssss = P_adssssss + 400;
  });

  var P_adsssssss = 600;
  jQuery(".ocr_authenticity .image_wrapper").each(function () {
    jQuery(this).css({ "transition-delay": P_adsssssss + "ms" });
    P_adsssssss = P_adsssssss + 400;
  });

  var P_adssssssss = 600;
  jQuery(".identification_wrapper .image_wrapper").each(function () {
    jQuery(this).css({ "transition-delay": P_adssssssss + "ms" });
    P_adssssssss = P_adssssssss + 400;
  });

  var P_adsssssssss = 600;
  jQuery(".solution_won_01_wrapper .solution_won_block").each(function () {
    jQuery(this).css({ "transition-delay": P_adsssssssss + "ms" });
    P_adsssssssss = P_adsssssssss + 400;
  });

  var P_adssssssssss = 600;
  jQuery(".blind_spot_wrapper").each(function () {
    jQuery(this).css({ "transition-delay": P_adssssssssss + "ms" });
    P_adssssssssss = P_adssssssssss + 400;
  });

  // For First-Child ---------------------------------------------------
  $(".features .child_selector:nth-child(1)").hover(
    function () {
      jQuery(".features").css("-webkit-transform", "translateX(" + 15 + "px)");
      jQuery(".features .child_selector:nth-child(2)").css(
        "-webkit-transform",
        "translateX(" + 15 + "px)"
      );
      jQuery(".features .child_selector:nth-child(3)").css(
        "-webkit-transform",
        "translateX(" + 15 + "px)"
      );
    },
    function () {
      jQuery(".features").css("-webkit-transform", "translateX(" + 0 + "px)");
      jQuery(".features .child_selector:nth-child(2)").css(
        "-webkit-transform",
        "translateX(" + 0 + "px)"
      );
      jQuery(".features .child_selector:nth-child(3)").css(
        "-webkit-transform",
        "translateX(" + 0 + "px)"
      );
    }
  );

  // For Second-Child ---------------------------------------------------
  $(".features .child_selector:nth-child(2)").hover(
    function () {
      jQuery(".features .child_selector:nth-child(1)").css(
        "-webkit-transform",
        "translateX(" + -15 + "px)"
      );
      jQuery(".features .child_selector:nth-child(3)").css(
        "-webkit-transform",
        "translateX(" + 15 + "px)"
      );
    },
    function () {
      jQuery(".features .child_selector:nth-child(1)").css(
        "-webkit-transform",
        "translateX(" + 0 + "px)"
      );
      jQuery(".features .child_selector:nth-child(3)").css(
        "-webkit-transform",
        "translateX(" + 0 + "px)"
      );
    }
  );

  // For last-Child ---------------------------------------------------
  $(".features .child_selector:nth-child(3)").hover(
    function () {
      jQuery(".features").css("-webkit-transform", "translateX(" + -15 + "px)");
      jQuery(".features .child_selector:nth-child(1)").css(
        "-webkit-transform",
        "translateX(" + -15 + "px)"
      );
      jQuery(".features .child_selector:nth-child(2)").css(
        "-webkit-transform",
        "translateX(" + -15 + "px)"
      );
    },
    function () {
      jQuery(".features").css("-webkit-transform", "translateX(" + 0 + "px)");
      jQuery(".features .child_selector:nth-child(1)").css(
        "-webkit-transform",
        "translateX(" + 0 + "px)"
      );
      jQuery(".features .child_selector:nth-child(2)").css(
        "-webkit-transform",
        "translateX(" + 0 + "px)"
      );
    }
  );

  $(".main_slider").owlCarousel({
    items: 1,
    margin: 0,
    nav: false,
    dots: true,
    loop: true,
    mouseDrag: true,
    responsiveClass: true,
    autoplay: true,
    autoplayTimeout: 6000,
    autoplaySpeed: 6000,
    autoplayHoverPause: true,
    animateIn: "fadeIn",
    animateOut: "fadeOut",
  });

  $(".mobile_fillup_slide").owlCarousel({
    items: 1,
    margin: 0,
    nav: false,
    dots: false,
    loop: true,
    mouseDrag: false,
    responsiveClass: true,
    autoplayHoverPause: false,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplaySpeed: 1000,
    animateIn: "fadeIn",
    animateOut: "fadeOut",
  });

  $(".ocr_authenticity_mobile").owlCarousel({
    items: 1,
    margin: 0,
    nav: true,
    dots: true,
    loop: true,
    mouseDrag: false,
    responsiveClass: true,
    autoplayHoverPause: false,
    autoplay: true,
  });

  $(".solution_won_01_mob_slider").owlCarousel({
    items: 1,
    margin: 0,
    nav: true,
    dots: true,
    loop: true,
    mouseDrag: false,
    responsiveClass: true,
    autoplayHoverPause: false,
    autoplay: true,
    autoplayTimeout: 9000,
  });

  $(".position_slider").owlCarousel({
    items: 2,
    margin: 0,
    nav: true,
    dots: true,
    loop: true
  });

  var win_w = $(window).width();
  var header_h = $("#masthead").outerHeight();
  $(".home_banner .banner_content").css({
    "padding-top": header_h * 1.5,
    "padding-bottom": (header_h / 3) * 2,
  });
  $(".inner_banner .banner_content").css({
    "padding-top": (header_h / 4) * 2.25,
    "padding-bottom": (header_h / 4) * 2.25,
  });

  if (win_w < 992) {
    $("#site-header-menu").css({
      "padding-top": popup_h + 20,
      "padding-bottom": popup_h + 20,
    });
  }

  $(".menu-main-menu-container > ul > li")
    .has(".dropdown_menu")
    .each(function () {
      $(this).prepend("<span></span>");
    });

  $(".menu-main-menu-container > ul > li > a").click(function (e) {
    var sub_menu = $(this).next(".dropdown_menu");
    //var sub_icon = $(this).prev('span');
    e.preventDefault();
    $(".dropdown_menu:visible").not(sub_menu).slideToggle("medium");
    sub_menu.slideToggle("medium");

    if ($(this).parent("li").children("span").hasClass("open")) {
      //alert('has class');
      $(this).parent("li").children("span").removeClass("open");
    } else {
      //alert('No class');
      $(".menu-main-menu-container > ul > li span")
        .not(this)
        .removeClass("open");
      $(this).parent("li").children("span").addClass("open");
    }

    if ($(this).parent("li").hasClass("clicked")) {
      //alert('has class');
      $(this).parent("li").removeClass("clicked");
    } else {
      //alert('No class');
      $(".menu-main-menu-container > ul > li").not(this).removeClass("clicked");
      $(this).parent("li").addClass("clicked");
    }
  });

  $(".dropdown_menu ul > li > a").click(function () {
    if ($(this).hasClass("clicked")) {
      //alert('has class');
      $(this).removeClass("clicked");
    } else {
      //alert('No class');
      $(".dropdown_menu ul > li > a").not(this).removeClass("clicked");
      $(this).addClass("clicked");
    }
  });

  // -------------------------- WOW JS
  wow = new WOW({
    animateClass: "animated",
    offset: 100,
    callback: function (box) {
      console.log("WOW: animating <" + box.tagName.toLowerCase() + ">");
    },
  });
  wow.init();

  // --------------------------- Experience Tabs
  $("a#exp-ocr-tab").click(function() {
		$("a.exp-submenu.blue-bg").removeClass("blue-bg");
		$("a.exp-submenu.blue-bg").css("background", "#fff");

		$(this).addClass("blue-bg");
		$(this).css("background", "#d4d4d4");
		console.log('highlight ocr-tab');
	});
	$("a#exp-ocrdoc-tab").click(function() {
		$("a.exp-submenu.blue-bg").removeClass("blue-bg");
		$("a.exp-submenu.blue-bg").css("background", "#fff");

		$(this).addClass("blue-bg");
		$(this).css("background", "#d4d4d4");
		console.log('highlight ocr-doc-tab');
	});
	$("a#exp-1won-tab").click(function() {
		$("a.exp-submenu.blue-bg").removeClass("blue-bg");
		$("a.exp-submenu.blue-bg").css("background", "#fff");

		$(this).addClass("blue-bg");
		$(this).css("background", "#d4d4d4");
		console.log('highlight 1won-tab');
	});
	$("a#exp-face-tab").click(function() {
		$("a.exp-submenu.blue-bg").removeClass("blue-bg");
		$("a.exp-submenu.blue-bg").css("background", "#fff");

		$(this).addClass("blue-bg");
		$(this).css("background", "#d4d4d4");
		console.log(`highlight face-tab`);
	});
	$("a#exp-realpass-tab").click(function() {
		$("a.exp-submenu.blue-bg").removeClass("blue-bg");
		$("a.exp-submenu.blue-bg").css("background", "#fff");

		$(this).addClass("blue-bg");
		$(this).css("background", "#d4d4d4");
		console.log(`highlight realpass-tab`);
	});

});
// -------------------------- WOW JS

$(window).resize(function () {
  var win_w = $(window).width();
  var header_h = $("#masthead").outerHeight();
  $(".home_banner .banner_content").css({
    "padding-top": header_h * 1.5,
    "padding-bottom": (header_h / 3) * 2,
  });
  $(".inner_banner .banner_content").css({
    "padding-top": (header_h / 4) * 2.25,
    "padding-bottom": (header_h / 4) * 2.25,
  });
});

