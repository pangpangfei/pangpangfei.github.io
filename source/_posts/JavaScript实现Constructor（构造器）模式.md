---
title: JavaScript实现Constructor（构造器）模式
date: 2021-05-17 20:40:00
tags:
- JavaScript
- 设计模式
- 构造器模式
categories:
- 设计模式
---

> 在经典面向对象编程语言中，Constructor是一种在内存已分配给该对象的情况下，用于初始化新建对象的特殊方法。在JavaScript中，几乎所有的东西都是对象，我们通常最感兴趣的是object构造器。
> - 《JavaScript设计模式》
<!-- more -->
## 大白话讲什么是构造器模式
不论是在JavaScript，Java或是C#，亦或是其他面向对象语言中，都有个new操作符，当你new一个对象的时候，你就已经玩过了构造器模式。其作用就是创建一个给对象分配一块内存空间，并且创建该对象的属性和方法。
## JavaScript怎么使用构造器
### ES6之前
ES6之前的JavaScript不支持类的概念，但是可以通过new关键字将特殊的构造器函数实例化成一个对象。
```javascript
    function Person(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    
    Person.prototype.greeting = function() {
        return '你好！我叫' + this.name;
    }

    var lxw = new Person("刘希玮", 24, 0);
    var yxm = new Person("岳向淼", 25, 1);

    console.log(lxw.greeting());
    console.log(yxm.greeting());
```
### ES6
ES6 支持了类的定义。
```javascript
    class Person {
        constructor(name, age, gender) {
            this.name = name;
            this.age = age;
            this.gender = gender;
        }

        greeting() {
            return `你好！我叫${this.name}`;
        }
    }

    const lxw = new Person("刘希玮", 24, 0);
    const yxm = new Person("岳向淼", 25, 1);

    console.log(lxw.greeting());
    console.log(yxm.greeting());
```
## 为什么要用构造器
为啥？面向对象就完事了！
