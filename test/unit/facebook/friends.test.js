import FacebookHelper from '../../../src/facebook/helper.js'
import task1_initModel from '../../../src/database/task1';

describe.only('Facebook model test here',  () => {
  let facebookHelper = null;
  let model = null;
  let rawFriends = [];
  let friends = [];

  before( async (done) => {

    let userId = "718145738235098";
    let token = "EAACEdEose0cBAKwxkCTHTxZCt4gFmqgCJ79QZAtnzUrg2gaibUqFWZAY3BEBrqOedhc96FB6w6EsIuXpGvOpZBzoUSGVsu8mGGw9GCZAZAV9CTj64JL4NOPkijgVL95DZAr0EccRSbc5rHDHLNZBnup7WK2aFkOFAs0g5QzPUSya6QZDZD";
    facebookHelper = await new FacebookHelper({userId, token});
    model = await task1_initModel();

    try {
      rawFriends = await facebookHelper.getFriends()

      done();
    } catch(e) {
      done(e);
    }
  });

  it('If friends from FB API should not empty', () => {
    rawFriends.length.should.be.above(0);
  });

  it('Create your friends list', async (done) => {

    try {
      let formattedFriends = rawFriends.map((rawFriend) => {
                               let friend = {};
                               friend.name = rawFriend.name;
                               friend.email = rawFriend.email;
                               friend.facebookId = rawFriend.id;

                               return friend;
                             });

      // console.log(`friendsList:::::${friendsList}`);
      // console.log(`Model: ${model}, friends: ${model.friends}`);
      friends = await model.friends.bulkCreate(formattedFriends);

      result.length.should.be.eq(1);

      done();
    } catch(e) {
      done(e);
    }

  });

  it('Find your friend', async (done) => {
    try {

      let resultFriend = await model.friends.findOne({facebookId: rawFriends[0].id});

      // console.log(`id::::::${friends[0].id}`);
      console.log(`result of findFriend:::${resultFriend}`);

      resultFriend.should.not.be.eq(null);

      done();

    } catch(e){
      done(e);
    }

  });

  it('Update your friends data', async (done) => {
    try{
      const upd = {
        name: "Trunk-studio",
        email: "hellojs@trunk.studio",
      }

      let updFriend = await model.friends.findById(friends[3].id);
      console.log(updFriend);

      updFriend.name = upd.name;
      updFriend.email = upd.email;

      let result = await updFriend.save();

      result.name.should.be.eq(upd.name);
      result.email.should.be.eq(upd.email);

      done();
    } catch(e){
      done(e);
    }
  });


  it('Delete your friend data', async (done) =>{

    try{

      let trunk = await model.friends.findOne({ where : {name: 'Trunk-studio'}});

      console.log(`trunk::: ${trunk}`);
      await trunk.destroy();

      let check = await model.friends.findOne({ where : {name: 'Trunk-studio'}});
      (check === null).should.be.true;

      done();
    } catch(e){
      done(e);
    }
  });
});
