---
title: Zustand快速识别
date: 2023-08-15
tags:
    - React
categories:
    - React
---

### 什么是Zustand

##### 				`Zustand` 可以作为 React 应用中的一个状态管理器，跟`Vue`中的`Pinia`对标，基于 `Flux` 模型实现的小型、快速和可扩展的状态管理解决方案，拥有基于 `hooks` 的舒适的API。简单理解就是`React`先前的`Redux`状态管理较为繁琐，轻量简易化的`Zustand`近些年开始流行（真滴好用，强烈推荐），拿下拿下。

------

### Zustand的定义与更改

- ##### create：定义一个状态，供给全局消费

  ```typescript
  import {create} from 'zustand';
  import {immer} from 'zustand/middleware/immer';
  
  type State = {
    token: string;
  };
  
  type Actions = {
    setToken: (token: string) => void;
  };
  export const usePermissionsStore = create<State & Actions>()(
    immer(set => ({
      token: '',
      // 设置token
      setToken: async token => {
        set(pre => {
          pre.token = token;
        });
      },
    })),
  );
  
  export default usePermissionsStore;
  
  ```

- ##### set：更新和合并状态，将与存储中的现有状态进行浅合并

  ```typescript
  import {create} from 'zustand';
  import {immer} from 'zustand/middleware/immer';
  
  type State = {
    token: string;
  };
  
  type Actions = {
    setToken: (token: string) => void;
  };
  export const usePermissionsStore = create<State & Actions>()(
    immer(set => ({   //  set浅更新存储中的token
      token: '',
      setToken: async token => {
        set(pre => {
          pre.token = token;
        });
      },
    })),
  );
  
  export default usePermissionsStore;
  ```

- ##### get：异步获取当前state，set也可在更新中获取

  ```typescript
  import {create} from 'zustand';
  import {immer} from 'zustand/middleware/immer';
  
  type State = {
    token: string;
  };
  
  type Actions = {
    setToken: (token: string) => void;
  };
  export const usePermissionsStore = create<State & Actions>()(
    immer((set,get) => ({ 
      token: '',
       // 异步获取存储中的token  
      getToken: () => {
        console.log(get().token) 
      },
    })),
  );
  
  export default usePermissionsStore;
  ```


------

### Zustand的消费

##### 		所谓消费，其实就是使用和更改Zustand中的状态，但由于React的渲染机制，消费要“定性消费”即消费自己需要的，配合useShallow钩子实现多个状态选择的单一对象，浅比较。如果没有"理智消费"即会出现在该状态块中的任何一项出现变更时，重新渲染页面，导致性能问题。	

```tsx
 //  数组形式
const [setToken, setUserInfo] = usePermissionsStore(
    useShallow(state => {
      return [state.setToken, state.setUserInfo];
    }),
);

//  对象形式
const {setToken, setUserInfo} = usePermissionsStore(
    useShallow(state => {
      return ({setToken:state.setToken,setUserInfo:state.setUserInfo});
    }),
)

// Map形式, 当排序、数量和 key 发生变化后, 组件重新渲染
const treats = useBearStore((state) => Object.keys(state.treats), shallow)
```

##### 		当然也可以实现自定义比较方法

```typescript
const treats = useBearStore(
  (state) => state.treats,
  (oldTreats, newTreats) => compare(oldTreats, newTreats)   // compare 为自定义的比较方法 返回boolean
)
```

------

### Zustand的中间件

- ##### 持久化中间件(详见：[https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md](https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md))

  ```typescript
  import { create } from 'zustand'
  import { persist, createJSONStorage } from 'zustand/middleware'
  
  export const usePermissionsStore = create(
    persist(
      (set, get) => ({
        token: undefined,
      }),
      {
        name: 'token', // 唯一值
        storage: createJSONStorage(() => sessionStorage), // localStorage持久 sessionStorage 页面生命期
          // 清除持久化  usePermissionsStore.persist.clearStorage()
      },
    ),
  )
  ```

- ##### immer中间件：究极推荐，复杂数据类型的救星。在本文Zustand的定义和消费中有提及，往上翻。

- ##### redux中间件：如果写习惯了redux可以考虑使用

- ##### devtools中间件：利用开发者工具追踪和调试Store

- ##### 自定义中间件：随心所以，喜欢怎么来就怎么来,下面是封装了一个当状态改变就打印新值的中间件

  ```typescript
  const log = (config) => (set, get, api) =>
    config(
      (...args) => {
        console.log('  applying', args)
        set(...args)
        console.log('  new state', get())
      },
      get,
      api
    )
  
  const useBeeStore = create(
    log((set) => ({
      bees: false,
      setBees: (input) => set({ bees: input }),
    }))
  )
  ```

- ##### 中间件总结：使用过程中肯定会有疑惑多个中间件应该如何嵌套，这个问题由于文档在不停变化，需要根据实际情况考虑

------

### Zustand总结    

##### 		Zustand是一款轻量化的状态管理工具，配合中间件可以方便的实现对全局状态的管理，好用滴很。篇幅有限，详情移步官网。[https://awesomedevin.github.io/zustand-vue/docs/introduce/what-is-zustand](https://awesomedevin.github.io/zustand-vue/docs/introduce/what-is-zustand)

