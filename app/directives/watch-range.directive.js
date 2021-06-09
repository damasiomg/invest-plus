angular
.module('investPlus')
.directive('watchRange', function(){

    function watchRangeLink(scope, element, attrs) {
        const onInput = function(){
            let value = (this.value-this.min)/(this.max-this.min)*100
            this.style.background = 'linear-gradient(to right, #119c9f 0%, #119c9f ' + value + '%, #cecfd0 ' + value + '%, #cecfd0 100%)'
        };

        element.on('input', onInput);
    };

    return{
        link: watchRangeLink,
        restrict: 'A',
    }
});