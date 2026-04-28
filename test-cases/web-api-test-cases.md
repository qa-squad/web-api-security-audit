# Web & API Test Cases

## 🔐 Login Module - Functional Testing

### Test Case 1: Valid Login
- Input: Correct username & password
- Expected: User logs in successfully

### Test Case 2: Invalid Password
- Input: Correct username, wrong password
- Expected: Error message displayed

### Test Case 3: Empty Fields
- Input: No username or password
- Expected: Validation error

---

## API Testing

### Test Case 4: Valid API Request
- Endpoint: /login
- Method: POST
- Expected: 200 OK response

### Test Case 5: Invalid Token
- Modify auth token
- Expected: 401 Unauthorized

### Test Case 6: Parameter Tampering
- Modify request payload
- Expected: Input validation error

---

## Security-Oriented Test Cases

### Test Case 7: SQL Injection Attempt
- Input: ' OR 1=1 --
- Expected: Should NOT bypass login

### Test Case 8: XSS Attempt
- Input: <script>alert('XSS')</script>
- Expected: Script should not execute
