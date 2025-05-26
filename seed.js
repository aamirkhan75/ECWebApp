const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");
const Product = require("./models/Product");

dotenv.config();

mongoose.connect(process.env.mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

async function seedProducts() {
  const products = [];

  for (let i = 0; i < 1000; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 5, max: 300 })),
      description: faker.commerce.productDescription(),
      image: faker.image.urlLoremFlickr({ category: 'product' }),
      createdAt: faker.date.past({ years: 1 }), // Random date within the past year
    });
  }
  

  try {
    await Product.insertMany(products);
    console.log("✅ Seeded 500 products successfully.");
  } catch (error) {
    console.error("❌ Failed to seed products:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedProducts();
