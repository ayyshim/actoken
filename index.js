const Cryptr = require('cryptr')

function ActivateToken(payload, secretKey, expiresAt = null) {
    // ... Essentials
    this.payload = payload
    this.secretKey = secretKey
    this.expiresAt = expiresAt

    // ... generate
    this.generate = () => {
        const cryptr = new Cryptr(this.secretKey)
        if (this.expiresAt === null) {
            this.expiresAt = 0
        } else {
            this.expiresAt = Date.now() + this.expiresAt * 60000
        }

        const activation_string = `${JSON.stringify(this.payload)}.${this.expiresAt}`
        const token = cryptr.encrypt(activation_string)
        return token
    }

    // ... check
    this.check = (token) => {
        const cryptr = new Cryptr(this.secretKey)
        const decryptedToken = cryptr.decrypt(token)
        const token_data = decryptedToken.split(".")
        const token_expiresAt = token_data[token_data.length - 1]
        
        if (token_expiresAt !== "0" && parseInt(token_expiresAt) < Date.now()) {
            return {
                status: 0,
                message: "Expired token!"
            }
        } else {
            return {
                status: 1,
                message: "Healthy token!"
            }
        }
    }

    // ... getPayload
    this.getPayload = (token) => {
        const cryptr = new Cryptr(this.secretKey)
        const decryptedToken = cryptr.decrypt(token)
        const token_data = decryptedToken.split(".")
        var token_payload = ""

        token_data.map((payload, index) => {
            if (index < token_data.length - 1) {
                token_payload += payload
                if (index < token_data - 2) {
                    token_payload += '.'
                }
            }
        })

        const returable_payload = {
            data: JSON.parse(token_payload)
        }

        return returable_payload
    }


}

module.export = ActivateToken