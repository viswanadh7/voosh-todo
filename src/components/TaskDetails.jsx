import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import instance from '../utils/instance'

function TaskDetails() {
    const params = useParams()
    const { data } = useQuery({ queryKey: ['taskDetails'], queryFn: () => { return instance.get(`/tasks/${params.id}`) } })
    // console.log(data?.data)
    return (
        <div className="grid grid-cols-5 gap-10 h-screen bg-slate-400">
            <div className='col-span-1'></div>
            <div className='col-span-3 bg-blue-100 p-5 rounded-md my-2 h-fit mt-10'>
                <h1 className='text-lg font-semibold'>{data?.data.heading}</h1>
                <p className='text-gray-800'>{data?.data.description}</p>
                <p className='text-sm font-extralight my-5'>Created at: {data?.data.date}</p>
                <div className='col-span-1 flex justify-end'>
                    <Link to='/' className='bg-gray-600 text-white px-4 py-1 rounded-md text-lg'>Close</Link>
                </div>
            </div>
            <div className='col-span-1'></div>
        </div>
    )
}

export default TaskDetails
