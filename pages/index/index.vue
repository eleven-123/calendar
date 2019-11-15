<template>
	<view style="padding: 50px 0px;">
		<view style="font-size: 20px; font-weight: 600; text-align: center;">阿拉伯数字显示农历年月日</view>
		<view class="btn" @click="showDateDialog()">{{lunar=='solar'?'阳历':'阴历'}} {{dateTxt}} {{hourTxt}}</view>
		
		<zan-calendar 
			:date="date"
			:time="time"
			:isHourShow="isHourShow" 
			:isMinShow="isMinShow" 
			:show="dateDialog" 
			:lunarType = "lunarType"
			@closeDialog="closeDialog" 
			@confirmDialog="confirmDialog"
		>
		</zan-calendar>
	</view>
</template>

<script>
	const date = new Date()
	const year = date.getFullYear(), //默认选中的年
				month = date.getMonth()+1, //默认选中的月
				day = date.getDate(), //默认选中的日
				hour = date.getHours(), //默认选中的时辰
				minute = date.getMinutes();
	import zanCalendar from '@/components/quick-calendar/calendar';
	export default {
		data() {
			return {
				date: year+'-'+month+'-'+day,//日期
				hour:hour,
				time: hour+'-'+minute,//时间
				lunar:'solar',
				dateTxt:year+'年'+month+'月'+day+'日',
				hourTxt:hour+'-'+ Number(hour+1) +'点',
				isHourShow: true,//是否显示时辰（小时）
				isMinShow: false,//是否显示分钟
				lunarType: 'word', //年月日显示方式
				dateDialog: false //是否弹出日历组件
				
			}
		},
		//注册主键（参考vue文档）
		components:{
			zanCalendar
		},
		//操作方法（参考vue文档）
		methods: {
			//示例，展示三种不同的选择调度
			showDateDialog: function() {
				this.dateDialog = true;
			},
			//示例，在为确认是就点击了取消，直接关闭弹窗
			closeDialog: function() {
				this.dateDialog = false;
			},
			//示例，点击了确认后的相关操作，并再次点击确认时间后的返回，这里可以写自己的操作了
			confirmDialog: function(e) {
				this.year = e.year,
				this.month = e.month,
				this.day = e.day,
				this.hour = e.hour,
				this.lunar = e.calendar
				this.date = e.year+'-'+e.month+'-'+e.day,//日期
				// this.time = e.hour+'-'+e.minute,//时间
				this.dateTxt = e.year+'年'+e.month+'月'+e.day+'日',
				this.hourTxt = e.hour+'-'+ Number(e.hour+1) +'点',
				this.dateDialog = false;
			}
		}
	}
</script>

<style>
.btn{font-size: 14px; text-align: center; line-height: 40px;}
</style>
