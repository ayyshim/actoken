# AcToken
AcToken lets you generate hashed token that you can use for user verification process.

## Installation :

   ```
    npm install @ayyshim/actoken
   ```

## Usage :
-> Create an instance
```javascript
    const AcToken = require('@ayyshim/actoken')
    const PAYLOAD = {uid: 123}
    const SECRET_KEY = "thisisasecretkey"
    const EXPIRES_AT = 20 // 20 minutes
    const actoken = new AcToken(PAYLOAD, SECRET_KEY, EXPIRES_AT)
```
  
  where : 
  ***payload***:  It can be user id or anything that you want to use to generate token.<br>
  ***secret key***: Confidential key used to generate token.<br>
  ***expires at***: This is an optional argument. If you leave it blank then your token will be invincible. Expiry time limit is considered in minutes value.

-> Generate token

```javascript
	const token = actoken.generate() //4MqKzf5GXLcNhljdj9Gw
```

-> Check token
```javascript
    const checkToken = actoken.check(token)
    /*
	    .check(token) returns an object with status and message.
	    status: 1 = Success
	    status: 2 = Error
	*/
```
-> Get Payload
```javascript
    const payload_data = actoken.getPayload(token)
    /*
	    .getPayload(token) returns an object with payload data.
	    {
		    data: {
			    uid: 123
		    }
	    }
	*/ 
```
