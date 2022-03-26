const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    this._root = addToTree(this._root, data);

    function addToTree(treeElement, data) {
      if (!treeElement) {
        return new Node(data);
      }

      if (data < treeElement.data) {
        treeElement.left = addToTree(treeElement.left, data);
      }
      if (data > treeElement.data) {
        treeElement.right = addToTree(treeElement.right, data);
      }

      return treeElement;
    }
  }

  has(data) {
    return searchTreeElement(this._root, data);

    function searchTreeElement(treeElement, data) {
      if (!treeElement) {
        return false;
      }

      if (treeElement.data === data) {
        return true;
      }

      if (data < treeElement.data) {
        return searchTreeElement(treeElement.left, data);
      } else {
        return searchTreeElement(treeElement.right, data);
      }
    }
  }

  find(data) {
    return findTreeElement(this._root, data);

    function findTreeElement(treeElement, data) {
      if (!treeElement) {
        return null;
      }

      if (treeElement.data === data) {
        return treeElement;
      }

      if (data < treeElement.data) {
        return findTreeElement(treeElement.left, data);
      } else {
        return findTreeElement(treeElement.right, data);
      }
    }
  }

  remove(data) {
    return removeTreeElement(this._root, data);

    function removeTreeElement(treeElement, data) {
      if (!treeElement) {
        return null;
      }

      if (data < treeElement.data) {
        treeElement.left = removeTreeElement(treeElement.left, data);
      }

      if (data > treeElement.data) {
        treeElement.right = removeTreeElement(treeElement.right, data);
      }

      if (treeElement.data === data) {
        if (!treeElement.left && !treeElement.right) {
          return null;
        }

        if (!treeElement.left) {
          treeElement = treeElement.right;
          return treeElement;
        }

        if (!treeElement.right) {
          treeElement = treeElement.left;
          return treeElement;
        }

        let minElementFromRight = treeElement.right;
        while (minElementFromRight.left) {
          minElementFromRight = minElementFromRight.left;
        }
        treeElement.data = minElementFromRight.data;

        treeElement.right = removeTreeElement(
          treeElement.right,
          minElementFromRight.data,
        );
      }
      return treeElement;
    }
  }

  min() {
    return findMinTreeElement(this._root);

    function findMinTreeElement(treeElement) {
      while (treeElement.left) {
        return findMinTreeElement(treeElement.left);
      }
      return treeElement.data;
    }
  }

  max() {
    return findMaxTreeElement(this._root);

    function findMaxTreeElement(treeElement) {
      while (treeElement.right) {
        return findMaxTreeElement(treeElement.right);
      }
      return treeElement.data;
    }
  }

  leftTraverse(cb) {
    doLeft(this._root, cb);

    function doLeft(node, cb) {
      if (node) {
        doLeft(node.left, cb);
        cb(node);
        doLeft(node.right, cb);
      }
    }
  }
}

module.exports = {
  BinarySearchTree,
};
