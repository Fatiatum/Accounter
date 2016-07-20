import angular from 'angular';
import angularMeteor from 'angular-meteor';
import account from '../imports/components/account/account';
import '../imports/startup/accounts-config.js';

angular.module('accounter', [
  angularMeteor,
  account.name,
  'accounts.ui'
]);
