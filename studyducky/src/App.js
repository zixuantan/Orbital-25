import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Registration from "./pages/Registration";
import LoginPage from "./pages/LoginPage.js";
import MainPage from "./pages/MainPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import GroupFinder from "./pages/GroupFinder";
import GroupChatPage from "./pages/GroupChatPage";
import VirtualStudyRoom from "./pages/VirtualStudyRoom";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import GroupFilter from "./pages/GroupFilter";
import CreateGroup from "./pages/CreateGroup";
import FilesPage from "./pages/FilesPage";
import AvatarCustom from "./pages/AvatarCustom.js";

function App() {
	return (
		<Router>
			<div className="App-header">
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/main" element={<MainPage />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/filter" element={<GroupFilter />} />
					<Route path="/groups" element={<GroupFinder />} />
					<Route path="/chat/:groupId" element={<GroupChatPage />} />
					<Route path="/files/:folderId" element={<FilesPage />} />
					<Route path="/studyroom/:groupId" element={<VirtualStudyRoom />} />
					<Route path="/stats" element={<Stats />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/create-group" element={<CreateGroup />} />
					<Route path="/avatar/:groupId" element={<AvatarCustom />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
