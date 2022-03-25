const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {

	constructor () {
		this._queue = null;
	}

  getUnderlyingList() {
    return this._queue;
  }

  enqueue(value) {
    if (this._queue) {
			let current = this._queue;
			while(current.next) {
				current = current.next;
			}
			current.next = new ListNode(value);
		} else {
			this._queue = new ListNode(value);
		}
		return value;
  }

  dequeue() {
		const current = this._queue
    this._queue = this._queue.next;
		return current.value;
  }
}

module.exports = {
  Queue
};
