/**
 * @file queue.h
 * @brief Header file for Circular Queue implementation using array
 * @author Senior Software Engineer
 * @date 2026
 * 
 * This file contains the structure definition and function declarations
 * for a circular queue implemented using a fixed-size array.
 * The circular queue provides O(1) time complexity for enqueue and dequeue operations.
 */

#ifndef QUEUE_H
#define QUEUE_H

#define MAX_SIZE 10  // Maximum capacity of the circular queue

/**
 * @struct CircularQueue
 * @brief Structure to represent a circular queue
 * 
 * This structure contains:
 * - An array to store queue elements
 * - Front pointer to track the front element
 * - Rear pointer to track the rear element
 * - Count to track current number of elements
 * 
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n) where n is MAX_SIZE
 */
typedef struct {
    int items[MAX_SIZE];     // Array to store queue elements
    int front;               // Index of front element
    int rear;                // Index of rear element
    int count;               // Current number of elements
} CircularQueue;

/**
 * @brief Initialize an empty circular queue
 * @param q Pointer to the CircularQueue structure
 * 
 * Sets front and rear to -1 and count to 0, indicating an empty queue.
 * Time Complexity: O(1)
 */
void initQueue(CircularQueue* q);

/**
 * @brief Check if the queue is empty
 * @param q Pointer to the CircularQueue structure
 * @return 1 if empty, 0 otherwise
 * 
 * Checks if count is 0 to determine if queue is empty.
 * Time Complexity: O(1)
 */
int isEmpty(CircularQueue* q);

/**
 * @brief Check if the queue is full
 * @param q Pointer to the CircularQueue structure
 * @return 1 if full, 0 otherwise
 * 
 * Checks if count equals MAX_SIZE to determine if queue is full.
 * Time Complexity: O(1)
 */
int isFull(CircularQueue* q);

/**
 * @brief Add an element to the rear of the queue
 * @param q Pointer to the CircularQueue structure
 * @param value Integer value to be enqueued
 * @return 1 if successful, 0 if queue is full (overflow)
 * 
 * Uses modulo arithmetic to wrap around the array when reaching the end.
 * Updates rear pointer using (rear + 1) % MAX_SIZE.
 * Time Complexity: O(1)
 */
int enqueue(CircularQueue* q, int value);

/**
 * @brief Remove and return the front element
 * @param q Pointer to the CircularQueue structure
 * @param value Pointer to store the dequeued value
 * @return 1 if successful, 0 if queue is empty (underflow)
 * 
 * Uses modulo arithmetic to wrap around the array when reaching the end.
 * Updates front pointer using (front + 1) % MAX_SIZE.
 * Time Complexity: O(1)
 */
int dequeue(CircularQueue* q, int* value);

/**
 * @brief Peek at the front element without removing it
 * @param q Pointer to the CircularQueue structure
 * @param value Pointer to store the peeked value
 * @return 1 if successful, 0 if queue is empty
 * 
 * Returns the front element without modifying the queue structure.
 * Time Complexity: O(1)
 */
int peek(CircularQueue* q, int* value);

/**
 * @brief Display all elements in the queue
 * @param q Pointer to the CircularQueue structure
 * 
 * Prints all elements from front to rear in order.
 * Shows "Empty" if queue has no elements.
 * Time Complexity: O(n) where n is current count
 */
void displayQueue(CircularQueue* q);

#endif // QUEUE_H
