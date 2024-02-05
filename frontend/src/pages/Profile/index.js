import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { Link } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@firebase/storage";
import { firebaseConfig } from "../Login/authConfig";
import Footer from "../../components/Footer";
import ProfileEditModal from "../../components/ProfileEditModal";
import AddProject from "../../components/AddProject";

import Navbar2 from "../../components/navbar2";

// Initialize Firebase with the configuration
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
function Profile({ isAuthenticated, SERVER_URL }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [serverURL, setServerURL] = useState("");
  const [isfollowing, setisfollowing] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const profile = {
    name: "Vikas Anand",
    designation: "Graphic Designer",
    about:
      "Our Car Rental online booking system designed to meet the specific needs of car rental business owners. This easy-to-use car rental software will let you manage.Our Car Rental online booking system designed to meet the specific.",
    email: "xyz@gmail.com",
    graduationPeriod: 2026,
    profileUrl:
      "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk",
    savedProjects: [
      {
        title: "E-commerce Website Redesign",
        description:
          "Redesigning the user interface and experience of an existing e-commerce website.",
        category: "Web",
        bannerUrl: "https://source.unsplash.com/800x400/?web-development",
        extraMedia: "https://source.unsplash.com/800x600/?ecommerce",
        status: "Need help",
        statusMessage: "Currently working on the frontend components.",
        listTechnologies: ["React", "Node.js", "MongoDB", "Redux"],
        creator: "John Doe",
        likes: 120,
        saved: 56,
        collaborators: ["Jane Smith", "Bob Johnson"],
        courseLink: "https://example.com/web-development-course",
        rating: 4.7,
      },
      {
        title: "Mobile App for Fitness Tracking",
        description:
          "Developing a mobile app to track and analyze fitness activities.",
        category: "App",
        bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
        extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
        status: "Completed",
        statusMessage: "App successfully launched on app stores.",
        listTechnologies: ["Swift", "iOS", "Firebase"],
        creator: "Alice Johnson",
        likes: 256,
        saved: 78,
        collaborators: ["Charlie Brown"],
        courseLink: "https://example.com/mobile-app-development-course",
        rating: 4.9,
      },
      {
        title: "Mobile App for Fitness Tracking",
        description:
          "Developing a mobile app to track and analyze fitness activities.",
        category: "Design",
        bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
        extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
        status: "Completed",
        statusMessage: "App successfully launched on app stores.",
        listTechnologies: ["Swift", "iOS", "Firebase"],
        creator: "Alice Johnson",
        likes: 256,
        saved: 78,
        collaborators: ["Charlie Brown"],
        courseLink: "https://example.com/mobile-app-development-course",
        rating: 4.9,
      },
      {
        title: "Mobile App for Fitness Tracking",
        description:
          "Developing a mobile app to track and analyze fitness activities.",
        category: "Web",
        bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
        extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
        status: "Completed",
        statusMessage: "App successfully launched on app stores.",
        listTechnologies: ["Swift", "iOS", "Firebase"],
        creator: "Alice Johnson",
        likes: 256,
        saved: 78,
        collaborators: ["Charlie Brown"],
        courseLink: "https://example.com/mobile-app-development-course",
        rating: 4.9,
      },
      {
        title: "E-commerce Website Redesign",
        description:
          "Redesigning the user interface and experience of an existing e-commerce website.",
        category: "Web",
        bannerUrl: "https://source.unsplash.com/800x400/?web-development",
        extraMedia: "https://source.unsplash.com/800x600/?ecommerce",
        status: "In Progress",
        statusMessage: "Currently working on the frontend components.",
        listTechnologies: ["React", "Node.js", "MongoDB", "Redux"],
        creator: "John Doe",
        likes: 120,
        saved: 56,
        collaborators: ["Jane Smith", "Bob Johnson"],
        courseLink: "https://example.com/web-development-course",
        rating: 4.7,
      },
      {
        title: "E-commerce Website Redesign",
        description:
          "Redesigning the user interface and experience of an existing e-commerce website.",
        category: "Web",
        bannerUrl: "https://source.unsplash.com/800x400/?web-development",
        extraMedia: "https://source.unsplash.com/800x600/?ecommerce",
        status: "In Progress",
        statusMessage: "Currently working on the frontend components.",
        listTechnologies: ["React", "Node.js", "MongoDB", "Redux"],
        creator: "John Doe",
        likes: 120,
        saved: 56,
        collaborators: ["Jane Smith", "Bob Johnson"],
        courseLink: "https://example.com/web-development-course",
        rating: 4.7,
      },
      {
        title: "Mobile App for Fitness Tracking",
        description:
          "Developing a mobile app to track and analyze fitness activities.",
        category: "App",
        bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
        extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
        status: "Completed",
        statusMessage: "App successfully launched on app stores.",
        listTechnologies: ["Swift", "iOS", "Firebase"],
        creator: "Alice Johnson",
        likes: 256,
        saved: 78,
        collaborators: ["Charlie Brown"],
        courseLink: "https://example.com/mobile-app-development-course",
        rating: 4.9,
      },
      {
        title: "Mobile App for Fitness Tracking",
        description:
          "Developing a mobile app to track and analyze fitness activities.",
        category: "App",
        bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
        extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
        status: "Completed",
        statusMessage: "App successfully launched on app stores.",
        listTechnologies: ["Swift", "iOS", "Firebase"],
        creator: "Alice Johnson",
        likes: 256,
        saved: 78,
        collaborators: ["Charlie Brown"],
        courseLink: "https://example.com/mobile-app-development-course",
        rating: 4.9,
      },
      {
        title: "Mobile App for Fitness Tracking",
        description:
          "Developing a mobile app to track and analyze fitness activities.",
        category: "App",
        bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
        extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
        status: "Completed",
        statusMessage: "App successfully launched on app stores.",
        listTechnologies: ["Swift", "iOS", "Firebase"],
        creator: "Alice Johnson",
        likes: 256,
        saved: 78,
        collaborators: ["Charlie Brown"],
        courseLink: "https://example.com/mobile-app-development-course",
        rating: 4.9,
      },
      {
        title: "Mobile App for Fitness Tracking",
        description:
          "Developing a mobile app to track and analyze fitness activities.",
        category: "App",
        bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
        extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
        status: "Completed",
        statusMessage: "App successfully launched on app stores.",
        listTechnologies: ["Swift", "iOS", "Firebase"],
        creator: "Alice Johnson",
        likes: 256,
        saved: 78,
        collaborators: ["Charlie Brown"],
        courseLink: "https://example.com/mobile-app-development-course",
        rating: 4.9,
      },
    ],
    ownProjects: [
      {
        title: "E-commerce Website Redesign",
        description:
          "Redesigning the user interface and experience of an existing e-commerce website.",
        category: "Web",
        bannerUrl: "https://source.unsplash.com/800x400/?web-development",
        extraMedia: "https://source.unsplash.com/800x600/?ecommerce",
        status: "Need help",
        statusMessage: "Currently working on the frontend components.",
        listTechnologies: ["React", "Node.js", "MongoDB", "Redux"],
        creator: "John Doe",
        likes: 120,
        saved: 56,
        collaborators: ["Jane Smith", "Bob Johnson"],
        courseLink: "https://example.com/web-development-course",
        rating: 4.7,
      },
      {
        title: "Mobile App for Fitness Tracking",
        description:
          "Developing a mobile app to track and analyze fitness activities.",
        category: "App",
        bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
        extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
        status: "Completed",
        statusMessage: "App successfully launched on app stores.",
        listTechnologies: ["Swift", "iOS", "Firebase"],
        creator: "Alice Johnson",
        likes: 256,
        saved: 78,
        collaborators: ["Charlie Brown"],
        courseLink: "https://example.com/mobile-app-development-course",
        rating: 4.9,
      },
      {
        title: "Mobile App for Fitness Tracking",
        description:
          "Developing a mobile app to track and analyze fitness activities.",
        category: "Design",
        bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
        extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
        status: "Completed",
        statusMessage: "App successfully launched on app stores.",
        listTechnologies: ["Swift", "iOS", "Firebase"],
        creator: "Alice Johnson",
        likes: 256,
        saved: 78,
        collaborators: ["Charlie Brown"],
        courseLink: "https://example.com/mobile-app-development-course",
        rating: 4.9,
      },
      {
        title: "Mobile App for Fitness Tracking",
        description:
          "Developing a mobile app to track and analyze fitness activities.",
        category: "Web",
        bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
        extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
        status: "Completed",
        statusMessage: "App successfully launched on app stores.",
        listTechnologies: ["Swift", "iOS", "Firebase"],
        creator: "Alice Johnson",
        likes: 256,
        saved: 78,
        collaborators: ["Charlie Brown"],
        courseLink: "https://example.com/mobile-app-development-course",
        rating: 4.9,
      },
      {
        title: "E-commerce Website Redesign",
        description:
          "Redesigning the user interface and experience of an existing e-commerce website.",
        category: "Web",
        bannerUrl: "https://source.unsplash.com/800x400/?web-development",
        extraMedia: "https://source.unsplash.com/800x600/?ecommerce",
        status: "In Progress",
        statusMessage: "Currently working on the frontend components.",
        listTechnologies: ["React", "Node.js", "MongoDB", "Redux"],
        creator: "John Doe",
        likes: 120,
        saved: 56,
        collaborators: ["Jane Smith", "Bob Johnson"],
        courseLink: "https://example.com/web-development-course",
        rating: 4.7,
      },
      {
        title: "E-commerce Website Redesign",
        description:
          "Redesigning the user interface and experience of an existing e-commerce website.",
        category: "Web",
        bannerUrl: "https://source.unsplash.com/800x400/?web-development",
        extraMedia: "https://source.unsplash.com/800x600/?ecommerce",
        status: "In Progress",
        statusMessage: "Currently working on the frontend components.",
        listTechnologies: ["React", "Node.js", "MongoDB", "Redux"],
        creator: "John Doe",
        likes: 120,
        saved: 56,
        collaborators: ["Jane Smith", "Bob Johnson"],
        courseLink: "https://example.com/web-development-course",
        rating: 4.7,
      },
      {
        title: "Mobile App for Fitness Tracking",
        description:
          "Developing a mobile app to track and analyze fitness activities.",
        category: "App",
        bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
        extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
        status: "Completed",
        statusMessage: "App successfully launched on app stores.",
        listTechnologies: ["Swift", "iOS", "Firebase"],
        creator: "Alice Johnson",
        likes: 256,
        saved: 78,
        collaborators: ["Charlie Brown"],
        courseLink: "https://example.com/mobile-app-development-course",
        rating: 4.9,
      },
      {
        title: "Mobile App for Fitness Tracking",
        description:
          "Developing a mobile app to track and analyze fitness activities.",
        category: "App",
        bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
        extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
        status: "Completed",
        statusMessage: "App successfully launched on app stores.",
        listTechnologies: ["Swift", "iOS", "Firebase"],
        creator: "Alice Johnson",
        likes: 256,
        saved: 78,
        collaborators: ["Charlie Brown"],
        courseLink: "https://example.com/mobile-app-development-course",
        rating: 4.9,
      },
      {
        title: "Mobile App for Fitness Tracking",
        description:
          "Developing a mobile app to track and analyze fitness activities.",
        category: "App",
        bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
        extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
        status: "Completed",
        statusMessage: "App successfully launched on app stores.",
        listTechnologies: ["Swift", "iOS", "Firebase"],
        creator: "Alice Johnson",
        likes: 256,
        saved: 78,
        collaborators: ["Charlie Brown"],
        courseLink: "https://example.com/mobile-app-development-course",
        rating: 4.9,
      },
      {
        title: "Mobile App for Fitness Tracking",
        description:
          "Developing a mobile app to track and analyze fitness activities.",
        category: "App",
        bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
        extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
        status: "Completed",
        statusMessage: "App successfully launched on app stores.",
        listTechnologies: ["Swift", "iOS", "Firebase"],
        creator: "Alice Johnson",
        likes: 256,
        saved: 78,
        collaborators: ["Charlie Brown"],
        courseLink: "https://example.com/mobile-app-development-course",
        rating: 4.9,
      },
    ],
    followings: [],
    follower: [],
    socials: {
      facebook: "https://www.youtube.com/",
      linkedin: "https://www.youtube.com/",
      twitter: "https://www.youtube.com/",
      youtube: "https://www.youtube.com/",
      instagram: "https://www.instagram.com/_darkm4tt3r_/",
    },
  };
  const colors = [
    "blue",
    "green",
    "pink",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#f0f0f0",
  ];
const profile = {
  name: "Vikas Anand",
  designation: "Graphic Designer",
  about:
    "Our Car Rental online booking system designed to meet the specific needs of car rental business owners. This easy-to-use car rental software will let you manage.Our Car Rental online booking system designed to meet the specific.",
  email: "xyz@gmail.com",
  graduationPeriod: 2026,
  profileUrl:
    "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk",
  savedProjects: [
    {
      title: "E-commerce Website Redesign",
      description:
        "Redesigning the user interface and experience of an existing e-commerce website.",
      category: "Web",
      bannerUrl: "https://source.unsplash.com/800x400/?web-development",
      extraMedia: "https://source.unsplash.com/800x600/?ecommerce",
      status: "Need help",
      statusMessage: "Currently working on the frontend components.",
      listTechnologies: ["React", "Node.js", "MongoDB", "Redux"],
      creator: "John Doe",
      likes: 120,
      saved: 56,
      collaborators: ["Jane Smith", "Bob Johnson"],
      courseLink: "https://example.com/web-development-course",
      rating: 4.7,
    },
    {
      title: "Mobile App for Fitness Tracking",
      description:
        "Developing a mobile app to track and analyze fitness activities.",
      category: "App",
      bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
      extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
      status: "Completed",
      statusMessage: "App successfully launched on app stores.",
      listTechnologies: ["Swift", "iOS", "Firebase"],
      creator: "Alice Johnson",
      likes: 256,
      saved: 78,
      collaborators: ["Charlie Brown"],
      courseLink: "https://example.com/mobile-app-development-course",
      rating: 4.9,
    },
    {
      title: "Mobile App for Fitness Tracking",
      description:
        "Developing a mobile app to track and analyze fitness activities.",
      category: "Design",
      bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
      extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
      status: "Completed",
      statusMessage: "App successfully launched on app stores.",
      listTechnologies: ["Swift", "iOS", "Firebase"],
      creator: "Alice Johnson",
      likes: 256,
      saved: 78,
      collaborators: ["Charlie Brown"],
      courseLink: "https://example.com/mobile-app-development-course",
      rating: 4.9,
    },
    {
      title: "Mobile App for Fitness Tracking",
      description:
        "Developing a mobile app to track and analyze fitness activities.",
      category: "Web",
      bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
      extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
      status: "Completed",
      statusMessage: "App successfully launched on app stores.",
      listTechnologies: ["Swift", "iOS", "Firebase"],
      creator: "Alice Johnson",
      likes: 256,
      saved: 78,
      collaborators: ["Charlie Brown"],
      courseLink: "https://example.com/mobile-app-development-course",
      rating: 4.9,
    },
    {
      title: "E-commerce Website Redesign",
      description:
        "Redesigning the user interface and experience of an existing e-commerce website.",
      category: "Web",
      bannerUrl: "https://source.unsplash.com/800x400/?web-development",
      extraMedia: "https://source.unsplash.com/800x600/?ecommerce",
      status: "In Progress",
      statusMessage: "Currently working on the frontend components.",
      listTechnologies: ["React", "Node.js", "MongoDB", "Redux"],
      creator: "John Doe",
      likes: 120,
      saved: 56,
      collaborators: ["Jane Smith", "Bob Johnson"],
      courseLink: "https://example.com/web-development-course",
      rating: 4.7,
    },
    {
      title: "E-commerce Website Redesign",
      description:
        "Redesigning the user interface and experience of an existing e-commerce website.",
      category: "Web",
      bannerUrl: "https://source.unsplash.com/800x400/?web-development",
      extraMedia: "https://source.unsplash.com/800x600/?ecommerce",
      status: "In Progress",
      statusMessage: "Currently working on the frontend components.",
      listTechnologies: ["React", "Node.js", "MongoDB", "Redux"],
      creator: "John Doe",
      likes: 120,
      saved: 56,
      collaborators: ["Jane Smith", "Bob Johnson"],
      courseLink: "https://example.com/web-development-course",
      rating: 4.7,
    },
    {
      title: "Mobile App for Fitness Tracking",
      description:
        "Developing a mobile app to track and analyze fitness activities.",
      category: "App",
      bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
      extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
      status: "Completed",
      statusMessage: "App successfully launched on app stores.",
      listTechnologies: ["Swift", "iOS", "Firebase"],
      creator: "Alice Johnson",
      likes: 256,
      saved: 78,
      collaborators: ["Charlie Brown"],
      courseLink: "https://example.com/mobile-app-development-course",
      rating: 4.9,
    },
    {
      title: "Mobile App for Fitness Tracking",
      description:
        "Developing a mobile app to track and analyze fitness activities.",
      category: "App",
      bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
      extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
      status: "Completed",
      statusMessage: "App successfully launched on app stores.",
      listTechnologies: ["Swift", "iOS", "Firebase"],
      creator: "Alice Johnson",
      likes: 256,
      saved: 78,
      collaborators: ["Charlie Brown"],
      courseLink: "https://example.com/mobile-app-development-course",
      rating: 4.9,
    },
    {
      title: "Mobile App for Fitness Tracking",
      description:
        "Developing a mobile app to track and analyze fitness activities.",
      category: "App",
      bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
      extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
      status: "Completed",
      statusMessage: "App successfully launched on app stores.",
      listTechnologies: ["Swift", "iOS", "Firebase"],
      creator: "Alice Johnson",
      likes: 256,
      saved: 78,
      collaborators: ["Charlie Brown"],
      courseLink: "https://example.com/mobile-app-development-course",
      rating: 4.9,
    },
    {
      title: "Mobile App for Fitness Tracking",
      description:
        "Developing a mobile app to track and analyze fitness activities.",
      category: "App",
      bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
      extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
      status: "Completed",
      statusMessage: "App successfully launched on app stores.",
      listTechnologies: ["Swift", "iOS", "Firebase"],
      creator: "Alice Johnson",
      likes: 256,
      saved: 78,
      collaborators: ["Charlie Brown"],
      courseLink: "https://example.com/mobile-app-development-course",
      rating: 4.9,
    },
  ],
  ownProjects: [
    {
      title: "E-commerce Website Redesign",
      description:
        "Redesigning the user interface and experience of an existing e-commerce website.",
      category: "Web",
      bannerUrl: "https://source.unsplash.com/800x400/?web-development",
      extraMedia: "https://source.unsplash.com/800x600/?ecommerce",
      status: "Need help",
      statusMessage: "Currently working on the frontend components.",
      listTechnologies: ["React", "Node.js", "MongoDB", "Redux"],
      creator: "John Doe",
      likes: 120,
      saved: 56,
      collaborators: ["Jane Smith", "Bob Johnson"],
      courseLink: "https://example.com/web-development-course",
      rating: 4.7,
    },
    {
      title: "Mobile App for Fitness Tracking",
      description:
        "Developing a mobile app to track and analyze fitness activities.",
      category: "App",
      bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
      extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
      status: "Completed",
      statusMessage: "App successfully launched on app stores.",
      listTechnologies: ["Swift", "iOS", "Firebase"],
      creator: "Alice Johnson",
      likes: 256,
      saved: 78,
      collaborators: ["Charlie Brown"],
      courseLink: "https://example.com/mobile-app-development-course",
      rating: 4.9,
    },
    {
      title: "Mobile App for Fitness Tracking",
      description:
        "Developing a mobile app to track and analyze fitness activities.",
      category: "Design",
      bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
      extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
      status: "Completed",
      statusMessage: "App successfully launched on app stores.",
      listTechnologies: ["Swift", "iOS", "Firebase"],
      creator: "Alice Johnson",
      likes: 256,
      saved: 78,
      collaborators: ["Charlie Brown"],
      courseLink: "https://example.com/mobile-app-development-course",
      rating: 4.9,
    },
    {
      title: "Mobile App for Fitness Tracking",
      description:
        "Developing a mobile app to track and analyze fitness activities.",
      category: "Web",
      bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
      extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
      status: "Completed",
      statusMessage: "App successfully launched on app stores.",
      listTechnologies: ["Swift", "iOS", "Firebase"],
      creator: "Alice Johnson",
      likes: 256,
      saved: 78,
      collaborators: ["Charlie Brown"],
      courseLink: "https://example.com/mobile-app-development-course",
      rating: 4.9,
    },
    {
      title: "E-commerce Website Redesign",
      description:
        "Redesigning the user interface and experience of an existing e-commerce website.",
      category: "Web",
      bannerUrl: "https://source.unsplash.com/800x400/?web-development",
      extraMedia: "https://source.unsplash.com/800x600/?ecommerce",
      status: "In Progress",
      statusMessage: "Currently working on the frontend components.",
      listTechnologies: ["React", "Node.js", "MongoDB", "Redux"],
      creator: "John Doe",
      likes: 120,
      saved: 56,
      collaborators: ["Jane Smith", "Bob Johnson"],
      courseLink: "https://example.com/web-development-course",
      rating: 4.7,
    },
    {
      title: "E-commerce Website Redesign",
      description:
        "Redesigning the user interface and experience of an existing e-commerce website.",
      category: "Web",
      bannerUrl: "https://source.unsplash.com/800x400/?web-development",
      extraMedia: "https://source.unsplash.com/800x600/?ecommerce",
      status: "In Progress",
      statusMessage: "Currently working on the frontend components.",
      listTechnologies: ["React", "Node.js", "MongoDB", "Redux"],
      creator: "John Doe",
      likes: 120,
      saved: 56,
      collaborators: ["Jane Smith", "Bob Johnson"],
      courseLink: "https://example.com/web-development-course",
      rating: 4.7,
    },
    {
      title: "Mobile App for Fitness Tracking",
      description:
        "Developing a mobile app to track and analyze fitness activities.",
      category: "App",
      bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
      extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
      status: "Completed",
      statusMessage: "App successfully launched on app stores.",
      listTechnologies: ["Swift", "iOS", "Firebase"],
      creator: "Alice Johnson",
      likes: 256,
      saved: 78,
      collaborators: ["Charlie Brown"],
      courseLink: "https://example.com/mobile-app-development-course",
      rating: 4.9,
    },
    {
      title: "Mobile App for Fitness Tracking",
      description:
        "Developing a mobile app to track and analyze fitness activities.",
      category: "App",
      bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
      extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
      status: "Completed",
      statusMessage: "App successfully launched on app stores.",
      listTechnologies: ["Swift", "iOS", "Firebase"],
      creator: "Alice Johnson",
      likes: 256,
      saved: 78,
      collaborators: ["Charlie Brown"],
      courseLink: "https://example.com/mobile-app-development-course",
      rating: 4.9,
    },
    {
      title: "Mobile App for Fitness Tracking",
      description:
        "Developing a mobile app to track and analyze fitness activities.",
      category: "App",
      bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
      extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
      status: "Completed",
      statusMessage: "App successfully launched on app stores.",
      listTechnologies: ["Swift", "iOS", "Firebase"],
      creator: "Alice Johnson",
      likes: 256,
      saved: 78,
      collaborators: ["Charlie Brown"],
      courseLink: "https://example.com/mobile-app-development-course",
      rating: 4.9,
    },
    {
      title: "Mobile App for Fitness Tracking",
      description:
        "Developing a mobile app to track and analyze fitness activities.",
      category: "App",
      bannerUrl: "https://source.unsplash.com/800x400/?fitness-app",
      extraMedia: "https://source.unsplash.com/800x600/?mobile-app",
      status: "Completed",
      statusMessage: "App successfully launched on app stores.",
      listTechnologies: ["Swift", "iOS", "Firebase"],
      creator: "Alice Johnson",
      likes: 256,
      saved: 78,
      collaborators: ["Charlie Brown"],
      courseLink: "https://example.com/mobile-app-development-course",
      rating: 4.9,
    },
  ],
  followings: [],
  follower: [],
  socials: {
    facebook: "https://www.youtube.com/",
    linkedin: "https://www.youtube.com/",
    twitter: "https://www.youtube.com/",
    youtube: "https://www.youtube.com/",
    instagram: "https://www.instagram.com/_darkm4tt3r_/",
  },
};
const colors = [
  "blue",
  "green",
  "pink",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
  "#f0f0f0",
];

// Initialize Firebase with the configuration
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
function Profile({isAuthenticated,SERVER_URL}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [serverURL, setServerURL] = useState("");
  const [isfollowing, setisfollowing] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const [profileEditData, setProfileEditData] = useState(
    {
      profileUrl: "",
      Name: "",
      designation: "",
      Email: "",
      about: "",
      joiningYear: "",
      graduatingYear: "",
      socials : {
        github: "",
        linkedin: "",
        instagram: "",
        facebook: "",
        twitter: "",
        youtube: ""
      }
    }
  );
  const [addProject, setAddProject] = useState(false);
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    bigdescription: "",
    category: "",
    bannerUrl: "",
    extraMedia: [],
    status: "Completed",
    openCollab: false,
    statusMessage: "",
    technologies: [],
    courseLink: []
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };



  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const storageRef = ref(storage, `${selectedFile.name}`);
        await uploadBytes(storageRef, selectedFile);
        const downloadUrl = await getDownloadURL(storageRef);
        setServerURL(downloadUrl);
        console.log("File available at", downloadUrl);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="flex flex-col">
      <Navbar2 SERVER_URL={SERVER_URL}/>
      {/* {isAuthenticated && <div>isAuthenticated true user</div>}
      your profile page
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          className=" border border-black  rounded-full p-2 text-xs hover:bg-gray-500"
          onClick={handleUpload}
        >
          Upload Profile Picture
        </button>
        <img src={serverURL} />
        <object className=" h-screen w-screen" data={serverURL} />
      </div> */}
      <div className="hero__page">
        <div className="flex md:gap-3 pt-[120px] md:justify-start">
          <div className="px-2 w-[35%] md:w-[20%] overflow-hidden mx-4">
            <img
              src={profile.profileUrl}
              alt="profileImg"
              className="border-slate-300 border-2 rounded-[50%] m-auto"
            />
          </div>
          <div className="flex w-[60%] md:w-[60%] flex-col mr-4">
            <div className=" text-[30px] sm:text-[50px] text-[#00b2ff] font-bold uppercase flex justify-between leading-8 sm:leading-tight">
              <div>
                {profile.name}
                <span className=" text-[6px] font-thin text-white flex flex-nowrap mt-[-6px] mb-[6px] sm:mt-0">{`${
                  profile.graduationPeriod - 4
                } - ${profile.graduationPeriod}`}</span>
              </div>

              <div className="flex justify-end">
                <img
                  src="/edit.svg"
                  alt=""
                  className="w-[95px] cursor-pointer hover:invert"
                  onClick={() => {
                    setProfileEdit(true);
                  }}
                />
              </div>
            </div>

            <div className="uppercase text-white text-xs sm:text-base mt-[-4px]">
              {profile.designation}
            </div>
            <div className="text-white pt-6 mt-4 overflow-auto max-h-[100px]">
              {profile.about}
            </div>

            <div className="flex gap-2 pt-4">
              {profile.socials.facebook.length && (
                <Link to={profile.socials.facebook}>
                  {" "}
                  <img
                    src="/facebook.svg"
                    alt="facebook"
                    className="w-5 sm:w-7 md:w-9"
                  />
                </Link>
              )}
              {profile.socials.linkedin.length && (
                <Link to={profile.socials.linkedin}>
                  {" "}
                  <img
                    src="/linkedin.svg"
                    alt="linkedin"
                    className="w-5 sm:w-7 md:w-9"
                  />
                </Link>
              )}
              {profile.socials.twitter.length && (
                <Link to={profile.socials.twitter}>
                  <img
                    src="/twitter.svg"
                    alt="twitter"
                    className="w-5 sm:w-7 md:w-9"
                  />
                </Link>
              )}
              {profile.socials.youtube.length && (
                <Link to={profile.socials.youtube}>
                  <img
                    src="/youtube.svg"
                    alt="youtube"
                    className="w-5 sm:w-7 md:w-9"
                  />
                </Link>
              )}
              {profile.socials.instagram.length && (
                <Link to={profile.socials.instagram}>
                  <img
                    src="/instagram.svg"
                    alt="instagram"
                    className="w-5 sm:w-7 md:w-9"
                  />
                </Link>
              )}
            </div>
            <div className="mt-8 mb-10">
              {isfollowing ? (
                <div
                  className="bg-[rgba(0, 0, 0, 0.10)] rounded-[33.5px] text-white border-white border-2 w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center gap-1 font-bold cursor-pointer"
                  onClick={() => {
                    setisfollowing(!isfollowing);
                  }}
                >
                  <img src="/check.svg" className="h-6" />
                  <div>Following</div>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setisfollowing(!isfollowing);
                  }}
                  className="bg-white rounded-[33.5px]  border-white border-2 w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center font-bold cursor-pointer"
                >
                  <p>Follow</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col bg-black justify-center items-center">
        <div
          className="text-white bg-[#1c1b1b] flex rounded-lg w-[240px]  flex-col justify-center items-center mx-auto my-8 pb-8 cursor-pointer"
          onClick={() => {
            setAddProject(true);
          }}
        >
          <span className="text-[150px] font-thin my-[-50px]">+</span>{" "}
          <span> ADD PROJECT</span>
        </div>
        <div className="flex gap-3 justify-center items-center mb-6">
          <div className="bg-[rgba(0, 0, 0, 0.10)] rounded-[33.5px] text-white border-white border-2 w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center gap-1 font-bold cursor-pointer">
            Your projects
          </div>
          <div className="bg-white rounded-[33.5px] border-white border-2 w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center font-bold cursor-pointer">
            Saved projects
          </div>
        </div>

        <div className="bg-[#7c7c7c] h-[1px] my-4 mx-6" />
      </div>
      <div className="flex flex-wrap gap-1 w-screen shadow-inner text-white justify-start">
        {profile.savedProjects.map((project) => (
          <Link to={`/project/${project.courseLink}`}>
            <div
              key={project.title}
              className="relative w-[95vw] h-[290px] sm:w-[400px] flex flex-col m-2 rounded-2xl border-[1px] mx-auto sm:mx-4 overflow-hidden "
            >
              <div
                className="uppercase absolute right-3 top-0 mt-3  rounded-[10px] text-xs text-black bg-green-300 px-4 py-[2px] text-center"
                style={{
                  backgroundColor:
                    colors[
                      project.status[0] == "I"
                        ? 0
                        : project.status[0] == "C"
                        ? 1
                        : project.status[0] == "N"
                        ? 3
                        : 0
                    ],
                }}
              >
                {project.status}
              </div>
              <img
                src={project.bannerUrl}
                alt=""
                className="rounded-t-2xl h-[180px]  object-cover	 "
              />

              <div className="flex flex-col pl-2 py-2">
                <h1 className="uppercase  text-xl md:[2xl-10px] leading-7 text-[] ">
                  {project.title}
                </h1>
                <p className="text-[12px]  leading-4 ">
                  {project.description.length > 100
                    ? project.description.substr(0, 100) + ".."
                    : project.description}
                </p>
                <div className="flex absolute bottom-3 mt-1">
                  {project.listTechnologies.map((tech, index) => {
                    if (index < 4) {
                      return (
                        <div
                          className="m-1 uppercase  px-4 py-1 rounded-[10px] text-xs text-black"
                          style={{
                            backgroundColor:
                              colors[tech.length % colors.length],
                          }}
                          key={index}
                        >
                          {tech}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Footer />
      {profileEdit && (
        <ProfileEditModal
          onClose={() => {
            setProfileEdit(false);
          }}
          profileEditData={profileEditData}
          setProfileEditData={setProfileEditData}
        />
      )}
      {addProject && (
        <AddProject
          onCancel={() => {
            setAddProject(false);
          }}
          projectData = {projectData}
          setProjectData = {setProjectData}
        />
      )}
      {/* <div>
        <div className=" ">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button
            className=" border border-black  rounded-full p-2 text-xs hover:bg-gray-500"
            onClick={handleUpload}
          >
            Upload Profile Picture
          </button>
          <img src={serverURL} />
          <object className=" h-screen w-screen" data={serverURL} />
        </div>
      </div> */}
    </div>
    <div>
        <Navbar/>
        {isAuthenticated&&<div>isAuthenticated true user</div>}
        your profile page
        <div className=' mt-[60%]'>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button className=' border border-black  rounded-full p-2 text-xs hover:bg-gray-500' onClick={handleUpload}>Upload Profile Picture</button>
      <img src={serverURL}/>
      <object className=' h-screen w-screen' data={serverURL}/>
    </div>
      
    </div>
  </div>
  );
}

export default Profile;
