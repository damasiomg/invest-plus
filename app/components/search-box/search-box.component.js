angular
.module('investPlus')
.component('searchBox', {
    bindings: {

    },
    controllerAs: 'vm',
    template: `
        
        <div class="search-box" 
            ng-class="{'search-box__has-content': (vm.searchInput.length > 0)}"
        >
            <i class="fa fa-search fa-1 fa-flip-horizontal search-box__icon"></i>
            <input 
                type="search" 
                id="search-input" 
                ng-model="vm.searchInput"
                ng-change="vm.onChange()"
                class="search-box__input"
            />
            
            <span class="search-box__advice">Selecione o fundo para saber o horário limite de aplicação.</span>
        </div>
    `,
    controller: ['$rootScope', class SearchBoxController {

        constructor($rootScope){
            'ngInject'
            this.$rootScope = $rootScope;
        }

        onChange(){
            this.$rootScope.$broadcast('change-filters-list', { code: 'text', value: this.searchInput.toLowerCase() });
        }
    }]
});