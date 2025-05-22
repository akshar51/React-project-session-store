# 📄 React Form App Documentation

## 🔍 Overview

This React application provides a form for collecting and managing personal details such as:

- Full Name
- Email
- Gender
- Hobbies
- Address

It features the ability to **add**, **edit**, and **delete** entries, while persisting the data using `sessionStorage`. All form fields are controlled using React state, and the UI is responsive using Bootstrap classes.

---

## 🧠 Core Features

### 1. Controlled Components
- All form inputs are controlled using the `useState` hook.
- Checkboxes (for hobbies) are handled as arrays, supporting multiple selections.

### 2. Session Storage Integration
- On first render, the app loads existing user data from `sessionStorage` using `useEffect`.
- After each form submission or deletion, data is saved back to `sessionStorage` under the key `"user"`.

### 3. CRUD Operations
- **Add:** Adds a new user with a unique ID (`Date.now()`).
- **Edit:** Allows existing data to be updated in-place.
- **Delete:** Removes a user by filtering them out of the list.

### 4. useRef Enhancements
- `useRef` is used to:
  - Focus on the first input (`Full Name`) after each submission.
  - Dynamically toggle button classes/text between "Submit" and "Update".

---

## 🧩 React Hooks Used

| Hook        | Purpose                                                              |
|-------------|----------------------------------------------------------------------|
| `useState`  | Manage input values (`obj`), user list (`list`), hobbies, and edit index |
| `useEffect` | Load data from `sessionStorage` on initial mount                     |
| `useRef`    | DOM access for button and input focus control                        |

---

## 🏗️ Component Structure

All logic resides in a single `App` functional component. It handles:

- Form input rendering
- Submission logic
- CRUD operations for a dynamic user list
- Responsive UI using Bootstrap

---

## 📋 Form Fields Breakdown

| Field      | Type           | State Controlled |
|------------|----------------|------------------|
| Full Name  | Text input     | `obj.username`   |
| Email      | Email input    | `obj.email`      |
| Gender     | Radio buttons  | `obj.gender`     |
| Hobbies    | Checkboxes     | `hobby[]` & `obj.hobby` |
| Address    | Textarea       | `obj.address`    |

---

## 🖱️ Button Behavior

- Default state: `Submit` with `btn-primary`
- On edit: Changes to `Update` with `btn-success`
- Automatically resets after submission

---

## 📊 Table Rendering

- Users are displayed in a Bootstrap table.
- Each entry includes:
  - Serial number
  - All form data
  - Action buttons (Edit / Delete)

---

## 🧪 Example Workflow

1. User fills in the form and clicks **Submit**.
2. Data is added to `list`, assigned an ID, and saved to `sessionStorage`.
3. Clicking **Edit** populates the form with existing data and updates the submit button.
4. On updating, the list is modified in-place.
5. Deleting an entry removes it from both the UI and `sessionStorage`.
