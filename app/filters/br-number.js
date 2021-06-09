angular
.module('investPlus')
.filter('brNumber', function brNumber(){
    return (value) => {
        if(typeof(value) !== 'string'){
            value = value.toString();
        }

        return parseFloat(value || '0.00').toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
});