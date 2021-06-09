angular
.module('investPlus')
.component('checkFilter', {
    bindings: {
        list: '<',
        strategy: '@',
        macro: '@',
    },
    controllerAs: 'vm',
    template: `
        
        <div class="check-filter">
            <div class="check-filter__main">
                    <label class="check-filter__custom-checkbox">{{vm.strategy}}
                        <input type="checkbox" ng-checked="vm.isAllSelected()" ng-click="vm.groupChange(vm.isAllSelected())">
                        <span class="check-filter__custom-checkmark"></span>
                    </label>
                    <i ng-click="vm.changeExpanded()" class="fa fa-caret-down" ng-class="{'fa-rotate-180': vm.expanded}"></i>
            </div>
            <div ng-show="vm.expanded">
                <div class="check-filter__child-item" ng-repeat="item in vm.listItems track by $index">
                    <label class="check-filter__custom-checkbox">{{item.name}}
                        <input 
                            type="checkbox" 
                            name="strategy-{{item.id}}" 
                            id="strategy-{{type.id}}" 
                            ng-checked="item.checked"
                            ng-click="vm.onChange($index)"
                        >
                        <span class="check-filter__custom-checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
    `,
    controller: ['$scope', '$rootScope', class CheckFilterController {

        constructor($scope, $rootScope){
            'ngInject'
            this.$scope = $scope;
            this.$rootScope = $rootScope;
        }

        $onInit(){
            this.expanded = false;
            if(this.list){
                this.listItems = angular.copy(this.list);
                this.changeAll(true);
                this.makeFilterList();
            }
        }

        changeAll(value){
            this.listItems.forEach(element => {
                element.checked = value;                    
            });
        }

        onChange(index){
            this.listItems[index].checked = !this.listItems[index].checked;
            this.makeFilterList();
        }

        isAllSelected(){
            return this.filter.length === this.listItems.length;
        }

        makeFilterList(){
            this.filter = this.listItems.filter(item => item.checked).map(item => item.id);
            this.$rootScope.$broadcast('change-filters-list', { code: this.macro, value: this.filter });
        }

        groupChange(value){  
            this.changeAll(!value);
            this.makeFilterList();
        }

        changeExpanded(){
            this.expanded = !this.expanded;
        }

    }]
});