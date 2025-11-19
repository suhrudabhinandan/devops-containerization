import React, { useEffect, useState } from "react";
import { useGetAnnouncementsQuery } from "../../Slice/Api-Slice/announcementApiSlice";
import "./Announcement.css";

const Announcement = () => {

  const { data, isLoading, isError, error } = useGetAnnouncementsQuery();
  const [unreadCount, setUnreadCount] = useState(0);

 
  const user = JSON.parse(localStorage.getItem("student")) || null;

 
  const userKey = user ? user.id || user._id || user.email : "guest";

 
  const announcements = Array.isArray(data) ? data : data?.announcements || [];

  
  useEffect(() => {
    const lastVisit =
      localStorage.getItem(`lastAnnouncementVisit_${userKey}`) || 0;

    const count = announcements.filter(
      (a) => new Date(a.createdAt).getTime() > Number(lastVisit)
    ).length;

    setUnreadCount(count);
  }, [announcements, userKey]);

  
  useEffect(() => {
    return () => {
      localStorage.setItem(`lastAnnouncementVisit_${userKey}`, Date.now());
    };
  }, [userKey]);


  if (isLoading) return <div className="loading">Loading announcements...</div>;

  if (isError)
    return (
      <div className="error">
        Error:{" "}
        {error?.data?.message || error?.error || "Failed to load announcements"}
      </div>
    );


  const handleMarkAsRead = () => {
    localStorage.setItem(`lastAnnouncementVisit_${userKey}`, Date.now());
    setUnreadCount(0);
  };

  return (
    <div className="announcement-page">
      <div className="announcement-header">
        <h1>
          Announcements{" "}
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </h1>

        {unreadCount > 0 && (
          <button className="mark-read-btn" onClick={handleMarkAsRead}>
            Mark all as read
          </button>
        )}
      </div>

      {announcements.length === 0 ? (
        <p>No announcements available</p>
      ) : (
        <div className="announcement-list">
          {announcements.map((item) => (
            <div key={item.id} className="announcement-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <small>
                Posted on:{" "}
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : "Unknown date"}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcement;
