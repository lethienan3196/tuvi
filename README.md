# Zi Wei Dou Shu API

A REST API for generating Zi Wei Dou Shu (紫微斗數) charts using the [fortel-ziweidoushu](https://github.com/airicyu/fortel-ziweidoushu) library.

## Installation

```bash
npm install
```

## Running the Server

```bash
node index.js
```

The server will start on port 3000 by default. You can change the port by setting the `PORT` environment variable.

## Deployment

### Option 1: Deploy to Railway.app (Recommended)

1. Create a Railway.app account at https://railway.app/
2. Install Railway CLI:
```bash
npm i -g @railway/cli
```

3. Login to Railway:
```bash
railway login
```

4. Initialize your project:
```bash
railway init
```

5. Deploy:
```bash
railway up
```

### Option 2: Deploy to Heroku

1. Install Heroku CLI
2. Login to Heroku:
```bash
heroku login
```

3. Create a new Heroku app:
```bash
heroku create your-app-name
```

4. Deploy:
```bash
git push heroku main
```

### Option 3: Deploy using Docker

1. Build the Docker image:
```bash
docker build -t ziweidoushu-api .
```

2. Run the container:
```bash
docker run -p 3000:3000 ziweidoushu-api
```

## API Endpoints

### 1. Create Chart using Lunar Calendar
**Endpoint:** `POST /api/chart/lunar`

**Request Body:**
```json
{
    "year": 1990,
    "month": 3,
    "day": 15,
    "bornTime": "寅時",
    "gender": "M",
    "isLeapMonth": false
}
```

### 2. Create Chart using Solar Calendar
**Endpoint:** `POST /api/chart/solar`

**Request Body:**
```json
{
    "year": 1990,
    "month": 4,
    "day": 9,
    "bornTime": "寅時",
    "gender": "F"
}
```

### 3. Create Chart using Text Description
**Endpoint:** `POST /api/chart/text`

**Request Body:**
```json
{
    "text": "農曆1990年三月十五日寅時男"
}
```

## Parameters

- `year`: Number (1900-2100)
- `month`: Number (1-12)
- `day`: Number (1-31)
- `bornTime`: String (子時, 丑時, 寅時, 卯時, 辰時, 巳時, 午時, 未時, 申時, 酉時, 戌時, 亥時)
- `gender`: String ("M" for male, "F" for female)
- `isLeapMonth`: Boolean (optional, default: false) - Only for lunar calendar
- `text`: String - Chinese text description of birth date (only for text endpoint)

## Response Format

Success Response:
```json
{
    "success": true,
    "chart": "...", // String representation of the chart
    "config": {}, // Configuration used
    "element": "...", // Element information
    "destinyMaster": "...", // Destiny master star
    "bodyMaster": "...", // Body master star
    "cells": [] // Array of cell information
}
```

Error Response:
```json
{
    "success": false,
    "error": "Error message"
}
```

## Example Usage

Using curl:

```bash
# Lunar calendar chart
curl -X POST http://localhost:3000/api/chart/lunar \
-H "Content-Type: application/json" \
-d '{"year":1990,"month":3,"day":15,"bornTime":"寅時","gender":"M"}'

# Solar calendar chart
curl -X POST http://localhost:3000/api/chart/solar \
-H "Content-Type: application/json" \
-d '{"year":1990,"month":4,"day":9,"bornTime":"寅時","gender":"F"}'

# Text description chart
curl -X POST http://localhost:3000/api/chart/text \
-H "Content-Type: application/json" \
-d '{"text":"農曆1990年三月十五日寅時男"}'
```

## Error Handling

The API will return appropriate error messages for:
- Missing required parameters
- Invalid date ranges
- Invalid born time values
- Invalid gender values
- Invalid text format (for text endpoint)

## License

MIT License (inherited from fortel-ziweidoushu library) 