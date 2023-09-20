class Node {
    constructor(d) {
        this.data = d;
        this.left = null;
        this.right = null;
    }
}



class Tree {
    constructor(arr) {
        this.root = null;
        function sortArray(arr) {
            const sorted = arr.sort((a, b) => a - b);
            return sorted;
          }
        const sortedArr = sortArray(arr);
        console.log(sortedArr);
        this.root = this.buildTree(sortedArr);
    }

    buildTree(sortedArr, start = 0, end = sortedArr.length - 1) {
        if(start > end) {
            return null;
        } 
        const mid = parseInt((start + end) / 2);
        const root = new Node(sortedArr[mid]);
        root.left = this.buildTree(sortedArr, start, mid-1);
        root.right = this.buildTree(sortedArr, mid + 1, end);
        return root;
    }

    insert(data,root = this.root) {
      if (root === null) {
        root = new Node(data);
        return root;
      }
      if (data < root.data) {
        root.left = this.insert(data, root.left);
      }
      else if (data > root.data) {
        root.right = this.insert(data, root.right);
      }
      return root;
    }

    delete(d, root = this.root) {
      if (root === null) {
        return root;
      }
      if (root.data > d ){
        root.left = this.delete(d, root.left);
      }
      else if (root.data < d) {
        root.right = this.delete(d, root.right);
      }

      else {
      if (root.left === null) {
        return root.right;
      }
      else if (root.right === null) {
        return root.left;
      }
        let minv = root.right.data;
        while (root.left !== null) {
          minv = root.left.data;
          root = root.left;
        }
        root.data = this.minv;
        root.right = this.delete(d, root.right);
      }
        return root;
    }

    find(value, root = this.root) {
      const node = root;
      if (node === null) {
        return null;
      }
        if (node.data !== value) {
          if(node.data < value) {
            this.find(value, node.right);
          }
          else{
            this.find(value, node.left);
          }
        }
        return node;
    }

    levelOrder(func = this.makeArray) {
      this.levelOrderT = [];
      if(this.root === null) return;
      const queue = [];
      queue.push(this.root);
      while (queue.length > 0) {
        const node = queue[0];
        func(this.levelOrderT, node.data);
        if (node.left !== null) queue.push(node.left);
        if (node.right !== null) queue.push(node.right);
        queue.shift();
      }
      return this.levelOrderT

    }

    makeArray(arr, value) {
      arr.push(value);
    }

    preorder(root = this.root) {
      if (root===null) return;
      console.log(root.data);
      this.preorder(root.left);
      this.preorder(root.right);
    }
    
    inorder(node = this.root) {
      if (node===null) return;
      this.preorder(node.left);
      console.log(node.data);
      this.preorder(node.right);
    }

    postorder(node = this.root) {
      if (node===null) return;
      this.preorder(node.left);
      this.preorder(node.right);
      console.log(node.data);
    }

    height(root = this.root) {
      if (root===null) return 0;

      const lHeight = this.height(root.left);
      const rHeight = this.height(root.right);
      return Math.max(lHeight, rHeight) + 1;
    }

    depth(data, node = this.root, edges = 0) {
      if (node === null) return;
      if (node.data === data) return edges;

      if(node.data < data){
        return this.depth(data, node.right, edges+1);
      }
      else{
        return this.depth(data, node.left, edges+1);
      }
    }

    isBalanced(root = this.root){
      const lHeight = this.height(root.left);
      const rHeight = this.height(root.right);
      const diff = Math.abs(lHeight - rHeight);
      if (diff < 2) {
        return true;
      }
      else {
        return false;
      }
    }
    
    rebalance(root = this.root) {
      root = this.levelOrder();
      root.sort((a,b) => a - b);
      return this.root = this.buildTree(root);
    }

}

prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

let a  = new Tree([1, 7, 23, 8, 9, 4, 3, 5, 67, 6345, 324]);
prettyPrint(a.root);
a.insert(50);
prettyPrint(a.root);
a.delete(50);
prettyPrint(a.root);
a.delete(9);
prettyPrint(a.root);
console.log(a.levelOrder());
a.preorder(a.root);
//a.inorder(a.root);
//a.postorder(a.root);
console.log('height');
console.log(a.height(a.root));
console.log(a.depth(4,a.root));
console.log('isbalanced');
console.log(a.isBalanced());
console.log('rebalance');
console.log(a.rebalance())