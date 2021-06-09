angular
.module('investPlus')
.component('fundsList', {
    bindings: {
        filtredData: '<',
    },
    controllerAs: 'vm',
    template: `
        
        <div class="funds-list">

            <table class="funds-list__desktop">
                <thead>
                    <tr class="funds-list__thead">
                        <th>Fundo</th>
                        <th>Data da cota</th>
                        <th>Mês (%)</th>
                        <th>Ano (%)</th>
                        <th>12M (%)</th>
                        <th>Aplicação mínima</th>
                        <th>Prazo do resgate</th>
                        <th>Aplicar</th>
                    </tr>
                </thead>

                <tbody class="funds-list__tbody" id="table-list" ng-repeat="strategy in vm.strategies" ng-if="vm.filtredData[strategy].list.length">
                    <tr>
                        <td class="funds-list__section-td" colspan="8">
                            {{vm.filtredData.maps[strategy]}}
                        </td>
                    </tr>
                    
                    <tr 
                        ng-repeat="item in vm.filtredData[strategy].list track by $index" 
                        ng-init="trId='item-' + strategy + '-' + $index"
                        class="funds-list__item funds-list__risk funds-list__risk--{{item.specification.fund_risk_profile.score_range_order}}" 
                        id="{{trId}}"
                    >
                        <td class="funds-list__td-list" ng-click="vm.changeState($event, $index, strategy, item, trId)">
                            <div>{{item.simple_name}}</div>
                            <div class="funds-list__class">{{item.specification.fund_type}} | {{item.specification.fund_class}}</div>
                        </td>
                        <td class="funds-list__td-list" ng-click="vm.changeState($event, $index, strategy, item, trId)">{{item.quota_date | brDate}}</td>
                        <td class="funds-list__td-list" ng-click="vm.changeState($event, $index, strategy, item, trId)">{{item.profitabilities.month | brNumber}}</td>
                        <td class="funds-list__td-list" ng-click="vm.changeState($event, $index, strategy, item, trId)">{{item.profitabilities.year | brNumber}}</td>
                        <td class="funds-list__td-list" ng-click="vm.changeState($event, $index, strategy, item, trId)">{{item.profitabilities.m12 | brNumber}}</td>
                        <td class="funds-list__td-list" ng-click="vm.changeState($event, $index, strategy, item, trId)">{{item.operability.minimum_initial_application_amount | brNumber}}</td>
                        <td class="funds-list__td-list" ng-click="vm.changeState($event, $index, strategy, item, trId)">D+{{item.operability.retrieval_quotation_days}}</td>
                        <td class="funds-list__td-list">
                            <span ng-click="vm.openModal()" class="funds-list__small-button"><i class="fa fa-reply funds-list__icon-button"></i></span>
                        </td>
                    </tr> 
                </tbody>
            </table>

            <div class="funds-list__mobile">
                <div ng-repeat="strategy in vm.strategies" ng-if="vm.filtredData[strategy].list.length">
                    <div class="funds-list__category">
                        {{vm.filtredData.maps[strategy]}}
                    </div>
                    <div
                        class="funds-list__card" 
                        ng-repeat="item in vm.filtredData[strategy].list track by $index"
                        ng-init="trId='item-' + strategy + '-' + $index-mobile"
                        id="{{trId}}"
                    >
                        <div class="funds-list__item-card">
                            <div class="funds-list__left-item">
                                <p class="funds-list__main-title-mobile">{{item.simple_name}}</p>
                                <p class="funds-list__subtitle-mobile">{{item.specification.fund_type}} | {{item.specification.fund_class}}</p>
                            </div>
                            <div class="funds-list__right-item">
                                <span class="funds-list__mobile-risk-incator funds-list__mobile-risk-incator--{{item.specification.fund_risk_profile.score_range_order}}"></span>
                            </div>
                        </div>
                        <div class="funds-list__item-card">
                            <div class="funds-list__left-item">
                                <p class="funds-list__sub-item">Data da Cota:</p>
                            </div>
                            <div class="funds-list__right-item">
                                <p>{{item.quota_date | brDate}}</p>
                            </div>
                        </div>
                        <div class="funds-list__item-card">
                            <div class="funds-list__left-item">
                                <p class="funds-list__sub-item">Rentabilidade 12 Meses:</p>
                            </div>
                            <div class="funds-list__right-item">
                                <p>{{item.profitabilities.m12 | brNumber}}</p>
                            </div>
                        </div>
                        <div class="funds-list__item-card">
                            <div class="funds-list__left-item">
                                <p class="funds-list__sub-item">Aplicação Mínima:</p>
                            </div>
                            <div class="funds-list__right-item">
                                <p>{{item.operability.minimum_initial_application_amount | brNumber}}</p>
                            </div>
                        </div>
                        <div class="funds-list__item-card">
                            <div class="funds-list__left-item">
                                <p class="funds-list__sub-item">Cotização do Resgate:</p>
                            </div>
                            <div class="funds-list__right-item">
                                <p>D+{{item.operability.retrieval_quotation_days}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    `,
    controller: ['$scope', class FundsListController {

        constructor($scope){
            'ngInject'
            this.$scope = $scope;
            
        }

        $onInit(){
            this.strategies = Object.keys(this.filtredData.maps);
        }

        formatTime(value){
            const time = value.split(':');
            return `${time[0]}:${time[1]}`
        }

        formatNumber(value){
            return parseFloat(value || '0.00').toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        openModal(){
            console.info('Not implemented!');
        }
        
        changeState($event, $index, strategy, item, trId){
            let clickedRow = document.getElementById(trId);
            if(!item.isActive){
                let newRow = document.createElement("tr");
                newRow.id = `${trId}-child`;
                newRow.classList.add("funds-list__item");
                newRow.classList.add("funds-list__item--details");
                newRow.innerHTML = `
                    <td class="funds-list__child funds-list__risk" colspan="8">
                        <div class="funds-list__details">
                            <div class="funds-list__diagram">
                                Gráfico
                            </div>
                            <div>
                                <ul class="funds-list__ul">
                                    <li>Cotização da aplicação: <span class="funds-list__details-span">${item.operability.application_quotation_days_str}</span></li>
                                    <li>Cotização do resgate: <span class="funds-list__details-span">${item.operability.retrieval_quotation_days_str}</span></li>
                                    <li>Liquidação do resgate: <span class="funds-list__details-span">${item.operability.retrieval_liquidation_days_str}</span></li>
                                    <li>Taxa de administração: <span class="funds-list__details-span">${item.fees.administration_fee}</span></li>
                                    <li>Horário limite de aplicação: <span class="funds-list__details-span">${this.formatTime(item.operability.application_time_limit)}</span></li>
                                    <li>Volatilidade 12 meses: <span class="funds-list__details-span">${this.formatNumber(item.volatility_12m)}</span></li>
                                </ul>
                            </div>
                        </div>
                    </td>
                `;
                clickedRow.parentNode.insertBefore(newRow, clickedRow.nextSibling);
                this.filtredData[strategy].list[$index].isActive = true;
            }else{
                let childRow = document.getElementById(`${trId}-child`);
                childRow.remove();
                this.filtredData[strategy].list[$index].isActive = false;
            }
        }
    }]
});