import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Balance } from '../../api/balance.js';
import CalendarFilter from '../filters/calendar.filter';

import template from './account.html';

class AccountCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.subscribe('balance');

    $scope.values = 0;

    this.helpers({
      balance() {
        $scope.values = 0;

        // Get total value
        Balance.find({}, {
          sort: {
            createdAt: -1
          }
        }).map(function(u){$scope.values += u.value});

        // Show newest tasks at the top
        var balance = Balance.find({}, {
          sort: {
            createdAt: -1
          }
        });
        return balance;
      },
      currentUser() {
        return Meteor.user();
      }
    })
  }
  addIteam(newIteamValue, newIteamText) {
    // Insert a task into the collection
    Meteor.call('balance.insert', newIteamValue, newIteamText);

    // Clear form
    this.newIteamValue = '';
    this.newIteamText = '';
  }
  removeIteam(iteam) {
    Meteor.call('balance.remove', iteam._id);
  }
  setPrivate(iteam) {
    Meteor.call('balance.setPrivate', iteam._id, !iteam.private);
  }
}

export default angular.module('account', [
  angularMeteor
])
  .component('account', {
    templateUrl: 'imports/components/account/account.html',
    controller: ['$scope', AccountCtrl]
  });
