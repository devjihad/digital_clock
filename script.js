let is24Hour = true;
let alarms = [];

const clock = document.getElementById("clock");
const alarmSound = document.getElementById("alarmSound");

// Update Clock
function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let ampm = "";

  if (!is24Hour) {
    ampm = hours >= 12 ? " PM" : " AM";
    hours = hours % 12 || 12;
  }

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  clock.textContent = `${hours}:${minutes}:${seconds}${ampm}`;

  checkAlarms(`${hours}:${minutes}`);
}

setInterval(updateClock, 1000);

// Toggle 12/24 Format
document.getElementById("toggleFormat").addEventListener("click", () => {
  is24Hour = !is24Hour;
  document.getElementById("toggleFormat").textContent =
    is24Hour ? "Switch to 12H" : "Switch to 24H";
});

// Set Alarm
function setAlarm() {
  const input = document.getElementById("alarmTime").value;
  if (!input) return alert("Select a time!");

  alarms.push(input);
  renderAlarms();
}

// Render Alarm List
function renderAlarms() {
  const list = document.getElementById("alarmList");
  list.innerHTML = "";

  alarms.forEach((alarm, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${alarm}
      <button onclick="deleteAlarm(${index})">X</button>
    `;
    list.appendChild(li);
  });
}

// Delete Alarm
function deleteAlarm(index) {
  alarms.splice(index, 1);
  renderAlarms();
}

// Check Alarms
function checkAlarms(currentTime) {
  alarms.forEach((alarm) => {
    if (alarm === currentTime) {
      alarmSound.play();
      alert("⏰ Alarm ringing!");
    }
  });
}