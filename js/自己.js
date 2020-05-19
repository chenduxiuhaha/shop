 
 window.onload=function(){//获取对应的dom对象
    		var $=function(id){
    			return document.getElementById(id);
    		}
    		var showNum=$("showNum");
    		var clear1=$("clear1");
    		var del=$("del");
    		var equal=$("equal");
    		var dot=$("dot");
			var nums=document.getElementsByName("num");
			var signs=document.getElementsByName("sign");	
			
			var flag;//定义一个全局变量，点击等于之后，再次点击其他数字或小数点按键，其结果会替换掉显示出来的等于的结果
			
			//清零键
			clear1.onclick=function(){
				showNum.value="";
				dot.onclick=function(){
					dot1();
				}
			}
			//删除键
			del.onclick=function(){
				if(showNum.value.slice(-1)=="."){//如果删除的是小数点，就再给他绑上
					dot.onclick=function(){
						dot1();
					}
				}else{
					if(isNaN(showNum.value.slice(-1))){//如果最后删除的字符是运算符+-*/
						var i=-1;
						while(i){
//							console.log(showNum.value.slice(i-1,i));
							if(showNum.value.slice(i-1,i)=="."){//倒着检索，如果检索到了小数点，就解绑小数点
								dot.onclick=null;
							}
							if(isNaN(showNum.value.slice(i-1,i))){////倒着检索，如果检索到了运算符，就跳出，这样可以保证每次检索的数据段是在最后两个运算符之间的数据
								break;
							}
							if(showNum.value.slice(i-1,i)==""){//倒着检索，检索到空字符，也就是检索到了第一组数据，跳出循环
								break;
							}
							i--;
						}
					}
				}
				showNum.value=showNum.value.slice(0,-1);
			}
			//循环绑定数字按键
			for(var i=0;i<nums.length;i++){
				nums[i].onclick=function(){	
					if(flag==1||showNum.value=="0"){//flag标识为1，说明点击了等号，这时你再次输入的数会替换掉等于的结果//或者，里面什么也不写，显示的数为刚点击的数字
						showNum.value=this.value;
						flag=0;//使用完之后，再次让标识符为0。因为只有出现点击了等于的情况下，标识符才为1
					}	

					else{
						if(showNum.value.slice(-1)=="0" &&(isNaN(showNum.value.slice(-2,-1))&& showNum.value.slice(-2,-1)!=".")  ){
							showNum.value=showNum.value.slice(0,-1)+this.value;
						}
						else{
							showNum.value=showNum.value+this.value;
						}
					}
				}	
			}	
			
			//循环绑定+-*/
			for(var i=0;i<signs.length;i++){
				signs[i].onclick=function(){
					if(isNaN(showNum.value.slice(-1))||showNum.value==""){}
					else{
						showNum.value=showNum.value+this.value;
						dot.onclick=function(){
							dot1();
						}
					}
					
					
				}
			}
			
			//给小数点绑定单击事件
			dot.onclick=function(){
				dot1();
			}	
			function dot1(){
				if(isNaN(showNum.value.slice(-1))){}//如果最后一个字符不是数字，就什么也不做
				else{
					if(showNum.value==""||flag==1){//如果值为空，或者点击了等于之后，再次点击小数点，显示“0.”
						showNum.value="0.";
						dot.onclick=null;
						flag=0;//用完之后改为0.只有点击了等号标识符才为1
					}
					else{
						showNum.value=showNum.value+".";//点完小数点就解绑
						dot.onclick=null;
					}
				}
			}
			
			//给等于绑定eval键
			equal.onclick=function(){
				flag=1;//设置一个标识，点击了等于后，标识为1
				if(isNaN(showNum.value.slice(-1))){
					showNum.value=eval(showNum.value.slice(0,-1));
					
				}
				else{
					showNum.value=eval(showNum.value);
				}
				dot.onclick=function(){
					dot1();
				}
				
//				num[i].onclick=function(){
//					alert(1);
//					showNum.value=this.value;
//				}
			}
			
			
			//替换等于的结果
//			if(window.addEventListener){
//				equal.addEventListener("click",function(){
//					nums[i].addEventListener("click",function(){
//						alert(2);
//						showNum.value=this.value;
//					})
//				})
//			
//			}
			
		}	
	    		
			
	
	
   