export function returnOrderType(orderType) {
	let orderStausName;
	switch (orderType) {
	case '1':
		orderStausName = '待付款';
		break;
	case '2':
		orderStausName = '待发货';
		break;
	case '3':
		orderStausName = '待收货';
		break;
	case '4':
		orderStausName = '已收货';
		break;
	case '5':
		orderStausName = '已结算';
		break;
	case '6':
		orderStausName = '已完成';
		break;
	case '7':
		orderStausName = '退货中';
		break;
	case '8':
		orderStausName = '已取消';
		break;
	case '9':
		orderStausName = '待确认付款';
		break;
	}
	return orderStausName;
}

export function checkPayType(paytype) {
	let payTypeName;
	switch (paytype) {
	case '1':
		payTypeName = '银联支付';
		break;
	case '2':
		payTypeName = '线下支付';
		break;
	case '3':
		payTypeName = '支付宝支付';
		break;
	case '4':
		payTypeName = '余额支付';
		break;
	case '5':
		payTypeName = 'B2B支付';
		break;
	case '6':
		payTypeName = '微信支付';
		break;
	case '7':
		payTypeName = '金螳螂';
		break;
	default:
		payTypeName = '待付款';
	}
	return payTypeName;
}
