import FacebookHelper from '../../../src/facebook/helper.js'
import task1_initModel from '../../../src/database/task1';

describe.only('Facebook model test here',  () => {
  let facebookHelper = null;
  let model = null;
  let friendsList = [];
  let friends = [];

  before( async (done) => {

    let userId = "718145738235098";
    let token = "EAACEdEose0cBAKwxkCTHTxZCt4gFmqgCJ79QZAtnzUrg2gaibUqFWZAY3BEBrqOedhc96FB6w6EsIuXpGvOpZBzoUSGVsu8mGGw9GCZAZAV9CTj64JL4NOPkijgVL95DZAr0EccRSbc5rHDHLNZBnup7WK2aFkOFAs0g5QzPUSya6QZDZD";
    facebookHelper = await new FacebookHelper({userId, token});
    model = await task1_initModel();

    done();

  });


  it('create your friends list', async (done) => {

    try{
      friendsList = await facebookHelper.getFriends();
      console.log('friendsList:::::' + friendsList);
      console.log(`Model: ${model}, friends: ${model.friends}`)
      friends = await model.friends.bulkCreate(friendsList);

      let result = friends.filter((friend) => { return friend.name == 'Calvin Huang' })
      result.length.should.be.eq(1)

      done();
    } catch(e){
      done(e);
    }

  });

  it('Find your friend', async (done) => {
    try{

      let findFriend = await model.friends.findOne({id: friends.id});

      // console.log(`id::::::${friends[0].id}`);
      console.log(`findFriend:::${findFriend}`);


      findFriend.should.have.valueOf(friends[0].id);

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
