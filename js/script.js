function check(data){$urlOutput=$('#url-output');$urlOutput.val(data).focus().select();}
if(!window.location.origin){window.location.origin=window.location.protocol+"//"+window.location.hostname+(window.location.port?':'+window.location.port:'');}
$.getUrlParam=function(name){var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");var r=window.location.search.substr(1).match(reg);if(r!==null)return unescape(r[2]);return null;};$(function(){var $kw=$('#kw'),$searchSubmit=$('#search-submit'),$urlOutput=$('#url-output'),$tips=$('#tips'),$stop=$('#stop'),$arrow=$('#arrow');var stepTimeout,typeInterval;var query=$.getUrlParam('q');if(!!query){try{query=Base64.decode(query);}catch(e){console.log(e);}}
if(!!query){$tips.html('让我来教你正确的打开方式');$stop.fadeIn();stepTimeout=setTimeout(function(){$tips.html('1、找到输入框并选中');$arrow.removeClass('active').show().animate({left:$kw.offset().left+20+'px',top:($kw.offset().top+$kw.outerHeight()/2)+'px'},2000,function(){$tips.html('2、输入你要找的内容');$arrow.addClass('active');stepTimeout=setTimeout(function(){$arrow.fadeOut();var i=0;typeInterval=setInterval(function(){$kw.val(query.substr(0,i));if(++i>query.length){clearInterval(typeInterval);$tips.html('3、点击下“百度一下”按钮');$arrow.removeClass('active').fadeIn().animate({left:$searchSubmit.offset().left+$searchSubmit.width()/2+'px',top:$searchSubmit.offset().top+$searchSubmit.height()/2+'px'},1000,function(){$tips.html('<strong>怎么样，学会了吗？</strong>');$arrow.addClass('active');stepTimeout=setTimeout(function(){window.location='https://www.baidu.com/s?ie=utf-8&wd='+encodeURIComponent(query);},1000);});}},200);},500);});},1000);}
$stop.click(function(){clearTimeout(stepTimeout);clearInterval(typeInterval);$stop.hide();$arrow.stop().hide();$kw.val(query);query=false;$tips.html('输入一个问题，然后点击百度一下');});$('#search-form').submit(function(){if(!!query)return false;var question=$.trim($kw.val());if(!question){$tips.html('<span style="color: red">搜了个寂寞？</span>');$kw.val('');}else{$tips.html('↓↓↓ 复制下面的链接，教伸手党使用百度');$('#output').fadeIn();longurl=window.location.origin+window.location.pathname+'?q='+Base64.encode(question);$urlOutput.val(longurl).focus().select();}
return false;});var clipboard=new ClipboardJS('[data-clipboard-target]');clipboard.on('success',function(e){$tips.html('<span style="color: #4caf50">复制成功！赶紧把链接甩给伸手党们！</span>');});clipboard.on('error',function(e){$tips.html('<span style="color: red">复制失败，请手动复制...</span>');});$('#preview').click(function(){var link=$urlOutput.val();if(!!link){window.open(link);}});});