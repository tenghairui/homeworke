$(document).ready(function(){ 
    var flag = false;
    var flag1 = false;

    $('#fullpage').fullpage({
        sectionsColor:['#fadd67', '#84a2d4', '#ef674d', '#ffeedd', '#d04759', '#84d9ed', '#4fdded', '#fff'],
        navigation:true,
        //滚到某一屏幕执行的事件
        afterLoad : function(anchorLink,index){
            if(index==2&&flag==false) {
                $('.qbh-list-search').show().animate({
                    "right":383
                },1000,function(){
                    $('.qbh-list-search-font').animate({
                        "opacity":1
                    },1000,function(){
                        $('.qbh-list-search').hide();
                        $('.qbh-list-search-finish').show().animate({
                            "bottom":449,
                            "right":250,
                            "height":30,
                            "left":"none"
                        },10,function(){
                            flag = true;
                        })
                       $('.qbh-list-sofas').show().animate({
                           "height":218
                       })
                       $(".qbh-list-wordb").animate({
                           "opacity":1
                       })
                    })
                })
            }
            if(index==8) {
                $(document).mousemove(function(ev){
                    var mX = ev.pageX;
                    var mY = ev.pageY;

                    $('.qbh-shopping-hands').css({
                        "left" : mX,
                        "top" : mY
                    })
                })
                $('.qbh-shopping-start-shopping').mousemove(function(){
                    $('.qhb-shopping-dong').show();
                })
            }
        },
       onLeave:function(index,nextIndex,direction){
           var wHeight = $(window).height();
           if(index==2 && nextIndex==3&&flag==true) {
               $('.qbh-list-sofa-pic').show().animate({
                   "bottom":-(wHeight - 250),
                   "right":518,
                   "width":204
               },1000,function(){
                    $('.qbh-buy-choose-end').animate({
                        "opacity":1
                    })
                    $('.qbh-buy-add-cart-end').animate({
                        "opacity":1
                    })
               })
           }
        //    第三个屏和第四个屏动画
        if(index==3&&nextIndex==4&&flag1==false) {
            $('.qbh-list-sofa-pic').hide();
            $('.qbh-buy-rotate-sofa').show().animate({
                "bottom":-((wHeight-250)+50),
                "right":260
            }, 1000, function(){
                flag1 = true;
                $(".qbh-buy .qbh-buy-sofa-pic").show();
                $('.qbh-buy-rotate-sofa').hide();
                $('.qbh-info-rotate-sofa').show();
                $(".qbh-info .qbh-info-cart-box").animate({
                    "left": 2000
                }, 1500, function () {
                     $('.qbh-info-address').animate({
                        "opacity":1
                     },1000,function(){
                         $('.qbh-info-wordb').animate({
                             "opacity":1
                         })
                         $('.qbh-info-address-font').animate({
                             "opacity":1
                         })
                     })  
                })   
            })
        }
        // 第五个屏
        if(index==4){
            // 让手出来
            $('.qbh-payment-hands').show().animate({
                "bottom":0
            },1000,function(){
                // 让鼠标最后一个显示出来模仿点击了鼠标一下
                $('.qbh-payment-monse-end').animate({
                    "opacity":1
                },10,function(){
                    //顶部的沙发掉落到银行卡中
                    $('.qbh-payment-rotate-sofa-start').show().animate({
                        "bottom":245
                    },800,function(){
                        // 沙发在银行卡后边显示出来
                        $('.qbh-payment-rotate-sofa-end').animate({
                            "bottom":70
                        },500)
                        //帐单显示
                        $('.qbh-payment-bill').animate({
                            "bottom":380
                        },500)
                    })
                })
            })
        }
        // 第五个屏到第六个屏
        if(index==5&&nextIndex==6) {
            $('.qbh-payment-rotate-sofa-continue').show().animate({
                "bottom":-243,
                "width":80
            },500)
            $('.qbh-delivery-box').show().animate({
                "left":317,
                "bottom":435,

            },600,function(){
                $('.qbh-payment-rotate-sofa-continue').hide();
                $('.qbh-delivery-box').animate({
                    "left": 485,
                    "bottom": 56,
                    "width": 40
                },800,function(){
                    $('.qbh-delivery-box').hide();
                    $('.qbh-delivery').animate({
                        "backgroundPositionX":"100%"
                    },2000,function (){ 
                        // 送货结束标语显示
                        $('.qbh-delivery-font-end').animate({
                            "opacity":1
                            
                        })
                        $('.qbh-delivery-deliveryman').animate({
                            "width":252,
                            "bottom":117
                        },1000,function(){
                            $('.qbh-delivery-deliveryman').animate({
                                "right":600
                            },1000,function(){
                               $('.qbh-delivery-shouhuo').show();
                               $('.qbh-delivery-door').show();
                               $('.qbh-delivery-buyer').animate({
                                   "width":87
                               })
                            })
                        })

                    })
                    $('.qbh-delivery-shangjia').animate({
                        "opacity":1
                    },800)
                    $('.qbh-delivery-truck-font').animate({
                        "opacity":1
                    },1500)
                })
            })
        }
        // 第六屏到第七屏

        if(index==6&&nextIndex==7) {
            //根据事件让div改变宽度来让星星一个个的显示出来
            $('.qbh-appraise-star').animate({
                "width":100
            },1500,function(){
                $('.qbh-appraise-haoping').show().animate({
                    "left":395

                },1000,function(){
                    $('.qbh-appraise-haoping').animate({
                        "width":72
                    },500)
                })
            })
        }
       } 
    })
});