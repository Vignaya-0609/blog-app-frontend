import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
function CreateBlogModal({ show, handleClose, onBlogCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [thumbnailError, setThumbnailError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const user = JSON.parse(localStorage.getItem("Bloguser"));
  
  const titleCheck = () => {
    if (title.trim() === '') {
      setTitleError('Title is required');
    } else {
      setTitleError('');
    }
  };

  const contentCheck = () => {
    if (content.trim() === '') {
      setContentError('Content is required');
    } else {
      setContentError('');
    }
  };

  const thumbnailCheck = () => {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  
    if (thumbnail === null || thumbnail.trim() === "") {
      setThumbnailError("Thumbnail URL is required");
    } else if (!urlRegex.test(thumbnail.trim())) {
      setThumbnailError("Valid thumbnail URL is required");
    } else {
      setThumbnailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    titleCheck();
    contentCheck();
    thumbnailCheck();

    if (titleError || contentError || thumbnailError || !title || !content || !thumbnail) {
      console.log('Validation failed');
      return;
    }

    const newBlog = {
      title,
      content,
      thumbnail,
      userId: user._id
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/createBlog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });

      if (response.ok) {
        console.log('Blog created successfully');
        setShowToast(true);
        handleClose();
        setTitle('');
        setContent('');
        setThumbnail('');
        onBlogCreated();
      } else {
        console.error('Failed to create blog');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>    
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title <span className='text-danger'>*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyUp={titleCheck}
              isInvalid={!!titleError}
            />
            <Form.Control.Feedback type="invalid">{titleError}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContent">
            <Form.Label>Content <span className='text-danger'>*</span></Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter blog content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyUp={contentCheck}
              isInvalid={!!contentError}
            />
            <Form.Control.Feedback type="invalid">{contentError}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formThumbnail">
            <Form.Label>Thumbnail URL <span className='text-danger'>*</span></Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter thumbnail URL"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              onKeyUp={thumbnailCheck}
              isInvalid={!!thumbnailError}
            />
            <Form.Control.Feedback type="invalid">{thumbnailError}</Form.Control.Feedback>
          </Form.Group>

          <div className='d-flex justify-content-between'>
            <Button variant="secondary" onClick={() => {
              setTitle('');
              setContent('');
              setThumbnail('');
              setTitleError('');
              setContentError('');
              setThumbnailError('');
            }}>
              Reset
            </Button>
            <Button variant="primary" type="submit">
              Create Blog
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
    <ToastContainer position="bottom-end" className="p-3">
        <Toast bg="success" onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Body className='text-light'>Blog has been created successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default CreateBlogModal;
