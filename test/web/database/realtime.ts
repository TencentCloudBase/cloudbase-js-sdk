import * as assert from 'power-assert';
import { register, isSuccess } from '../util';

export function registerRealtime(app, collName) {
  const db = app.database();

  const _ = db.command;

  // collName = "coll-1"
  const collection = db.collection(collName);

  const nextEventNum = 2;

  let ref;

  // auth
  register('database realtime: data ready first', async () => {
    await collection.add({ test: 2 });
    await collection.add({ test: 4 });
    document.getElementById('mockAddDoc').onclick = async function() {
      // mock新增数据
      let calNum = nextEventNum;
      while (calNum--) {
        let res = await collection.add({ test: 10 });
        console.log(res);
        assert(res.id);
      }
    };
  });

  // 关闭监听
  register('database realtime: close watch', async () => {
    ref && ref.close();
  });

  // 测试doc().watch()
  register('database realtime: one doc watch', async () => {
    const res = await collection.get();
    const watchDocId = res.data[0]._id;
    collection.doc(watchDocId).watch({
      onChange: snapshot => {
        console.log('收到single doc snapshot**********', snapshot);
        assert(isSuccess(0, snapshot) && snapshot.docs.length, { snapshot });

        collection.doc(watchDocId).update({
          test: 20
        });
      },
      onError: error => {
        console.log('收到single doc error**********', error);
      }
    });
  });

  // 多个监听
  register('database realtime: one watch init', () => {
    // const collection = db.collection(collName)
    let watchNum = 100;
    const calWatchNum = 100;
    let initOkNum = 0;
    let nextOkObj = {};

    // 开启多个监听 测试所有监听是否收到initevent 及 nextevent
    while (watchNum--) {
      nextOkObj[watchNum] = 0;
      /* eslint-disable */
      (function(watchNum) {
        collection.where({ test: _.gt(0) }).watch({
          onChange: snapshot => {
            if (snapshot.msgType === 'INIT_EVENT') {
              assert(snapshot.docChanges.length > 0);

              // console.log(`收到init snapshot${watchNum}**********`, snapshot)

              if (++initOkNum === calWatchNum) {
                console.log('init snapshot all receive');
              }
              // 生成nextevent

              // collection.add({ test: 2 })
            }

            if (snapshot.msgType === 'NEXT_EVENT') {
              nextOkObj[watchNum]++;

              if (nextOkObj[watchNum] === nextEventNum) {
                console.log('next snapshot all receive');
              }

              assert(snapshot.docChanges.length > 0);
              // console.log(`收到next snapshot${watchNum}**********`, snapshot)
            }
          },
          onError: error => {
            console.log('收到error1**********', error);
          }
        });
      })(watchNum);
    }
  });
}
