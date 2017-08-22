(function(){
    var FocusSlide=function(ele,opt){
        this.element=ele;
        this.default={
            'autoTime':'5000'
        };
        this.opt = $.extend({},this.default,opt);
    };
    FocusSlide.prototype.autoPlay=function(){
        time=setInterval(function(){
             next.click();
        },this.opt.autoTime)
    };
    FocusSlide.prototype.roundPlay=function(){
        if (aStr=="next"){
            for (var i=0;i<num;i++){
                var sindex=list[i-1];
                if (i==0){
                    aArray[i].fadeOut();
                }else{
                    aArray[i].css("z-index",sindex.zIndex).animate({
                            left:sindex.left,
                            top:sindex.top,
                            width:sindex.width
                     })
                }
            }
            var sindex=list[num-1];
            aArray[0].stop().css({
                    left: sindex.left,
                    top: sindex.top,
                    width: sindex.width,
                    "z-index": sindex.zIndex
                }).fadeIn(
                    function(){
                         aTip=1;
                    }
            )
            aArray.push(aArray.shift())
        } else {
            for (var i=0;i<num;i++){
                var  sindex=list[i+1];
                if (i==num-1){
                    aArray[i].css("z-index", 0).fadeOut()
                }else{
                    aArray[i].css("z-index", sindex.zIndex).animate({
                            left: sindex.left,
                            top: sindex.top,
                            width: sindex.width
                        })
                }
            }
            var sindex= list[0];
            aArray[aArray.length-1].stop().css({
                left:sindex.left,
                top:sindex.top,
                width:sindex.width,
                "z-index":sindex.zIndex
            }).fadeIn(
                function() {
                    aTip=1;
                }
            );
            aArray.unshift(aArray.pop())
        }
    };
    $.fn.Focus=function(options){
        var focusway=new FocusSlide(this,options);
        index=$('.slide').find('li');
        len=index.length;
        pre=$(this).find(".prev");
        next=$(this).find(".next");
        num = 5;
        list=[];
        aArray=[];
        aStr="next";
        aNum=0;
        aTip=1;
        function begin(){
            for(var i=0;i<len;i++){
                var sindex=index.eq(i);
                if (i<num){
                    list[i]={
                        left:sindex.position().left,
                        top:sindex.position().top,
                        zIndex:sindex.css("z-index"),
                        width:sindex.width()
                    };
                    sindex.css("left",list[i].left)
                }else{
                    sindex.css("left",list[num-1].left)
                }
                aArray.push(sindex);
            }
        }
       begin();
       function mainPlay(){
            $(this).bind("mouseenter",function(){clearInterval(time)})
                .bind("mouseleave",function(){ focusway.autoPlay()});
            next.bind("click",
                function(){
                    if(aTip){
                        aStr="next";
                        aTip=0;
                        if(aNum==len-1){
                            aNum=0;
                        }else{
                            aNum++;
                        }
                        focusway.roundPlay()
                    }
                });
            pre.bind("click",
                function(){
                    if (aTip){
                        aStr="prev";
                        aTip=0;
                        if(aNum==0){
                            aNum=len-1;
                        }else{
                            aNum--;
                        }
                        focusway.roundPlay()
                    }
                })
        }
       mainPlay();
       focusway.autoPlay();
    }
})();