import FacebookHelper from '../../../src/facebook/helper.js'
import task1_initModel from '../../../src/database/task1';

describe.only('Facebook model test here',  () => {
  let facebookHelper = null;
  let model = null;
  let rawFriends = [];
  let friends = [];

  before( async (done) => {

    let userId = "718145738235098";
    let token = "EAACEdEose0cBAAf3LjhVUNt2RFiaLwAeYKEutSUjb707wZABVylwox6CeZBW5kSvCZCAQM2Dg5PTeFk67NvmCzBTYWEaAMgJKXmzx4sWDFUAtlKP0pe7HoauD5cH8kAp3NaExlLbmtVqrqf1QNZCOY3tfTs10CYibGkzAeojLwZDZD";
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

      friends.length.should.be.eq(rawFriends.length);

      done();
    } catch(e) {
      done(e);
    }

  });

  it('Find your friend', async (done) => {
    try {

      let resultFriends = await model.friends.findAll();

      let dataFbIds = resultFriends.map((resultfriend) => {
            return resultfriend.facebookId;
      });
      console.log(dataFbIds);

      let apiFriendsId = rawFriends.map((friend) => {
            return friend.id;
      });
      console.log(apiFriendsId);

      dataFbIds.should.be.eql(apiFriendsId);
      // resultFriend.should.not.be.eq(null);

      done();

    } catch(e){
      done(e);
    }

  });

  it('Update your friends data', async (done) => {
    try {
      const targetData = {
        name: 'Trunk-studio',
        email: 'hellojs@trunk.studio',
      }

      rawFriends.length.should.be.above(4);

      let friendToUpdate = await model.friends.findOne({facebookId: rawFriends[3].id});
      console.log(`friendToUpdate: ${friendToUpdate}`);

      friendToUpdate.name = targetData.name;
      friendToUpdate.email = targetData.email;

      let result = await friendToUpdate.save();

      result.name.should.be.eq(targetData.name);
      result.email.should.be.eq(targetData.email);

      done();
    } catch(e) {
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
