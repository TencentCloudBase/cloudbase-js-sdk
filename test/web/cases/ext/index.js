// function
import { register } from '../../util';

const readFile = async function(file) {
  let reader = new FileReader();

  let res = await new Promise(resolve => {
    reader.onload = function(e) {
      let arrayBuffer = new Uint8Array(e.target.result);
      resolve(arrayBuffer);
    };

    reader.readAsArrayBuffer(file);
  });

  return res;

};

export function test_ext_ci(app) {

  register('ci WaterMark', async () => {
    const ops = {
      rules: [{
        fileid: 'qr443.jpg',
        // rule: 'QRcode/cover/0',
        // rule: 'style/test_style'
        rule: {
          mode: 3,
          type: 3,
          text: '12345',
          // image:'ab.png'
        }
      }]
    };

    let file = document.getElementById('selectFile').files[0];

    let fileContent = await readFile(file);

    const res = await app.invokeExtension('CloudInfinite', {
      action: 'WaterMark',
      cloudPath: 'nv_big_fe2.jpg',
      fileContent,
      operations: ops
    });

    console.log(JSON.stringify(res, null, 4));
  });

  register('ci ImageProcess', async () => {

    const ops = {
      rules: [{
        // rule: 'QRcode/cover/0'
        fileid: 'qr40.jpg',
        rule: 'style/test_style'
      }]
    };

    const res = await app.invokeExtension('CloudInfinite', {
      cloudPath: 'nv_big.jpg',
      action: 'ImageProcess',
      operations: ops
    });

    console.log(JSON.stringify(res, null, 4));
  });

  register('ci DetectLabel', async () => {
    const res = await app.invokeExtension('CloudInfinite', {
      action: 'DetectLabel',
      cloudPath: 'ab.png'
    });

    console.log(JSON.stringify(res, null, 4));
  });

  register('ci DetectType', async () => {
    const res = await app.invokeExtension('CloudInfinite', {
      action: 'DetectType',
      operations: { type: 'ads' },
      cloudPath: 'ab.png'
    });

    console.log(JSON.stringify(res, null, 4));
  });
}