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
import ReadView from '@/pages/Read/view';
import ReadDetail from '@/pages/Read/detail';
import ListenView from '@/pages/Listen/view';
import ListenDetail from '@/pages/Listen/detail';
import TestGrammarView from '@/pages/Test/Grammar/view';
import TestGrammarDetail from '@/pages/Test/Grammar/detail';
import TestVocalView from '@/pages/Test/Vocal/view';
import TestVocalDetail from '@/pages/Test/Vocal/detail';
import ProfilePage from '@/pages/profile';
import ExeGrammarView from '@/pages/Grammar/Exe/Grammar/view';
import ExeGrammarDetail from '@/pages/Grammar/Exe/Grammar/detail';
import Tests from '@/pages/test';
import CheckIn from '@/pages/mark';
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
    path: '/skills/grammar/theory',
    element: <GrammarTheoryView />,
  },
  {
    path: '/skills/grammar/practice',
    element: <ExeGrammarView />,
  },
  {
    path: '/skills/grammar/practice/:sectionValue',
    element: <ExeGrammarDetail />,
  },
  {
    path: '/skills/grammar/theory/:sectionValue',
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
    path: '/tests',
    element: <Tests />,
  },
  {
    path: '/tests/grammar',
    element: <TestGrammarView />,
  },
  {
    path: '/tests/grammar/:section',
    element: <TestGrammarDetail />,
  },
  {
    path: '/tests/vocal',
    element: <TestVocalView />,
  },
  {
    path: '/tests/vocal/:section',
    element: <TestVocalDetail />,
  },
  {
    path: '/premium',
    element: <Premium />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/mark',
    element: <CheckIn />,
  }

]);

export default router;