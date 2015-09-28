/*!--------------------------------*\
   一些自己添加的功能(原生)
   @author 欧阳湘粤 (Owen)
   https://github.com/Numerhero/NumerHero.github.io
\*---------------------------------*/

$(function()
{
  var oSearchInput = document.getElementById('search-input'),
      oSearchList  = document.getElementById('search-list'),
      oSearchButton= document.getElementById('search-button'),
      date         = new Date();
      
      oSearchInput.onkeyup = function()
      {  
        if( this.value != '' )
        {
          var oScript = document.createElement('script');
          oScript.src = 'http://suggestion.baidu.com/su?wd='+ this.value + '&cb=callback' + '&t=' + date.getTime();
          document.body.appendChild(oScript);
        }else
        {
          oSearchList.style.display = 'none';
          oSearchList.innerHTML = '';
        }
      }
      oSearchButton.onclick = function()
      {
        window.open('http://www.baidu.com/s?wd=' + encodeURI(oSearchInput.value));
        oSearchInput.value = '';
      }
      oSearchInput.onkeydown = function(ev)
      {
        var oEvent = ev || event;
        var index = -1;
        var oLi = oSearchList.getElementsByTagName('li');
        if( oEvent.keyCode == 13)
        {
          window.open('http://www.baidu.com/s?wd=' + encodeURI(oSearchInput.value));
          oSearchInput.value = '';
        }

        if( oEvent.keyCode == 40 && oSearchInput.value != '' )
        { 

          if( index == oLi.length - 1)
          {
            index = 0;
          }
          else
          {
            index++;
          }
          if( index == -1 )
          {
            index = 0;
          }
          
          for(var i = 0; i<oLi.length ; i++)
          {
            if(i == index)
            {
              oLi[i].style.background = '#9AFF9A';
              oLi[i].style.color = 'white';
            }
            oLi[i].style.background = '';
            oLi[i].style.color = '';
          }
          return false;
        }

        if( oEvent.keyCode == 38 && oSearchInput.value != '' )
        {
          if( index == 0)
          {
            index = oLi.length - 1;
          }
          else
          {
            index++;
          }
          if( index == -1 )
          {
            index = 0;
          }
          for(var i = 0; i<oLi.length ; i++)
          {
            if(i == index)
            {
              oLi[i].style.background = '#9AFF9A';
              oLi[i].style.color = 'white';
            }
            oLi[i].style.background = '';
            oLi[i].style.color = '';
          }
          return false;
        }
      }
     
});
      
$(function()
{
  var oDownload = document.querySelectorAll('.download');
  var oDownloadBox = document.querySelectorAll('[data-download]');
  
  for(var i = 0; i<oDownload.length ; i++)
  {
    oDownload[i].index = i;
    oDownload[i].onclick = function()
    {
      window.open('file://numerhero.github.io' + oDownloadBox[this.index].getAttribute('data-download'));
    }
  }

//   function getAbsoluteUrl(url){ 
//   var img = new Image(); 
//   img.src = url; // 设置相对路径给Image, 此时会发送出请求 
//   url = img.src; // 此时相对路径已经变成绝对路径 
//   img.src = null; // 取消请求 
//   return url; 
// } 
});
 
function callback( data )
{
  var oSearchInput = document.getElementById('search-input'),
      oSearchList = document.getElementById('search-list'),
      oLi = oSearchList.getElementsByTagName('li'),
      html = '';

  if( data.s.length )
  {
      oSearchList.style.display = 'block';
      for(var i = 0 ; i<data.s.length ; i++)
      {
        html += '<li>' + data.s[i] + '</li>'
      }
      oSearchList.innerHTML = html;

      for(var i = 0 ; i<oLi.length; i++)
      {
        oLi[i].index = i;
        oLi[i].onclick = function()
        {
          oSearchInput.value = oLi[this.index].innerHTML;
          oSearchList.style.display = 'none';
        }
      }

  }else
  {
    oSearchList.style.display = 'none';
    oSearchList.innerHTML = '';
  }
}

/*!--------------------------------*\
   My blog Theme Peiwen Lu & Owen
   
   @Theme author Peiwen Lu (P233)
   https://github.com/P233/3-Jekyll
\*---------------------------------*/

// Detect window size, if less than 1280px add class 'mobile' to sidebar therefore it will be auto hide when trigger the pjax request in small screen devices.
if ($(window).width() <= 1280) {
  $('#sidebar').addClass('mobile')
}

