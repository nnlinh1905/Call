Pusher.logToConsole = true;

var pusher = new Pusher("92ba044193be18fa28a5", {
  cluster: "mt1",
});

var channel = pusher.subscribe("my-channel");
channel.bind("my-event", function (data) {
  alert(JSON.stringify(data));
});
