import formatCalendar from './calendar.js';
let calendar={
	getLunar(year,month,date){
		return formatCalendar.solar2lunar(year,month,date);
	},
	formatNum(n){
		return n<10?'0'+n:n+''
	},
	submit(lunar = 'solar', year, month, day, hour, min, isHourShow = true, isMinShow = true){
		let hourArray = [
			'0-1点', 
			'1-2点', 
			'2-3点', 
			'3-4点', 
			'4-5点',
			'5-6点',
			'6-7点',
			'7-8点',
			'8-9点',
			'9-10点',
			'10-11点',
			'11-12点',
			'12-13点',
			'13-14点',
			'14-15点',
			'15-16点',
			'16-17点',
			'17-18点',
			'18-19点',
			'19-20点',
			'20-21点',
			'21-22点',
			'22-23点',
			'23-24点'
		];
		
		if(lunar === 'solar'){
			let lYear = parseInt(year);
			let lMonth = month;
			let lDay = parseInt(day);
			let toValues = formatCalendar.solar2lunar(lYear, parseInt(lMonth), lDay);
 			
			if(isHourShow === true && isMinShow === true) 
				return {
					text:toValues.lYear + '年' + toValues.lMonth + '月' + toValues.lDay + '日' + hourArray[hour] + min + '分',
					year:toValues.lYear,
					month:toValues.lMonth,
					day:toValues.lDay,
					hour: hour - 1,
					min: min
				}
				
			if(isHourShow === true && isMinShow === false) 
				return {
					text:toValues.lYear + '年' + toValues.lMonth + '月' + toValues.lDay + '日' + hourArray[hour],
					year:toValues.lYear,
					month:toValues.lMonth,
					day:toValues.lDay,
					hour: hour - 1,
					min: "00"
				}
			
			return {
				text:toValues.lYear + '年' + toValues.lMonth + '月' + toValues.lDay + '日',
				year:toValues.lYear,
				month:toValues.lMonth,
				day:toValues.lDay,
				hour: "00",
				min: "00"
			}
		}
		
		if(lunar === 'lunar'){
			let isLeap = false;
			if(typeof(month) === 'string'){
				isLeap = month.indexOf('闰') !== -1 ? true : false;
				if(isLeap) month = parseInt(month.substr(1));
			}
			
			let toValues = formatCalendar.lunar2solar(year, parseInt(month), day, isLeap);
			
			if(isHourShow === true && isMinShow === true) 
				return {
					text:toValues.cYear + '年' + toValues.cMonth + '月' + toValues.cDay + '日' + hourArray[hour] + min + '分',
					year:toValues.cYear,
					month:toValues.cMonth,
					day:toValues.cDay,
					hour: hour - 1,
					min: min
					
				}
			if(isHourShow === true && isMinShow === false) 
				return {
					text:toValues.cYear + '年' + toValues.cMonth + '月' + toValues.cDay + '日' + hourArray[hour],
					year:toValues.cYear,
					month:toValues.cMonth,
					day:toValues.cDay,
					hour: hour - 1,
					min: "00"
				}
			
			return {
				text:toValues.cYear + '年' + toValues.cMonth + '月' + toValues.cDay + '日',
				year:toValues.cYear,
				month:toValues.cMonth,
				day:toValues.cDay,
				hour: "00",
				min: "00"
			}
		}
	},
	init(lunar = 'solar', startDate, endDate, year, month, day, hour, min, isHourShow = true, isMinShow = true, isTab = false, lunarType = 'number'){
		if(lunar === 'solar') return calendar.calendarSolar(startDate, endDate, year, month, day, hour, min, isHourShow, isMinShow, isTab, lunarType)
		if(lunar === 'lunar') return calendar.calendarLunar(startDate, endDate, year, month, day, hour, min, isHourShow, isMinShow, isTab, lunarType);
		
	},
	calendarSolar(startDate, endDate, year, month, day, hour = '0', min, isHourShow, isMinShow, isTab, lunarType){
		let cYear = parseInt(year);
		let cMonth = month;
		// let cDay = parseInt(day);
		let cDay = day;
		if(isTab){
			let isLeap = false;
			if(typeof(cMonth) === 'string'){
				isLeap = cMonth.indexOf('闰') !== -1 ? true : false;
				// if(isLeap) cMonth = parseInt(month.substr(1));
				if(isLeap) cMonth = month.substr(1);
			}
			cMonth = calendar.toLowerMonth(cMonth)
			cDay = calendar.toLowerDay(cDay)
			let toValues = formatCalendar.lunar2solar(cYear, cMonth, cDay, isLeap);
			
			cYear = toValues.cYear;
			cMonth = toValues.cMonth;
			cDay = toValues.cDay;
		}
		cMonth = parseInt(cMonth);
		
		//处理公历年份
		let yearArray = [];
		let yearIndex = 0;
		let solarIndex = 0;
		for (let i = startDate; i <= endDate; i++) {
		  yearArray.push(i);

		  if(i === cYear) yearIndex = solarIndex;
		  
		  solarIndex++
		}
		
		//处理月份
		let monthArray = [];
		let monthIndex = 0;
		for (let m = 1; m <= 12; m++) {
			monthArray.push(m);
			
			if(m === cMonth) monthIndex = m - 1;
		}
		
		//处理天数
		let dayNum = formatCalendar.solarDays(cYear, cMonth);
		let dayArray = [];
		let dayIndex = 0;
		for (let d = 1; d <= dayNum; d++) {
			dayArray.push(d);
			
			if(d === cDay) dayIndex = d - 1;
		}
		
		//处理时辰
		let hourArray = [];
		let hourIndex = isTab ? parseInt(hour) : parseInt(hour) >= 0 ? parseInt(hour) : 0;
		if(isHourShow){
			hourArray = [
				'0-1点', 
				'1-2点', 
				'2-3点', 
				'3-4点', 
				'4-5点',
				'5-6点',
				'6-7点',
				'7-8点',
				'8-9点',
				'9-10点',
				'10-11点',
				'11-12点',
				'12-13点',
				'13-14点',
				'14-15点',
				'15-16点',
				'16-17点',
				'17-18点',
				'18-19点',
				'19-20点',
				'20-21点',
				'21-22点',
				'22-23点',
				'23-24点'
			];
		}
		
		//处理分钟
		let minArray = [];
		let minIndex = parseInt(min) > 0 ? parseInt(min) : 0;
		if(isMinShow){
			for (let f = 0; f <= 60; f++) {
				minArray.push(f);
			}
		}
		
		return {
			range: [yearArray, monthArray, dayArray, hourArray, minArray],
			years:yearArray,
			yearIndex:yearIndex,
			months: monthArray,
			monthIndex: monthIndex,
			days: dayArray,
			dayIndex: dayIndex,
			hours:hourArray,
			hourIndex: hourIndex,
			mins:minArray,
			minIndex: minIndex
		};
	},
	calendarLunar(startDate, endDate, year, month, day, hour = '0', min, isHourShow, isMinShow, isTab, lunarType){
		let lYear = parseInt(year);
		let lMonth = month;
		let lDay = parseInt(day);
		let isLeap = false;
		// if(typeof(lMonth) === 'string'){
		// 	isLeap = lMonth.indexOf('闰') !== -1 ? true : false;
		// 	if(isLeap) lMonth = parseInt(lMonth.substr(1));
		// }

		if(isTab){console.log(lMonth)
			let toValues = formatCalendar.solar2lunar(lYear, parseInt(lMonth), lDay);
			console.log(toValues)
			lYear = toValues.lYear;
			lMonth = toValues.lMonth;
			lDay = toValues.lDay;
			isLeap = toValues.isLeap;
		}else{
			lMonth = calendar.toLowerMonth(month);
		}
		lMonth = parseInt(lMonth);
		
		//处理农历年份
		let yearArray = [];
		let yearIndex = 0;
		let solarIndex = 0;
		for (let i = startDate; i <= endDate; i++) {
		  if(lunarType == 'number'){
			  yearArray.push(i); //数字
		  }else{
			 // yearArray.push(formatCalendar.toGanZhiYear(i));//汉字年 
			 yearArray.push(i);
		  }

		  if(i === lYear) yearIndex = solarIndex;
		  
		  solarIndex++
		}
		
		/**
		 * 处理农历月份
		 * 1、先判断是否是闰月年
		 * 2、如果是闰月年，要知道是闰几月
		 * 3、闰月前正常下标，闰月后要下标减一
		 */
		let monthArray = [];
		let isMonthR = formatCalendar.leapMonth(lYear);console.log(lMonth);console.log(isMonthR)
		let monthIndex = 0;
		if(isMonthR==0){
			monthIndex = isLeap ? lMonth : (lMonth < isMonthR ? lMonth : lMonth - 1);
		}else{
			monthIndex = isLeap ? lMonth : (lMonth > isMonthR ? lMonth : lMonth - 1);
		}
		console.log(monthIndex)
		let mMax = 12;//常规年12个月
		if(isMonthR > 0) mMax = 13;//闰月年13个月
		for (let m = 1; m <= mMax; m++) {
			if(isMonthR > 0){
				if(m == isMonthR + 1){
					//闰月
					if(lunarType == 'number'){
						monthArray.push('闰' + isMonthR);//数字月
					}else{
						monthArray.push('闰' + formatCalendar.toChinaMonth(isMonthR))//汉字月
					}
				}else if(m > isMonthR + 1){
					if(lunarType == 'number'){
						monthArray.push(m - 1);//数字月
					}else{
						monthArray.push(formatCalendar.toChinaMonth(m - 1))//汉字月
					}
				}else{
					if(lunarType == 'number'){
						monthArray.push(m);//数字月
					}else{
						monthArray.push(formatCalendar.toChinaMonth(m))//汉字月
					}
				}
			}else{
				if(lunarType == 'number'){
					monthArray.push(m);//数字月
				}else{
					monthArray.push(formatCalendar.toChinaMonth(m))//汉字月
				}
			}
		}
		
		/**
		 * 处理农历天数
		 * 1、判断是否为闰月
		 * 2、闰月天数，非闰月天数
		 */
		let dayNum = isLeap ? formatCalendar.leapDays(lYear) : formatCalendar.monthDays(lYear, lMonth);
		let dayArray = [];
		let dayIndex = 0;
		for (let d = 1; d <= dayNum; d++) {
			if(lunarType == 'number'){
				dayArray.push(d);//数字日期
			}else{
				dayArray.push(formatCalendar.toChinaDay(d));//汉字日期
			}
			
			if(d === lDay) dayIndex = d - 1;
		}
		
		//处理时辰
		let hourArray = [];
		let hourIndex = isTab ? parseInt(hour) : parseInt(hour) >= 0 ? parseInt(hour) : 0;
		if(isHourShow){
			hourArray = [
				'0-1点', 
				'1-2点', 
				'2-3点', 
				'3-4点', 
				'4-5点',
				'5-6点',
				'6-7点',
				'7-8点',
				'8-9点',
				'9-10点',
				'10-11点',
				'11-12点',
				'12-13点',
				'13-14点',
				'14-15点',
				'15-16点',
				'16-17点',
				'17-18点',
				'18-19点',
				'19-20点',
				'20-21点',
				'21-22点',
				'22-23点',
				'23-24点'
			];
		}
		
		//处理分钟
		let minArray = [];
		let minIndex =  parseInt(min) > 0 ? parseInt(min) : 0;
		if(isMinShow){
			for (let f = 0; f <= 60; f++) {
				minArray.push(f);
			}
		}
		
		return {
			range: [yearArray, monthArray, dayArray, hourArray, minArray],
			years:yearArray,
			yearIndex:yearIndex,
			months: monthArray,
			monthIndex: monthIndex,
			days: dayArray,
			dayIndex: dayIndex,
			hours:hourArray,
			hourIndex: hourIndex,
			mins:minArray,
			minIndex: minIndex
		};
	},
	toLowerMonth(val){
		switch (val){
			case '一':
				return 1
				break;
			case '\u6b63':
				return 1
				break;
			case '\u4e8c':
				return 2
				break;
			case '\u4e09':
				return 3
				break;
			case '\u56db':
				return 4
				break;
			case '\u4e94':
				return 5
				break;
			case '\u516d':
				return 6
				break;
			case '\u4e03':
				return 7
				break;
			case '\u516b':
				return 8
				break;
			case '\u4e5d':
				return 9
				break;
			case '\u5341':
				return 10
				break;
			case '\u51ac':
				return 11
				break;
			case '\u814a':
				return 12
				break;
			default:
				break;
		}
	},
	toLowerDay(val){
		let num = 1;
		if(val.indexOf("初")==0){
			num = calendar.toLowerMonth(val.substr(1))
		}else if(val.indexOf("十")==0){
			num = 10 + calendar.toLowerMonth(val.substr(1))
		}else if(val.indexOf("二十")==0){
			num = 20
		}else if(val.indexOf("廿")==0){
			num = 20 + calendar.toLowerMonth(val.substr(1))
		}else{
			num = 30;
		}
		return num
	}
}
export default calendar