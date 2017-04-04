(function($) {
  "use strict"; // Start of use strict

  $(window).load(function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
      $('body').addClass('ios');
    };
    $('body').removeClass('loaded'); 
  });

  // Old browser notification
  $(function() { 
    $.reject({
      reject: {
        msie: 9
      },
      imagePath: 'img/icons/jReject/',
      display: [ 'chrome','firefox','safari','opera' ],
      closeCookie: true,
      cookieSettings: {
        expires: 60*60*24*365
      },
      header: 'Ваш браузер устарел!',
      paragraph1: 'Вы пользуетесь устаревшим браузером, который не поддерживает современные веб-стандарты и представляет угрозу вашей безопасности.',
      paragraph2: 'Пожалуйста, установите современный браузер:',
      closeMessage: 'Закрывая это уведомление вы соглашаетесь с тем, что сайт в вашем браузере может отображаться некорректно.',
      closeLink: 'Закрыть это уведомление',
    });
  });

  // Masked phone
  $(".form__input--phone").mask("+38(999)999-99-99");


  // Fancy Box
  if ($("a.fancyimage").length) {
    $("a.fancyimage").fancybox(); 
  }

  // Console slider options
  if($('.console-slider').length) {
    $('.console-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      asNavFor: '.console-slider-preview',
      infinite: true
    });
  }

  if ($('.console-slider-preview').length) {
    $('.console-slider-preview').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.console-slider',
      dots: false,
      focusOnSelect: true,
      mobileFirst: true,
      prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"></button>',
      nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"></button>',
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 0,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true
          }
        }
      ]
    });
  }
  if($('.comment__slider').length) {
    // Comment slider options
    $('.comment__slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      focusOnSelect: true,
      mobileFirst: true,
      prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"></button>',
      nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"></button>',
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 0,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  // Video scroll=

  $(function() {
   
    $('.video-preview__link').on('click', function(){
      $("html, body").animate({ scrollTop: $(".video").offset().top }, 2000);
      return false;
    });
    var timeoutID = setTimeout ( function() {
      $('.video-preview').fadeIn('slow');
       clearTimeout(timeoutID);
    }, 5000);
   
  });

  $(".video-preview__close").on('click', function() {
    $(".video-preview").fadeOut();
  });
  
  $(function($) {
    var currentMousePos = { x: -1, y: -1 },
        prevMousePos    = {x: -1, y: -1},
        documentTop     = $(document).scrollTop();

    $(document).on('mousemove, mouseout', function(event) {
      currentMousePos.x = event.pageX;
      currentMousePos.y = event.pageY;
      documentTop = $(document).scrollTop();
        // ELSEWHERE, your code that needs to know the mouse position without an event
        if ((currentMousePos.y < prevMousePos.y) && (currentMousePos.y < documentTop + 21)) {
          $('#sibassa__modal').modal("show");
          $('#sibassaMagnet__modal').modal("show");
          $(document).unbind('mousemove, mouseout');
        }
        prevMousePos.x = currentMousePos.x;
        prevMousePos.y = currentMousePos.y;
      });
  });


  $('.question__radio-group [type=radio]').on('click, change', function() {
    var $toggle = $('.question__radio-group [type=radio]'),
        $this   = $(this),
        value   = $this.siblings('.radio-btn__box').find('.radio-btn__text').text();
    $toggle
      .val('')
      .filter($this)
      .val(value);
  });

})(jQuery); // End of use strict
// Equal Height function
function setEqualHeight(columns)
{
  var tallestcolumn = 0;
  columns.each(
    function()
    {
      currentHeight = $(this).height();
      if(currentHeight > tallestcolumn)
      {
        tallestcolumn = currentHeight;
      }
    }
    );
  columns.height(tallestcolumn);
}

// Equial Height
$(window).on('resize', function(){
  // Only 768px +
  if( $( window ).width() >= 768 ) {
    // section problem
    setEqualHeight($('.issue__content'));
    setEqualHeight($('.element__text'));
  }
}).trigger('resize');