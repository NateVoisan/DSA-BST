'use strict';

class BinarySearchTree {
    constructor(key = null, value = null, parent = nul) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        if (this.key === null) {
            this.key = key;
            this.value = value;
        } else if (key < this.key) {
            if (this.left === null) {
                this.left = new BinarySearchTree(key, value, this);
            } else {
                this.left.insert(key, value);
            }
        }
        else {
            if (this.right === null) {
                this.right = new BinarySearchTree(key, value, this);
            } else {
                this.right.insert(key, value);
            }
        }
    }

    find(key) {
        if (this.key === key) {
            return this.value;
        } else if (key < this.key && this.left) {
            return this.left.find(key);
        } else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    remove(key) {
        if (this.key === key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remomve(successor.key);
            } else if (this.left) {
                this._replaceWith(this.left);
            } else if (this.right) {
                this._replaceWith(this.right);
            } else {
                this._replaceWith(null);
            }
        } else if (key < this.key && this.left) {
            this.left.remove(key);
        } else if (key > this.key && this.right) {
            this.right.remove(key);
        } else {
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this === this.parent.left) {
                this.parent.left = node;
            } else if (this === this.parent.right) {
                this.parent.right = node;
            }
            if (node) {
                node.parent = this.parent;
            }
        } else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            } else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}

function tree(t) {
    if (!t) {
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right);
}

function heightOfBST(bst) {
    let leftHeight = 0;
    let rightHeight = 0;
    if (!bst) {
        return 0;
    } else {
        leftHeight = heightOfBST(bst.left);
        rightHeight = heightOfBST(bst.right);
        if (leftHeight > rightHeight) {
            return leftHeight + 1;
        } else {
            return rightHeight + 1;
        }
    }
}

function bst_height1(tree) {
    return (
        Math.max(
            tree.left && bst_height1(tree.left),
            tree.right && bst_height1(tree.right)
        ) + 1
    );
}

function bst_height2(tree) {
    if (tree.left && tree.right)
        return Math.max(bst_height2(tree.left), bst_height2(tree.right)) + 1;
    if (tree.left) return bst_height2(tree.left) + 1;
    if (tree.right) return bst_height2(tree.right) + 1;
    return 1;
}

function isBst(bst) {
    if (!bst.key) {
        return false;
    }
    if (bst.left) {
        if (bst.left.key > bst.key) {
            return false;
        } else {
            return isBst(bst.left);
        }
    }
    if (bst.right) {
        if (bst.right.key < bst.key) {
            return false;
        } else {
            return isBst(bst.right);
        }
    }
    if (bst.right && bst.left) {
        isBst(bst.right);
        isBst(bst.left);
    }
    if (!bst.right && !bst.left) {
        return true;
    }
}

function is_bst(tree, min, max) {
    if (min !== undefined && tree.key < min) return false;
    if (max !== undefined && tree.key > max) return false;
    if (tree.left && !is_bst(tree.left, min, tree.key)) return false;
    if (tree.right && !is_bst(tree.right, tree.key, max)) return false;
    return true;
}

function treeValues(bst) {
    let resultsString = '';
    if (!bst) {
        return '';
    } else {
        resultsString +=
            `${bst.value}_` + treeValues(bst.left) + treeValues(bst.right);
    }
    return resultsString;
}

function thirdLargest(str) {
    let results = [];
    let arr = str.split('_');
    for (let i = 0; i < arr.length - 1; i++) {
        results.push(arr[i]);
    }
    return results.sort()[results.length - 3];
}

function nth_largest(tree, state) {
    if (tree.right) {
        nth_largest(tree.right, state);
        if (state.result) return;
    }
    if (!--state.n) {
        state.result = tree.key;
        return;
    }
    if (tree.left) nth_largest(tree.left, state);
}

function third_largest(tree) {
    if (tree.key == null) return null;
    let state = { n: 3, result: null };
    nth_largest(tree, state);
    return state.result;
}

function balanced(bst) {
    let leftHeight = heightOfBST(bst.left);
    let rightHeight = heightOfBST(bst.right);
    if (Math.abs(rightHeight - leftHeight) <= 1) {
        return true;
    } else if (Math.abs(rightHeight - leftHeight) > 1) {
        return false;
    }
}

function isBalanced(tree) {
    if (!tree.left) {
        return !(tree.right && (tree.right.left || tree.right.right));
    }
    if (!tree.right) {
        return !(tree.left && (tree.left.left || tree.left.right));
    }
    return isBalanced(tree.left) && isBalanced(tree.right);
}

let arr1 = [3, 5, 4, 6, 1, 0, 2];
let arr2 = [3, 1, 5, 2, 4, 6, 0];

function sameBSTs(arr1, arr2) {
    if (arr1[0] !== arr2[0]) {
        return false;
    }
    if (arr1.length !== arr2.length) {
        return false;
    }
    if (arr1.length === 1 && arr2.length === 1) {
        return true;
    }
    let root = arr1[0];
    let leftArray1 = [];
    let rightArray1 = [];
    let leftArray2 = [];
    for (let i = 1; i < arr1.length; i++) {
        if (arr1[i] < root) {
            leftArray1.push(arr1[i]);
        } else if (arr1[i] > root) {
            rightArray1.push(arr1[i]);
        }
        if (arr2[i] < root) {
            leftArray2.push(arr2[i]);
        } else if (arr2[i] > root) {
            rightArray2.push(arr2[i]);
        }
    }
    return sameBSTs(leftArray1, leftArray2) && sameBSTs(rightArray1, rightArray2)
}

function main() {
    const BST = new BinarySearchTree();
    BST.insert(3, 3);
    BST.insert(1, 1);
    BST.insert(4, 4);
    BST.insert(6, 6);
    BST.insert(9, 9);
    BST.insert(2, 2);
    BST.insert(5, 5);
    BST.insert(7, 7);
    let Min = Number.MIN_VALUE;
    let Max = Number.MAX_VALUE;
    console.log(is_bst(tree, Min, Max));
    console.log(sameBSTs([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0]));
}

main();