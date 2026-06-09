/**
 * @file main.c
 * @brief Command-line interface for Circular Queue Management System
 * @author Senior Software Engineer
 * @date 2026
 * 
 * This file provides an interactive command-line menu to test all
 * circular queue operations with proper error handling and user feedback.
 */

#include "queue.h"
#include <stdio.h>
#include <stdlib.h>

// Function prototypes
void displayMenu();
void clearScreen();
void printHeader();

int main() {
    CircularQueue queue;
    int choice, value, result;
    char continueOp;
    
    // Initialize the queue
    initQueue(&queue);
    
    printHeader();
    
    do {
        displayMenu();
        printf("Enter your choice (1-7): ");
        result = scanf("%d", &choice);
        
        // Clear input buffer
        while (getchar() != '\n');
        
        if (result != 1) {
            printf("Invalid input! Please enter a number.\n");
            continue;
        }
        
        switch (choice) {
            case 1: // Enqueue
                printf("Enter value to enqueue: ");
                if (scanf("%d", &value) == 1) {
                    enqueue(&queue, value);
                } else {
                    printf("Invalid value!\n");
                    while (getchar() != '\n'); // Clear input buffer
                }
                break;
                
            case 2: // Dequeue
                if (dequeue(&queue, &value)) {
                    printf("Dequeued value: %d\n", value);
                }
                break;
                
            case 3: // Peek
                if (peek(&queue, &value)) {
                    printf("Front element: %d\n", value);
                }
                break;
                
            case 4: // Check if Empty
                if (isEmpty(&queue)) {
                    printf("Queue is EMPTY\n");
                } else {
                    printf("Queue is NOT EMPTY\n");
                }
                break;
                
            case 5: // Check if Full
                if (isFull(&queue)) {
                    printf("Queue is FULL\n");
                } else {
                    printf("Queue is NOT FULL\n");
                }
                break;
                
            case 6: // Display Queue
                displayQueue(&queue);
                break;
                
            case 7: // Exit
                printf("Exiting Circular Queue Management System...\n");
                printf("Thank you for using the system!\n");
                return 0;
                
            default:
                printf("Invalid choice! Please enter a number between 1 and 7.\n");
                break;
        }
        
        // Display current queue status after each operation
        if (choice >= 1 && choice <= 6) {
            printf("\n--- Current Queue Status ---\n");
            displayQueue(&queue);
            printf("---------------------------\n");
        }
        
        // Ask if user wants to continue
        printf("\nDo you want to continue? (y/n): ");
        continueOp = getchar();
        while (getchar() != '\n'); // Clear input buffer
        
        if (continueOp == 'n' || continueOp == 'N') {
            printf("Exiting Circular Queue Management System...\n");
            printf("Thank you for using the system!\n");
            break;
        }
        
        clearScreen();
        printHeader();
        
    } while (1);
    
    return 0;
}

void displayMenu() {
    printf("\n=== CIRCULAR QUEUE MANAGEMENT SYSTEM ===\n");
    printf("1. Enqueue (Add element)\n");
    printf("2. Dequeue (Remove element)\n");
    printf("3. Peek (View front element)\n");
    printf("4. Check if Empty\n");
    printf("5. Check if Full\n");
    printf("6. Display Queue\n");
    printf("7. Exit\n");
    printf("========================================\n");
}

void clearScreen() {
    // Clear screen for Windows
    system("cls");
}

void printHeader() {
    printf("========================================\n");
    printf("   CIRCULAR QUEUE MANAGEMENT SYSTEM     \n");
    printf("    Array-Based Implementation          \n");
    printf("    Maximum Capacity: %d elements        \n", MAX_SIZE);
    printf("========================================\n");
    printf("Time Complexity: O(1) for all operations\n");
    printf("Space Complexity: O(%d)\n", MAX_SIZE);
    printf("========================================\n\n");
}
