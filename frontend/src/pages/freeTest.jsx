import React from 'react'

function FreeTest() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Test Hiragana & Katakana</h1>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Chữ cái Hiragana</h2>
        <p className="mb-4">Điền chữ cái Hiragana tương ứng vào ô trống, đồng Hiragana và các từ vựng có liên quan.</p>
        <table className="w-full border border-gray-300">
          <tbody>
            <tr className="border-b">
              <td className="border p-2 text-center">あ</td>
              <td className="border p-2 text-center">い</td>
              <td className="border p-2 text-center">う</td>
              <td className="border p-2 text-center">え</td>
              <td className="border p-2 text-center">お</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Từ vựng Hiragana</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <img src="path/to/image" alt="Example" className="w-24 h-24" />
            <input type="text" placeholder="..." className="mt-2 p-1 border border-gray-300 rounded" />
          </div>
          {/* Repeat for other vocabulary items */}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Chữ cái Katakana</h2>
        <table className="w-full border border-gray-300">
          <tbody>
            <tr className="border-b">
              <td className="border p-2 text-center">ア</td>
              <td className="border p-2 text-center">イ</td>
              <td className="border p-2 text-center">ウ</td>
              <td className="border p-2 text-center">エ</td>
              <td className="border p-2 text-center">オ</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Từ vựng Katakana</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <img src="path/to/image" alt="Example" className="w-24 h-24" />
            <input type="text" placeholder="..." className="mt-2 p-1 border border-gray-300 rounded" />
          </div>
          {/* Repeat for other vocabulary items */}
        </div>
      </div>

      <button className="block mx-auto bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
        Hoàn thành
      </button>
    </div>
  );
}

export default FreeTest
