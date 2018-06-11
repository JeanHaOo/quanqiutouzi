$(document).ready(function(){
    jQuery(".banner_wrap").slide({
        mainCell:".banner_bd ul",
        titCell:".banner_dot ul li",
        effect:"fold",
        autoPlay:true});
    jQuery(".home_hotel_banner").slide({
        mainCell:".home_pics_content ul",
        titCell:".home_dot ul li",
        effect:"leftLoop",
        autoPlay:true}); 
    jQuery(".focusBox2").slide({
        mainCell:"#pic2 ul",
        titCell:".focuscicle dl dd",
        effect:"leftLoop",
        autoPlay:true});   
/*input清空*/
$("input[type='text']").focus(function(){
    $(this).attr("value","");
}); 
$("input[type='tel']").focus(function(){
    $(this).attr("value","");
});          
     
/*滚动条*/
    if($("#financia_wrap1").exist()||$("#medical_wrap1").exist()){
        investingScroll("financia_wrap1","financia_Box1","financia_scrollbar1")      
        investingScroll("medical_wrap1","medicalBox1","medical_scrollbar1")
    }
    /*弹框滚动条*/
    if($("#pop_wrap").exist()){
        investingScroll("pop_wrap","popup_contain","pop_scrollBar") 
    }
    if($("#popup_contain").height()<$("#pop_wrap").height()){
        $("#pop_scrollBar").hide()
        $("#popup_contain").css("position","initial")
    }
        
/*判断初始化页面是否滚动*/

        if($("#medicalBox1").height()<$("#medical_wrap1").height()){
            $("#medical_scrollbar1").parent().hide()
            $("#medicalBox1").css("position","initial")
         } 
         if($("#financia_Box1").height()<$("#financia_wrap1").height()){
            $("#financia_scrollbar1").parent().hide()
            $("#financia_Box1").css("position","initial")
         }         
/*海外金融*/        
    $("#financial_nav ul").find("li").each(function(){
        $(this).on("click",function(){
            var that=$(this)
            var indexd=that.index();
            var toggles= $("#financial_contain .toggle")
            that.addClass("choosed").siblings("li").removeClass("choosed")
            toggles.eq(indexd).show().siblings(".toggle").hide()
            var pContentHeight=$("#financia_Box"+(indexd+1)).height();
            if(pContentHeight>toggles.height()){
                investingScroll("financia_wrap"+(indexd+1),"financia_Box"+(indexd+1),"financia_scrollbar"+(indexd+1)) 
            }else{
                $("#financia_scrollbar"+(indexd+1)).parent().hide()
            }
        })
    })   
/**海外制定 */
    $("#medical_nav ul").find("li").each(function(){
       $(this).on("click",function(){
           var self=$(this)
           var indexs=self.index();
           self.addClass("choose").siblings("li").removeClass("choose")
           $("#medical_contain>ul>li").eq(indexs).show().siblings().hide()
           var medicalBoxHeight=$("#medicalBox"+(indexs+1)).height()
           if(medicalBoxHeight>$(".medical_toggle").height()){
            investingScroll("medical_wrap"+(indexs+1),"medicalBox"+(indexs+1),"medical_scrollbar"+(indexs+1)) 
           }else{
            $("#medical_scrollbar"+(indexs+1)).parent().hide() 
            $("#medicalBox"+(indexs+1)).css("top",0)
           }
        })
    })
})
 /*滚动条*/ 
    function investingScroll(wrapBox,scrollBox,scrollBar ){
        var oBox=document.getElementById(wrapBox); //滚动最大的盒子
        var p=document.getElementById(scrollBox); //滚动内容
        var scroller=document.getElementById(scrollBar); //滚动条
        var dis_p=p.offsetHeight-oBox.offsetHeight;//p的高度减去box的高度
        var dis_span=oBox.offsetHeight-scroller.offsetHeight;//滑块移动距离
       
        //滚轮比率
        var wheel_rate=dis_span/dis_p;
        
        function mouseWheel(obj,fn){//封装滚轮
            if(window.navigator.userAgent.indexOf('Firefox')!=-1){	
                obj.addEventListener('DOMMouseScroll',wheelFn,true);
            }else obj.onmousewheel=wheelFn;
            function wheelFn(ev){
                var oEv=ev||event;
                var direct=oEv.wheelDelta ? oEv.wheelDelta<0 : oEv.detail>0;
                fn && fn(direct);//将direct作为参数传递出去
                if(window.event){//IE
                    oEv.returnValue = false; //ie 阻止默认事件
                    return false;//ie9 以上阻止回车
                }
                else{
                    oEv.preventDefault();//阻止默认事件 firefox
                }
            };
        };
        
        mouseWheel(oBox,function(ererer){
            if(ererer){
                var t=p.offsetTop-30;
                if(t<-dis_p)t=-dis_p;
                p.style.top=t+'px';
                scroller.style.top=-t*wheel_rate+'px';
            }else{
                var t=p.offsetTop+30;
                if(t>0)t=0;
                p.style.top=t+'px';
                scroller.style.top=-t*wheel_rate+'px';
            }
        });
        
        scroller.onmousedown=function(ev){
            var oEv=ev || window.event;
            var mt=oEv.clientY-this.offsetTop;//只取Y方向
            document.onmousemove=function(ev){
                var oEv=ev||window.event;
                var t=oEv.clientY-mt;
                if(t<=0) t=0;//限制顶部位置
                if(t>=dis_span-2) t=dis_span;//限制底部位置
                //计算移动比率
                move_rate=t/dis_span;
                p.style.top=-dis_p*move_rate+'px';//移动比率
                scroller.style.top=t+'px';
            };
            document.onmouseup=function(){
                document.onmousemove=null;
                if(oBox.releaseCapture) oBox.releaseCapture();//取消获捕  IE8以下 私有方法
            };
             if(oBox.setCapture) oBox.setCapture();
             return false;//阻止选中文字	
        };
    }
    

