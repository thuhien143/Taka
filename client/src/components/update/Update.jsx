import "./update.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Update = ({ setOpenUpdate, user }) => {
  const [name, setName] = useState(user.name || "");
  const [city, setCity] = useState(user.city || "");
  const [website, setWebsite] = useState(user.website || "");
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedUser) => {
      const formData = new FormData();
      formData.append("name", updatedUser.name);
      formData.append("city", updatedUser.city);
      formData.append("website", updatedUser.website);
      if (updatedUser.profilePic) {
        formData.append("profilePic", updatedUser.profilePic);
      }
      if (updatedUser.coverPic) {
        formData.append("coverPic", updatedUser.coverPic);
      }
      return makeRequest.put("/users/" + user.id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", user.id]);
      setOpenUpdate(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      name: name || user.name,
      city: city || user.city,
      website: website || user.website,
      profilePic: profilePic || user.profilePic,
      coverPic: coverPic || user.coverPic,
    });
  };

  return (
    <div className="update">
      <div className="wrapper">
        <button className="close" onClick={() => setOpenUpdate(false)}>
          <CloseIcon />
        </button>
        <h1>Update Your Profile</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </label>

          <label>
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
          </label>

          <label>
            Website
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Website"
            />
          </label>

          <label>
            Profile Picture
            <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} />
          </label>

          <label>
            Cover Picture
            <input type="file" onChange={(e) => setCoverPic(e.target.files[0])} />
          </label>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
