import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './account.html';

class AccountCtrl {
  constructor() {
    this.balance = [{
      value: 100
    }, {
      value: 500
    }, {
      value: -50
    }];
  }
}

export default angular.module('account', [
  angularMeteor
])
  .component('account', {
    templateUrl: 'imports/components/account/account.html',
    controller: AccountCtrl
  });
