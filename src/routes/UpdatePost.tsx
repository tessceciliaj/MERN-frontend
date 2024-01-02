import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ActionFunctionArgs, redirect } from "react-router-dom";
import auth from "../lib/auth";

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const { id } = params;
    const formData = await request.formData();

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${auth.getJWT()}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const { message } = await response.json();
        return { message };
    }

    return redirect('/');
};


const UpdatePost = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
      title: '',
      link: '',
      body: '',
    });
  
    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}`);
          if (response.ok) {
            const postData = await response.json();
  
            setFormData({
              title: postData.title || '', 
              link: postData.link || '',
              body: postData.body || '',
            });
          } else {
            console.error('Failed to fetch post data');
          }
        } catch (error) {
          console.error('Fetch Error:', error);
        }
      };
  
      fetchPost();
    }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Post updated successfully');
        // redirect or perform other actions after successful update
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      console.error('Update Error:', error);
    }
  };

  return (
    <div>
      <h2>Update Post</h2>
      <label htmlFor="title">Update title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="link">Update Link:</label>
      <input
        type="text"
        name="link"
        value={formData.link}
        onChange={handleInputChange}
      />
      <label htmlFor="body">Update text:</label>
      <textarea
        name="body"
        value={formData.body}
        onChange={handleInputChange}
      ></textarea>
      <button onClick={handleUpdate}>Save Changes</button>
    </div>
  );
};

export default UpdatePost;
