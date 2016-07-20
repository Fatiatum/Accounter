import angular from 'angular';
import angularMeteor from 'angular-meteor';
import account from '../imports/components/account/account';

angular.module('accounter', [
  angularMeteor,
  account.name
]);
