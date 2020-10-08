
$(function(){
  $(".phone-mask").mask("+9 (999) 999-99-99");
});

$(document).ready(function(){
  $("#menu").on("click","a", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id  = $(this).attr('href'),

    //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;
    
    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({scrollTop: top}, 1000);
  });
});

$(function () {

  $('.service_cta-btn') .click(function () {
    $('.overlay__modal') .addClass('show-overlay');
  });

  $('.first-service_cta-btn') .click(function () {
    $('#win1') .addClass('show-block');
  });

   $('.second-service_cta-btn') .click(function () {
    $('#win2') .addClass('show-block');
  });

  $('.third-service_cta-btn') .click(function () {
    $('#win3') .addClass('show-block');
  });
   $('.os-service_cta-btn') .click(function () {
    $('#win4') .addClass('show-block');
  });

  $('.overlay__modal, .close') .click(function () {
    $('.overlay__modal, .popup') .removeClass('show-block');
  });
  
  $('.overlay__modal, .close') .click(function () {
    $('.overlay__modal, .popup') .removeClass('show-overlay');
  });
}); 

$ (function () {
    $('.pic-slider').slick({
    centerMode: true,
    arrows: false,
    draggable: true,
    autoplay: false,
    infinite: true,
    dots: true, 
    variableWidth: true,
    slidesToShow: 1,
  });
});

$(document).ready(function() {
 $('.reviews__slider').owlCarousel({
    loop:true,
    nav:false,
    pagination:true,
    dots:true,
    autoHeight:true,
    items: 1, 
    margin: 10,
   })
});

$(function(){
  
  var note = $('#note'),
    ts = new Date(2012, 0, 1),
    newYear = true;
  
  if((new Date()) > ts){
    // The new year is here! Count towards something else.
    // Notice the *1000 at the end - time must be in milliseconds
    ts = (new Date()).getTime() + 09*54*60*1000;
    newYear = false;
  }
    
  $('#countdown').countdown({
    timestamp : ts,
    callback  : function(days, hours, minutes, seconds){
      
      var message = "";
      
      message += days + " day" + ( days==1 ? '':'s' ) + ", ";
      message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
      message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
      message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";
      
      if(newYear){
        message += "left until the new year!";
      }
      else {
        message += "left to 10 days from now!";
      }
      
      note.html(message);
    }
  });
  
});

$(document).ready(function(){
  $('[data-submit]').on('click', function(e){
      e.preventDefault();
    $(this).parent('form').submit();
  })
  $.validator.addMethod(
          "regex",
          function(value, element, regexp) {
              var re = new RegExp(regexp);
              return this.optional(element) || re.test(value);
          },
          "Please check your input."
      );
  function valEl(el){
     
          el.validate({
        rules:{
          tel:{
            required:true
          },
          name:{
            required:true
          },
          email:{
            required:true,
            email:true
          }
        },
          messages:{
            tel:{
                required:'Поле обязательно для заполнения'
            },
            name:{
                required:'Поле обязательно для заполнения',
            },
            email:{
              required:'Поле обязательно для заполнения', 
              email:'Неверный формат E-mail'
            }
        },            
        submitHandler: function (form) {
          $('#loader').fadeIn();
          var $form = $(form);
          var $formId = $(form).attr('id');
          switch($formId){
            case'goToNewPage':
              $.ajax({
                    type: 'POST',
                    url: $form.attr('action'),
                    data: $form.serialize(),
                  })
                  .always(function (response) {  
                      //ссылка на страницу "спасибо" - редирект
                      location.href='https://wayup.in/lm/landing-page-marathon/success';
                      //отправка целей в Я.Метрику и Google Analytics
                      ga('send', 'event', 'masterklass7', 'register');
          yaCounter27714603.reachGoal('lm17lead');
              });
          break;        
          case'popupResult':
            $.ajax({
                  type: 'POST',
                  url: $form.attr('action'),
                  data: $form.serialize(),
                }).done(function(result) {
                    // переход
                    window.location.href = "http://polivtut.ru/success/";
                })
                .always(function (response) {                    
                setTimeout(function (){
                 $('#loader').fadeIn();
                },800);
                setTimeout(function (){
                  $('#overlay').fadeIn();
                  $form.trigger('reset');
                  //строки для остлеживания целей в Я.Метрике и Google Analytics
                },1100);
                $('#overlay').on('click', function(e) {
        $('#overlay').fadeOut();
    });
                    
            });
        break;          
        }       
return false; 
    }                           
  })
        }                        
     
              $('.js-form').each(function() {
                valEl($(this)); 
              });
   })
