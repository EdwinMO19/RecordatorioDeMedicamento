document.addEventListener("DOMContentLoaded", function() {
    const setReminderBtn = document.getElementById("setReminderBtn");
  
    setReminderBtn.addEventListener("click", function() {
      const medicationName = document.getElementById("medicationName").value;
      const medicationTime = document.getElementById("medicationTime").value;
  
      if (medicationName === "" || medicationTime === "") {
        alert("Por favor complete todos los campos.");
        return;
      }
  
      const now = new Date();
      const [hours, minutes] = medicationTime.split(":");
      const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  
      if (reminderTime < now) {
        reminderTime.setDate(reminderTime.getDate() + 1);
      }
  
      const reminder = {
        name: medicationName,
        time: reminderTime
      };
  
      localStorage.setItem("reminder", JSON.stringify(reminder));
  
      scheduleNotification(reminderTime, medicationName);
  
      alert(`Recordatorio configurado para ${medicationTime} para tomar ${medicationName}.`);
    });
  
    function scheduleNotification(reminderTime, medicationName) {
      if (!("Notification" in window)) {
        alert("Este navegador no soporta notificaciones push.");
        return;
      }
  
      if (Notification.permission === "granted") {
        const options = {
          body: `Es hora de tomar ${medicationName}.`,
          icon: "notification-icon.png"
        };
        const notification = new Notification("Recordatorio de Medicación", options);
  
        notification.onclick = function() {
          window.focus();
          this.close();
        };
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
          if (permission === "granted") {
            const options = {
              body: `Es hora de tomar ${medicationName}.`,
              icon: "notification-icon.png"
            };
            const notification = new Notification("Recordatorio de Medicación", options);
  
            notification.onclick = function() {
              window.focus();
              this.close();
            };
          }
        });
      }
    }
  });
  