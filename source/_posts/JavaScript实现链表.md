---
title: JavaScript实现链表
date: 2021-05-30 21:56:29
tags:
- 数组
- 数据结构
- 算法
- JavaScript
categories:
- 数据结构与算法
---
> 链表应该是面试时被提及最频繁的数据结构。
> - 《剑指Offer》
<!-- more -->
## 什么是链表
> **链表**是一种递归的数据结构，它或者为空（null），或者是含有范型元素的节点和指向另一条链表的引用。

这是《算法（第四版）》中链表的定义，可以说是晦涩难懂。大白讲就是递归无非就是你知道一个点才能知道下一个点，而每个点可能为空，可能为指向一个点或者指向空的点。
其中最简单的链表毫无疑问是单向链表，也是本篇文件所实现的数据结构。
### 单向链表的节点
单向链表的每个节点包含两个部分，当前存放的数据value和指向下一个节点的指针next。
```JavaScript
class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}
```
### 单向链表的实现
这里实现查找，增加和删除是通过节点的值来操作，有的链表的查找，增加和删除的实现是通过索引（index）实现，原理差不多，注意代码的鲁棒性即可，这里只是为了突出链表的特点，所以不再实现。
```JavaScript
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    find(value) {
        // 查找某个元素
        let currentNode = this.head;
        while(currentNode && currentNode.value !== value) {
            currentNode = currentNode.next;
        }

        return currentNode;
    }

    find(value) {
        // 查找某个元素
        let currentNode = this.head;
        while(currentNode && currentNode.value !== value) {
            currentNode = currentNode.next;
        }

        return currentNode;
    }

    append(value) {
        // 向链表尾部添加节点
        const node = new Node(value);
        if (!this.head) {
            // 链表为空时，头部添加
            this.head = node;
        } else {
            // 尾部添加
            this.tail.next = node;
        }

        this.tail = node;
        this.size++;
    }

    insert(prev, item) {
        // 插入节点
        const prevNode = this.find(prev);
        if (!prevNode) {
            return;
        }

        const node = new Node(item, prevNode.next);
        if (!node.next) {
            this.tail = node;
        }
        prevNode.next = node;
        this.size++;
    }

    remove(value) {
        const node = this.find(value);
        if (this.head === node) {
            // 删除头节点
            this.head = this.head.next;
            if (!this.head?.next) {
                this.tail = this.head;
            }
            return this.head;
        }

        let prev = this.head;
        while(prev?.next && prev?.next !== node) {
            prev = prev.next;
        }
        if (!prev?.next) {
            // 不存在需要删除的节点
            return;
        }
        prev.next = node.next;
        if (!prev.next) {
            this.tail = prev;
        }
        return node;
    }

    output() {
        // 打印节点
        let currentNode = this.head;
        while (currentNode) {
            console.log(currentNode.value);
            currentNode = currentNode.next;
        }
    }
}
```
## 为什么要用链表
* 因为定义链表不需要指定长度，所以链表的空间效率是要高于数组的。
* 链表的查找插入和删除的时间复杂度是不同于数组的。
* 写操作多，读操作少的情况下，链表优于数组。