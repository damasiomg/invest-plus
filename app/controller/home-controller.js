angular
.module('investPlus')
.controller('HomeController', ['$scope', '$rootScope', 'InvestmentFundsService', class HomeController {

    constructor($scope, $rootScope, InvestmentFundsService){
        'ngInject',
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.InvestmentFundsService = InvestmentFundsService;
        this.allFiters = {};
    }

    $onInit(){
        this.InvestmentFundsService._getData()
            .then(data => {
                this.investimentList = data;
                this.filtredList = angular.copy(this.investimentList);
                this.macroStrategies = Object.keys(this.investimentList.maps);
                this.rangeTypes = Object.keys(this.investimentList.rangeValues);
            });

            this.$rootScope.$on('change-filters-list', (e, filter) => {
                this.allFiters[filter.code] = filter.value;
                this.applyFilters();
            });
    }

    applyFilters(){
        this.filtredList = angular.copy(this.investimentList);

        Object.keys(this.allFiters).map(key => {
            if(key === 'text'){
                this.macroStrategies.map(macro => {
                    const resultFilterList = this.filtredList[macro].list.filter(fund => fund.simple_name.toLowerCase().includes(this.allFiters[key]));
                    this.filtredList[macro].list = angular.copy(resultFilterList);
                });
            }else if(key === 'minimumApplication'){

                this.macroStrategies.map(macro => {
                    const resultFilterList = this.filtredList[macro].list.filter(fund => parseFloat(fund.operability.minimum_initial_application_amount) <= this.allFiters[key]);
                    this.filtredList[macro].list = angular.copy(resultFilterList);
                });

            }else if(key === 'retrievalQuotation'){

                this.macroStrategies.map(macro => {
                    const resultFilterList = this.filtredList[macro].list.filter(fund => fund.operability.retrieval_quotation_days <= this.allFiters[key]);
                    this.filtredList[macro].list = angular.copy(resultFilterList);
                });
            
            }else{
                const filtredItens = this.filtredList[key].list.filter(item => this.allFiters[key].includes(item.specification.fund_main_strategy.id))
                this.filtredList[key].list = angular.copy(filtredItens);
            }
        });


    }

}]);
