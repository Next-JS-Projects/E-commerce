export default function handler(req, res) {
  let pincodes = {
    485001: ["Satna", "Madhya Pradesh"],
    721302: ["Kharagpur", "West bengal"],
    462001: ["Bhopal", "Madhya Pradesh"],
    468978: ["Shankargarh", "Uttar Pradesh"],
  };
  res.status(200).json(pincodes);
}
