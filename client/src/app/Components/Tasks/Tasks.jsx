'use client'

import  { useState } from 'react';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import TaskForm from '../TaskForm/TaskForm';
import toast from 'react-hot-toast';


function Tasks({ task, fetchData, filteredUsers }) {
  const [isChecked, setIsChecked] = useState(task.status);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [loading , setLoading] = useState(false)
  const [Deleteloading , setDeleteloading] = useState(false)




  const handleCheckboxChange = async (e, theTask) => {
    const updatedStatus = e.target.checked;
    setLoading(true)
    try {
      
     
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/updateTask/${theTask}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          status: updatedStatus,
          assigned_to: task.assigned_to,
         
        }),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message)
        setLoading(false)
        return;
      }
    
      toast.success('Status update successfully')
      setIsChecked(updatedStatus); 

      fetchData(); 
      setLoading(false)
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  };

  const handleDelete = async (theTask) => {
    setDeleteloading(true)
    try {
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/deleteTask/${theTask}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message)
         setDeleteloading(false)
        return;
      }
      setDeleteloading(false)
      fetchData();
    } catch (error) {
     toast.error(error.message)
     setDeleteloading(false)
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">{task.title}</h2>
        <p className="text-gray-700 mb-4">{task.description}</p>
        <div className="flex flex-row gap-2 sm:flex justify-between items-center mb-4 ">
          <p className={`px-2 py-1 rounded ${isChecked ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {isChecked ? 'Completed' : 'Pending'}
          </p>
             <div className='flex flex-col text-sm text-gray-500'>
             <span>{task.assigned_to ? `Assigned by: ${task.created_by_username}` : 'Unassigned'}</span> 
             <span>{task.assigned_to ? `Assigned to: ${task.assigned_to_username}` : 'Unassigned'}</span> 
             </div>
            
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={() => setShowTaskForm(true)} className="text-blue-500 hover:text-blue-700">
            <FaEdit />
          </button>
          <button disabled={loading} onClick={() => handleDelete(task.id)} className="text-red-500 hover:text-red-600">
          {Deleteloading ?
        <div role="status">
            <svg aria-hidden="true" class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
        :<FaTrash />} 
          </button>
          <label className="flex items-center space-x-2">
            <input
              disabled={loading}
              type="checkbox"
              checked={isChecked}
              onChange={(e) => handleCheckboxChange(e, task.id)}
              className="form-checkbox"
            />
            <span>Complete</span>
          </label>
        </div>
        <p className="text-gray-400 mt-4 text-sm">Created at: {new Date(task.created_at).toLocaleString()}</p>
        
      </div>
      {showTaskForm && (
        <TaskForm mode={'edit'} setShowTaskForm={setShowTaskForm} task={task} fetchData={fetchData} filteredUsers={filteredUsers} />
      )}
    </>
  );
}

export default Tasks;