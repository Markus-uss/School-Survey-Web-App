db.createUser(
    {
        user: "moe",
        pwd: "123",
        roles: [
            {
                role: "readWrite",
                db: "computed_stats"
            }
        ]
    }
);