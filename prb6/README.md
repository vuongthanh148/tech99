# Live Scoreboard Module Specification

## Overview
This module handles real-time user score updates and maintains a live scoreboard showing the top 10 users. It ensures secure score updates and efficient real-time data distribution to connected clients.

## Architecture Components
- Score Update API Endpoint
- WebSocket Server for Live Updates
- Score Processing Service
- Authentication & Authorization Layer
- Redis Cache for Leaderboard
- Database for Persistent Storage

## API Endpoints

### POST /api/v1/scores/update
Updates a user's score after completing an action.

**Request Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "actionId": "string",  // Unique identifier for the action
    "timestamp": "ISO8601" // When the action was completed
}
```

**Response (200 OK):**
```json
{
    "userId": "string",
    "newScore": number,
    "rank": number        // Current user's rank after update
}
```

**Error Responses:**
- 401 Unauthorized: Invalid or missing token
- 403 Forbidden: Invalid action attempt
- 429 Too Many Requests: Rate limit exceeded

### WebSocket /ws/scoreboard
Maintains live connection for scoreboard updates.

**Connection Headers:**
```
Authorization: Bearer <jwt_token>
```

**Subscribe Message:**
```json
{
    "action": "subscribe",
    "channel": "scoreboard"
}
```

**Update Event Format:**
```json
{
    "type": "SCOREBOARD_UPDATE",
    "data": {
        "leaderboard": [
            {
                "userId": "string",
                "username": "string",
                "score": number,
                "rank": number
            }
        ],
        "timestamp": "ISO8601"
    }
}
```

## Security Measures

### Score Update Validation
1. JWT token validation for authentication
2. Rate limiting per user (max 10 requests per minute)
3. Action verification:
   - Check if action hasn't been previously processed
   - Validate timestamp is within acceptable range (±5 minutes)
   - Verify action is possible based on user's history

### WebSocket Security
1. Authentication required for connection
2. Connection rate limiting
3. Message size restrictions
4. Automatic disconnection for suspicious behavior

## Data Storage

### Redis Schema
```
Key: "scoreboard:leaderboard"
Type: Sorted Set
Members: userId
Score: user_score
```

### Database Schema
```sql
CREATE TABLE user_scores (
    user_id VARCHAR(36) PRIMARY KEY,
    total_score BIGINT NOT NULL DEFAULT 0,
    last_updated_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE score_actions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    action_id VARCHAR(36) NOT NULL,
    points_earned INT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    UNIQUE(user_id, action_id)
);
```

## Performance Considerations
1. Redis used for real-time leaderboard to minimize database load
2. Batch updates to database every 5 seconds
3. WebSocket messages batched and throttled (max 2 updates/second)
4. Leaderboard cache expires every 24 hours for full refresh

## Error Handling
1. Failed updates retry up to 3 times with exponential backoff
2. Inconsistency detection between Redis and DB triggers reconciliation
3. WebSocket reconnection strategy with exponential backoff
4. Dead letter queue for failed score updates

## Monitoring & Logging
1. Track metrics:
   - Score update latency
   - WebSocket connection count
   - Error rates
   - Cache hit/miss ratio
2. Log all score updates with user ID and action ID
3. Alert on suspicious patterns:
   - Rapid score increases
   - High error rates
   - Connection spikes

## Development Guidelines
1. Follow REST best practices for HTTP endpoints
2. Implement comprehensive input validation
3. Use prepared statements for all database queries
4. Include request tracing for debugging
5. Write unit tests for all validation logic
6. Add integration tests for WebSocket functionality