/*在线客服*/ 
function customOver(){
    $("#header_right ul li").eq(2).find(".show3").show()
}
function customOut(){
    $("#header_right ul li").eq(2).find(".show3").hide()
}
function followOver(){
    $("#header_right ul li").eq(3).find(".followErweima").show()
}
function followOut(){
    $("#header_right ul li").eq(3).find(".followErweima").hide()
}
/*跟随*/
function teleOver(){
   $(".right_follow .show_tele").show()
}
function teleOut(){
    $(".right_follow .show_tele").hide()
 }
 function wechatOver(){
    $(".right_follow .show_erweima").show()
 }
 function wechatOut(){
     $(".right_follow .show_erweima").hide()
  }
/*返回顶部*/

function gotoTop(acceleration, stime) {
    acceleration = acceleration || 0.1;
      stime = stime || 10;
      var x1 = 0;
      var y1 = 0;
      var x2 = 0;
      var y2 = 0;
      var x3 = 0;
      var y3 = 0;
      if (document.documentElement) {
          x1 = document.documentElement.scrollLeft || 0;
          y1 = document.documentElement.scrollTop || 0;
      }
      if (document.body) {
          x2 = document.body.scrollLeft || 0;
          y2 = document.body.scrollTop || 0;
      }
      var x3 = window.scrollX || 0;
      var y3 = window.scrollY || 0;
      var x = Math.max(x1, Math.max(x2, x3));
      var y = Math.max(y1, Math.max(y2, y3));
      var speeding = 1 + acceleration;
      window.scrollTo(Math.floor(x / speeding), Math.floor(y / speeding));
      if (x > 0 || y > 0) {
          var run = "gotoTop(" + acceleration + ", " + stime + ")";
          window.setTimeout(run, stime);
      }
      
  }
/*判断页面是否含有该节点*/
  (function($) {
    $.fn.exist = function(){ 
     if($(this).length>=1){
      return true;
     }
     return false;
    };
   })(jQuery);










