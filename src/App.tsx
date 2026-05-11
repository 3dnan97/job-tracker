import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import JobList from './pages/JobList'
import NotFound from './pages/NotFound'
import JobForm from './pages/JobForm'
import JobDetail from './pages/JobDetail'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout/>}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/jobs" element={<JobList />} />
                <Route path="/jobs/new" element={<JobForm />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                <Route path="/jobs/:id/edit" element={<JobForm />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />

          </Routes>
    </>
  )
}

export default App
