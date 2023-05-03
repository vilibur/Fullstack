```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST new_note
    server->>browser: GET notes

    server->>browser: GET main.css

    server->>browser: GET main.js

    server->>browser: GET data.json
```