var zenAppsStore = new FS.Store.GridFS("zenApps", {path:"~/zenApps"});

ZenApps = new FS.Collection("zenApps", {
  stores: [zenAppsStore]
});