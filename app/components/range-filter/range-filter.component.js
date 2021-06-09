angular
.module('investPlus')
.component('rangeFilter', {
    bindings: {
        title: '@',
        code: '@',
        prefix: '@',
        sufix: '@?',
        list: '<',
        format: '<?',
    },
    controllerAs: 'vm',
    template: `
        
        <div class="range-filter">
            <span>{{vm.title}}</span>
            <label ng-if="vm.format" class="range-filter__value" for="">{{vm.prefix}}{{vm.list[vm.rangeValue] | brNumber }} {{vm.sufix}}</label>
            <label ng-if="!vm.format" class="range-filter__value" for="">{{vm.prefix}} {{vm.list[vm.rangeValue]}} {{vm.sufix}}</label>

            <input
                watch-range
                class="range-filter__input"
                type="range" 
                id="{{vm.code}}"
                ng-model="vm.rangeValue"
                min="{{vm.minValue}}"
                max="{{vm.maxValue}}"
                ng-mouseup="vm.onChange()"

            />

        </div>
    `,
    controller: ['$scope', '$rootScope', class RangeFilterController {

        constructor($scope, $rootScope){
            'ngInject'
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            
        }

        $onInit(){
            this.minValue = 0;
            this.maxValue = this.list.length - 1;
            this.rangeValue = this.list[this.list.length - 1] || 0;
        }

        onChange(){
            this.$rootScope.$broadcast('change-filters-list', { code: this.code, value: this.list[this.rangeValue] });
        }

    }]
});