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
$(function($){
  $(".form__input--phone").mask("+38(999)999-99-99");
});

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

// Fancy Box
if ($("a.fancyimage").length) {
  $("a.fancyimage").fancybox(); 
}

// Console slider options
$('.console-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  asNavFor: '.console-slider-preview'
});
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
        slidesToScroll: 1
      }
    }
  ]
});

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

// Video scroll
$(document).ready( function() {
  $('.video-preview__link').click(function(){
    $("html, body").animate({ scrollTop: $(".video").offset().top }, 2000);
    return false;
  });
});

$(document).ready(function(){
  function videoShow(){
    $('.video-preview').fadeIn('slow');
  }
  setTimeout (videoShow, 5000);
});

$(document).ready(function(){
  $(".video-preview__close").click(function() {
    $(".video-preview").fadeOut();
  });
});