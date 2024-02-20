import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header.jsx";
import PostForm from "./components/PostForm/PostForm";

import AuthLayout from "./components/AuthLayout.jsx";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPosts from "./pages/MyPosts";
import Search from "./pages/Search"; 
import Post from "./pages/Post";
import Logout from "./components/Header/Logout.jsx";
import InputButton from "./components/InputButton.jsx";
import InputField from "./components/InputField.jsx";
import authService from "./appwrite/auth.js";
import Logo from "./components/Logo.jsx";
import FooterLink from "./components/FooterLink.jsx";
import FeatureCard from "./components/FeatureCard.jsx";
import CommunityCard from "./components/CommunityCard.jsx";
import TestimonialCard from "./components/TestimonialCard.jsx";
export{
    Footer,Header,PostForm, AddPost,EditPost,Home,
    Login,Signup,MyPosts,Search,Post,AuthLayout,Logout,InputButton,InputField,
    authService,Logo,FooterLink,FeatureCard,CommunityCard,TestimonialCard
}