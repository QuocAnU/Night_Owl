import { createBrowserRouter } from 'react-router-dom'
import Home from '@/pages/home'
import FreeLessons from '@/pages/freeLessons';
import FreeLessonsB from '@/pages/freeLessonsB';
import FreeTest from '@/pages/freeTest';
import Skills from '@/pages/skills';
import VocalView from '@/pages/vocal/view';
import VocabularyTest from '@/pages/vocal/detail';
import Premium from '@/pages/premium';
import LoginPage from '@/pages/login';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/freeLessons',
    element: <FreeLessons />,
  },
  {
    path: '/freeLessons/Hiragana&Katakana',
    element: <FreeLessonsB />,
  },
  {
    path: '/freeTest',
    element: <FreeTest />,
  },
  {
    path: '/skills',
    element: <Skills />,
  },
  {
    path: '/skills/vocal',
    element: <VocalView />,
  },
  {
    path: '/skills/vocal/:id',
    element: <VocabularyTest />,
  },
  {
    path: '/premium',
    element: <Premium />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  }
]);

export default router;