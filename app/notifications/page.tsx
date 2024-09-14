"use client"
import React, { useState } from "react"
import * as Ably from "ably"
import {
  AblyProvider,
  ChannelProvider,
  useChannel,
  useConnectionStateListener,
} from "ably/react"
import { ablyClient } from "@/lib/ably"
export default function NotiPage() {
  return (
    <AblyProvider client={ablyClient}>
      //
      <ChannelProvider channelName="notifications">
        <AblyPubSub />
      </ChannelProvider>
    </AblyProvider>
  )
}
function AblyPubSub() {
  const [messages, setMessages] = useState([])

  useConnectionStateListener("connected", () => {
    console.log("Connected to Ably!")
  })

  // Create a channel called 'get-started' and subscribe to all messages with the name 'first' using the useChannel hook
  const { channel } = useChannel("notifications", "new_post", (message) => {
    setMessages((previousMessages) => [...previousMessages, message])
  })

  return (
    // Publish a message with the name 'first' and the contents 'Here is my first message!' when the 'Publish' button is clicked
    <div>
      <h1>CHannel notifications</h1>
      <button
        onClick={() => {
          channel.publish("new_post", "Here is my first message!")
        }}>
        Publish
      </button>
      {messages.map((message) => {
        return <p key={message.id}>{message.data}</p>
      })}
    </div>
  )
}
