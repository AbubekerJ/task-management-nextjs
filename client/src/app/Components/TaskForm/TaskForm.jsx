'use client'

import React, { useEffect, useState } from 'react';
import { useUser } from '@/app/Context/UserContext';
import toast from 'react-hot-toast';


function TaskForm({ mode, setShowTaskForm, task, filteredUsers, fetchData }) {
 const {currentUser }=useUser()
  const editMode = mode === 'edit';
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: editMode ? task.title : '',
    description: editMode ? task.description : '',
    status: editMode ? task.status : false,
    created_by: currentUser.id,
    assigned_to: editMode ? task.assigned_to : null,
  });

  const handleChange = (e) => {
    if (e.target.id === 'assigned_to') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value === '' ? null : e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    try {
     
      if (editMode) {
        if(task.created_by_username!==currentUser.username){
          toast.error('You can only complete Assigned task')
          setLoading(false)
          return;
        }
  
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/updateTask/${task.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (data.success === false) {
          toast.error(data.message)
          setLoading(false);
          return;
        } else {
          fetchData();
          setShowTaskForm(false);
          setLoading(false);
        }
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/createtask`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (data.success === false) {
          toast.error(data.message);
          setLoading(false);
          return;
        } else {
          fetchData();
          setShowTaskForm(false);
          setLoading(false);
          toast.success('Task created successfully')
        }
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4">
        <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit Task' : 'Create Task'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700">Title</label>
            <input
              required
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700">Description</label>
            <textarea
              required
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="assigned_to" className="block text-gray-700">Assign To</label>
            <select
              id="assigned_to"
              value={formData.assigned_to}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value=''>Unassign</option>
              {filteredUsers.length > 0 && filteredUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col md:flex-row justify-end md:space-x-2 space-y-2 md:space-y-0">
            <button
              type="button"
              onClick={() => setShowTaskForm(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 w-full md:w-auto"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full md:w-auto"
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default TaskForm;