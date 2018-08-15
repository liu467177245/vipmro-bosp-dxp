/* returnProductUrl */
export function returnProductUrl() {
	let url;
	if (productUrl) {
		url = productUrl;
	} else {
		let strFullPath = window.document.location.href;
		let pathname = window.document.location.pathname;
		let hostname = window.document.location.hostname;
		let port = window.document.location.port;
		let protocol = window.document.location.protocol;
		if (strFullPath.indexOf('vipmro.net') > 0 || strFullPath.indexOf('vipmro.cn') > 0 || strFullPath.indexOf('vipmro.com') > 0) {
			url = protocol + '//' + hostname;
		} else {
			url = protocol + '//' + hostname + ':' + port + pathname.substr(0, pathname.substr(1).indexOf('/') + 1);
		}
	}
	return url;
}

/* 删除数组中指定元素 */
export function removeAttr(arr, val) {
	let inx = arr.indexOf(val);
	if (inx > -1) {
		arr.splice(inx, 1);
	}
	return arr;
};

/* 判断在数组中存在 同jquery $.inArray */
export function inArray(arr, val) {
	let length = arr.length;
	while (length--) {
		if (arr[length] === val) {
			return true;
		}
	}
	return false;
}

/* 同jquery$.parqam */
export function params (param) {
	let paramUrlArray = [];
	let paramUrl;
	for (var i in param) {
		paramUrlArray.push(`${i}=${param[i]}`);
	}
	paramUrl = paramUrlArray.join('&');
	return paramUrl;
};

/* 获取url传值 */
export function getUrlParam() {
	let params = window.location.href;
	let obj = {};
	let reg = /[?&][^?&]+=[^?&]+/g;
	let arr = params.match(reg);
	if (arr) {
		arr.forEach((v) => {
			let paramSplit = v.substring(1).split('=');
			let key = paramSplit[0];
			let value = paramSplit[1];
			obj[key] = value;
		});
	};
	return obj;
};

/**
 * [日期转化]
 * @param  {[string]} time   [时间戳]
 * @param  {[number]} year   [是否显示年]
 * @param  {[number]} month  [是否显示月]
 * @param  {[number]} day    [是否显示天]
 * @param  {[number]} hour   [是否显示小时]
 * @param  {[number]} minute [是否显示分]
 * @param  {[number]} second [是否显示秒]
 * @param  {[string]} type   [显示中文结构还是：-格式]
 * @return {[string]}        [description]
 */
export function dateFormatCn(time, year, month, day, hour, minute, second, type) {
	let newDate = new Date(Number(time));
	let	returnTime = '';
	let tYear = newDate.getFullYear();
	let	tMonth = (newDate.getMonth() + 1) > 9 ? (newDate.getMonth() + 1) : '0' + (newDate.getMonth() + 1);
	let	tDate = newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate();
	let	tHour = newDate.getHours() > 9 ? newDate.getHours() : '0' + newDate.getHours();
	let	tMinute = newDate.getMinutes() > 9 ? newDate.getMinutes() : '0' + newDate.getMinutes();
	let	tSecond = newDate.getSeconds() > 9 ? newDate.getSeconds() : '0' + newDate.getSeconds();
	if (!time) {
		return returnTime;
	}
	if (!type) {
		if (year) {
			returnTime +=
				tYear + '年';
		}
		if (month) {
			returnTime +=
				tMonth + '月';
		}
		if (day) {
			returnTime +=
				tDate + '日';
		}
		if (hour) {
			returnTime +=
				tHour + '时';
		}
		if (minute) {
			returnTime +=
				tMinute + '分';
		}
		if (second) {
			returnTime +=
				tSecond + '秒';
		}
	} else {
		let timeArrdate = [];
		let timeArrTime = [];
		if (year) {
			timeArrdate.push(tYear);
		}
		if (month) {
			timeArrdate.push(tMonth);
		}
		if (day) {
			timeArrdate.push(tDate);
		}
		if (hour) {
			timeArrTime.push(tHour);
		}
		if (minute) {
			timeArrTime.push(tMinute);
		}
		if (second) {
			timeArrTime.push(tSecond);
		}
		if (timeArrdate.length > 0) {
			returnTime +=
				timeArrdate.join('-');
		}
		if (timeArrTime.length > 0) {
			returnTime +=
				(timeArrdate.length > 0 ? ' ' : '') + timeArrTime.join(':');
		}
	}
	return returnTime;
}

/**
 * [addImgSize 图片加24040尺寸]
 * @param  {[string]} imgUrl [图片路径]
 * @param {[number]} [types] [240为默认 450传1]
 * @return {[type]}        [description]
 */
export function imgUrlSize(imgUrl, types) {
	let type = imgUrl.endsWith('/0.jpg');
	let	imgArray;
	let	newImgUrl;
	let	size;
	size = types ? '!450450' : '!240240';
	if (type) {
		return imgUrl;
	} else {
		imgArray = imgUrl.split('.');
		imgArray[imgArray.length - 2] = imgArray[imgArray.length - 2] + size;
		newImgUrl = imgArray.join('.');
		return newImgUrl;
	}
}

/**
 * [取几位小数]
 * @param  {[string]} value [要取的数值]
 * @param  {[string]} num   [要取的位数]
 * @return {[type]}       [description]
 */
export function toFixed(value, num) {
	let val;
	let	numNew = num;
	if (!numNew) {
		numNew = 2;
	}
	val = parseFloat(value).toFixed(numNew);
	return val;
}

/**
 * [uniqueArr 数组去重]
 * @param  {[array]} arr [需要去重的数组]
 * @return {[type]}     [description]
 */
export function uniqueArr(arr) {
	let newArr = [];
	let obj = {};
	arr.forEach((v, i) => {
		if (!obj[arr[i]]) {
			obj[arr[i]] = 1;
			newArr.push(v);
		}
	});
	return newArr;
}

/**
 * [uniqueArr 判断字符串在数组中是否存在]
 * @param {[type]} [str] [需要判断的字符串]
 * @param  {[array]} arr [数组]
 * @return {[type]}     [description]
 */
export function existString(str, arr) {
	var exist = false;
	arr.forEach((v, i) => {
		if (!exist && str === v) {
			exist = true;
		}
	});
	return exist;
}

/**
 * [checkNum 检查数量]
 * @return {[type]} [description]
 */
export function checkNum(num) {
	let numStr = num ? num : 0;
	if (numStr > 99) {
		numStr = '99+';
	}
	return numStr.toString();
}

/* 打电话 */
export function phoneIng() {
	location.href = 'tel:400-049-6999';
}
