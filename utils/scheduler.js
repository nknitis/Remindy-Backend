// scheduler.js
import cron from "node-cron";
import Task from "../models/Task.js";
import sendEmail from "./emailService.js";

/**
 * Scheduler that runs every minute.
 * Finds tasks due at the current time (HH:mm) and sends reminder emails.
 */
const startScheduler = () => {
  // Run every minute
  cron.schedule("* * * * *", async () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const currentTime = `${hh}:${mm}`;

    try {
      // ✅ Only fetch tasks that are due & not completed
      const tasks = await Task.find({
        time: currentTime,
        completed: false,
      }).lean();

      if (tasks.length === 0) {
        console.log(`⏰ ${currentTime} - No pending tasks.`);
        return;
      }

      console.log(`📌 ${currentTime} - Found ${tasks.length} task(s)`);

      // ✅ Use Promise.allSettled instead of Promise.all
      // so one failed email won't stop others
      const results = await Promise.allSettled(
        tasks.map((t) =>
          sendEmail(
            t.email,
            "Task Reminder",
            `Reminder: ${t.title} (time: ${t.time})`
          )
        )
      );

      results.forEach((res, idx) => {
        if (res.status === "fulfilled") {
          console.log(`✅ Email sent to ${tasks[idx].email}`);
        } else {
          console.error(`⚠️ Failed to send email to ${tasks[idx].email}`, res.reason);
        }
      });
    } catch (err) {
      console.error("❌ Scheduler DB error:", err.message);
    }
  });

  console.log("🚀 Scheduler started (node-cron)…");
};

export default startScheduler;
