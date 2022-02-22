
db.createUser(
    {
        user: "moe",
        pwd: "123",
        roles: [
            {
                role: "readWrite",
                db: "admin"
            }
        ]
    }
);

db = db.getSiblingDB('school_info');

db.createCollection('computed_stats');

db.computed_stats.insertOne(
 {
    "Most Favorite Subject": "N/A",
    "Least Favorite Subject": "N/A",
    "Highest Grade Count": "N/A",
    "Least Grade Count": "N/A"
  });
