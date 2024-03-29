import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import React from "react";
import { useRouter } from "next/router";

export default function AddMeetUp() {
  const router = useRouter();

  const addMeetUpHandler = async (enteredData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  };

  return <NewMeetupForm onAddMeetup={addMeetUpHandler} />;
}
