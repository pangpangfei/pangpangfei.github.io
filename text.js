class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

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
        this.size += 1;

        return this;
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
        let currentNode = this.head;
        while (currentNode) {
            currentNode.value && console.log(currentNode.value);
            currentNode = currentNode.next;
        }
    }
}

var linkedList = new LinkedList();
// linkedList.append('1');
// console.log(linkedList.head);
// linkedList.append('2');
linkedList.insert('2', '5');
// linkedList.append('3');
//linkedList.remove('2');
// console.log(linkedList.append('4'));
linkedList.output();
