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
  return await Course.find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    //$gte -->greater than or equal to
    // name: /.*by.*/i --> string that includes 'by' and it is case insenstive
    .sort({ price: -1 }) //or ({'name'})for ascending and ({'-name'}) for descending
    .select({ name: 1, author: 1, price: 1 }); //or ({'name author'})

  return courses;
}

async function run() {
  const coursesd = await getCourses();
  console.log(coursesd);
}

run();
