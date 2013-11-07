(function($){
	/**
	 * --------------------------------------------------------------------
	 * jQuery-Plugin for tool
	 * shi_huajun@vobile.cn
	 * --------------------------------------------------------------------
	 */
	 
	 
	 
	 
	/**
	 * --------------------------------------------------------------------
	 * 创建遮罩层(zIndex：层次)
	 * --------------------------------------------------------------------
	 */
	function creatShadeLayer(zIndex){
		if($(".tool-jquery-shade-layer").length==0){
			$("body").append('<div class="tool-jquery-shade-layer"></div>')
		}
		if(zIndex!=undefined && $.isNumeric(zIndex)){
			$(".tool-jquery-shade-layer").css({zIndex:zIndex})
		}
		$(".tool-jquery-shade-layer").animate({opacity: 'show'},100);
		var width=$(document).outerWidth(true);
		var height=$(document).outerHeight(true);
		$(".tool-jquery-shade-layer").css({width:width,height:height})
		$(window).resize(function() {
			var width=$(document).outerWidth(true);
			var height=$(document).outerHeight(true);
			$(".tool-jquery-shade-layer").css({width:width,height:height})
		})
	}
	/**
	 * --------------------------------------------------------------------
	 * 关闭遮罩层
	 * --------------------------------------------------------------------
	 */
	function hideShadeLayer(){
		if($(".tool-jquery-shade-layer").length!=0) $(".tool-jquery-shade-layer").fadeOut(100);
	}
	/**
	 * --------------------------------------------------------------------
	 * 居中显示
	 * --------------------------------------------------------------------
	 */
	$.fn.showPositionMiddle=function(){
		var left=($(window).outerWidth(true)-$(this).outerWidth())/2+$(document).scrollLeft();
		var top=($(window).outerHeight(true)-$(this).outerHeight())/2+$(document).scrollTop();
		$(this).css({left:left,top:top,position:'absolute'})
	}
	/**
	 * --------------------------------------------------------------------
	 * 显示在某一元素的下面
	 * --------------------------------------------------------------------
	 */
	$.fn.showPositionBottom=function(settings){
		var options=$.extend({//默认配置
			form:$(this),
			align:'left',
		},settings);
		var em=options.form;
		var align=options.align;
		var box=$(this)
		var _this=$(this);
		var setPosition=function(){
			var left;
			var top  = em.offset().top + em.outerHeight();
			if(align=="left"){
				left = em.offset().left;
			}else if(align=="right"){
				left = em.offset().left+em.width()-box.outerWidth();
			}else if(align=="auto"){
				var bw=$("body").outerWidth(true);
				left = em.offset().left;
				if(left>(bw/2))
					left = em.offset().left+em.width()-box.outerWidth();
			}
			box.css({left:left,top:top})
		}
		setPosition();
		$(window).resize(function() {
			setPosition()
		})
		$(window).scroll( function() {
			setPosition()
		});
	}
	/**
	 * --------------------------------------------------------------------
	 * 拖动moveEvent
	 * --------------------------------------------------------------------
	 */
	$.fn.moveEvent=function(id){
		$(this).live('mousedown',function(event){
			var e=event
			var obj=$("#"+id);
			var objWidth=$("#"+id).outerWidth(true);
			var objHeight=$("#"+id).outerHeight(true);
			var drag=true;
			var starX=e.pageX;
			var starY=e.pageY;
			var starLeft=obj.offset().left;
			var starTop=obj.offset().top;
			$(document).live('mousemove',function(e){
				if(drag){
					var endX=e.pageX;
					var endY=e.pageY;
					var left=starLeft+(endX-starX);
					var top=starTop+(endY-starY);
					var sl=$(this).scrollLeft();
					var st=$(this).scrollTop();
					var ww=$(window).outerWidth(true);
					var wh=$(window).outerHeight(true)
					if(left<sl) left=sl;
					if(left>=ww-objWidth+sl) left=ww-objWidth+sl;
					
					if(top<st) top=st;
					if(top>wh-objHeight+st) top=wh-objHeight+st;
					
					obj.css({left:left,top:top,opacity:0.8,cursor:"move"})
				}
			});
			$(document).live('mouseup',function(e){
				obj.css({cursor:"default",opacity:1});
				drag = false;
			})
		})
	}
	/**
	 * --------------------------------------------------------------------
	 * 弹出层居中显示(层id)
	 * --------------------------------------------------------------------
	 */
	$.fn.showLayer = function(id){
		var layer=$("#"+id);
		$(this).click(function(){
			layer.show();
			creatShadeLayer();
			layer.showPositionMiddle();
		})
		$(window).resize(function() {
			layer.showPositionMiddle();
		})
		$(window).scroll( function() {
			layer.showPositionMiddle();
		});
		$(".layer .layer-move").moveEvent(id);
		if($("#"+id+" .layer-close")!=0)
		$("#"+id+" .layer-close").hideLayer(id)
	}
	/**
	 * --------------------------------------------------------------------
	 * 关闭弹出层(层id)
	 * --------------------------------------------------------------------
	 */
	$.fn.hideLayer=function(id){
		$(this).live('click',function(){
			//$("#"+id).animate({top:"+0px", opacity: 'toggle'}, 200);
			$("#"+id).fadeOut(100);
			hideShadeLayer();
		})
	}
	/**
	 * --------------------------------------------------------------------
	 * title信息提示(title属性名)
	 * --------------------------------------------------------------------
	 */
	 $.fn.title=function(attr){
		$(this).hover(
			function(){
				if($(this).attr(attr)!=undefined){
					var title=$(this).attr(attr);
					if($(".tool-jquery-title").length==0)
					$("body").append('<div class="tool-jquery-title"></div>')
					$(".tool-jquery-title").show();
					$(".tool-jquery-title").html(title);
					$(".tool-jquery-title").showPositionBottom({form:$(this),align:"auto"})
				}
			},
			function(){
				$(".tool-jquery-title").hide()
			}
		)
	}
	/**
	 * --------------------------------------------------------------------
	 * calendar引用
	 * --------------------------------------------------------------------
	 */
	$.fn.calendar=function(settings){
		var date=new calendar(settings);
		$(this).click(function(){
			date.start($(this))
		})
		
	}
	/**
	 * --------------------------------------------------------------------
	 * 仿comfirm
	 * --------------------------------------------------------------------
	 */
	$.fn.comfirm=function(settings){
		var options=$.extend({//默认配置
			title:'',
			msg:'Are you sure?',
			ok:'Ok',
			cancel:'Cancel',
			callback:function(){},
		},settings);
		creatShadeLayer();//显示遮罩
		var id="msg_myComfirm"
		var html='';
		html+='<div id="'+id+'" class="tool-jquery-msg-box">';
		if(options.title!='')
		html+='<div class="tool-jquery-msg-box-title">'+options.title+'</div>';
		html+='<div class="tool-jquery-msg-box-content">'+options.msg+'</div>';
		html+='<div class="tool-jquery-msg-box-btnBox"><a class="tool-jquery-btn tool-jquery-msg-ok">'+options.ok+'</a><a class="tool-jquery-btn tool-jquery-msg-close">'+options.cancel+'</a></div>';
		html+='</div>'
		if($("#"+id).length==0)
		$("body").append(html);
		$("#"+id).showPositionMiddle()
		if($(".tool-jquery-msg-box-title").length!=0)
		$("#"+id+" .tool-jquery-msg-box-title").moveEvent(id);

		$("#"+id+" .tool-jquery-msg-close").click(function(){
			$("#"+id).remove();
			hideShadeLayer()
		});
		$("#"+id+" .tool-jquery-msg-ok").click(function(){
			$("#"+id).remove();
			hideShadeLayer()
			options.callback()
		});
		$(window).resize(function() {
			$("#"+id).showPositionMiddle()
		})
		$(window).scroll( function() {
			l$("#"+id).showPositionMiddle()
		});
		
	}
	/**
	 * --------------------------------------------------------------------
	 * 仿alert
	 * --------------------------------------------------------------------
	 */
	$.fn.alert=function(settings){
		var options=$.extend({//默认配置
			title:'',
			msg:'done!',
			ok:'Ok',
		},settings);
		var id="msg_myAlert";
		var html='';
		html+='<div id="'+id+'" class="tool-jquery-msg-box">';
		if(options.title!='')
		html+='<div class="tool-jquery-msg-box-title">'+options.title+'</div>';
		html+='<div class="tool-jquery-msg-box-content">'+options.msg+'</div>';
		html+='<div class="tool-jquery-msg-box-btnBox"><a class="tool-jquery-btn tool-jquery-msg-ok">'+options.ok+'</a></div>';
		html+='</div>'
		if($("#"+id).length==0)
		$("body").append(html);
		$("#"+id).showPositionMiddle()
		if($(".tool-jquery-msg-box-title").length!=0)
		$("#"+id+" .tool-jquery-msg-box-title").moveEvent(id);
		$("#"+id+" .tool-jquery-msg-ok").click(function(){
			$("#"+id).remove();
		});
		$(window).resize(function() {
			$("#"+id).showPositionMiddle()
		})
		$(window).scroll( function() {
			l$("#"+id).showPositionMiddle()
		});
		
	}
	/**
	 * --------------------------------------------------------------------
	 * 仿select
	 * --------------------------------------------------------------------
	 */
	$.fn.select=function(settings){
		var options=$.extend({//默认配置
			id:$(this).attr('id'),
			options:[],
			maxWidth:200,//最大宽度
			isWrap:true,//是否允许换行
		},settings);
		
		var input=$("#"+options.id);
		var layerClass="tool-jquery-select-option";
		input.val(options.options[0])
		input.addClass('tool-jquery-input-select')
		input.wrap('<div class="tool-jquery-input-select-box"></div>')
		input.before('<a id="'+options.id+'_a'+'" class="tool-jquery-input-select-a"><span></span></a>');
		
		$("#"+options.id+'_a').live('click',function(){
			if($("."+layerClass).length==0){
				$("body").append('<div class="'+layerClass+'"></div>')
			}else{
				if($("."+layerClass).is(":visible") && $("."+layerClass).offset().left!=input.offset().left)
					$("."+layerClass).show();
				else
					$("."+layerClass).toggle();
			}
			$("."+layerClass).css({minWidth:input.outerWidth(true)-2,width:"auto",maxWidth:options.maxWidth});
			$("."+layerClass).showPositionBottom({form:input});
			var lis='';
			$.each(options.options, function(i, value){
			  lis+="<li>"+value+"</li>"
			});
			var ul="<ul>"+lis+"</ul>";
			$("."+layerClass).html(ul);
			if(options.isWrap) $("."+layerClass+" ul li").addClass("tool-jquery-wrap")
			else $("."+layerClass+" ul li").removeClass("tool-jquery-wrap")
			$("."+layerClass+" ul li").click(function(){
				input.val($(this).text())
				$("."+layerClass).hide();
			})
		})
	}
})(jQuery);  