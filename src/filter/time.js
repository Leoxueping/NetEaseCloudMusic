export default (value) => {

    if(!value) return '00:00';
    let minute = parseInt(value / 60),
        second = parseInt(value % 60);

    const setTwoBit = (val) => {
        if (val.toString().length < 2) {
            return '0' + val;
        }else {
            return val;
        }
    }

    return setTwoBit(minute) + ':' + setTwoBit(second);
}