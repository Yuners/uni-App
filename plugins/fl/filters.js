export default {
	keepTwoDecimal(value){
		return (Math.floor((value || 0) * 100) / 100).toFixed(2);
	}
}