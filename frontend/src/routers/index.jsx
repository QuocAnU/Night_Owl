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
import SkillsLayout from '@/pages/vocal/index';
import GrammarLayout from '@/pages/Grammar/index';
import GrammarTheoryView from '@/pages/Grammar/view';
import GrammarTheoryDetail from '@/pages/Grammar/detail';
import ReadView from '@/pages/read/view';
import ReadDetail from '@/pages/read/detail';
import ListenView from '@/pages/Listen/view';
import ListenDetail from '@/pages/Listen/detail';
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
    element: <SkillsLayout />,
  },
  {
    path: '/skills/vocal/:section',
    element: <VocalView />,
  },
  {
    path: '/skills/vocal/:section/:sectionValue',
    element: <VocabularyTest />,
  },
  {
    path: 'skills/grammar',
    element: <GrammarLayout />,
  },
  {
    path: '/skills/grammar/:section',
    element: <GrammarTheoryView />,
  },
  {
    path: '/skills/grammar/:section/:sectionValue',
    element: <GrammarTheoryDetail />,
  },
  {
    path: 'skills/read',
    element: <ReadView />,
  },
  {
    path: '/skills/read/:section',
    element: <ReadDetail />,
  },
  {
    path: '/skills/listen',
    element: <ListenView />,
  },
  {
    path: '/skills/listen/:section',
    element: <ListenDetail />,
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