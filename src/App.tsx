import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import { TopNavigation, BottomNavigation } from './components/layout/Navigation';
import { useAuthStore } from './store/auth';
import Landing from './pages/Landing';
import ApplicationForm from './components/ApplicationForm';
import UserProfile from './pages/UserProfile';
import CommunityFeed from './pages/CommunityFeed';
import AcademyFeed from './pages/AcademyFeed';
import UserDirectory from './pages/UserDirectory';
import Messages from './pages/Messages';
import { ReadOnlyUserProfile } from './components/auth/ReadOnlyUserProfile';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const { user, users } = useAuthStore();
  const { userId } = useParams<{ userId?: string }>();

  const pageVariants = {
    initial: { opacity: 0, x: -100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 100 },
  };

  return (
    <div className="min-h-screen bg-[#231F20] text-white">
      <Router>
        {user && <TopNavigation />}
        <AnimatePresence>
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="in"
                  exit="out"
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {user ? <Navigate to="/home" /> : <Landing />}
                </motion.div>
              }
            />
            <Route
              path="/application"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="in"
                  exit="out"
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <ApplicationForm />
                </motion.div>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                user
                  ? user.id === userId
                    ? (
                      <motion.div
                        variants={pageVariants}
                        initial="initial"
                        animate="in"
                        exit="out"
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <UserProfile />
                      </motion.div>
                    )
                    : (
                      <motion.div
                        variants={pageVariants}
                        initial="initial"
                        animate="in"
                        exit="out"
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <ReadOnlyUserProfile user={users.find((u) => u.id === userId) || users[0]} />
                      </motion.div>
                    )
                  : (
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="in"
                      exit="out"
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <ReadOnlyUserProfile user={users.find((u) => u.id === userId) || users[0]} />
                    </motion.div>
                  )
              }
            />
            <Route
              path="/home"
              element={
                user ? (
                  <>
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="in"
                      exit="out"
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <CommunityFeed />
                    </motion.div>
                    <BottomNavigation />
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/academy"
              element={
                user ? (
                  <>
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="in"
                      exit="out"
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <AcademyFeed />
                    </motion.div>
                    <BottomNavigation />
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/directory"
              element={
                user ? (
                  <>
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="in"
                      exit="out"
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <UserDirectory />
                    </motion.div>
                    <BottomNavigation />
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/messages"
              element={
                user ? (
                  <>
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="in"
                      exit="out"
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <Messages />
                    </motion.div>
                    <BottomNavigation />
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </AnimatePresence>
      </Router>
    </div>
  );
}

export default App;
