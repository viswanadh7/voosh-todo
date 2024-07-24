import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import instance from '../utils/instance'


function deleteTask(id) {
    return instance.delete(`/tasks/${id}`)
}
function TaskCard({ item, refetch, setDraggingCard, setIsEditing, setTask, setEditingPostID }) {

    const { mutate: deleteMutate } = useMutation({
        mutationFn: () => deleteTask(item._id),
        onSuccess: () => {
            refetch();
            queryClient.invalidateQueries({ queryKey: ["getTasks"] })
        }
    });
    return (
        <div className='bg-blue-100 p-5 rounded-md my-2' draggable onDrag={() => setDraggingCard(item._id)} onDragEnd={() => setDraggingCard(null)}>
            <h1 className='text-lg font-semibold'>{item.heading}</h1>
            <p className='text-gray-800 max-h-36 overflow-y-hidden'>{item.description}</p>
            <span>. . .</span>
            <p className='text-sm font-extralight my-5'>Created at: {item.date}</p>
            <div className='flex justify-end'>
                <div className='flex gap-3'>
                    <button onClick={() => deleteMutate()} className='bg-red-600 rounded text-white px-3 py-1'>Delete</button>
                    <button onClick={() => { setIsEditing(true); setTask(item); setEditingPostID(item._id) }} className='bg-blue-500 rounded text-white px-3 py-1'>Edit</button>
                    <Link to={`/home/task/${item._id}`} className='bg-blue-700 rounded text-white px-3 py-1'>View Details</Link>
                </div>
            </div>
        </div>
    )
}

export default TaskCard
