import { Meteor } from 'meteor/meteor';

Meteor.startup(async () => {
    console.log(process.env.MEDIA_PATH);
});
