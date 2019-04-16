
$( document ).ready(function() {
  $(".phone-mask").mask("+7(999) 999-99-99");
  $(".time-mask").mask("99:99");

  $(window).scroll(function() {
    if ($(window).scrollTop() >= 200) {
      $('.page-header').addClass('page-header--sticky');
    } else {
      $('.page-header').removeClass('page-header--sticky');
    }
  });


  var positions = [], //сюда сложим на загрузке страницы позиции наших "якорных" блоков, чтобы не считать их каждый раз. и сюда же положим ссылки на соответствующие a.scroll-to
      currentActive = null, //здесь будет храниться id текущего блока, чтобы не менять классы по 100 раз за одну прокрутку
      links = $('.anchor-link'); //сохраним массив всех a.scroll-to

  $(".anchor-section").each(function(){ //перебираем блоки, сохраняем позиции и ссылки на пункты меню
      positions.push({
          top: $(this).position().top - 200,
          a: links.filter('[href="#'+$(this).attr('id')+'"]')
      });
  });

  //делаем реверс массива, чтобы при скролле перебирать его с конца и выходить из цикла при нахождении
  //зачем нам проверять каждый блок, если прокрутка уже ниже последнего, верно?
  positions = positions.reverse();

  $(window).on('scroll',function() {
      var winTop = $(window).scrollTop();
      for(var i = 0; i < positions.length; i++){
          if(positions[i].top < winTop){ //если прокрутка страницы ниже нашего блока
              if(currentActive !== i){ //и если мы еще не добавили класс текущему блоку
                  currentActive = 0;
                  links.filter('.active').removeClass('active'); //снимаем класс .active с текущего пункта меню
                  positions[i].a.addClass("active");
              }
              break; //выходим из цикла, не нужно проверять блоки, которые выше
          }
      }
  });
});
