/**
 * @file queue.c
 * @brief Implementation of Circular Queue using array
 * @author Senior Software Engineer
 * @date 2026
 * 
 * This file contains the implementation of all circular queue operations
 * with proper handling of circular behavior using modulo arithmetic.
 */

#include "queue.h"
#include <stdio.h>

void initQueue(CircularQueue* q) {
    q->front = -1;
    q->rear = -1;
    q->count = 0;
}

int isEmpty(CircularQueue* q) {
    return q->count == 0;
}

int isFull(CircularQueue* q) {
    return q->count == MAX_SIZE;
}

int enqueue(CircularQueue* q, int value) {
    // Check for queue overflow
    if (isFull(q)) {
        printf("Error: Queue Overflow! Cannot enqueue %d\n", value);
        return 0; // Failure
    }
    
    // Handle first element case
    if (q->front == -1) {
        q->front = 0;
    }
    
    // Move rear pointer circularly using modulo arithmetic
    q->rear = (q->rear + 1) % MAX_SIZE;
    
    // Store the value
    q->items[q->rear] = value;
    q->count++;
    
    printf("Successfully enqueued: %d\n", value);
    return 1; // Success
}

int dequeue(CircularQueue* q, int* value) {
    // Check for queue underflow
    if (isEmpty(q)) {
        printf("Error: Queue Underflow! Cannot dequeue\n");
        return 0; // Failure
    }
    
    // Get the value to be dequeued
    *value = q->items[q->front];
    
    // Handle last element case
    if (q->front == q->rear) {
        q->front = -1;
        q->rear = -1;
    } else {
        // Move front pointer circularly using modulo arithmetic
        q->front = (q->front + 1) % MAX_SIZE;
    }
    
    q->count--;
    printf("Successfully dequeued: %d\n", *value);
    return 1; // Success
}

int peek(CircularQueue* q, int* value) {
    // Check if queue is empty
    if (isEmpty(q)) {
        printf("Error: Queue is empty! Cannot peek\n");
        return 0; // Failure
    }
    
    // Get the front value without removing it
    *value = q->items[q->front];
    printf("Front element: %d\n", *value);
    return 1; // Success
}

void displayQueue(CircularQueue* q) {
    if (isEmpty(q)) {
        printf("Queue is empty\n");
        return;
    }
    
    printf("Queue elements: ");
    int i = q->front;
    int elementsPrinted = 0;
    
    // Traverse from front to rear circularly
    while (elementsPrinted < q->count) {
        printf("%d", q->items[i]);
        
        if (elementsPrinted < q->count - 1) {
            printf(" <- ");
        }
        
        i = (i + 1) % MAX_SIZE;  // Move to next element circularly
        elementsPrinted++;
    }
    
    printf("\n");
    printf("Front: %d, Rear: %d, Count: %d/%d\n", q->front, q->rear, q->count, MAX_SIZE);
}
