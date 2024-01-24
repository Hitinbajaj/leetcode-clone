import { programmingConcepts } from "../utils/blogs";
function Homepage() {
  return (
    <div className="bg-gray-100  items-center flex justify-center">
      <div className="px-10 mt-1 bg-white md:w-[1000px] shadow-lg ">
        <div className="space-y-4">
          {programmingConcepts.map((concept, index) => (
            <div key={index} className={`py-5 border-t ${index === 0 ? 'border-t-0' : ''}`}>
              <p className="text-gray-500 text-[13px]">{concept.date}</p>
              <h2 className="text-xl font-semibold">{concept.title}</h2>
              <p className="text-gray-700">{concept.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Homepage;
