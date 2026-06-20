/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  Mail,
  GraduationCap,
  Pencil,
  Trophy,
  Target,
  Brain,
} from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    college: "",
    github: "",
    linkedin: "",
    skills: "",
    profileImage: "",
  });

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/user/profile", {
        headers: {
          Authorization: token,
        },
      });

      setUser(res.data);

      setFormData({
        ...res.data,
        skills: res.data.skills?.join(", "),
      });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      await axios.put(
        "http://localhost:3001/api/user/profile",
        {
          ...formData,
          skills: formData.skills.split(",").map((skill) => skill.trim()),
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      setOpen(false);

      fetchProfile();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!user) return null;

  return (
    <div className="p-8 text-white">
      {/* Header */}

      <div className="relative rounded-3xl overflow-hidden">
        <div className="h-56 bg-linear-to-r from-indigo-600 via-purple-600 to-blue-600"></div>

        <div className="absolute bottom-10 left-10">
          <img
            src={
              user.profileImage ||
              `https://ui-avatars.com/api/?name=${user.name}`
            }
            alt=""
            className="w-32 h-32 rounded-full border-4 border-[#0B1120]"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold">{user.name}</h1>

          <p className="text-slate-400 mt-2">{user.bio || "Add your bio"}</p>

          <div className="flex gap-5 mt-4">
            <span className="flex items-center gap-2">
              <GraduationCap size={18} />
              {user.college || "College"}
            </span>

            <span className="flex items-center gap-2">
              <Mail size={18} />
              {user.email}
            </span>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 px-5 py-3 rounded-xl hover:bg-indigo-700"
        >
          <Pencil size={18} />
          Edit Profile
        </button>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="bg-[#111827] p-6 rounded-2xl">
          <Target className="text-indigo-400" />
          <h2 className="text-3xl font-bold mt-3">24</h2>
          <p className="text-slate-400">Interviews Completed</p>
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl">
          <Brain className="text-green-400" />
          <h2 className="text-3xl font-bold mt-3">84%</h2>
          <p className="text-slate-400">Average Score</p>
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl">
          <Trophy className="text-yellow-400" />
          <h2 className="text-3xl font-bold mt-3">Gold</h2>
          <p className="text-slate-400">Current Rank</p>
        </div>
      </div>

      {/* Skills */}

      <div className="bg-[#111827] rounded-2xl p-6 mt-8">
        <h2 className="text-xl font-semibold mb-5">Skills</h2>

        <div className="flex flex-wrap gap-3">
          {user.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-indigo-600/20 text-indigo-400 px-4 py-2 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}

      <div className="bg-[#111827] rounded-2xl p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Social Links</h2>

        <div className="space-y-3">
          <a
            href={user.github}
            target="_blank"
            className="flex items-center gap-2 text-slate-300"
          >
            <FaGithub size={18} />
            Github
          </a>

          <a
            href={user.linkedin}
            target="_blank"
            className="flex items-center gap-2 text-slate-300"
          >
            <FaLinkedin size={18} />
            LinkedIn
          </a>
        </div>
      </div>

      {/* Modal */}

      {open && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-[#111827] p-8 rounded-2xl w-175">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="bg-slate-900 p-3 rounded-lg"
              />

              <input
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="College"
                className="bg-slate-900 p-3 rounded-lg"
              />

              <input
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="Github"
                className="bg-slate-900 p-3 rounded-lg"
              />

              <input
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn"
                className="bg-slate-900 p-3 rounded-lg"
              />

              <input
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                placeholder="Profile Image URL"
                className="bg-slate-900 p-3 rounded-lg col-span-2"
              />

              <input
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node, MongoDB"
                className="bg-slate-900 p-3 rounded-lg col-span-2"
              />

              <textarea
                rows="4"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
                className="bg-slate-900 p-3 rounded-lg col-span-2"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2 bg-slate-700 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={saveProfile}
                className="px-5 py-2 bg-indigo-600 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
