import { MongoClient } from "mongodb";

// post /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://asrinutku:zENGG6oixP6KFiiJ@cluster0.typu5.mongodb.net/nextjs-meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCol = db.collection("nextjs-meetups");
    const result = await meetupsCol.insertOne(data);

    console.log(result);

    client.close();
    res.status(201).json({ message: "Data added success !" });
  }
}

export default handler;
