import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { Modal, Button, Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import Link from 'next/link'
import { useAuth } from "../context/Auth";
import { storage } from "../utils/firebase";

export const Profile = () => {
  const { currentUser, updatePhoto } = useAuth();
  const [image, setImage] = useState();
  const [showImgModal, setShowImgModal] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [uploadProgress, setUploadprogress] = useState(0);
  const [succes, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShowImgModal(false);
  const handleShowImgModal = () => setShowImgModal(true);

  function defaultPhoto() {
    const userPhoto = ref(storage, "img/user.png");
    getDownloadURL(userPhoto)
      .then((img) => {
        setImage(img);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleImageUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    setImageFile(file);
  }

  function handleImage() {
    if (!imageFile) return;

    const storageRef = ref(storage, `/img/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setLoading(true);
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setUploadprogress(progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((img) => {
            setSuccess("");
            updatePhoto(img);
            setSuccess("Images changed successfully!");
            setTimeout(() => {
              window.location.reload(false);
            }, 1000);
            return;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  }

  defaultPhoto();

  return (
    <>
      <Modal show={showImgModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {succes && <Alert variant="success">{succes}</Alert>}
          Upload Progress {uploadProgress} %
        </Modal.Body>
        <Modal.Footer>
          <div className="input-group mb-3">
            <input
              type="file"
              className="form-control"
              onChange={handleImageUpload}
            />
            <Button
              className="input-group-text"
              onClick={handleImage}
              disabled={loading}
            >
              Upload
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <div className="mt-5">
        <div className="row mt-5">
          <div className="col p-5">
            <div className="text-center pb-3">
              <h3>User Profile</h3>
            </div>

            <div className="text-center pb-4">
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Click to update image</Tooltip>}
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt=""
                    className="rounded-circle"
                    width="74.5"
                    onClick={handleShowImgModal}
                  />
                ) : (
                  <img
                    src={image}
                    alt=""
                    className="rounded"
                    width="70"
                    onClick={handleShowImgModal}
                  />
                )}
              </OverlayTrigger>
            </div>

            <p>
              <strong>UID</strong> : {currentUser.uid}
            </p>
            {currentUser.displayName && (
              <p>
                <strong>Username</strong> : {currentUser.displayName}
              </p>
            )}
            <p>
              <strong>Email</strong> : {currentUser.email}
            </p>

            <div className="text-center pt-4 d-grid">
              <Link href="/update-profile" className="btn btn-primary">
                Update Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
