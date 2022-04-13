function DeleteGoogleDriveArchiveData() {

  const ACCEPT_MIN_FREE_SPACE = 10 //(GB)
  const LEAVE_FILE_COUNT = 5 //保存するファイル数　更新日時が最新に近いもの
  const DELETE_TARGET_FOLDER = "" //　フォルダID

  var storageLimit = DriveApp.getStorageLimit() / 1024 / 1024 / 1024;
  var storageUsed = DriveApp.getStorageUsed() / 1024 / 1024 / 1024;
  var execTime = new Date();
  Logger.log('execute at: '+ Utilities.formatDate(execTime, 'Asia/Tokyo', 'yyyy/MM/dd hh:mm:ss')); 
  Logger.log("storageLimit: "+ storageLimit + "GB"); 
  Logger.log("storageUsed: "+ Math.round( storageUsed ) + "GB"); 

  if (storageLimit - storageUsed < ACCEPT_MIN_FREE_SPACE){
    Logger.log('delete start'); 
    var target = DriveApp.getFolderById(DELETE_TARGET_FOLDER);
    var files = target.getFiles();
    var fileItems = [];
    while(files.hasNext()) {
      var file = files.next();
      var fileName = file.getName();
      var fileId = file.getId();
      fileItems.push({ id: fileId, name: fileName });
    }
    console.log("files: ")
    console.log(fileItems)

    for(var i = 0; i < LEAVE_FILE_COUNT; i++){
      fileItems.shift();
    }
    console.log("dlelete files: ")
    console.log(fileItems)

    for(var i in fileItems){
      var file = DriveApp.getFileById(fileItems[i].id)
      file.setTrashed(true)
    }

    console.log("file deleted")
  }
}
