import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
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
      },
      currentUser() {
        return Meteor.user();
      }
    })
  }
  addIteam(newIteam) {
    // Insert a task into the collection
    Balance.insert({
      value: newIteam,
      createdAt: new Date,
      owner: Meteor.userId(),
      username: Meteor.user().username
    });

    // Clear form
    this.newIteam = '';
  }
  removeIteam(iteam) {
    Balance.remove(iteam._id);
  }
}

export default angular.module('account', [
  angularMeteor
])
  .component('account', {
    templateUrl: 'imports/components/account/account.html',
    controller: ['$scope', AccountCtrl]
  });
