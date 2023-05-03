```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST new_note
    server->>browser: GET changed html

    browser->>server: GET main.css
    server->>browser: the css file

    browser->>server: GET main.js
    server->>browser: the js file

    browser->>server: GET data.json
    server->>browser: the json data
```