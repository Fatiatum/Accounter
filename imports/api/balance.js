import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Balance = new Mongo.Collection('balance');

Meteor.methods({
  'balance.insert' (value) {
    check(value, Number);

    // Make sure the user is logged in before inserting a iteam
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Balance.insert({
      value,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'balance.remove' (iteamId) {
    check(iteamId, String);

    Balance.remove(iteamId);
  },
});
