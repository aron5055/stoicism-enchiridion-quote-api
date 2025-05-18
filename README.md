# Daily Stoic Quote API

A simple, zero-dependency Cloudflare Workers API that returns one "Daily Stoic" quote from Epictetus's *The Enchiridion* each day, based on the date. The quote is chosen deterministically (pseudo-random) so it stays the same throughout the day.

## 🚀 Quick Start

1. **Request**  
```bash
curl https://api.aronyang.com/quote
```

2. **Response**  
```json
{
  "date": "2025-05-05",
  "id": "e-XLVI-1",
  "section": "XLVI",
  "text": "Never call yourself a philosopher or talk principles among the ignorant. Show principles by actions.",
  "author": "Epictetus"
}
```

## Usage

### Daily Quote
- Endpoint: GET /quote
- Returns a daily quote that remains consistent throughout the day

### Random Quote
- Endpoint: GET /quote/random
- Returns a randomly selected quote each time it's called

- Query Parameters:
  - none (future: ?lang=zh for Chinese)

- Headers:
  - Content-Type: application/json; charset=utf-8
  - Cache-Control: public, max-age=300, stale-while-revalidate=86400
  - Access-Control-Allow-Origin: *

## Data License & Copyright

Original English text from *The Enchiridion*, Project Gutenberg #45109, Public Domain.

This text has been adapted by Google Gemini with slight modifications to ensure semantic clarity.