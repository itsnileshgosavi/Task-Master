import React from 'react'
import YourTasks from './yourTasks'

export const metadata = {
  title: "Your Tasks : Task Manager",
  description: "View your tasks here",
};

export default function taskspage() {
  return (
        <>
      <div>
          <YourTasks/>
      </div>
        </>
  )
}
