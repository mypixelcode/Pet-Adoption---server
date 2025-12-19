require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Pet = require("./models/Pet");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Pet.deleteMany({});

    // Create admin user
    console.log("Creating admin user...");
    const admin = await User.create({
      name: "Admin User",
      email: "admin@petadopt.com",
      password: "admin123",
      phone: "1234567890",
      address: "123 Admin Street, City, State",
      role: "admin",
    });
    console.log("✅ Admin created: admin@petadopt.com / admin123");

    // Create test user
    console.log("Creating test user...");
    await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      phone: "9876543210",
      address: "456 User Avenue, City, State",
      role: "user",
    });
    console.log("Test user created: john@example.com / password123");

    // Create sample pets
    console.log("Creating sample pets...");
    const pets = [
      {
        name: "Max",
        species: "Dog",
        breed: "Golden Retriever",
        age: 3,
        gender: "Male",
        size: "Large",
        color: "Golden",
        description:
          "Max is a friendly and energetic Golden Retriever who loves to play fetch and go on long walks. He's great with children and other dogs. Max is fully trained and looking for an active family to call his own.",
        healthStatus: "Healthy",
        vaccinated: true,
        image:
          "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=500",
        status: "available",
        addedBy: admin._id,
      },
      {
        name: "Luna",
        species: "Cat",
        breed: "Persian",
        age: 2,
        gender: "Female",
        size: "Small",
        color: "White",
        description:
          "Luna is a gentle and affectionate Persian cat with beautiful white fur. She loves to cuddle and enjoys quiet environments. Perfect for someone looking for a calm companion.",
        healthStatus: "Healthy",
        vaccinated: true,
        image:
          "https://images.unsplash.com/photo-1573865526739-10c1d3a1f0cc?w=500",
        status: "available",
        addedBy: admin._id,
      },
      {
        name: "Charlie",
        species: "Dog",
        breed: "Labrador",
        age: 5,
        gender: "Male",
        size: "Large",
        color: "Black",
        description:
          "Charlie is a loyal and intelligent Labrador who has been well-trained. He's calm, obedient, and great with kids. He's looking for a forever home where he can be part of the family.",
        healthStatus: "Healthy",
        vaccinated: true,
        image:
          "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500",
        status: "available",
        addedBy: admin._id,
      },
      {
        name: "Bella",
        species: "Dog",
        breed: "Beagle",
        age: 1,
        gender: "Female",
        size: "Medium",
        color: "Tri-color",
        description:
          "Bella is a playful and curious Beagle puppy. She's full of energy and loves exploring. She would do best in a home with a yard where she can run and play.",
        healthStatus: "Healthy",
        vaccinated: true,
        image:
          "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=500",
        status: "available",
        addedBy: admin._id,
      },
      {
        name: "Whiskers",
        species: "Cat",
        breed: "Siamese",
        age: 4,
        gender: "Male",
        size: "Medium",
        color: "Cream and Brown",
        description:
          "Whiskers is a talkative and social Siamese cat. He loves attention and will follow you around the house. He's very affectionate and gets along well with other pets.",
        healthStatus: "Healthy",
        vaccinated: true,
        image:
          "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=500",
        status: "available",
        addedBy: admin._id,
      },
      {
        name: "Rocky",
        species: "Dog",
        breed: "German Shepherd",
        age: 4,
        gender: "Male",
        size: "Large",
        color: "Black and Tan",
        description:
          "Rocky is a protective and loyal German Shepherd. He's well-trained and would make an excellent guard dog. He needs an experienced owner who can provide consistent training and exercise.",
        healthStatus: "Healthy",
        vaccinated: true,
        image:
          "https://images.unsplash.com/photo-1568572933382-74d440642117?w=500",
        status: "available",
        addedBy: admin._id,
      },
      {
        name: "Mittens",
        species: "Cat",
        breed: "Maine Coon",
        age: 3,
        gender: "Female",
        size: "Large",
        color: "Gray",
        description:
          "Mittens is a gentle giant with a sweet personality. She loves to be groomed and enjoys lounging in sunny spots. She's perfect for someone looking for a relaxed feline companion.",
        healthStatus: "Healthy",
        vaccinated: true,
        image:
          "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500",
        status: "available",
        addedBy: admin._id,
      },
      {
        name: "Buddy",
        species: "Dog",
        breed: "Poodle",
        age: 6,
        gender: "Male",
        size: "Medium",
        color: "White",
        description:
          "Buddy is a smart and friendly Poodle who loves learning new tricks. He's hypoallergenic and perfect for families with allergies. He enjoys daily walks and mental stimulation.",
        healthStatus: "Healthy",
        vaccinated: true,
        image:
          "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=500",
        status: "available",
        addedBy: admin._id,
      },
      {
        name: "Coco",
        species: "Rabbit",
        breed: "Dutch Rabbit",
        age: 1,
        gender: "Female",
        size: "Small",
        color: "Black and White",
        description:
          "Coco is an adorable and gentle rabbit who loves to hop around and explore. She's litter-trained and enjoys fresh vegetables. Perfect for families with children.",
        healthStatus: "Healthy",
        vaccinated: false,
        image:
          "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500",
        status: "available",
        addedBy: admin._id,
      },
      {
        name: "Daisy",
        species: "Dog",
        breed: "Bulldog",
        age: 2,
        gender: "Female",
        size: "Medium",
        color: "Brindle",
        description:
          "Daisy is a calm and affectionate Bulldog who loves naps and short walks. She's great with children and enjoys a relaxed lifestyle. She's looking for a cozy home to call her own.",
        healthStatus: "Healthy",
        vaccinated: true,
        image:
          "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500",
        status: "available",
        addedBy: admin._id,
      },
      {
        name: "Shadow",
        species: "Cat",
        breed: "British Shorthair",
        age: 5,
        gender: "Male",
        size: "Large",
        color: "Gray",
        description:
          "Shadow is an independent yet affectionate cat who enjoys his alone time but also loves cuddles. He's calm, well-behaved, and perfect for a quiet household.",
        healthStatus: "Healthy",
        vaccinated: true,
        image:
          "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=500",
        status: "available",
        addedBy: admin._id,
      },
      {
        name: "Oscar",
        species: "Dog",
        breed: "Husky",
        age: 3,
        gender: "Male",
        size: "Large",
        color: "Gray and White",
        description:
          "Oscar is an energetic Husky who loves outdoor activities. He needs plenty of exercise and would thrive in an active household. He's friendly, vocal, and loves to play.",
        healthStatus: "Healthy",
        vaccinated: true,
        image:
          "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=500",
        status: "available",
        addedBy: admin._id,
      },
    ];

    await Pet.insertMany(pets);
    console.log(`${pets.length} pets created successfully`);

    console.log("\n Database seeded successfully!");
    console.log("\n Login credentials:");
    console.log("Admin: admin@petadopt.com / admin123");
    console.log("User: john@example.com / password123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
