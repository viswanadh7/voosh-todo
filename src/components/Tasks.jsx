import React, { useState } from 'react'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import TaskCard from './TaskCard'


function addNewTask(task) {
    return axios.post('http://localhost:8000/tasks', task)
}
function updateStage(id, stage) {
    // console.log('Modified Stage: ', stage)
    const newStage = { stage: stage }
    return axios.patch(`http://localhost:8000/tasks/${id}`, newStage)
}
function updateTask(id, task) {
    return axios.put(`http://localhost:8000/tasks/${id}`, task)
}
function Tasks() {
    const [showForm, setShowForm] = useState(false)
    const [draggingCard, setDraggingCard] = useState(null)
    const [stageByDrop, setStageByDrop] = useState()
    const [isEditing, setIsEditing] = useState(false)
    const [editingPostID, setEditingPostID] = useState()
    const [task, setTask] = useState({ heading: '', description: '', date: Date().toLocaleString(), stage: 'todo' })

    const { data, refetch } = useQuery({ queryKey: ['getTasks'], queryFn: () => { return axios.get('http://localhost:8000/tasks') } })
    const { mutate: addMutation } = useMutation({
        mutationFn: () => addNewTask(task),
        onSuccess: () => {
            refetch();
            setTask({ heading: '', description: '', date: Date().toLocaleString(), stage: 'todo' })
        }
    });

    const { mutate: changeStageMutation } = useMutation({
        mutationFn: () => updateStage(draggingCard, stageByDrop),
        onSuccess: refetch(),
    });

    const { mutate: updateMutate } = useMutation({
        mutationFn: () => updateTask(editingPostID, task),
        onSuccess: () => {
            refetch();
            setTask({ heading: '', description: '', date: Date().toLocaleString(), stage: 'todo' })
        },
    });
    function handleTaskSubmit(e) {
        e.preventDefault()
        if (isEditing) {
            updateMutate()
        } else {
            addMutation()
        }
    }

    function droppedInStage(stage) {
        // console.log(stage, draggingCard)
        setStageByDrop(stage)
        changeStageMutation()
    }

    return (
        <div className='px-10'>
            <div className='mt-5'>
                <button onClick={() => setShowForm(true)} className='bg-blue-700 text-white px-5 py-1 rounded-md mb-3'>Add task</button>
                <form onSubmit={(e) => handleTaskSubmit(e)} className={`border flex flex-col gap-3 w-1/2 p-5 mb-5 ${showForm || isEditing ? '' : 'hidden'}`} action="">
                    <input required className='border rounded px-3 py-1' onChange={(e) => setTask({ ...task, heading: e.target.value })} value={task.heading} type="text" placeholder='Task title...' />
                    <textarea className='border rounded px-3 py-1' onChange={(e) => setTask({ ...task, description: e.target.value })} value={task.description} name="" id="" placeholder='Description'></textarea>
                    <div className='flex justify-around gap-10'>
                        <button className='border w-full py-1' onClick={() => { setShowForm(false); setIsEditing(false) }}>Cancel</button>
                        <button type="submit" className='border w-full py-1'>{isEditing ? 'Update' : 'Add task'}</button>
                        {/* <input type="submit" value="Add task" className='border w-full py-1' /> */}
                    </div>
                </form>

                <div className='shadow-md border py-3 flex justify-between px-5'>
                    <div className='flex gap-3'>
                        <p>Search:</p>
                        <input className='border rounded w-full px-3' type="text" name="" id="" placeholder='Search...' />
                    </div>
                    <div className='flex gap-3'>
                        <p>Sort by:</p>
                        <button>Recent</button>
                    </div>
                </div>
            </div>
            <div className='lg:grid grid-cols-3 gap-5 mt-5'>
                <div onDragOver={(e) => e.preventDefault()} onDrop={() => droppedInStage('todo')} className='border shadow-md p-3'>
                    <h1 className='bg-blue-600 w-full px-2 mb-5 text-white py-1 font-semibold'>TODO</h1>
                    {data?.data.map((item) => {
                        if (item.stage === 'todo') {
                            return (
                                <TaskCard key={item._id} refetch={refetch} item={item} setDraggingCard={setDraggingCard} setIsEditing={setIsEditing} setTask={setTask} setEditingPostID={setEditingPostID} />
                            )
                        }
                    })}
                </div>
                <div onDragOver={(e) => e.preventDefault()} onDrop={() => droppedInStage('inProcess')} className='border shadow-md p-3'>
                    <h1 className='bg-blue-600 w-full px-2 mb-5 text-white py-1 font-semibold'>IN PROCESS</h1>
                    {data?.data.map((item) => {
                        if (item.stage === 'inProcess') {
                            return (
                                <TaskCard key={item._id} refetch={refetch} item={item} setDraggingCard={setDraggingCard} setIsEditing={setIsEditing} setTask={setTask} setEditingPostID={setEditingPostID} />
                            )
                        }
                    })}
                </div>
                <div onDragOver={(e) => e.preventDefault()} onDrop={() => droppedInStage('done')} className='border shadow-md p-3'>
                    <h1 className='bg-blue-600 w-full px-2 mb-5 text-white py-1 font-semibold'>DONE</h1>
                    {data?.data.map((item) => {
                        if (item.stage === 'done') {
                            return (
                                <TaskCard key={item._id} refetch={refetch} item={item} setDraggingCard={setDraggingCard} setIsEditing={setIsEditing} setTask={setTask} setEditingPostID={setEditingPostID} />
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default Tasks
