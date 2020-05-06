import Toast from './Toast.vue'

const obj = {};
obj.install = function(Vue) {
    // 组件构造器
    // console.log('***')
    const toastContrustor = Vue.extend(Toast);
    // new 的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastContrustor();
    // 将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'));
    // toast.$el对应的就是div
    document.body.appendChild(toast.$el);
    // 在Vue原型上添加一个属性
    //错误代码
    // Vue.prototype.$toast = Toast;
     Vue.prototype.$toast = toast;
}

export default obj

// 构造组件
// const HelloWorldConstructor = Vue.extend(HelloWorld);
// export default {

//     install(Vue,opt){
//         Vue.prototype.$component = function(options = {}) {

//             let parentNode = document.createElement("div");
//             let instance = new ToastConstructor().$mount(parentNode);

//             document.body.appendChild(instance.$el); // 动态插入

//             return instance;
//     }
//     }
// }