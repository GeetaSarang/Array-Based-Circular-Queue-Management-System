# Array-Based Circular Queue Management System

A professional dual-component implementation of a Circular Queue data structure with C-language backend logic and modern Web UI visualization.

## Project Structure

```
DSA PROJECT/
├── C-Backend/
│   ├── queue.h          # Header file with function declarations
│   ├── queue.c          # Circular queue implementation
│   └── main.c           # Command-line interface
├── Web-UI/
│   ├── index.html       # Web interface
│   ├── style.css        # Dark theme with neon accents
│   └── script.js        # Queue logic and UI interactions
└── README.md            # This file
```

## Features

### C Backend
- **Time Complexity**: O(1) for enqueue, dequeue, peek, isEmpty, isFull
- **Space Complexity**: O(n) where n is MAX_SIZE (10)
- **Operations**: enqueue, dequeue, peek, isEmpty, isFull, displayQueue
- **Circular Logic**: Uses modulo arithmetic `(rear + 1) % MAX_SIZE` and `(front + 1) % MAX_SIZE`
- **Error Handling**: Proper overflow and underflow detection
- **Documentation**: Doxygen-style comments with complexity analysis

### Web UI
- **Service Desk Dashboard**: Professional dark theme with neon accents
- **Visual Queue**: 10-slot horizontal array visualization
- **Animated Pointers**: Front (green) and Rear (pink) indicators
- **Smooth Animations**: Slide-in for enqueue, fade-out for dequeue
- **Activity Logs**: Real-time operation logging with timestamps
- **Interactive Controls**: Enqueue, dequeue, peek, clear queue operations
- **Status Indicators**: Queue capacity and system status display
- **Responsive Design**: Works on desktop and mobile devices

## How to Run

### C Program (Backend)

1. **Navigate to C-Backend directory**:
   ```bash
   cd "C-Backend"
   ```

2. **Compile the program** (using GCC):
   ```bash
   gcc -o queue main.c queue.c
   ```

3. **Run the executable**:
   ```bash
   ./queue
   ```

4. **Use the command-line menu**:
   - Press 1: Enqueue (Add element)
   - Press 2: Dequeue (Remove element)
   - Press 3: Peek (View front element)
   - Press 4: Check if Empty
   - Press 5: Check if Full
   - Press 6: Display Queue
   - Press 7: Exit

### Web UI (Frontend)

1. **Navigate to Web-UI directory**:
   ```bash
   cd "Web-UI"
   ```

2. **Open index.html in a web browser**:
   - Double-click `index.html` file
   - Or open with: `start index.html` (Windows)
   - Or use a local server: `python -m http.server 8000` then visit `http://localhost:8000`

3. **Use the web interface**:
   - Enter customer numbers (1-999) and click "Enqueue Customer"
   - Click "Dequeue Customer" to remove from front
   - Use "Peek Front" to view without removing
   - Monitor activity logs in real-time
   - Watch animated queue visualization

## Technical Implementation

### Circular Queue Logic

The circular queue uses modulo arithmetic to wrap around the array:

```c
// Enqueue: Move rear pointer circularly
rear = (rear + 1) % MAX_SIZE;

// Dequeue: Move front pointer circularly  
front = (front + 1) % MAX_SIZE;
```

This ensures O(1) time complexity for all operations and efficient memory usage.

### Web UI Mirroring

The JavaScript implementation exactly mirrors the C logic:
- Same modulo arithmetic for pointer movement
- Identical overflow/underflow handling
- Same time and space complexity characteristics
- Real-time visual feedback for all operations

### Key Features

- **Professional Engineering Standards**: Clean code, proper documentation, error handling
- **Visual Learning**: See how circular queues work in real-time
- **Dual Interface**: Both CLI and web-based interaction
- **Responsive Design**: Works on all screen sizes
- **Modern UI**: Dark theme with neon accents and smooth animations

## Educational Value

This project demonstrates:
- Array-based circular queue implementation
- Modulo arithmetic for circular data structures
- Time/space complexity analysis
- Professional software engineering practices
- Modern web development with animations
- Real-time data visualization

Perfect for DSA learning, interviews, and understanding circular queue concepts!


