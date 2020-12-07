export default {
	
	// 订单状态
	orderStatus: [
		{ key: 0, value: '待付款' },
		{ key: 1, value: '待发货' },
		{ key: 2, value: '已发货' },
		{ key: 3, value: '已收货' },
		{ key: 4, value: '已完成' },
		{ key: -1, value: '退货申请' },
		{ key: -2, value: '退款中' },
		{ key: -3, value: '退款完成' },
		{ key: -4, value: '已关闭' },
		{ key: -5, value: '撤销申请' },
		{ key: 101, value: '待成团' },
		{ key: 201, value: '备货中' },
		{ key: 202, value: '待付尾款' }
	],
	
	// 订单退货状态
	refundStatus: [
		{ key: 1, value: '退款申请' },
		{ key: 2, value: '等待退货' },
		{ key: 3, value: '等待确认收货' },
		{ key: 4, value: '等待确认退款' },
		{ key: 5, value: '已退款' },
		{ key: -1, value: '退款已拒绝' },
		{ key: -2, value: '退款已关闭' },
		{ key: -3, value: '退款不通过' }
	],
	
	// 订单评价状态
	evaluateStatus: [
		{ key: 0, value: '未评价' },
		{ key: 1, value: '已评价' },
		{ key: 2, value: '已追评' }
	],
	
}