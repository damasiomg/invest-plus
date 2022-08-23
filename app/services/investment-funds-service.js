angular
.module('investPlus')
.service('InvestmentFundsService', ['$http', '$q', class InvestmentFundsService {
    constructor($http, $q){
        'ngInject';
        this.$http = $http;
        this.$q = $q;
        this.EXTERNAL_LINK_API = 'https://s3.amazonaws.com/orama-media/json/fund_detail_full.json?limit=100&offset=0&serializer=fund_detail_full';
    }

    _getData(){
        return this.$q((resolve, reject) => {
            const data = JSON.parse(sessionStorage.getItem('funds'));
            if(data){
                resolve(data);
            }else{
                this.$http.get(this.EXTERNAL_LINK_API)
                    .then((response) => {
                        if(response && response.data){
                            const normalizedList = this.normalizeData(response.data);
                            try {
                                sessionStorage.setItem('funds', JSON.stringify(normalizedList));
                            }catch(e){
                                localStorage.clear();
                            }
                            resolve(normalizedList);
                        }else{
                            reject();
                        }
                    });
            }
        });
    }

    normalizeData(list){
        const fixedIncomeList = this.validateList(list.filter(item => item.specification.fund_macro_strategy.id === 1));
        const differentiatedList = this.validateList(list.filter(item =>  item.specification.fund_macro_strategy.id === 2));
        const sharesList = this.validateList(list.filter(item =>  item.specification.fund_macro_strategy.id === 3));

        return {
            fixedIncome: {
                list: fixedIncomeList,
                strategies: this.takeMainStrategies(fixedIncomeList)
            },
            differentiated: {
                list: differentiatedList,
                strategies: this.takeMainStrategies(differentiatedList)
            },
            shares: {
                list: sharesList,
                strategies: this.takeMainStrategies(sharesList)
            },
            maps: {
                fixedIncome: 'Renda Fixa',
                differentiated: 'Estratégias Diferenciadas',
                shares: 'Ações'
            },

            rangeValues: this.takeRangeValues(),
        }
    }

    validateList(list){
        return list.filter(item => {
            return((item.profitabilities.m12 !== null))
        });
    }

    takeMainStrategies(list){ 
        const strategies = list.map(item => {
            return JSON.stringify({ 
                    id: item.specification.fund_main_strategy.id,
                    name: item.specification.fund_main_strategy.name
                });
        });

        return [...new Set(strategies)].map(item => JSON.parse(item));
    }

    takeRangeValues(){
        const minimumApplicationList = [1, 100, 250, 500, 1000, 2000, 2500, 3000, 5000, 10000, 15000, 20000, 25000, 30000, 50000, 100000, 500000];
        const retrievalQuotationList = [...Array(33).keys(), 35, 37, 42, 44, 45, 50, 57, 58, 59, 60, 65, 70, 89, 90, 91, 119, 120, 150, 179, 180, 270];
        return { minimumApplication: { list: minimumApplicationList, label: 'Aplicação mínima', prefix: 'Até R$', sufix: '', format: 'br-number' }, 
                    retrievalQuotation: { list: retrievalQuotationList, label: 'Prazo de resgate', prefix: 'Até', sufix: 'dias' }};
    }

}]);