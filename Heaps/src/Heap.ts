class MaxHeap {
  private heap: number[] = [];
  private size: number;

  constructor() {
    this.heap = [];
    this.size = 0;
  }

  insert(value: number) {
    this.heap.push(value);
    this.size++;
    this.bubbleUp();
  }

  private bubbleUp(): void {
    let index = this.size - 1;
    while (index > 0 && this.heap[index] > this.heap[this.parent(index)]) {
      this.swap(index, this.parent(index));
      index = this.parent(index);
    }
  }

  private parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private swap(first: number, second: number): void {
    [this.heap[first], this.heap[second]] = [
      this.heap[second],
      this.heap[first],
    ];
  }

  printHeap(): void {
    console.log(this.heap);
  }
}

const heap = new MaxHeap();

heap.insert(15);
heap.insert(10);
heap.insert(1);
heap.insert(24);
heap.printHeap();
