/**
 * Circular Queue Management System - Web UI
 * Mirrors the exact logic of the C implementation
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n) where n is MAX_SIZE
 */

class CircularQueue {
    constructor(maxSize = 10) {
        this.MAX_SIZE = maxSize;
        this.items = new Array(maxSize).fill(null);
        this.front = -1;
        this.rear = -1;
        this.count = 0;
    }

    /**
     * Initialize an empty circular queue
     * Time Complexity: O(1)
     */
    initQueue() {
        this.front = -1;
        this.rear = -1;
        this.count = 0;
        this.items.fill(null);
    }

    /**
     * Check if the queue is empty
     * Time Complexity: O(1)
     */
    isEmpty() {
        return this.count === 0;
    }

    /**
     * Check if the queue is full
     * Time Complexity: O(1)
     */
    isFull() {
        return this.count === this.MAX_SIZE;
    }

    /**
     * Add an element to the rear of the queue
     * Uses modulo arithmetic: (rear + 1) % MAX_SIZE
     * Time Complexity: O(1)
     */
    enqueue(value) {
        // Check for queue overflow
        if (this.isFull()) {
            return { success: false, error: "Queue Overflow! Cannot enqueue " + value };
        }

        // Handle first element case
        if (this.front === -1) {
            this.front = 0;
        }

        // Move rear pointer circularly using modulo arithmetic
        this.rear = (this.rear + 1) % this.MAX_SIZE;

        // Store the value
        this.items[this.rear] = value;
        this.count++;

        return { success: true, value: value };
    }

    /**
     * Remove and return the front element
     * Uses modulo arithmetic: (front + 1) % MAX_SIZE
     * Time Complexity: O(1)
     */
    dequeue() {
        // Check for queue underflow
        if (this.isEmpty()) {
            return { success: false, error: "Queue Underflow! Cannot dequeue" };
        }

        // Get the value to be dequeued
        const value = this.items[this.front];

        // Handle last element case
        if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
        } else {
            // Move front pointer circularly using modulo arithmetic
            this.front = (this.front + 1) % this.MAX_SIZE;
        }

        this.count--;
        this.items[this.front === -1 ? this.rear : (this.front - 1 + this.MAX_SIZE) % this.MAX_SIZE] = null;

        return { success: true, value: value };
    }

    /**
     * Peek at the front element without removing it
     * Time Complexity: O(1)
     */
    peek() {
        // Check if queue is empty
        if (this.isEmpty()) {
            return { success: false, error: "Queue is empty! Cannot peek" };
        }

        // Get the front value without removing it
        const value = this.items[this.front];
        return { success: true, value: value };
    }

    /**
     * Get all elements in order from front to rear
     * Time Complexity: O(n) where n is current count
     */
    getQueueElements() {
        if (this.isEmpty()) {
            return [];
        }

        const elements = [];
        let i = this.front;
        let elementsCollected = 0;

        // Traverse from front to rear circularly
        while (elementsCollected < this.count) {
            elements.push({
                index: i,
                value: this.items[i],
                isFront: i === this.front,
                isRear: i === this.rear
            });
            i = (i + 1) % this.MAX_SIZE;  // Move to next element circularly
            elementsCollected++;
        }

        return elements;
    }
}

// UI Controller Class
class QueueUIController {
    constructor() {
        this.queue = new CircularQueue(10);
        this.customerCounter = 1;
        this.initializeEventListeners();
        this.initializeQueueDisplay();
        this.addLog("System initialized successfully", "info");
        this.updateUI();
    }

