'use client'

import  { useState } from 'react';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import TaskForm from '../TaskForm/TaskForm';
import toast from 'react-hot-toast';


function Tasks({ task, fetchData, filteredUsers }) {
  const [isChecked, setIsChecked] = useState(task.status);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [loading , setLoading] = useState(false)

  console.log(task)


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
      console.log(data);
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
    setLoading(true)
    try {
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/deleteTask/${theTask}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message)
         setLoading(false)
        return;
      }
      setLoading(false)
      fetchData();
    } catch (error) {
     toast.error(error.message)
     setLoading(false)
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">{task.title}</h2>
        <p className="text-gray-700 mb-4">{task.description}</p>
        <div className="flex justify-between items-center mb-4">
          <p className={`px-2 py-1 rounded ${isChecked ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {isChecked ? 'Completed' : 'Pending'}
          </p>
          <p className="text-gray-500 mb-2">{task.assigned_to?  `Assigned To: ${task.assigned_to_username}`:  'Unassigned'}</p>
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={() => setShowTaskForm(true)} className="text-blue-500 hover:text-blue-700">
            <FaEdit />
          </button>
          <button disabled={loading} onClick={() => handleDelete(task.id)} className="text-red-500 hover:text-red-700">
            <FaTrash />
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