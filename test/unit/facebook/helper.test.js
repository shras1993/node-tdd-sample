import FacebookHelper from '../../../src/facebook/helper.js'


describe('facebook-helper', () => {
  let facebookHelper = null;


  before((done) => {
    let userId = "718145738235098";
    let token = "EAACEdEose0cBAEkcosKegVyQm61gWxVDCTGg4l1VSnoT2Y3aQUq4t96IjHKETxzPuMK0HNsDdkONInFHdugqUIUDNXt6uBNP4IUaBk1Sr5P2qPTNGgiLmZBmGsiRHz0PNFCWTs5T1e5qgJYOBuy9ZC2kcGR8f1rfcAAam9dAZDZD";
    facebookHelper = new FacebookHelper({userId, token});
    console.log(facebookHelper);
    done();
  });

  it("get friends list", async (done) => {
    try {
      let friends = await facebookHelper.getFriends();
      console.log("friends", friends);
      (friends != null).should.be.true;
      friends.should.be.Array;
      friends[0].should.have.keys("name", "id");
      done();
    } catch (e) {
      done(e);
    }
  });

  it.skip("publish post", async (done) => {
    try {
      let post = {
        message: 'test facebook post api'
      }
      let result = await facebookHelper.publishPost(post);
      console.log("result", result);
      done();
    } catch (e) {
      done(e);
    }
  });
});
