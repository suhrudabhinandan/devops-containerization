import React, { useState } from "react";
import {
  useGetAnnouncementsQuery,
  useCreateAnnouncementMutation,
} from "../../Slice/announcementSlice";
import "./Announcement.css";

const Announcement = () => {
  const { data, isLoading, error } = useGetAnnouncementsQuery();


  const announcements = Array.isArray(data) ? data : data?.announcements || [];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [createAnnouncement, { isLoading: isCreating }] = useCreateAnnouncementMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!title.trim() || !description.trim()) {
      setErrorMsg("Title and Description are required");
      return;
    }

    try {
      await createAnnouncement({ title: title.trim(), description: description.trim() }).unwrap();
      setSuccessMsg("Announcement created successfully");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setErrorMsg(err?.data?.error || "Failed to create announcement");
    }
  };

  if (isLoading) return <div className="loading">Loading announcements...</div>;
  if (error) return <div className="error">Error loading announcements</div>;

  return (
    <div className="announcement-page">
      <h1>Announcements</h1>

      <div className="announcement-form">
        <h2>Create New Announcement</h2>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        {successMsg && <p className="success-msg">{successMsg}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Announcement Title"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-label="Announcement Description"
          />
          <button type="submit" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create"}
          </button>
        </form>
      </div>

      <div className="announcement-list">
        {announcements.length === 0 ? (
          <p>No announcements found</p>
        ) : (
          announcements.map((item) => (
            <div key={item.id} className="announcement-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <small>
                Posted on: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Unknown"}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcement;
