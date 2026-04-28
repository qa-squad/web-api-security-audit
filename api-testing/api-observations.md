
# API Testing Observations

## Tools Used
- Browser DevTools
- Network tab inspection

## Observations

- API requests expose endpoints like /login, /users
- Sensitive data should not be exposed in responses
- Authentication tokens must be validated

## Risks Identified

- Weak validation can lead to unauthorized access
- Missing authentication checks can expose data
