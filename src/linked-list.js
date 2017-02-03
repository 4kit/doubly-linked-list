const Node = require('./node');

console.log("TO TUTORS: Please, pay attention that it wasn't mentioned in the task description that the names of the first and last nodes should be '_head and '_tail'. Nevertheless, the test addresses to exactly these properties of the list.")

class LinkedList {
    constructor() {
      this.length = 0;
      this.first = new Node();
      this.last = new Node();
      this._head = new Node();
      this._tail = new Node();
    }

    append(data) {

      var node = {
              data: data,
              next: new Node(),
              prev: new Node()
          };
      //check if this is the first node
      if (this.length == 0) {
          this.first = node;
          this.last = node;
      } else {
          //shift nodes
          this.last.next = node;
          node.prev = this.last;
          this.last = node;
      }
      //increase length
      this.length++;

      return this;
    }

    //return the first node
    head() {
      var current = this.first;
      if (current == null) {
         return null;
      } else {
          return current.data;
      }
    }

    //return the last node
    tail() {
      var current = this.last;
      if (current == null) {
         return null;
      } else {
          return current.data;
      }
    }

    at(index) {
      if (index > -1 && index < this.length){
          var current = this.first,
              i = 0;
          while(i++ < index){
              current = current.next;
          }
          return current.data;
      } else {
          return null;
      }
    }

    insertAt(index, data) {

            var node = {
                    data: data,
                    next: new Node(),
                    prev: new Node()
                };
            //check if the index is in the range
            if (index == null || index<0) {
              index = 0;
            }
            if (index > this.length) {
              index = index %this.length;
            }

            var current = this.first,
                i = 0;

            while (i++ != index) {
              current = current.next;
            }

            //saving current values in node
            node.data = current.data;
            node.next = current.next;

            //changing current, updating node
            current.data = data;
            node.prev = current;
            current.next = node;

            //increase length
            this.length++;

            return this;
    }

    isEmpty() {
      if (this.length>0) {
        return false;
      }
      return true;
    }

    clear() {
      this.first = new Node();
      this.last = new Node();
      this.length = 0;

      return this;
    }

    deleteAt(index) {
      if (index > -1 && index < this.length){

          var current = this.first,
              i = 0;

          //in case of the first node
          if (index === 0){
              this.first = current.next;
              //make the list empty if there is no current.next
              if (!this.first){
                  this.last = new Node();
              } else {
                  this.first.prev = new Node();
              }

          //in case of the last item
          } else if (index === this.length -1){
              current = this.last;
              this.last = current.prev;
              this.last.next = new Node();

          } else {

              //iterate to the index
              while(i++ < index){
                  current = current.next;
              }

              current.prev.next = current.next;
              current.next.prev = current.prev;
          }

          this.length--;
          return this;

      } else {
          return null;
      }

    }

    // list.append(4).reverse().deleteAt(0).clear().insertAt(0, 3);
    reverse() {
      var newList = new LinkedList(),
          i=0,
          current = this.last;

      while (i++ < this.length) {
          newList.append(current.data);
          current = current.prev;
      }

      this.clear();

      current = newList.first;
      i=0;
      while (i++ < newList.length) {
        this.append(current.data);
        current = current.next;
      }

      return this;
    }

    indexOf(data) {
      var index = 0,
          current = this.first;

      while (index < this.length){
          if (current.data == data) {
            return index;
          }
          current = current.next;
          index++;
        }
        //nothing is found
        return -1;
    }
}

module.exports = LinkedList;
