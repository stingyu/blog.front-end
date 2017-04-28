var time=0;//保存定时时间
var pause=true;//设置暂停标志，true表示停止
var set_timer;//设置定时函数
var d=new Array(10);//一维数组
   d[0]=0;//不用第一个元素
   d[1]=1;
   d[2]=2;
   d[3]=3;
   d[4]=4;
   d[5]=5;
   d[6]=6;
   d[7]=7;
   d[8]=8;
   d[9]=0;//按默认顺序排好，大div第九块为0，空白块
var d_direct=new Array(
	[0],
	[2,4],//第一块可以去2，4号位置
	[1,3,5],
	[2,6],
	[1,5,7],
	[2,4,6,8],
	[3,5,9],
	[4,8],
	[5,7,9],
	[6,8]
	);//二维数组（保存大div编号的可移动位置编号
var d_posXY=new Array(
	[0],//不用第一个元素
	[0,0],//第一个表示left,第二个表示top
	[150,0],
	[300,0],
	[0,150],
	[150,150],
	[300,150],
	[0,300],
	[150,300],
	[300,300]
	);//大div编号的位置
function move（id){
	var i=1;
	for(i=1;i<10;i++){
		if(d[i]==id){
			break;
		}
		//for遍历找出小div在大div中的位置
	}
	var target_d=0;
	//保存小DIV能去得位置，0表示不能移动
	target_d=whereCanTo(i);
	/*调用函数，返回小DIV能去的位置，
	如果返回0，表示不能移动*/
	if(target_d!=0){
		d[i]=0;
		/*把当前的大DIV的编号设置为0，因为当前的小DIV
		已经移走了，当前大DIV没有小div了*/
		d[target_d]=id;
		//把大div设置为被点击的小div的编号
		document.getElementById("d"+id).style.left=d_posXY[targrt_d][0]+"px";
		document.getElementById("d"+id).style.top=d_posXY[target_d][1]+"px";
		//设置被点击的小div的位置，把它移到目标大div的位置
	}
	//如果target_d不为0，则表示可移动，且target_d的值就是小div移动到大div的位置编号（也就是大div的编号
	var finish_flag=true;
	//设置游戏是否完成标志，true表示完成
	for( var k=1;k<9;++k){
		if(d[k] != k){
			finish_flag=false;
			break;
			/*如果大div保存的编号和它本身的编号不同，则表示还不是全部按照顺序排列，那么设置为false
			，跳出循环，后面不用再盼蹲，因为只要一个不符，就没完成游戏*/
		}
	}
	//从1开始遍历每个大div 的编号，判断是否完成

       if(finish_flag=true){
	        if(!pause)
		          start();
		          alert("成功了！");
	        //如果为true，表示游戏已经完成了，如果没有暂停，则表示调用暂停函数start（）
        }
        //start（）函数是暂停和开始放在一起，暂停时调用后会开始，开始时调用后会暂停

}
function whereCanTo(big_div){
	//判断是否可移动函数，参数是大div的编号
    var j=0;
    var move_flag=false;//设置可移动标志，false表示不可移动
    for(j=0; j<d_direct[big_div].length; ++j){
    	//把所有可能去的位置都遍历一遍
    	if(d[ d_direct[big_div][j]] == 0){
	     move_flag=true;
	     break;
	 }
	 //如果目标的值为0，说明目标没有装小div，则可以移动，跳出循环
	}
        if(move_flag==true){
	       return d_direct[big_div][j];
        }else{
	        return 0;
             }
             //可以移动，返回目标位置的编号
}
function timer(){
	//定时函数，每秒执行一次
	time+=1;//单位是秒
	var min=parseInt(time/60);//把秒转换为分钟
	var sec=time%60;//取余就是秒
	document.getElementById("timer").innerHTML=min+"分"+sec+"秒";
}//显示时间
function start(){
	//开始暂停函数
	if(pause){
		document.getElementById("start").innerHTML="暂停";//设置按钮
		pause=false;//暂停设置为false
		set_timer=setInterval(timer,10000);//启动定时
           //如果当前是暂停，则开始
	}else{
		document.getElementById("start").innerHTML="开始";
		pause=true;
		clearInterval(set_timer);//清除定时
	}
}
function reset(){//重置函数
	time =0;
	random_d();//方块随机打乱函数
	if(pause)//如果暂停，就开始计时
		start();
	//随机打乱方块函数思路：从第九块开始，随机生成一个数，然后两块对调一下顺序
	function random_d(){
		for (var i=9;i>1;--i){
			var toparseInt(Math.random()*(i-1)+1);
			//产生随机数，范围为1 到i，不能超出范围
			if(d[i]!=0){
				document.getElementById("d"+d[i]).style.left=d_posXY[to][0]+"px";
				docment.getElementById("d"+d[i]).style.top=d_posXY[TO][1]+"px";
			}
			//把当前的div 位置设置为随机产生的div的位置
			if(d[to]!=0){
				document.getElementById("d"+d[to]).style.left=d_posXY[i][0]+"px";
				document.getElementById("d"+d[to]).style.top=d_posXY[i][1]+"px";
				//把随机的div位置设置为当前的div位置
			}
		}
		var tem=d[to];
		d[to]=d[i];
		d[i]=tem；
		//把两个div保存的编号对调一下

	}
}
//初始化函数，页面加载的时候调用重置函数，重新开始
window.onload=function(){
	reset();
}
