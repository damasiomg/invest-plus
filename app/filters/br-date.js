angular
.module('investPlus')
.filter('brDate', function brDate(){
    return (value) => {

        const data = value.split('-');
        return `${data[2]}/${data[1]}/${data[0]}`
    }
});