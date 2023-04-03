def register(self, email, plain_password, name):
    encrypted = bcrypt.hashpw(plain_password.encode(
        "utf8"), bcrypt.gensalt()).decode('utf8')

    def create_user(tx, email, encrypted, name):
        return tx.run(""" // (1)
            CREATE (u:User {
                userId: randomUuid(),
                email: $email,
                password: $encrypted,
                name: $name
            })
            RETURN u
        """,
                      email=email, encrypted=encrypted, name=name  # (2)
                      ).single()  # (3)

    try:
        with self.driver.session() as session:
            result = session.execute_write(create_user, email, encrypted, name)

            user = result['u']

            payload = {
                "userId": user["userId"],
                "email":  user["email"],
                "name":  user["name"],
            }

            payload["token"] = self._generate_token(payload)

            return payload
    except ConstraintError as err:
        # Pass error details through to a ValidationException
        raise ValidationException(err.message, {
            "email": err.message
        })
