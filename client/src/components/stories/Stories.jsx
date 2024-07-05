import React, { useContext, useState } from 'react';
import './stories.scss';
import { AuthContext } from '../../context/authContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import StoryModal from '../StoryModal/StoryModal';

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const [openStory, setOpenStory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['stories'],
    queryFn: () => makeRequest.get('/stories').then((res) => res.data),
  });

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedImage);
      const res = await makeRequest.post('/upload', formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const addStoryMutation = useMutation({
    mutationFn: async (newStory) => {
      const imgUrl = await upload();
      return makeRequest.post('/stories', { ...newStory, img: `/upload/${imgUrl}` });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['stories']);
      setSelectedImage(null);
      setShowForm(false);
    },
  });

  const deleteStoryMutation = useMutation({
    mutationFn: (storyId) => {
      return makeRequest.delete(`/stories/${storyId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['stories']);
      setOpenStory(null); // Close modal after deleting
    },
  });

  const handleAddStory = () => {
    setShowForm(!showForm);
  };

  const handleChooseImage = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedImage) return;
    addStoryMutation.mutate({ userId: currentUser.id });
  };

  const handleDeleteStory = (storyId) => {
    deleteStoryMutation.mutate(storyId);
  };

  const handleClickStory = (story) => {
    setOpenStory(story);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedImage(null);
  };

  return (
    <div className="stories">
      <div className="story">
        {showForm && (
          <div className="overlay">
            <div className="form-container">
              <div className="close-icon" onClick={handleCloseForm}>
                ✕
              </div>
              <input type="file" accept="image/*" onChange={handleChooseImage} />
              {selectedImage && (
                <img
                  className="preview-image"
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                />
              )}
              <button onClick={handleUpload}>Upload</button>
            </div>
          </div>
        )}
        {!showForm && (
          <button className="add-story" onClick={handleAddStory}>
            +
          </button>
        )}
        <img src={'/upload/' + currentUser.profilePic} alt="" />
        <span className="username">{currentUser.name}</span>
      </div>
      {error ? (
        'Something went wrong'
      ) : isLoading ? (
        'loading'
      ) : (
        data.map((story) => (
          <div className="story" key={story.id}>
            <span className="username">{story.name}</span>
            <img
              alt={story.name}
              src={story.img}
              onClick={() => handleClickStory(story)}
            />
            {openStory && (
              <StoryModal
                story={openStory}
                onClose={() => setOpenStory(null)}
                isOwner={openStory.userId === currentUser.id}
                onDelete={() => handleDeleteStory(openStory.id)}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Stories;
