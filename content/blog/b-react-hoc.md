---
title: "Supercharge React with HOC: How I Build Reusable Components the Smart Way"
description: A step-by-step guide to creating Higher-Order Components (HOC) in React to handle cross-cutting concerns like authentication, error handling, and more.
date: 2024-12-08
image: https://images.unsplash.com/photo-1670057037226-b3d65909424f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
minRead: 5
author:
  name: Felipe Leite
  avatar:
    src: /me.jpeg
    alt: Felipe Leite
---

When you're building React apps, there’s one thing that sneaks up fast—**repeating logic across components**. Things like authentication, permission checks, or handling errors show up again and again.

Sure, React hooks solve a lot. But sometimes, hooks aren't enough—especially when you need to **wrap entire components with shared logic**. That’s where **Higher-Order Components (HOCs)** come in.

In this guide, I’ll show you how I use HOCs in **React** to write DRY, reusable code—taking an authentication guard as a real example.

## Phase 1: What Problem Are We Solving?

First things first—do you really need an HOC?

I was working on an app dashboard where certain pages should only be visible if the user was logged in. Adding auth logic inside each page would be repetitive and error-prone.

The solution? A component wrapper that checks if the user is authenticated and handles redirection if not. Clean. Simple. Reusable.

### Why HOC Instead of a Hook?

- ✅ Handles logic at the **component level**
- ✅ Works even with **class components**
- ✅ Great for patterns like **auth, permissions, error boundaries**
- ✅ Keeps UI components focused only on rendering

## Phase 2: How the Architecture Looks

Here’s the plan:

- Create an HOC that wraps any component.
- If the user is authenticated, render the component.
- If not, redirect them to the login page.

### When HOC Makes Sense vs Hooks

| ✅ Go with HOC when...                        | ❌ Stick with Hooks when...                    |
| --------------------------------------------- | ---------------------------------------------- |
| You need to **wrap entire components**        | It’s just about internal logic or side effects |
| You’re handling **auth, permissions, errors** | The logic stays within one component           |
| Want it to work with class components too     | You’re only using function components          |

## Phase 3: Building the HOC

### 🔧 The Auth Wrapper

Here’s how I built an HOC that checks authentication before rendering a component:

**`/hoc/withAuth.tsx`:**

```tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  return function AuthComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        navigate("/login");
      }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
```
