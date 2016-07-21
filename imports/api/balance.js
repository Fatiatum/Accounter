import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Balance = new Mongo.Collection('balance');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('balance', function balancePublication() {
    return Balance.find({
      $or: [{
        private: {
          $ne: true
        }
      }, {
        owner: this.userId
      }, ],
    });
  });
}

Meteor.methods({
  'balance.insert' (value, text) {
    check(value, Number);
    check(text, String);

    // Make sure the user is logged in before inserting a iteam
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Balance.insert({
      value,
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'balance.remove' (iteamId) {
    check(iteamId, String);

    const iteam = Balance.findOne(iteamId);
    if (iteam.private && iteam.owner !== Meteor.userId()) {
      // If the iteam is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Balance.remove(iteamId);
  },
  'balance.setPrivate' (iteamId, setToPrivate) {
    check(iteamId, String);
    check(setToPrivate, Boolean);

    const iteam = Balance.findOne(iteamId);

    // Make sure only the task owner can make a task private
    if (iteam.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Balance.update(iteamId, {
      $set: {
        private: setToPrivate
      }
    });
  },
});
