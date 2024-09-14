import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function DeleteModal({ show, handleClose, blogId, onBlogDeleted }) {
  const [showToast, setShowToast] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/deleteBlog/${blogId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Blog deleted successfully');
        setShowToast(true);
        onBlogDeleted();
        handleClose();
      } else {
        console.error('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Blog Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this blog? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast bg="danger" onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Body className='text-light'>Blog has been deleted successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default DeleteModal;
