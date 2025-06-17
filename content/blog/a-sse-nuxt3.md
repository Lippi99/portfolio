---
title: "Real-Time Made Simple: How I Use Server-Sent Events (SSE) in Nuxt 3"
description:
  A step-by-step guide to implementing real-time updates in Nuxt 3 using
  Server-Sent Events (SSE) as a lightweight alternative to WebSockets.
date: 2025-06-15
image: https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
minRead: 4
author:
  name: Felipe Leite
  avatar:
    src: /me.jpeg
    alt: Felipe Leite
---

When it comes to building real-time features, most developers immediately jump to WebSockets. But depending on the use case, WebSockets can be overkill—adding complexity where a simpler solution would work perfectly.

In this article, I’ll break down how I use **Server-Sent Events (SSE)** in **Nuxt 3** to deliver real-time updates with less overhead, using a notification feed feature I built for a dashboard app as an example.

## Phase 1: Understanding the Problem

Before jumping into code, it’s important to ask whether you actually need WebSockets.

In my case, I was building a dashboard where users needed to receive real-time updates on order statuses and system events. However, the communication was **one-way: from server to client**. Users didn’t need to send messages back to the server.

This made SSE the perfect choice.

### Why SSE Over WebSockets?

- ✅ Lightweight — Uses native HTTP (no extra WebSocket protocols)
- ✅ Easy to implement — No third-party libraries needed
- ✅ Works with HTTP/2 and HTTP/3
- ✅ Automatic reconnection built-in
- ✅ Simpler scaling (especially behind proxies like Nginx or Cloudflare)

## Phase 2: Planning the Architecture

The goal was simple:

- The server pushes order updates whenever something changes.
- The client listens and updates the UI in real-time.

### SSE vs WebSocket Use Cases

| ✅ Use SSE when...                             | ❌ Use WebSockets when...              |
| ---------------------------------------------- | -------------------------------------- |
| Only need server-to-client updates             | Need two-way communication             |
| Low to moderate update frequency               | High-frequency, low-latency chat/games |
| Prefer HTTP simplicity over persistent sockets | Need bidirectional communication       |

## Phase 3: Setting Up SSE in Nuxt 3

### 🔧 Backend API (Server Handler)

In Nuxt 3, you can easily create an SSE endpoint with an API route.

**`/server/api/notifications.get.ts`:**

```ts
export default defineEventHandler(async (event) => {
  // Set headers for SSE
  setResponseHeaders(event, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  // Function to send messages
  const send = (data: any) => {
    event.node.res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Initial message
  send({ message: "SSE connection established" });

  // Example: send updates every 5 seconds
  const interval = setInterval(() => {
    send({ timestamp: new Date(), message: "Ping from server" });
  }, 5000);

  // Close connection when client disconnects
  event.node.req.on("close", () => {
    clearInterval(interval);
    event.node.res.end();
  });
});
```
