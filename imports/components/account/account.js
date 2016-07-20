import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Balance } from '../../api/balance.js';

import template from './account.html';

class AccountCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      balance() {
        // Show newest tasks at the top
        return Balance.find({}, {
          sort: {
            createdAt: -1
          }
        });
      }
    })
  }
  addIteam(newIteam) {
    // Insert a task into the collection
    Balance.insert({
      value: newIteam,
      createdAt: new Date
    });

    // Clear form
    this.newIteam = '';
  }
}

export default angular.module('account', [
  angularMeteor
])
  .component('account', {
    templateUrl: 'imports/components/account/account.html',
    controller: ['$scope', AccountCtrl]
  });
