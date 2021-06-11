---
title: JavaScript实现单例模式
date: 2021-06-11 21:29:06
tags:
- JavaScript
- 设计模式
- 单例模式
categories:
- 设计模式
---
我前司的后端老大哥，看见一个面试者就让人先手写个单例。
<!-- more -->
## 单例
简单的点讲就是一个类仅提供一个实例，该供全局使用。
## 单例解决的问题
一个全局使用的类频繁地创建与销毁。
## JavaScript实现单例
```JavaScript
class Singleton {
    static getInstance() {
        if (!this.instance) {
            this.instance = new Singleton();
        }
        return this.instance;
    }
}

console.log(Singleton.getInstance() === Singleton.getInstance()); // true
```
在上面的代码可以看出，区别于正常的类创建实例，单例模式实例的创建是在类的内部实现的，而且构造函数是不提供给外部使用的。
## 延时构建
研究单例到这里，你会不会有这样的想法，为什么不直接用一个*对象(Object)*来表示单例呢，这样用起来不是简单又大方？
这就引出了单例的一个重要的特征就是延时构建。
当我们用对象来实现一个单例的时候，在它初始化的时候就会被添加到上下文环境，而**占用内存资源**，而通过单例生成的对象知道使用静态类的时候才会使用资源。
## 其他语言中的单例
为什么要提其他语言中的单例呢，因为JavaScript区别于其他大多数语言的地方是JavaScript是**单线程**的。
多线程中资源是不共享的，所以在多线程的语言中，往往可以通过加**锁**实现单例。
## 通过静态变量构建
静态变量在线程之间是共享的，所以其他语言也可以通过静态变量实现单例。
```JavaScript
class Singleton {

    static instance = new Singleton();

    static getInstance() {
        return this.instance;
    }
}

console.log(Singleton.getInstance() === Singleton.getInstance()); // true
```
但是这段代码又没有实现**构建延迟**，所以我们通过下面的方法实现一下构建延迟，JavaScript中的class没有私有类的概念，所以下面的代码为伪代码，仅作为理解其他语言的参考。
```JavaScript
class Singleton {

    static getInstance() {
        return Nested.instance;
    }

    class Nested {
        static instance = new Singleton();
    }
}
```
## 结语
可是你在工作中经常单例吗。
