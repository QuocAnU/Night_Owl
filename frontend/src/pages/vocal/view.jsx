import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

const sections = [
  "Hiragna",
  "Katakana",
  "Kanji",
]

function Skills() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow mt-16">
        <div className="flex flex-col px-52">
          <div className="text-center text-4xl font-bold sm:text-5xl p-8">
            Flashcard
          </div>
          <div className='flex flex-row justify-between mt-5' >
            {sections.map((section, index) => (
            <div className="flex justify-center mb-10" key={index}>
              <Button className="w-60 bg-[#EAF4FF] text-[#000] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300">
                {section}
              </Button>
            </div>
          ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Skills
