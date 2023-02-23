import React, { Fragment } from "react";

import MeetUpDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";


export default function MeetUpDetails(props) {
  return (
    <MeetUpDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "connectString"
  );
  const db = client.db();

  const meetupsCol = db.collection("nextjs-meetups");

  const allMeetups = await meetupsCol.find({}, { _id: 1 }).toArray(); // fetch ids only

  client.close();

  return {
    fallback: 'blocking',
    paths: allMeetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for each meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect("connectString");
  const db = client.db();

  const meetupsCol = db.collection("nextjs-meetups");

  const selectedMeetup = await meetupsCol.findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
