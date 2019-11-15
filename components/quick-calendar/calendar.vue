<template>
	<view>
		<view class="grace-btdialog-shade" >
			<view
			   class="mask"
			   :class="{ show: show }"
			   @touchmove.stop.prevent
			   catchtouchmove="true"
				 @click="closeDialog"
			></view>
			<view class="pickerView dialog" :class="{ show: show }">
				<view class="pickerHeaderTitle">
					<!-- <view class="close" @click="closeDialog">取消</view> -->
					<view class="actionBtn">
						<view :class="['solar', lunar === 'solar' ? 'current' : '']" @click="tabCalendar('solar')">阳历</view>
						<view :class="['lunar', lunar === 'lunar' ? 'current' : '']" @click="tabCalendar('lunar')">阴历</view>
					</view>
					<!-- <view class="confirm" @click="confirm">确定</view> -->
					<view class="confirm" @click="confirmDialog">确定</view>
				</view>
				
				<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" style="width:100%; height: 400upx;">
					<picker-view-column>
						<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in days" :key="index">{{item}} {{lunar === 'solar'?'日':''}}</view>
					</picker-view-column>
					<picker-view-column v-if="isHourShow">
						<view class="item" v-for="(item,index) in hours" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column v-if="isMinShow">
						<view class="item" v-for="(item,index) in mins" :key="index">{{item}}分</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
	import render from './calendar-data/render.js';
	let date = new Date();
	export default {
		name: "graceBottomDialog",
		props: {
			show : {
				type : Boolean,
				default : false
			},
			date : {
				type : String,
				default : date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
			},
			time : {
				type : String,
				// default : ''
				default : date.getHours() + '-' + date.getMinutes()
			},
			isHourShow : {
				type : Boolean,
				default : false
			},
			isMinShow : {
				type : Boolean,
				default : false
			},
			lunarType : {
				type : String,
				default : 'number' //number or words
			}
		},
		data() {
			return {
				years: [],
				months: [],
				days: [],
				year: '',
				month: '',
				day: '',
				hours: [],
				mins: [],
				hour: '',
				min: '',
				
				value: [],//当前选择的五类下标【可以是3类、3类】

				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/80))}px;`,
				
				lunar: 'solar',
				isPicker: true,
				solarDate: "",//国历最后时间
				lunarDate: "",//农历最终时间
				returnDate: "",//返回页面的日期
				returnTime: "",//返回页面的时间
			}
		},
		mounted:function(){
			this.init();
		},
		watch: {
			isHourShow(){
				this.init();
			},
			isMinShow(){
				this.init();
			},
			lunarType(){
				this.init();
			},
		},
		methods: {
			init: function() {
				let dateTime = this.date+'-'+ this.time;
				let dateArr = dateTime.split('-');
				date = new Date(dateArr[0],dateArr[1]-1,dateArr[2],dateArr[3],dateArr[4]);
				this.year = date.getFullYear();
				this.month = date.getMonth() + 1;
				this.day = date.getDate();
				if(this.isHourShow) this.hour = date.getHours();
				if(this.isMinShow) this.min = date.getMinutes();
				let solarCalendar = render.init(this.lunar, 1900, 2100, this.year, this.month, this.day, this.hour, this.min, this.isHourShow, this.isMinShow, false, this.lunarType);
				this.years = solarCalendar.years;
				this.months = solarCalendar.months;
				this.days = solarCalendar.days;
				this.hours = solarCalendar.hours;
				this.mins = solarCalendar.mins;
				
				this.year = solarCalendar.years[solarCalendar.yearIndex];
				this.month = solarCalendar.months[solarCalendar.monthIndex];
				this.day = solarCalendar.days[solarCalendar.dayIndex];
				this.hour = solarCalendar.hourIndex;
				this.min = solarCalendar.minIndex;
				this.value = [solarCalendar.yearIndex, solarCalendar.monthIndex, solarCalendar.dayIndex, solarCalendar.hourIndex, solarCalendar.minIndex];
			},
			bindChange: function(e) {
				this.year = this.years[e.detail.value[0]];
				this.month = this.months[e.detail.value[1]];
				this.day = this.days[e.detail.value[2]];
				this.hour = e.detail.value[3];
				this.min = e.detail.value[4];
				
				//因为天数可能会变化
				let solarCalendar = render.init(this.lunar, 1900, 2100, this.year, this.month, this.day, this.hour, this.min, this.isHourShow, this.isMinShow, false, this.lunarType);
			
				this.years = solarCalendar.years;
				this.months = solarCalendar.months;
				this.days = solarCalendar.days;
				this.hours = solarCalendar.hours;
				this.mins = solarCalendar.mins;
			},
			tabCalendar: function (tab) {
				if(this.lunar === tab) return false;//同类不能重复转换
				
				this.lunar = tab;
				let solarCalendar = render.init(this.lunar, 1900, 2100, this.year, this.month, this.day, this.hour, this.min, this.isHourShow, this.isMinShow, true, this.lunarType);
				this.years = solarCalendar.years;
				this.year = solarCalendar.years[solarCalendar.yearIndex];
				this.months = solarCalendar.months;
				this.month = solarCalendar.months[solarCalendar.monthIndex];
				this.days = solarCalendar.days;
				this.day = solarCalendar.days[solarCalendar.dayIndex];
				this.hours = solarCalendar.hours;
				this.hour = solarCalendar.hourIndex;
				this.mins = solarCalendar.mins;
				this.min = solarCalendar.minIndex;
				this.value = [solarCalendar.yearIndex, solarCalendar.monthIndex, solarCalendar.dayIndex, solarCalendar.hourIndex, solarCalendar.minIndex];
			},
			closeDialog: function() {
				this.$emit('closeDialog');
			},
			confirmDialog: function() {
				const result = {
					year: this.year,
					month: this.month,
					day: this.day,
					calendar:this.lunar
				};
				if(this.isHourShow === true) result["hour"] = this.hour;
				if(this.isMinShow === true) result["minute"] = this.min;
				this.$emit('confirmDialog',result);
			},
		}
	}
</script>

<style scoped>
.grace-btdialog-shade{
	position:relative; 
	z-index:999; 
}
.mask{
	position: fixed;
	z-index: 1000;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.3);
	visibility: hidden;
	opacity: 0;
	-webkit-transition: all 0.3s ease;
	-o-transition: all 0.3s ease;
	transition: all 0.3s ease;
}
.mask.show{
	visibility: visible;
	opacity: 1;
}
.grace-btdialog-shade .dialog{
	z-index: 1001;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	-webkit-transition: all 0.3s ease;
	-o-transition: all 0.3s ease;
	transition: all 0.3s ease;
	-webkit-transform: translateY(100%);
	-ms-transform: translateY(100%);
	transform: translateY(100%);
	background: #FFFFFF;
}
.grace-btdialog-shade .dialog.show{
	-webkit-transform: translateY(0);
	-ms-transform: translateY(0);
	transform: translateY(0);
}
.pickerHeaderTitle {
	border-bottom: 1upx solid #E8E8E8;
	width: 100%;
	height: 80upx;
	line-height: 80upx;
	padding: 0upx 20upx;
	font-size: 30upx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.pickerHeaderTitle .close {
	width: 20%;
	/* float: left; */
	text-align: left;
	color: rgb(153, 153, 153);
	cursor: pointer;
}
.pickerHeaderTitle .actionBtn {
	/* width: 60%; */
	/* float: left; */
	display: flex;
	align-items: center;
}
.pickerHeaderTitle .actionBtn .solar,.pickerHeaderTitle .actionBtn .lunar{
	height: 80upx;
	line-height: 80upx;
	padding: 0upx 20upx;
	margin-right: 20upx;
	font-size: 14px;
	color: #333;
	position: relative;
}
.pickerHeaderTitle .actionBtn .current {
	color: #ff394e;
}
.pickerHeaderTitle .actionBtn .current::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 2px;
	background: #ff394e;
}


.pickerHeaderTitle .confirm  {
	flex: 0 0 auto;
	/* width: 20%; */
	/* float: left; */
	padding: 0 30upx;
	text-align: right;
	color: #fff;
	cursor: pointer;
	height: 60upx;
	line-height: 60upx;
	border-radius: 30upx;
	background: #FF394E;
}
.item {
	line-height: 80upx;
	text-align: center;
	font-size: 28upx;
}

.confirmSubTitle {font-size: 34upx; color: #000000; line-height: 48upx; margin-top: 48upx; padding-bottom: 20upx;}
.confirmView .solar, .confirmView .lunar {font-size: 34upx; color: rgb(163, 30, 26); line-height: 34upx; padding: 10upx 0upx;}
.confirmView .buttons {padding: 40upx 0upx; display: flex; flex-direction: row; justify-content: center; color: #FFFFFF; font-size: 34upx;}
.confirmView .buttons .blak {display: inline-block; padding: 20upx 40upx; border-radius: 10upx; background: #DDDDDD;}
.confirmView .buttons .confirm {display: inline-block; padding: 20upx 40upx; margin-left: 40upx; border-radius: 10upx; background: rgb(163, 30, 26);}
</style>
