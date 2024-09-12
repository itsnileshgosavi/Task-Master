import React from 'react'
import Card from './Card'

const TaskList = ({filteredTasks, getTasks}) => {
 
  return (
    <div className='flex flex-col md:flex-row md:flex-wrap'>
        {filteredTasks.map((task) => (
            <Card key={task._id} title={task.title} getTasks={getTasks} content={task.content} status={task.status} createdAt={task.addedDate} id={task._id}/>
        ))}
    </div>
  )
}

export default TaskList