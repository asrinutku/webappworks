import React, { Fragment, useState } from "react";

import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

export default function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="desc" content="some content" />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

export async function getStaticProps() {
  // fetch data from api

  const client = await MongoClient.connect("connectString");
  const db = client.db();

  const meetupsCol = db.collection("nextjs-meetups");

  const allMeetups = await meetupsCol.find().toArray();

  client.close();

  return {
    props: {
      meetups: allMeetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
