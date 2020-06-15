## @cloudbase/js-sdk
云开发 Cloudbase JavaScript SDK。

### 安装使用
@cloudbase/js-sdk分为两种形式：
1. 全量-包含所有云开发功能API；
2. 分模块-各功能拆分为细粒度的模块单独提供服务。

#### 包管理器
```bash
# npm
npm install @cloudbase/js-sdk -S
# yarn
yarn add @cloudbase/js-sdk
```

引入时可选择全量引入：
```javascript
import cloudbase from '@cloudbase/js-sdk';
```

或者按需分模块引入：
```javascript
// 内核
import cloudbase from '@cloudbase/js-sdk/app';
// 登录模块
import cloudbase from '@cloudbase/js-sdk/auth';
// 函数模块
import cloudbase from '@cloudbase/js-sdk/functions';
// 云存储模块
import cloudbase from '@cloudbase/js-sdk/storage';
// 数据库模块
import cloudbase from '@cloudbase/js-sdk/database';
```

#### CDN引入
1. 引入全量js文件
    ```html
    <!-- 全量js文件 -->
    <script src="/cloudbase.full.js"></script>
    ```

2. 分模块引入
    ```html
    <!-- 主js文件 -->
    <script src="/cloudbase.js"></script>
    <!-- 登录模块 -->
    <script src="/cloudbase.auth.js"></script>
    <!-- 函数模块 -->
    <script src="/cloudbase.functions.js"></script>
    <!-- 云存储模块 -->
    <script src="/cloudbase.storage.js"></script>
    <!-- 数据库模块 -->
    <script src="/cloudbase.database.js"></script>
    ```

### 构建
构建分为两部分：
1. 构建npm包，产出文件分属于各模块子目录；
2. 构建CDN托管的js文件，产出文件存放于`cdnjs`目录，按版本划分

```bash
npm run build
```
