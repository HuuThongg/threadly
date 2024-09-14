const Ably = require("ably")

c

const ablyClient = new Ably.Realtime({
  key: "",
  clientId: "1",
})

const testPublish = async () => {
  try {
    const channel = ablyClient.channels.get("notifications")
    await channel.publish("new_post:1", "Test message")

    await channel.publish("new_post:1", "helll")
    await channel.publish("1:new_message", "Test message")
    console.log("Test message published")
  } catch (error) {
    console.error("Error publishing test message:", error)
  }
}

//testPublish()
const testSub = async () => {
  try {
    const channel = ablyClient.channels.get("notifications")
    await channel.subscribe("new_post:1", (msg) => {
      console.log("msg:", msg)
    })
    const channel1 = ablyClient.channels.get("chat")
    await channel1.subscribe("1:new_message", (msg) => {
      console.log("1:new_message:", msg)
    })
    await channel1.subscribe("message:55160f9f-28f5-4266-8e62-8f9f8d98e8b1", (msg) => {
      console.log("server msg:", msg)
    })
  } catch (error) {
    console.error("Error publishing test message:", error)
  }
}

//testSub()

const checkPresence = async () => {
  console.log("helloc")
  await ablyClient.connection.once("connected")
  console.log("connected to abkt")
}
checkPresence()
