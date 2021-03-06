/*******************************************************************************
 * Copyright (C) 2015-2016 Octokey Inc.
 *
 * Creator: Chen Li<yichen.li0830@gmail.com>
 * Creation Date: 2015-12-31
 *
 * it declares methods for ZenCatagories collection.
 *******************************************************************************/
Meteor.methods({
  /*    getAllCategories(){
   console.log("getAllCategories gets called");
   localSimulateLatency(800);
   //if (this.userId) {
   const result = ZenCategories.find({},{sort: {index: 1}}).fetch();
   //console.log("result",result);
   return result;
   //}
   },*/

  addNewCategory(name, displayTitleChinese, displayTitleEnglish, index){
    localSimulateLatency(500);

    checkAdmin.call(this);
    ZenCategories.insert({
      name: name,
      displayTitleChinese: displayTitleChinese,
      displayTitleEnglish: displayTitleEnglish,
      clickCount: 0,
      index: Number(index),
      createdAt: new Date()
    });
  },

  removeCategory(categoryId){
    localSimulateLatency(500);

    checkAdmin.call(this);
    ZenCategories.remove({_id: categoryId});
  }
});

