/*******************************************************************************
 * Copyright (C) 2015 ZenID Inc.
 *
 * Creator: Chen Li<chen.li@noc-land.com>
 * Creation Date: 2015-12-31
 *
 * userApps.js declares methods for UserApps collection.
 *******************************************************************************/
Meteor.methods({

  /**
   * User subscribe to a public app.
   * @param {string} appId - App Id.
   * @param {string} appName - App name.
   * @param {string} logoURL - The URL of app's logo.
   * @param {string} loginLink - Login link.
   * @param {string} registerLink - Register link.
   */
  subscribePublicApp(appId, appName, logoURL, loginLink, registerLink){
    //Todo 检查和polish userApps里的方法
    localSimulateLatency(500);
    //console.log("subscribePublicApp start");
    checkUserLogin.call(this);
    const userId = this.userId;

    let credentialRecord = UserAppCredentials.findOne({userId: userId});

    let usernameList = [];
    credentialRecord.publicApps.map(function (publicApp) {
      if (publicApp.appId === appId) {
        usernameList.push(publicApp.username);
      }
    });

    UserApps.update(//前面的check都通过,then add this public app to user's record
        {userId: userId},
        {
          $addToSet: {//用addToSet而不是push来防止已经有该app的情况
            "publicApps": {
              "appId": appId,
              "appName": appName,
              "logoURL": logoURL,
              "loginLink": loginLink,
              "registerLink": registerLink,
              "userNames": usernameList,
              "defaultUserName": "",
              "lastLoginTime": ""
            }
          }
        }
    );

    if (ZenApps.findOne({_id: appId}).subscribeCount != null) {//Update subscription count
      ZenApps.update(
          {_id: appId},
          {
            $inc: {subscribeCount: 1}
          }
      )
    } else {
      ZenApps.update(
          {_id: appId},
          {
            $set: {subscribeCount: 1}
          }
      )
    }
  },

  unsubscribePublicApp(appId){
    localSimulateLatency(500);
    //console.log("unsubscribePublicApp start");
    checkUserLogin.call(this);

    UserApps.update(
        {userId: this.userId},
        {
          $pull: {
            publicApps: {appId: appId}
          }
        }
    );

    ZenApps.update(
        {_id: appId},
        {
          $inc: {subscribeCount: -1}
        }
    );
  },

  appAddUsername(appId, username){
    localSimulateLatency(500);
    //console.log("addConfigured start");
    checkUserLogin.call(this);
    console.log("appAddUsername start");

    if (Meteor.call("isUsernameExist", appId, username)) {
      throw new Meteor.Error("userApps: 该用户名已经存在");
    }

    console.log("start to update");
    UserApps.update(
        {
          $and: [
            {"userId": this.userId},
            {"publicApps.appId": appId}
          ]
        },
        {
          $addToSet: {
            "publicApps.$.userNames": username
          }
        }
    )
  },

  appRemoveUsername(appId, username){
    localSimulateLatency(500);
    //console.log("appRemoveUsername start);
    checkUserLogin.call(this);

    UserApps.update(
        {
          $and: [
            {"userId": this.userId},
            {"publicApps.appId": appId}
          ]
        },
        {
          $pull: {
            "publicApps.$.userNames": username
          }
        }
    )
  },

  addEncryptionInfo(hexSalt, hexIv){
    const userId = this.userId;
    //TODO implement inserting user salt, call it in "APP", 在保存密码前用passwordKey加密,保存iv和密文,
    // 获得密码前用password解密
    checkUserLogin.call(this);
    UserApps.update({userId: userId}, {
      $set: {
        hexSalt: hexSalt,
        hexIv: hexIv
      }
    });
  },

  /**
   * Returns whether the username exists for this user in a specific app (in collection 'UserApps')
   * @param {string} appId - Id of the app.
   * @param {string} username - username.
   * @returns {boolean} usernameExists - Whether the username exists
   */
  isUsernameExist(appId, username){
    checkUserLogin.call(this);

    const usernameExists = UserApps.findOne({
      $and: [
        {userId: this.userId},
        {"publicApps.appId": appId},
        {"publicApps.userNames": username}
      ]
    });
    return !!usernameExists;
  },

  checkUserHasAppById(appId){
    checkUserLogin.call(this);
    const userHasThisApp = UserApps.findOne({
      $and: [
        {userId: this.userId},
        {
          publicApps: {appId: appId}
        }
      ]
    });
    if (!userHasThisApp) {
      throw new Meteor.Error("User doesn't have this app.");
    }
  },

  /**
   * When a public app is updated, this method change every single record of the public app in the
   * UserApps collection.
   * @param {string} appId - Id of the to-be-updated app.
   * @param {string} appName - Name of the app.
   * @param {string} loginLink - login link of the app.
   * @param {string} registerLink - register link of the app.
   */
  updateUserApps(appId, appName, loginLink, registerLink) {
    checkAdmin.call(this);

    let ids = UserApps.find({"publicApps.appId": appId}).map(function (publicApp) {
      return publicApp.userId;
    });
    //console.log(ids);
    UserApps.update({
          $and: [
            {userId: {$in: ids}},
            {"publicApps.appId": appId}
          ]
        },
        {
          $set: {
            "publicApps.$.appName": appName,
            "publicApps.$.loginLink": loginLink,
            "publicApps.$.registerLink": registerLink,
          }
        },
        {multi: true}
    );
  },

  /**
   * When the Recommendation System done calculating the recommending results for a user, it calls
   * this method to insert the results.
   * @param {string} userId - the userId to be inserted.
   * @param {{appId: string, score: number}[]} recommendedApps - Id of the to-be-updated app.
   */
  addRecommendedApps(userId, recommendedApps){
    UserApps.find(
        {userId: userId},
        {
          $set: {
            recommendedApps: recommendedApps
          }
        }
    )
  },

});