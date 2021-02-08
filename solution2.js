const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/mongo-exercises";

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((error) => console.log(error));

const courseSchema = new mongoose.Schema({
  name: { type: String },
  author: { type: String },
  tags: [String],
  date: { type: Date },
  isPublished: { type: Boolean },
  price: { type: Number },
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  //USING MONGODB OPERATOR '$IN'
  return await Course.find({
    isPublished: true,
    tags: { $in: ["frontend", "backend"] },
  })
    .sort({ price: -1 }) //or ({'price'})for ascending and ({'-price'}) for descending
    .select({ name: 1, author: 1, price: 1 }); //or ({'name author, price'})

  //USING 'OR' OPERATOR
  //   return await Course.find({
  //     isPublished: true,
  //   })
  //     .or([{ tags: "frontend" }, { tags: "backend" }])
  //     .sort({ -price}) //or ({'price'})for ascending and ({'-price'}) for descending
  //     .select({ name, author, price}); //or ({'name author, price'})

  return courses;
}

async function run() {
  const coursesd = await getCourses();
  console.log(coursesd);
}

run();
