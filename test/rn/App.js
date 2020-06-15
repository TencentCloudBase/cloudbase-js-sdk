// import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
// import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import {
  SafeAreaView,
  ScrollView,
  Alert,
  Button,
  StatusBar,
} from 'react-native';
// import cloudbase from '@cloudbase/js-sdk';
import cloudbase from '@cloudbase/app';
import { registerAuth } from '@cloudbase/auth';
import { registerFunctions } from '@cloudbase/functions';
import { registerStorage } from '@cloudbase/storage';
import { registerDatabase } from '@cloudbase/js-sdk/database';
import adapter from 'cloudbase-adapter-rn';

cloudbase.registerVersion('0.1.0');

registerAuth(cloudbase);
registerFunctions(cloudbase);
registerStorage(cloudbase);
registerDatabase(cloudbase)

cloudbase.useAdapters(adapter);

const app = cloudbase.init({
  env: 'env-c3f98a',
  appSign: 'wxdb72116cdc015c72',
  appSecret: {
    appAccessKeyId: '1',
    appAccessKey: '18e07c1d27d1313356f5b894cda05878'
  }
});

const auth = app.auth();
const db = app.database();
const coll = db.collection('test');
const docId = '35292f37-ffa6-42dd-8013-47d877d30022';
export default class App extends Component{
  async _login(){
    await auth.anonymousAuthProvider().signIn();
    await this.checkLogin();
  }
  async logout(){
    await auth.signOut()
    await this.checkLogin();
  }
  async checkLogin(){
    const state = await auth.hasLoginState();
    console.log(state)
  }
  async _callFunction(){
    const res = await app.callFunction({
      name: 'test',
      data: {
        a: 1,
        b: 2
      }
    })
    console.log(res)
  }
  async _uploadFile(){
    // Alert.alert('_uploadFile')
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const response = await new Promise(resolve=>{
      ImagePicker.showImagePicker(options,res=>{
        resolve(res);
      })
    });
    console.log('Response = ', response);
    const filePath = response.uri;
    if(!filePath){
      console.error('must select a file');
      return;
    }
    const res = await app.uploadFile({
      filePath: response,
      cloudPath: `test_${Date.now()}.jpg`,
      onUploadProgress(per){
        console.log(per)
      }
    })
    console.log(res)
  }
  async _downloadFile(){
    // Alert.alert('_downloadFile')
    const res = await app.downloadFile({
      fileID: 'cloud://env-c3f98a.656e-env-c3f98a-1255870925/test_1591606879002.jpg'
    })
    console.log(res)
  }
  async _getTempFileURL(){
    // Alert.alert('_getTmpFilePath')
    const res = await app.getTempFileURL({
      fileList: [{
        fileID: 'cloud://env-c3f98a.656e-env-c3f98a-1255870925/test_1591606879002.jpg',
        maxAge: 3000
      },{
        fileID: 'cloud://env-c3f98a.656e-env-c3f98a-1255870925/test_1591605774510.jpg',
        maxAge: 3000
      }]
    })
    console.log(res)
  }
  async _deleteFile(){
    const res = await app.deleteFile({
      fileList: [
        'cloud://env-c3f98a.656e-env-c3f98a-1255870925/test_1591606757869.jpg'
      ]
    })
    console.log(res)
  }
  async _readDb(){
    // Alert.alert('_readDb')
    const res = await coll.doc(docId).get();
    console.log(res)
  }
  async _writeDb(){
    // Alert.alert('_writeDb')
    const res = await coll.add({
      age: 18,
      name: 'sdfds'
    });
    console.log(res)
  }
  _realtimeDb(){
    // Alert.alert('_realtimeDb')
    const _ = db.command
    this.watcher = coll.where({
      age: _.gt(18)
    }).watch({
      onChange: function(snapshot) {
        console.log('snapshot', snapshot)
      },
      onError: function(err) {
        console.error('the watch closed because of error', err)
      }
    })
  }
  render(){
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic">
            <Button title="匿名登录"
              color='red'
              onPress={this._login.bind(this)}/>
            <Button title="检测登录状态"
              color='red'
              onPress={this.checkLogin.bind(this)}/>
            <Button title="登出"
              color='red'
              onPress={this.logout.bind(this)}/>
            <Button title="callFunction"
              color='red'
              onPress={this._callFunction.bind(this)}/>
            <Button title="uploadFile"
              color='red'
              onPress={this._uploadFile.bind(this)}/>
            <Button title="downloadFile"
              color='red'
              onPress={this._downloadFile.bind(this)}/>
            <Button title="getTempFileURL"
              color='red'
              onPress={this._getTempFileURL.bind(this)}/>
            <Button title="deleteFile"
              color='red'
              onPress={this._deleteFile.bind(this)}/>
            <Button title="DB:read"
              color='red'
              onPress={this._readDb.bind(this)}/>
            <Button title="DB:write"
              color='red'
              onPress={this._writeDb.bind(this)}/>
            <Button title="DB:realtime"
              color='red'
              onPress={this._realtimeDb.bind(this)}/>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
};