    initializeEventListeners() {
        // Button event listeners
        document.getElementById('enqueue-btn').addEventListener('click', () => this.handleEnqueue());
        document.getElementById('dequeue-btn').addEventListener('click', () => this.handleDequeue());
        document.getElementById('peek-btn').addEventListener('click', () => this.handlePeek());
        document.getElementById('clear-btn').addEventListener('click', () => this.handleClear());
        document.getElementById('check-empty-btn').addEventListener('click', () => this.handleCheckEmpty());
        document.getElementById('check-full-btn').addEventListener('click', () => this.handleCheckFull());
        document.getElementById('clear-logs-btn').addEventListener('click', () => this.clearLogs());

        // Modal event listeners
        document.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        document.querySelector('.modal-ok').addEventListener('click', () => this.closeModal());
        document.getElementById('message-modal').addEventListener('click', (e) => {
            if (e.target.id === 'message-modal') this.closeModal();
        });

        // Enter key support for input
        document.getElementById('customer-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleEnqueue();
        });
    }

    initializeQueueDisplay() {
        const queueArray = document.getElementById('queue-array');
        queueArray.innerHTML = '';

        for (let i = 0; i < this.queue.MAX_SIZE; i++) {
            const slot = document.createElement('div');
            slot.className = 'queue-slot empty';
            slot.id = `slot-${i}`;
            
            const slotIndex = document.createElement('div');
            slotIndex.className = 'slot-index';
            slotIndex.textContent = i;
            
            const slotValue = document.createElement('div');
            slotValue.className = 'slot-value';
            slotValue.textContent = '';
            
            slot.appendChild(slotIndex);
            slot.appendChild(slotValue);
            queueArray.appendChild(slot);
        }
    }

    handleEnqueue() {
        const input = document.getElementById('customer-input');
        const value = input.value.trim();

        if (!value) {
            this.showModal('Input Error', 'Please enter a customer number');
            return;
        }

        const customerValue = parseInt(value);
        if (isNaN(customerValue) || customerValue < 1 || customerValue > 999) {
            this.showModal('Input Error', 'Please enter a valid customer number (1-999)');
            return;
        }

        const result = this.queue.enqueue(customerValue);
        
        if (result.success) {
            this.addLog(`Enqueued: Customer #${result.value}`, "success");
            this.animateEnqueue(result.value);
        } else {
            this.addLog(`Error: ${result.error}`, "error");
            this.showModal('Queue Overflow', result.error);
        }

        input.value = '';
        this.updateUI();
    }

    handleDequeue() {
        const result = this.queue.dequeue();
        
        if (result.success) {
            this.addLog(`Dequeued: Customer #${result.value}`, "success");
            this.animateDequeue(result.value);
        } else {
            this.addLog(`Error: ${result.error}`, "error");
            this.showModal('Queue Underflow', result.error);
        }

        this.updateUI();
    }

    handlePeek() {
        const result = this.queue.peek();
        
        if (result.success) {
            this.addLog(`Front element: Customer #${result.value}`, "info");
            this.showModal('Peek Result', `Front element: Customer #${result.value}`);
        } else {
            this.addLog(`Error: ${result.error}`, "warning");
            this.showModal('Queue Empty', result.error);
        }
    }

    handleClear() {
        const elements = this.queue.getQueueElements();
        if (elements.length === 0) {
            this.addLog("Queue is already empty", "warning");
            return;
        }

        // Animate clearing all elements
        elements.forEach((element, index) => {
            setTimeout(() => {
                const slot = document.getElementById(`slot-${element.index}`);
                slot.classList.add('dequeuing');
            }, index * 100);
        });

        setTimeout(() => {
            this.queue.initQueue();
            this.addLog("Queue cleared successfully", "info");
            this.updateUI();
        }, elements.length * 100 + 500);
    }

    handleCheckEmpty() {
        if (this.queue.isEmpty()) {
            this.addLog("Queue is EMPTY", "info");
            this.showModal('Queue Status', 'Queue is EMPTY');
        } else {
            this.addLog("Queue is NOT EMPTY", "info");
            this.showModal('Queue Status', `Queue is NOT EMPTY (${this.queue.count} elements)`);
        }
    }

    handleCheckFull() {
        if (this.queue.isFull()) {
            this.addLog("Queue is FULL", "warning");
            this.showModal('Queue Status', 'Queue is FULL');
        } else {
            this.addLog("Queue is NOT FULL", "info");
            this.showModal('Queue Status', `Queue is NOT FULL (${this.queue.count}/${this.queue.MAX_SIZE} elements)`);
        }
    }

    animateEnqueue(value) {
        const elements = this.queue.getQueueElements();
        const lastElement = elements[elements.length - 1];
        
        if (lastElement) {
            setTimeout(() => {
                const slot = document.getElementById(`slot-${lastElement.index}`);
                slot.classList.remove('empty');
                slot.classList.add('occupied', 'rear');
                
                // Update front pointer
                elements.forEach(el => {
                    const frontSlot = document.getElementById(`slot-${el.index}`);
                    frontSlot.classList.remove('front');
                    if (el.isFront) {
                        frontSlot.classList.add('front');
                    }
                });

                // Remove rear class from previous slot
                setTimeout(() => {
                    slot.classList.remove('rear');
                }, 500);
            }, 100);
        }
    }

    animateDequeue(value) {
        const elements = this.queue.getQueueElements();
        
        // Find and animate the dequeued slot
        const dequeuedSlot = document.querySelector('.queue-slot.occupied');
        if (dequeuedSlot) {
            dequeuedSlot.classList.add('dequeuing');
            
            setTimeout(() => {
                this.updateUI();
            }, 500);
        }
    }

    updateUI() {
        const elements = this.queue.getQueueElements();
        
        // Clear all slots first
        for (let i = 0; i < this.queue.MAX_SIZE; i++) {
            const slot = document.getElementById(`slot-${i}`);
            slot.className = 'queue-slot empty';
            slot.querySelector('.slot-value').textContent = '';
        }

        // Update occupied slots
        elements.forEach(element => {
            const slot = document.getElementById(`slot-${element.index}`);
            slot.classList.remove('empty');
            slot.classList.add('occupied');
            slot.querySelector('.slot-value').textContent = `#${element.value}`;
            
            if (element.isFront) {
                slot.classList.add('front');
            }
            if (element.isRear) {
                slot.classList.add('rear');
            }
        });

        // Update capacity display
        document.getElementById('capacity-display').textContent = `${this.queue.count}/${this.queue.MAX_SIZE}`;
        
        // Update system status
        const statusElement = document.getElementById('system-status');
        if (this.queue.isFull()) {
            statusElement.textContent = 'FULL';
            statusElement.className = 'status-active';
            statusElement.style.color = 'var(--accent-yellow)';
            statusElement.style.textShadow = '0 0 5px var(--accent-yellow)';
        } else if (this.queue.isEmpty()) {
            statusElement.textContent = 'EMPTY';
            statusElement.className = 'status-active';
            statusElement.style.color = 'var(--accent-purple)';
            statusElement.style.textShadow = '0 0 5px var(--accent-purple)';
        } else {
            statusElement.textContent = 'ACTIVE';
            statusElement.className = 'status-active';
            statusElement.style.color = 'var(--accent-green)';
            statusElement.style.textShadow = '0 0 5px var(--accent-green)';
        }
    }

    addLog(message, type = "info") {
        const logsContainer = document.getElementById('logs-container');
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry log-${type}`;
        
        const timestamp = new Date().toLocaleTimeString();
        
        logEntry.innerHTML = `
            <span class="log-time">${timestamp}</span>
            <span class="log-message">${message}</span>
        `;
        
        logsContainer.appendChild(logEntry);
        logsContainer.scrollTop = logsContainer.scrollHeight;
        
        // Limit logs to 50 entries
        while (logsContainer.children.length > 50) {
            logsContainer.removeChild(logsContainer.firstChild);
        }
    }

    clearLogs() {
        const logsContainer = document.getElementById('logs-container');
        logsContainer.innerHTML = `
            <div class="log-entry log-info">
                <span class="log-time">${new Date().toLocaleTimeString()}</span>
                <span class="log-message">Logs cleared</span>
            </div>
        `;
    }

    showModal(title, message) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-message').textContent = message;
        document.getElementById('message-modal').style.display = 'block';
    }

    closeModal() {
        document.getElementById('message-modal').style.display = 'none';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QueueUIController();
});
