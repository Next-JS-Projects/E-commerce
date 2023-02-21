import Product from "@/models/Product";
import connectDb from "@/middleware/Mongoose";

const handler = async (req, res) => {
  let products = await Product.find();
  let shirts = {};
  for (let item of products) {
    if (item.title in shirts) {
      if (
        !shirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        shirts[item.title].color.push(item.color);
      }
      if (
        !shirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        shirts[item.title].size.push(item.size);
      }
    } else {
      shirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        shirts[item.title].color = [item.color];
        shirts[item.title].size = [item.size];
        return;
      } else {
        shirts[item.title].color = [];
        shirts[item.title].size = [];
        return;
      }
    }
  }
  res.status(200).json({ shirts });
};

export default connectDb(handler);