// Variables
var sidebar    = $('#sidebar'),
    container  = $('#post'),
    content    = $('#pjax'),
    button     = $('#icon-arrow');

// Tags switcher
var clickHandler = function(id) {
  return function() {
    $(this).addClass('active').siblings().removeClass('active');
    $('.pl__all').hide();
    $('.' + id).delay(50).fadeIn(350);
  }
};

$('#tags__ul li').each(function(index){
  $('#' + $(this).attr('id')).on('click', clickHandler($(this).attr('id')));
});

// If sidebar has class 'mobile', hide it after clicking.
$('.pl__all').on('click', function() {
  $(this).addClass('active').siblings().removeClass('active');
  if (sidebar.hasClass('mobile')) {
    $('#sidebar, #pjax, #icon-arrow').addClass('fullscreen');
  }
});

// Enable fullscreen.
$('#js-fullscreen').on('click', function() {
  if (button.hasClass('fullscreen')) {
    sidebar.removeClass('fullscreen');
    button.removeClass('fullscreen');
    content.delay(300).queue(function(){
      $(this).removeClass('fullscreen').dequeue();
    });
  } else {
    sidebar.addClass('fullscreen');
    button.addClass('fullscreen');
    content.delay(200).queue(function(){
      $(this).addClass('fullscreen').dequeue();
    });
  }
});

$('#mobile-avatar').on('click', function(){
  $('#sidebar, #pjax, #icon-arrow').addClass('fullscreen');
});

// Pjax
$(document).pjax('#avatar, #mobile-avatar, .pl__all', '#pjax', { fragment: '#pjax', timeout: 10000 });
$(document).on({
  'pjax:click': function() {
    content.removeClass('fadeIn').addClass('fadeOut');
    NProgress.start();
  },
  'pjax:start': function() {
    content.css({'opacity':0});
  },
  'pjax:end': function() {
    NProgress.done();
    container.scrollTop(0);
    content.css({'opacity':1}).removeClass('fadeOut').addClass('fadeIn');
    afterPjax();
  }
});

// Re-run scripts for post content after pjax
function afterPjax() {
  // Open links in new tab
  $('#post__content a').attr('target','_blank');

  // Generate post TOC for h1 h2 and h3
  var toc = $('#post__toc-ul');
  // Empty TOC and generate an entry for h1
  toc.empty().append('<li class="post__toc-li post__toc-h1"><a href="#post__title" class="js-anchor-link">' + $('#post__title').text() + '</a></li>');

  // Generate entries for h2 and h3
  $('#post__content').children('h2,h3').each(function() {
    // Generate random ID for each heading
    $(this).attr('id', function() {
      var ID = "",
          alphabet = "abcdefghijklmnopqrstuvwxyz";

      for(var i=0; i < 5; i++) {
        ID += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      }
      return ID;
    });

    if ($(this).prop("tagName") == 'H2') {
      toc.append('<li class="post__toc-li post__toc-h2"><a href="#' + $(this).attr('id') + '" class="js-anchor-link">' + $(this).text() + '</a></li>');
    } else {
      toc.append('<li class="post__toc-li post__toc-h3"><a href="#' + $(this).attr('id') + '" class="js-anchor-link">' + $(this).text() + '</a></li>');
    }
  });

  // Smooth scrolling
  $('.js-anchor-link').on('click', function() {
    var target = $(this.hash);
    container.animate({scrollTop: target.offset().top + container.scrollTop() - 70}, 500, function() {
      target.addClass('flash').delay(700).queue(function() {
        $(this).removeClass('flash').dequeue();
      });
    });
  });

  //加载Disqus 
  // Lazy Loading Disqus
  // http://jsfiddle.net/dragoncrew/SHGwe/1/
  // var ds_loaded = false,
  //     top = $('#disqus_thread').offset().top;
  // window.disqus_shortname = $('#disqus_thread').attr('name');

  // function check() {
  //   if ( !ds_loaded && container.scrollTop() + container.height() > top ) {
  //     $.ajax({
  //       type: 'GET',
  //       url: 'http://' + disqus_shortname + '.disqus.com/embed.js',
  //       dataType: 'script',
  //       cache: true
  //     });
  //     ds_loaded = true;
  //   }
  // }
  // check();
  // container.scroll(check);

  // var dsThreadLikeText = document.querySelectorAll('.ds-thread-like-text')[0];
  // console.log(dsThreadLikeText);
  // (function(){
  //   dsThreadLikeText.innerHTML = '喜欢就戳戳吧';
  // })();
}
afterPjax();

